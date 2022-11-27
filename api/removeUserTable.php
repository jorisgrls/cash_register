<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // user -> id de l'user
    // table -> id de la table

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $id_table = $_POST['table'];
    $id_user = $_POST['user'];

    // On rajoute une personne sur la table
    $updateCountTableQuery = "UPDATE tables SET count = count-1 WHERE number = $id_table ";
    $updateCountTableStatement = $login_bdd->prepare($updateCountTableQuery);
    $updateCountTableStatement->execute();
    $updateCountTable = $updateCountTableStatement->fetchAll(PDO::FETCH_ASSOC);
    
    // On met à jour la table de l'utilisateur
    $updateTableUserQuery = "UPDATE users SET table_number = 0 WHERE id = $id_user ";
    $updateTableUserStatement = $login_bdd->prepare($updateTableUserQuery);
    $updateTableUserStatement->execute();
    $updateTableUser = $updateTableUserStatement->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode($updateTableUser);
?>