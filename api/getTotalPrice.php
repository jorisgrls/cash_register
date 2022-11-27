<?php
    header("Content-Type:application/json");
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include(__DIR__."/config.php"); 

    $id_user = $_POST['id_user'];

    //On récupère les cartes disponibles
    $totalAmountQuery = "SELECT totalPrice FROM users WHERE id_user=\"$id_user\"";
    $totalAmountStatement = $login_bdd->prepare($totalAmountQuery);
    $totalAmountStatement->execute();
    $totalAmount = $totalAmountStatement->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($totalAmount);
?>