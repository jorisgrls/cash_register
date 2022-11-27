<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include(__DIR__."/config.php"); 

    //On récupère les moyens de paiements disponibles
    $paymentsListQuery = "SELECT * FROM payments";
    $paymentsListStatement = $login_bdd->prepare($paymentsListQuery);
    $paymentsListStatement->execute();
    $paymentsList = $paymentsListStatement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($paymentsList);
?>