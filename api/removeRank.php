<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id_rank -> id du grade

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $id_rank = $_GET['id_rank'];

    //On vérifie si le numéro de table existe
    $rankListQuery = "SELECT * FROM rank WHERE id=$id_rank";
    $rankStatement = $login_bdd->prepare($rankListQuery);
    $rankStatement->execute();
    $rankList = $rankStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si le numéro de table existe, on le supprime
    if (count($rankList) == 1) {
        $removeRankQuery = "DELETE FROM rank WHERE id=$id_rank";
        $removeRankStatement = $login_bdd->prepare($removeRankQuery);
        $removeRankStatement->execute();
        $result = array("result"=>true);
    }
    //Sinon on renvoie que le numéro de table n'existe pas (ne devrait jamais arriver mais au cas où)
    else{
        $result = array("result"=>"Le numéro de garde n'existe pas");
    }   

    echo json_encode($result);
?>