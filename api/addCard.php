<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // ENTREES :
    // card_number -> nom de la catégorie

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $card_number = $_POST['card_number'];

    //On vérifie si le numéro de carte existe déjà
    $cardsListQuery = "SELECT * FROM cards WHERE number=\"$card_number\"";
    $cardsListStatement = $login_bdd->prepare($cardsListQuery);
    $cardsListStatement->execute();
    $cardsList = $cardsListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si le numéro de carte n'existe pas, on l'ajoute
    if (count($cardsList) == 0) {
        $addCardQuery = "INSERT INTO cards (number,used) VALUES (\"$card_number\",0)";
        $addCardStatement = $login_bdd->prepare($addCardQuery);
        $addCardStatement->execute();
        $last_id = $login_bdd->lastInsertId();
        $result = array("id"=>$last_id,"number"=>$card_number,"used"=>0);
    }
    //Sinon on renvoie que le numéro de carte existe déjà
    else{
        $result = false;
    }   

    echo json_encode($result);
?>