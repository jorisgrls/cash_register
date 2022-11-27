<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include(__DIR__."/config.php"); 

    
    //On récupère les tables
    $tableQuery = "SELECT * FROM tables";
    $tableStatement = $login_bdd->prepare($tableQuery);
    $tableStatement->execute();
    $tableList = $tableStatement->fetchAll(PDO::FETCH_ASSOC); 

    echo json_encode($tableList);
?>