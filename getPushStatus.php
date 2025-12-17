<?php
    $spreadsheetId = $_POST['id'];
    /* if (!file_exists($jsonFile)) {
        mkdir($jsonFile, 0777, true);
    } */
   
    $target = $_POST['target'];
	  $rootFolder = "../sheets/" . $sheet_Id . "/" . $target;
    
    $jsonFile = $rootFolder . '/pushstatus.json';
    if(!file_exists($jsonFile)) {
        echo 'false' ;  
    } else {
        $json_object = file_get_contents($jsonFile);
        $data = json_decode($json_object, true);
        $output = $data['push'];
        echo $output;
    }  
?>