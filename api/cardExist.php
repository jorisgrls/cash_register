<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // card -> identifiant du staff

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $number_card = $_POST['card'];

    //On vérifie si la carte existe
    $CardsListQuery = "SELECT * FROM cards WHERE number=\"$number_card\"";
    $CardsListStatement = $login_bdd->prepare($CardsListQuery);
    $CardsListStatement->execute();
    $CardsList = $CardsListStatement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($CardsList);
?>