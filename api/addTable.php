<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // number_table -> numéro de la table

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $number_table = $_POST['number_table'];

    //On vérifie si le numéro de table existe déjà
    $TablesListQuery = "SELECT * FROM tables WHERE number=$number_table";
    $TablesListStatement = $login_bdd->prepare($TablesListQuery);
    $TablesListStatement->execute();
    $TablesList = $TablesListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si le numéro de table n'existe pas, on l'ajoute
    if (count($TablesList) == 0) {
        $addTableQuery = "INSERT INTO tables (number,used,count) VALUES ($number_table,0,0)";
        $addTableStatement = $login_bdd->prepare($addTableQuery);
        $addTableStatement->execute();
        $result = true;
    }
    //Sinon on renvoie que le numéro de table existe déjà
    else{
        $result = false;
    }   

    echo json_encode($result);
?>