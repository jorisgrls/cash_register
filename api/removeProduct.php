<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id -> id du produit

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $product_id = $_GET['id'];

    //On vérifie si le produit existe déjà
    $productsListQuery = "SELECT * FROM products WHERE id=$product_id";
    $productsListStatement = $login_bdd->prepare($productsListQuery);
    $productsListStatement->execute();
    $productsList = $productsListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si le produit existe on l'ajoute
    if (count($productsList) == 1) {
        $removeProductQuery = "DELETE FROM products WHERE id=$product_id";
        $removeProductStatement = $login_bdd->prepare($removeProductQuery);
        $removeProductStatement->execute();
        $result = array("result"=>true);
    }
    //Sinon on renvoie que le produit n'existe pas (ne devrait jamais arriver mais au cas où)
    else{
        $result = array("result"=>"Le produit n'existe pas");
    }   

    echo json_encode($result);
?>