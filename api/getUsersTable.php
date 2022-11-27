<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id -> id de la table

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $table = $_GET['table_number'];

    //On récupère les utilisateurs assignés à la table
    $getTableByIdQuery = "SELECT * FROM users WHERE table_number=\"$table\"";
    $getTableByIdStatement = $login_bdd->prepare($getTableByIdQuery);
    $getTableByIdStatement->execute();
    $getTableById = $getTableByIdStatement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($getTableById);
?>