<?php
    require "./dotEnv.php";

    // Getting spreadsheet Id from script app
    //header('Content-Type: text/html; charset=ISO-8859-1');

    $python_file_name = "getLocalMachineInfo.py "; 
    $python_execution = $_ENV['PYTHON'] . ' ' . $python_file_name; 
    $machinInfo = shell_exec($python_execution);
    echo $machinInfo;
?>
