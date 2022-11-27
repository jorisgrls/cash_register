<?php
    define('USER',"root");
    define('PASSWORD',"root");
    define('SERVER',"localhost");
    define('BASE',"cash-register");

    $dsn="mysql:dbname=".BASE.";host=".SERVER;
    
    try{
        $login_bdd = new PDO($dsn,USER,PASSWORD);
    }
    catch(PDOException $e){
        printf("Failed login : %s\n", $e->getMessage());
    exit();
    }
?>