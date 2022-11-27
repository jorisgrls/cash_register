<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id_category -> catégorie demandée des produits

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $products_id_category = $_GET['id_category'];

    //On récupère les produits de la catégorie demandée
    $productsByCategoriesListQuery = "SELECT * FROM products WHERE id_category=$products_id_category";
    $productsByCategoriesListStatement = $login_bdd->prepare($productsByCategoriesListQuery);
    $productsByCategoriesListStatement->execute();
    $productsByCategoriesList = $productsByCategoriesListStatement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($productsByCategoriesList);
?>