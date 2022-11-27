<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // ENTREES :
    // amount -> montant à ajouter
    // user_id -> id de l'utilisateur
    // type -> ajout ou suppression

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $amount = $_POST['amount'];
    $id_user = $_POST['id_user'];
    $type = $_POST['type'];

    if($type == "add"){
        $updateTotalAmountQuery = "UPDATE users SET totalPrice=totalPrice+$amount WHERE id=$id_user";
    }
    else if($type == "remove"){
        $updateTotalAmountQuery = "UPDATE users SET totalPrice=totalPrice-$amount WHERE id=$id_user";
    }
    
    $updateTotalAmountStatement = $login_bdd->prepare($updateTotalAmountQuery);
    $updateTotalAmountStatement->execute();
    $updateTotalAmount = $updateTotalAmountStatement->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($updateTotalAmount);
?>