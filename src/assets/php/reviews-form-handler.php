<?php
$settings = require_once('../../config.php');

$required_fields = ['name', 'email', 'message'];
$errors = [];

foreach ($required_fields as $field) {
    if (!isset($_POST[$field]) || empty($_POST[$field])) {
        $errors[] = "field $field is empty";
    }
}
if (count($errors)) {
    set_response(406, ['message' => implode('\n', $errors)]);
}

foreach ($required_fields as $field) {
    switch ($field) {
        case 'name':
            $errors = [...$errors, ...validate_name($_POST[$field])];
            break;
        
        case 'email':
            $errors = [...$errors, ...validate_email($_POST[$field])];
            break;
    }
}
if (count($errors)) {
    set_response(406, ['message' => implode('\n', $errors)]);
} else {
    $db_settings = $settings['db'];
    $review_table = 'reviews';
    $connection = mysqli_connect($db_settings['host'], $db_settings['user'], $db_settings['password'], $db_settings['name']);
    if ($connection) {
        $stmt = mysqli_prepare($connection, "INSERT INTO `$review_table` (name, email, message, auto_auth) VALUES (?, ?, ?, 0)");
        mysqli_stmt_bind_param($stmt, 'sss', $_POST['name'], $_POST['email'], $_POST['message']);
        if (mysqli_stmt_execute($stmt)) {
            set_response(200, ['message' => 'Review added']);
        } else {
            set_response(500, ['message' => 'Database error']);
        }
    } else {
        set_response(500, ['message' => 'Database error']);
    }
}

function set_response($code, $body)
{
    http_response_code($code);
    print(json_encode($body));
    die;
}

function validate_name($data)
{
    $err=[];
    if (strlen($data)<2 || strlen($data)>50) {
        $err[] = "The name length must be from 2 to 50 characters\n";
    }
    if (preg_match("/[^(\w)|(\x7F-\xFF)|(\s)]/", $data)) {
        $err[] = "When writing a name, only letters of the Latin and Russian alphabet, numbers, underscore and space are allowed";
    }
    return $err;
}

function validate_email($data)
{
    $err =[];
    if (strlen($data)<3 || strlen($data)>50) {
        $err[] = "Email must be between 3 and 50 characters.";
    }
    if (!preg_match('#^([\w]+\.?)+(?<!\.)@(?!\.)[a-zа-я0-9ё\.-]+\\.?[a-zа-яё]{2,}$#ui', $data)) {
        $err[] = "Invalid email address format";
    }
    return $err;
}
