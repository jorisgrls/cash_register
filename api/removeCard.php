<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id_card -> id de la carte

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $id_card = $_GET['id_card'];

    //On vérifie si la catégorie existe
    $cardsListQuery = "SELECT * FROM cards WHERE id=$id_card";
    $cardsListStatement = $login_bdd->prepare($cardsListQuery);
    $cardsListStatement->execute();
    $cardsList = $cardsListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si la carte existe, on la supprime
    if (count($cardsList) == 1) {
        $removeCardQuery = "DELETE FROM cards WHERE id=$id_card";
        $removeCardStatement = $login_bdd->prepare($removeCardQuery);
        $removeCardStatement->execute();
        $result = array("result"=>true);
    }
    //Sinon on renvoie que la carte n'existe pas (ne devrait jamais arriver mais au cas où)
    else{
        $result = array("result"=>"La carte n'existe pas");
    }   

    echo json_encode($result);
?>