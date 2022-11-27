<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id -> id de la consommation à enlever

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $conso_id = $_GET['id'];

    //On ajoute la consommation
    $removeConsoQuery = "DELETE FROM consommations WHERE id=$conso_id";
    $removeConsoStatement = $login_bdd->prepare($removeConsoQuery);
    $removeConsoStatement->execute();
    $removeConso = $removeConsoStatement->fetchAll(PDO::FETCH_ASSOC);

    $result = true;
    
    echo json_encode($result);
?>