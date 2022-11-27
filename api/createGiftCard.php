<?php
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // ENTREES :
    // amount -> montant de la carte cadeau

    include(__DIR__."/config.php"); 
    require('./fpdf/fpdf.php');


    //Récupération paramètres
    $amount = $_POST['amount'];
    $name="Carte cadeau";
    $code = uniqid('gift_');
    $type = 1;

    /*function generatePDF($amount,$code){
        $pdf = new FPDF();
        $pdf->AddPage();
        $pdf->SetFont('Arial','B',16);
        $pdf->Cell(40,10,'Carte cadeau');
        $pdf->Ln();
        $pdf->Cell(40,10,'Montant : '.$amount.'euros');
        $pdf->Ln();
        $pdf->Cell(40,10,'Code : '.$code);
        $pdf->Output();
        return $pdf;
    }*/

    //On vérifie si le code de promotion existe
    $promotionExistQuery = "SELECT * FROM promotions WHERE code=\"$amount\"";
    $promotionExistStatement = $login_bdd->prepare($promotionExistQuery);
    $promotionExistStatement->execute();
    $promotionExist = $promotionExistStatement->fetchAll(PDO::FETCH_ASSOC);
    
    //Si il existe pas, on l'ajoute
    if (count($promotionExist) == 0) {
        $addPromotionQuery = "INSERT INTO promotions (name,code,type,amount) VALUES (\"$name\",\"$code\",$type,\"$amount\")";
        $addPromotionStatement = $login_bdd->prepare($addPromotionQuery);
        $addPromotionStatement->execute();
        $result = array("name"=> $name, "code" => $code, "amount" => $amount);
        $result = generatePDF($amount,$code);
    }
    //Sinon on renvoie que le code existe déjà
    else{
        $result = false;
    }   

    echo json_encode($result);
?>