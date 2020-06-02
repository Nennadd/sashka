<?php
namespace app;

class Validator
{
    private $data;
	private $errors = [];
    private static $input_fields = ['name', 'email', 'message'];
    
    public function __construct($postRequest)
	{
        $this->data = $postRequest;
	}


	public function validateForm()
	{
		foreach(self::$input_fields as $field){
			if(!array_key_exists($field, $this->data)){
				trigger_error($field . ' key is not in data array!');
				return;
			}
		}

		$this->validateName();
		$this->validateEmail();
		$this->validateMessage();

		return $this->errors;
    }

    private function validateName()
	{
		$input = htmlspecialchars(trim($this->data['name']));
		if(empty($input)){
			$this->addError('name', 'Please, enter your name!');
		}
		else {
			if(!preg_match('/^[a-zA-Z0-9_ ]{3,36}$/', $input)){
				$this->addError('name', 'Name must be at least 3 characters long!');
			}
		}
	}

	private function validateEmail()
	{
		$input = trim($this->data['email']);
		if(empty($input)){
			$this->addError('email', 'Please, enter email!');
		}
        else {
			if(!filter_var($input, FILTER_VALIDATE_EMAIL)){
				$this->addError('email', 'Email is not valid!');
			}
        }
    }
    
    private function validateMessage()
	{
		$input = htmlspecialchars(trim($this->data['message']));
		if(empty($input)){
			$this->addError('message', 'Please, enter message!');
		}
    }
    
    private function addError($key, $value)
	{
		$this->errors[$key] = $value;
	}
}