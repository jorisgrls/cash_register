<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id_promotion -> id de la promotion

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $id_promotion = $_GET['id_promotion'];

    //On vérifie si l'id de la promotion existe
    $promotionsListQuery = "SELECT * FROM promotions WHERE id=$id_promotion";
    $promotionsListStatement = $login_bdd->prepare($promotionsListQuery);
    $promotionsListStatement->execute();
    $promotionsList = $promotionsListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si l'id de la promotion existe, on la supprime
    if (count($promotionsList) == 1) {
        $removePromotionQuery = "DELETE FROM promotions WHERE id=$id_promotion";
        $removePromotionStatement = $login_bdd->prepare($removePromotionQuery);
        $removePromotionStatement->execute();
        $result = array("result"=>true);
    }
    //Sinon on renvoie que l'id de la promotion n'existe pas (ne devrait jamais arriver mais au cas où)
    else{
        $result = array("result"=>"L'id de la promotion n'existe pas");
    }   

    echo json_encode($result);
?>