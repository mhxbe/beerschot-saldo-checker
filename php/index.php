<?php 
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://beerschot.tickethour.be/topup.html",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "action=queryBalance&send=Balance&cardNo=".htmlspecialchars($_GET["cardNo"]),
        CURLOPT_HTTPHEADER => array(
            "Cache-Control: no-cache",
            "Content-Type: application/x-www-form-urlencoded;charset=UTF-8",
            "Cookie: QueueITAccepted=1234678-1234-1234-1234-123456789012#12345567;"
        ),
    ));
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if (!$err) {
        $html = htmlentities($response, null, "utf-8");
        $placeholder = "Cashless Balance: ";
        $placeholderLength = strlen($placeholder);
        $strIndex = strrpos($html, $placeholder);
        $fullCashString = substr($html, $strIndex + $placeholderLength, 15);
        $cashArray = explode("EUR", $fullCashString);
        $cash = str_replace("&nbsp;", "", array_values($cashArray)[0]);
        if(is_numeric($cash)) {
            header("Content-Type: application/json");
            http_response_code(200);
            echo json_encode(number_format($cash, 2));
        } else {
            http_response_code(400);
            echo 'INVALID_CARD_NUMBER';
        }
    }
?>
