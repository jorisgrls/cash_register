<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // name -> nom du produit
    // picture -> url de l'image du produit
    // price -> prix du produit
    // id_category -> id de la catégorie du produit

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $product_name = $_POST['name'];
    $product_price = $_POST['price'];
    $product_category = $_POST['id_category'];

    //On vérifie si le produit existe déjà
    $productsListQuery = "SELECT * FROM products WHERE name=\"$product_name\"";
    $productsListStatement = $login_bdd->prepare($productsListQuery);
    $productsListStatement->execute();
    $productsList = $productsListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si le produit n'existe pas on l'ajoute
    if (count($productsList) == 0) {
        $addProductQuery = "INSERT INTO products (name,price,id_category) VALUES (\"$product_name\",$product_price,$product_category)";
        $addProductStatement = $login_bdd->prepare($addProductQuery);
        $addProductStatement->execute();
        $result = array("result"=>true);
    }
    //Sinon on renvoie que le produit existe déjà
    else{
        $result = array("result"=>"Le produit existe déjà");
    }   

    echo json_encode($result);
?>