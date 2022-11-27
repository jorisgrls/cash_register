<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // id_staff -> id du staff

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $id_staff = $_GET['id_staff'];

    //On vérifie si l'id du staff existe
    $staffListQuery = "SELECT * FROM staff WHERE id=$id_staff";
    $staffListStatement = $login_bdd->prepare($staffListQuery);
    $staffListStatement->execute();
    $staffList = $staffListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si l'id du staff existe, on le supprime
    if (count($staffList) == 1) {
        $removeStaffQuery = "DELETE FROM staff WHERE id=$id_staff";
        $removeStaffStatement = $login_bdd->prepare($removeStaffQuery);
        $removeStaffStatement->execute();
        $result = true;
    }
    //Sinon on renvoie que l'id du staff n'existe pas (ne devrait jamais arriver mais au cas où)
    else{
        $result = false;
    }   

    echo json_encode($result);
?>