<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // code -> code de la promotion

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $promotion_code = $_POST['code'];

    //On vérifie si le code de promotion existe
    $promotionsListQuery = "SELECT * FROM promotions WHERE code=\"$promotion_code\"";
    $promotionsListStatement = $login_bdd->prepare($promotionsListQuery);
    $promotionsListStatement->execute();
    $promotionsList = $promotionsListStatement->fetchAll(PDO::FETCH_ASSOC);
 

    echo json_encode($promotionsList);
?>