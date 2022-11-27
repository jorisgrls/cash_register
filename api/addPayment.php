<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // payment -> nom du paiement

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $name_payment = $_POST['payment'];

    //On vérifie si le moyen de paiement existe déjà
    $paymentsListQuery = "SELECT * FROM payments WHERE name=\"$name_payment\"";
    $paymentsListStatement = $login_bdd->prepare($paymentsListQuery);
    $paymentsListStatement->execute();
    $paymentsList = $paymentsListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si le moyen de paiement n'existe pas, on l'ajoute
    if (count($paymentsList) == 0) {
        $addPaymentQuery = "INSERT INTO payments (name) VALUES (\"$name_payment\")";
        $addPaymentStatement = $login_bdd->prepare($addPaymentQuery);
        $addPaymentStatement->execute();
        $last_id = $login_bdd->lastInsertId();
        $result = array("id"=>$last_id,"name"=>$name_payment);
    }
    //Sinon on renvoie que le moyen de paiement existe déjà
    else{
        $result = false;
    }   

    echo json_encode($result);
?>