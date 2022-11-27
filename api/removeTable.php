<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id_table -> id de la table

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $id_table = $_GET['id_table'];

    //On vérifie si le numéro de table existe
    $tablesListQuery = "SELECT * FROM tables WHERE id=$id_table";
    $tablesListStatement = $login_bdd->prepare($tablesListQuery);
    $tablesListStatement->execute();
    $tablesList = $tablesListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si le numéro de table existe, on le supprime
    if (count($tablesList) == 1) {
        $removeTableQuery = "DELETE FROM tables WHERE id=$id_table";
        $removeTableStatement = $login_bdd->prepare($removeTableQuery);
        $removeTableStatement->execute();
        $result = array("result"=>true);
    }
    //Sinon on renvoie que le numéro de table n'existe pas (ne devrait jamais arriver mais au cas où)
    else{
        $result = array("result"=>"Le numéro de table n'existe pas");
    }   

    echo json_encode($result);
?>