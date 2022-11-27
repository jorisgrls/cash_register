<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    // ENTREES :
    // last_name -> nom de la personne
    // first_name -> prénom de la personne
    // picture -> url de la photo de la personne
    // birthday -> date de naissance de la personne (20000525 pour 25/05/2000)
    // card -> n° carte de la personne

    include(__DIR__."/config.php"); 

    //Récupération paramètres
    $last_name = $_POST['last_name'];
    $first_name = $_POST['first_name'];
    $picture_url = $_POST['picture'];
    $birthday = $_POST['birthday'];
    $card_number = $_POST['card'];
    $table = 0; //table de la personne (par default : 0)
    $total_price = 0; //total du prix de la commande (par default : 0)


    //On vérifie si l'utilisateur a déjà été ajouté
    $usersListQuery = "SELECT * FROM users WHERE card_number=\"$card_number\"";
    $usersListStatement = $login_bdd->prepare($usersListQuery);
    $usersListStatement->execute();
    $usersList = $usersListStatement->fetchAll(PDO::FETCH_ASSOC);

    //Si l'utilisateur n'a pas été ajouté, on l'ajoute
    if (count($usersList) == 0) {

        date_default_timezone_set('Europe/Paris');
        $starting_date = date("Y-m-d");
        $starting_time = date("H:i:s");

        $addUserQuery = "INSERT INTO users (last_name,first_name,picture_url,birthday,card_number,starting_date,starting_time,table_number,totalPrice) VALUES (\"$last_name\",\"$first_name\",\"$picture_url\",\"$birthday\",\"$card_number\",\"{$starting_date}\",\"{$starting_time}\",$table,$total_price)";
        $addUserStatement = $login_bdd->prepare($addUserQuery);
        $addUserStatement->execute();
        
        $result = array("result"=>true);
    }
    //Sinon on renvoie que l'utilisateur a déjà été ajouté
    else{
        $result = array("result"=>false); //ne devrait pas arriver, le premier test est inutile
    }   

    //Quand l'utilisateur est ajouté on passe sa carte à used=1
    $usedCardQuery = "UPDATE cards SET used=1 WHERE number=\"$card_number\"";
    $usedCardStatement = $login_bdd->prepare($usedCardQuery);
    $usedCardStatement->execute();
    $usedCard = $usedCardStatement->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode($result);
?>