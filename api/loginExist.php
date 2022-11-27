<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // login -> identifiant du staff

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $login = $_POST['login'];

    //On vérifie si le login du staff existe
    $StaffListQuery = "SELECT * FROM staff WHERE login=\"$login\"";
    $StaffListStatement = $login_bdd->prepare($StaffListQuery);
    $StaffListStatement->execute();
    $StaffList = $StaffListStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si on trouve au moins un staff avec ce login
    if (count($StaffList) > 0) {
        $result = true;
    }
    //Sinon on renvoie que le login n'appartient à personne
    else{
        $result = false;
    }   

    echo json_encode($result);
?>