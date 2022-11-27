<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // category -> nom de la catégorie

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $category = $_POST['category'];
    $icon = $_POST['icon'];

    //On vérifie si la catégorie existe déjà
    $categoriesListQuery = "SELECT * FROM products_categories WHERE name=\"$category\"";
    $categoriesListStatement = $login_bdd->prepare($categoriesListQuery);
    $categoriesListStatement->execute();
    $categoriesList = $categoriesListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si la catégorie n'existe pas, on l'ajoute
    if (count($categoriesList) == 0) {
        $addCategoryQuery = "INSERT INTO products_categories (name,icon) VALUES (\"$category\",\"$icon\")";
        $addCategoryStatement = $login_bdd->prepare($addCategoryQuery);
        $addCategoryStatement->execute();
        $result = true;
    }
    //Sinon on renvoie que la catégorie existe déjà
    else{
        $result = false;
    }   

    echo json_encode($result);
?>