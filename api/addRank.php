<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // rank -> nom du grade

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $rank = $_POST['rank'];

    //On vérifie si la catégorie existe déjà
    $rankListQuery = "SELECT * FROM rank WHERE name=\"$rank\"";
    $rankListStatement = $login_bdd->prepare($rankListQuery);
    $rankListStatement->execute();
    $rankList = $rankListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si la catégorie n'existe pas, on l'ajoute
    if (count($rankList) == 0) {
        $addRankQuery = "INSERT INTO rank (name) VALUES (\"$rank\")";
        $addRankStatement = $login_bdd->prepare($addRankQuery);
        $addRankStatement->execute();
        $result = true;
    }
    //Sinon on renvoie que la catégorie existe déjà
    else{
        $result = false;
    }   

    echo json_encode($result);
?>