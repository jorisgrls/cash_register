<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id_payment -> id du moyen de paiement

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $id_payment = $_GET['id_payment'];

    //On vérifie si l'id du moyen de paiement existe
    $paymentsListQuery = "SELECT * FROM payments WHERE id=$id_payment";
    $paymentsListStatement = $login_bdd->prepare($paymentsListQuery);
    $paymentsListStatement->execute();
    $paymentsList = $paymentsListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si l'id du moyen de paiement existe, on le supprime
    if (count($paymentsList) == 1) {
        $removePaymentQuery = "DELETE FROM payments WHERE id=$id_payment";
        $removePaymentStatement = $login_bdd->prepare($removePaymentQuery);
        $removePaymentStatement->execute();
        $result = true;
    }
    //Sinon on renvoie que l'id du moyen de paiement n'existe pas (ne devrait jamais arriver mais au cas où)
    else{
        $result = false;
    }   

    echo json_encode($result);
?>