<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id_category -> id de la category

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $id_category = $_GET['id_category'];

    //On vérifie si la catégorie existe
    $categoriesListQuery = "SELECT * FROM products_categories WHERE id=\"$id_category\"";
    $categoriesListStatement = $login_bdd->prepare($categoriesListQuery);
    $categoriesListStatement->execute();
    $categoriesList = $categoriesListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si la catégorie existe, on la supprime
    if (count($categoriesList) == 1) {
        $removeCategoryQuery = "DELETE FROM products_categories WHERE id=\"$id_category\"";
        $removeCategoryStatement = $login_bdd->prepare($removeCategoryQuery);
        $removeCategoryStatement->execute();
        $result = array("result"=>true);
    }
    //Sinon on renvoie que la catégorie n'existe pas (ne devrait jamais arriver mais au cas où)
    else{
        $result = array("result"=>"La catégorie n'existe pas");
    }   

    echo json_encode($result);
?>