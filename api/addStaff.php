<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // last_name -> nom de la personne
    // first_name -> prénom de la personne
    // mail -> mail de la personne
    // phone -> téléphone de la personne
    // birthday -> date de naissance de la personne (20000525 pour 25/05/2000)
    // login -> identifiant de la personne
    // password -> mot de passe de la personne
    // id_rank -> téléphone de la personne

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $last_name = $_POST['last_name'];
    $first_name = $_POST['first_name'];
    $mail = $_POST['mail'];
    $phone = $_POST['phone'];
    $birthday = $_POST['birthday'];
    $login = $_POST['login'];
    $password = $_POST['password'];
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $id_rank = $_POST['id_rank']; //doit être dans la table rank (pas géré ici car on ne pourra pasz chjoisir un rank qui n'existe pas)


    //On vérifie si la personne a déjà un compte
    $staffListQuery = "SELECT * FROM staff WHERE mail=\"$mail\"";
    $staffListStatement = $login_bdd->prepare($staffListQuery);
    $staffListStatement->execute();
    $staffList = $staffListStatement->fetchAll(PDO::FETCH_ASSOC);

    //Si la personne n'a pas de compte, on l'ajoute
    if (count($staffList) == 0) {
        $addStaffQuery = "INSERT INTO staff (last_name,first_name,mail,phone,birthday,login,password,id_rank) VALUES (\"$last_name\",\"$first_name\",\"$mail\",\"$phone\",\"$birthday\",\"$login\",\"$password_hash\",$id_rank)";
        $addStaffStatement = $login_bdd->prepare($addStaffQuery);
        $addStaffStatement->execute();
        $result = true;
    }
    //Sinon on renvoie que le compte existe déjà (ne devrait pas arriver vu que c'est un admin qui ajoute les comptes)
    else{
        $result = false;
    }   

    echo json_encode($result);
?>