<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // name -> nom de la promotion
    // code -> code de la promotion
    // type -> 0 pour € ou 1 pour %
    // amount -> montant de la promotion

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $name_promotion = $_POST['name'];
    $code_promotion = $_POST['code'];
    $type_promotion = $_POST['type'];
    $amount_promotion = $_POST['amount'];

    //On vérifie si la promotion existe déjà
    $promotionsListQuery = "SELECT * FROM promotions WHERE code=\"$code_promotion\"";
    $promotionsListStatement = $login_bdd->prepare($promotionsListQuery);
    $promotionsListStatement->execute();
    $promotionsList = $promotionsListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si la promotion n'existe pas, on l'ajoute
    if (count($promotionsList) == 0) {
        $addPromotionQuery = "INSERT INTO promotions (name,code,type,amount) VALUES (\"$name_promotion\",\"$code_promotion\",\"$type_promotion\",\"$amount_promotion\")";
        $addPromotionStatement = $login_bdd->prepare($addPromotionQuery);
        $addPromotionStatement->execute();
        $result = array("result"=>true);
    }
    //Sinon on renvoie que la promotion existe déjà
    else{
        $result = array("result"=>"La promotion existe déjà");
    }   

    echo json_encode($result);
?>