<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // user_id -> id de l'utilisateur
    // product_id -> id du produit à ajouter

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $product_id = $_POST['product_id'];
    $user_id = $_POST['user_id'];
    date_default_timezone_set('Europe/Paris');
    $time = date('h:i:s');

    $getPriceProduct = "SELECT price FROM products WHERE id=$product_id";
    $getPriceProductStatement = $login_bdd->prepare($getPriceProduct);
    $getPriceProductStatement->execute();
    $getPriceProduct = $getPriceProductStatement->fetchAll(PDO::FETCH_ASSOC);
    $price = $getPriceProduct[0]['price'];

    //On ajoute la consommation
    $addConsoQuery = "INSERT INTO consommations (user_id,product_id,time,newPrice) VALUES ($user_id,$product_id,\"$time\",\"$price\")";
    $addConsoStatement = $login_bdd->prepare($addConsoQuery);
    $addConsoStatement->execute();
    $addConso = $addConsoStatement->fetchAll(PDO::FETCH_ASSOC);
    $id_insert = $login_bdd->lastInsertId();

    $result = array("id" => $id_insert, "user_id" => $user_id, "product_id" => $product_id, "time" => $time, "newPrice" => $price);

    echo json_encode($result);
?>