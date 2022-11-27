<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include(__DIR__."/config.php"); 

    //On récupère les produits de la catégorie demandée
    $productsListQuery = "SELECT * FROM products";
    $productsListStatement = $login_bdd->prepare($productsListQuery);
    $productsListStatement->execute();
    $productsList = $productsListStatement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($productsList);
?>