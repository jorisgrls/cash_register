<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include(__DIR__."/config.php"); 

    //On récupère les catégories de produits disponibles
    $productsCategoriesListQuery = "SELECT * FROM products_categories";
    $productsCategoriesListStatement = $login_bdd->prepare($productsCategoriesListQuery);
    $productsCategoriesListStatement->execute();
    $productsCategoriesList = $productsCategoriesListStatement->fetchAll(PDO::FETCH_ASSOC);
 
    echo json_encode($productsCategoriesList);
?>