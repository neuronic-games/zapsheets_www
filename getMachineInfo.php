<?php
    // Getting spreadsheet Id from script app
    //header('Content-Type: text/html; charset=ISO-8859-1');
    // For local testing
    $python_file_name = "getLocalMachineInfo.py "; 
    $python_execution = "python ".$python_file_name;
    $machinInfo = shell_exec($python_execution);
    echo $machinInfo;

    // For Server
    /* 
    $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python getLocalMachineInfo.py ' .$spreadsheetId .'sheetname' .$sheetName .'dateString' .$dateStr); 
    $machinInfo = shell_exec($py_command); */
?>