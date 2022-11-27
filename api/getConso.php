<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id -> id de l'utilisateur

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $user_id = $_GET['id'];

    //On récupère les consommations de l'utilisateur
    $consommationsListQuery = "SELECT c.*, p.name AS product_name, p.price AS product_price, p.id_category AS product_category, pc.icon AS icon_category FROM consommations c INNER JOIN products p ON c.product_id = p.id INNER JOIN products_categories pc ON p.id_category = pc.id WHERE c.user_id=$user_id";
    $consommationsListStatement = $login_bdd->prepare($consommationsListQuery);
    $consommationsListStatement->execute();
    $consommationsList = $consommationsListStatement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($consommationsList);
?>
