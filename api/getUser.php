<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // card -> n° carte de la personne

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $card_number = $_GET['card'];

    //On vérifie si l'utilisateur a déjà été ajouté
    $usersListQuery = "SELECT * FROM users WHERE card_number=\"$card_number\"";
    $usersListStatement = $login_bdd->prepare($usersListQuery);
    $usersListStatement->execute();
    $usersList = $usersListStatement->fetch(PDO::FETCH_ASSOC);

    echo json_encode($usersList);
?>