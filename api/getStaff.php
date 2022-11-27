<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include(__DIR__."/config.php"); 

    //On récupère les moyens de paiements disponibles
    $staffListQuery = "SELECT * FROM staff";
    $staffListStatement = $login_bdd->prepare($staffListQuery);
    $staffListStatement->execute();
    $staffList = $staffListStatement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($staffList);
?>