<?php
    header("Content-Type:application/json");
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include(__DIR__."/config.php"); 

    //On récupère les cartes disponibles
    $amountsGiftCardQuery = "SELECT * FROM amount_gift_card";
    $amountsGiftCardStatement = $login_bdd->prepare($amountsGiftCardQuery);
    $amountsGiftCardStatement->execute();
    $amountsGiftCard = $amountsGiftCardStatement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($amountsGiftCard);
?>