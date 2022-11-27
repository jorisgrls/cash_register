<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    session_start();
    include(__DIR__."/config.php");

    $login = $_POST['login'];
    $password = $_POST['password'];

    $loginQuery = "SELECT * FROM staff WHERE login=\"$login\"";
    $loginStatement = $login_bdd->prepare($loginQuery);
    $loginStatement->execute();
    $loginList = $loginStatement->fetch(PDO::FETCH_ASSOC);

    if(count($loginList) > 0){
        if(password_verify($password,$loginList['password'])){
            $_SESSION['login'] = $login;
            $_SESSION['id'] = $loginList['id'];
            $_SESSION['id_rank'] = $loginList['id_rank'];
            $_SESSION['auth'] = 1;
            echo json_encode(true);
        }
        else{
            echo json_encode(false);
        }
    }
    else{
        echo json_encode(false);
    }



?>