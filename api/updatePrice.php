<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // ENTREES :
    // id_conso -> id de la ligne de la conso
    // price -> le nouveau prix

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $id_conso = $_POST['id'];
    $price = $_POST['price'];

    $updatePriceQuery = "UPDATE consommations SET newPrice=$price WHERE id=$id_conso";
    $updatePriceStatement = $login_bdd->prepare($updatePriceQuery);
    $updatePriceStatement->execute();
    $updatePrice = $updatePriceStatement->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($updatePrice);
?>