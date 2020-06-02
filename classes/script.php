<?php
namespace app;
require 'Validator.php';
require_once './../vendor/autoload.php';
use app\Validator;

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);

    $validate = new Validator($data);
    $errors = $validate->validateForm();

    if (!empty($errors)) {
        $error = array_shift($errors);
        echo json_encode(['status' => 'error', 'message' => $error]);
        exit;
    } else {

        // Create the Transport
        $transport = (new \Swift_SmtpTransport('smtp.gmail.com', 587, 'tls'))
        ->setUsername('nennnaddjov@gmail.com')
        ->setPassword('saskamala6535bre')
        ;

        // Create the Mailer using your created Transport
        $mailer = new \Swift_Mailer($transport);

        // Create a message
        $message = (new \Swift_Message('Za Osobicu'))
        ->setFrom(['nennnaddjov@gmail.com' => 'NenadCode'])
        ->setTo(['nenadj372@gmail.com'])
        ->setBody('<span style="font-weight:bold;">Ime: </span>' .$data['name'].'<br>' .'<span style="font-weight:bold;">Email: </span>' .$data['email'].'<br>' . '<span style="font-weight:bold;">Poruka: </span>'.$data['message'], 'text/html')
        ;

        // Send the message
        $result = $mailer->send($message);
        if (!$result) {
            echo json_encode(['status' => 'error', 'message' => 'Ooops, something went wrong!']);
            exit;
        } else {
            echo json_encode(['status' => 'success', 'message' => 'Message Sent!']);
            exit;
        }
    }


}