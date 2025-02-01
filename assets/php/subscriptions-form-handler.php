<?php
$settings = require_once('../../config.php');

$SUBS_TABLE = 'subscriptions';

$required_fields = ['name', 'email', 'message'];
$errors = [];
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        $errors[] = "Field '$field' is empty";
    }
}

if (count($errors)) {
    http_response_code(406);
} else {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $website = $_POST['website'] ?? '';
    $message = $_POST['message'];

    $error_form = validate_inputs($name, $email);
    if (!empty($error_form)) {
        http_response_code(406);
        $errors[] = $error_form;
    } else {
        $db_settings = $settings['db'];
        $mysqli = new mysqli($db_settings['host'], $db_settings['user'], $db_settings['password'], $db_settings['name']);
        if ($mysqli->connect_error) {
            http_response_code(500);
            $errors[] = 'Connect error (' . $mysqli->connect_errno . ') '. $mysqli->connect_error;
        } else {
            $prepared = $mysqli->prepare("select id, name, email, website, message from $SUBS_TABLE where email = ?");
            $prepared->bind_param("s", $email);
            $prepared->execute();
            $prepared->store_result();
            if ($prepared->num_rows === 0) {
                $prepared = $mysqli->prepare("INSERT INTO $SUBS_TABLE (id, name, email, website, message) VALUES ( NULL, ?, ?, ?, ?);");
                $prepared->bind_param("ssss", $name, $email, $website, $message);
                if ($prepared->execute()) {
                    http_response_code(200);
                    print(json_encode(array('message' => 'Your letter has been sent!')));
                } else {
                    http_response_code(500);
                    $errors[] = "Database query error";
                }
                $prepared->close();
            } else {
                http_response_code(406);
                $errors[] = "This email address is already registered";
            }
        }
    }
}

if (count($errors)) {
    print(json_encode(array('message' => implode('\n', $errors))));
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
    if (!empty($err)) {
        return implode('\n', $err);
    } else {
        return 0;
    }
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
    if (!empty($err)) {
        return implode('\n', $err);
    } else {
        return 0;
    }
}

function validate_inputs($data_name, $data_email)
{
    $err=[];
    $err_name = validate_name($data_name);
    $error_email = validate_email($data_email);
    if (!empty($err_name)) {
        $err[] = $err_name;
    }
    if (!empty($error_email)) {
        $err[] = $error_email;
    }
    return implode('\n', $err);
}
