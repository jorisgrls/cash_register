<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id -> id du staff

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $id_staff = $_GET['id'];

    //On vérifie si le code de promotion existe
    $staffListQuery = "SELECT * FROM staff WHERE id=$id_staff";
    $staffListStatement = $login_bdd->prepare($staffListQuery);
    $staffListStatement->execute();
    $staffList = $staffListStatement->fetch(PDO::FETCH_ASSOC);
    
    if ($staffList['id_rank'] == 10) {
        $result = true;
    }
    else{
        $result=false;
    }

    echo json_encode($result);
?>