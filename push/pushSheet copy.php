<?php
    // Getting spreadsheet Id from script app
    $spreadsheetId = $_POST['id'];
    $sheet = $_POST['sheetname'];

    if($sheet == '') {

        // Get current stored version id to respective spreadsheet named folder;
        $jsonFile = "../sheets/" . $spreadsheetId . "/version.json";

        // Check if the folder is not exists then create one and 
        // create the version.json file there with default value (0.0)
        if (!file_exists($jsonFile)) {
            mkdir("../sheets/" . $spreadsheetId, 0777, true);
        /*  $data = array('version' => '0.0');
            $json_object = json_encode($data);
            file_put_contents(("../sheets/" . $spreadsheetId . '/version.json'), $json_object); */
        }

        // Call python to get the current spreadsheet version
        // And update version.json file place on the server under the 
        // spreadsheet id folder name

        // For local testing
        $sheetName = 'Settings';
        /* $sheetName = $sheet; */
        $python_file_name = "greadPush.py "; 
        $python_execution = "python ".$python_file_name .$spreadsheetId .'sheetname' .$sheetName; 
        $versionNum = shell_exec($python_execution);
        $versionNum = str_replace("\r\n","",$versionNum);
        //echo $versionNum;

        // increase the value to 1
        //$updatedVers = ((int)$versionNum + 1);

        // For Server
        /* $sheet = 'Settings';
        $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python gread.py ' .$spreadsheetId .'sheetname' .$sheet); 
        $versionNum = shell_exec($py_command);
        $versionNum = str_replace("\r\n","",$versionNum);
        //echo $versionNum; */



        /* $json_object = file_get_contents($jsonFile);
        $data = json_decode($json_object, true);
        $currentVersion = $data['version'];*/

        // Now update version so that the running app looks for updated version
        // And reload the contents from spreadsheet
        //$jsonVersionNum = ''. ((float) $currentVersion  + 0.1) . '';

        // New version generated and saved
        $jsonVersionNum = ''. ((int) $versionNum ) . '';
        /* $jsonVersionNum = ''. ((int) $updatedVers ) . ''; */
        $data = array('version' => ($jsonVersionNum));
        $json_object = json_encode($data);
        $output = file_put_contents($jsonFile, $json_object); 


        
        ///////////////////////////////////////////////////////////////////////
        // Use for later use
        // Now call the spreadsheet to get the latest count
        // For local
        /* $sheetName = 'Directory'; //$_GET['sheet_name'];
        $python_file_name = "gread.py "; 
        $python_execution = "python ".$python_file_name .$spreadsheetId .'sheetname' .$sheetName; 
        $output = shell_exec($python_execution);  */
        //$p = is_array($output);
        /*
        <zapsheets>
            <status>success</status>
            <message></message>
            <directory_count>34</directory_count>
            <event_count>100</event_count>
            <sheet_version>2.1</sheet_version>
        </zapsheets>
        */

        /* $directoty = '';
        //$string = str_replace('�', '', $output);
        echo($output); */
        // For Server
        /* $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python gread.py ' .$sheetId .'sheetname' .$sheet); 
        $com_output = shell_exec($py_command); 
        echo $com_output; */
        ///////////////////////////////////////////////////////////////////////

        // Return Message to console
        echo $jsonVersionNum;
    } else if($sheet == 'Settings') {
        $jsonFile = "../sheets/" . $spreadsheetId . "/settings.json";

        // For Local
        $sheetName = $sheet;
        $python_file_name = "gread.py "; 
        $python_execution = "python ".$python_file_name .$spreadsheetId .'sheetname' .$sheetName; 
        $settingsData = shell_exec($python_execution);


        /* $mResponseSC = str_replace("�", "", $settingsData);
        $mResponseSCS = str_replace(': "', "", $mResponseSC);
        $mResponseSCSE = str_replace('",', "',", $mResponseSCS);
        $mResponseDQ = str_replace('"', "dqo", $mResponseSCSE);
        $mResponseDDQ = str_replace(': dqo', ": 'dqo", $mResponseDQ);
        $mResponseDDQE = str_replace('dqo,', "dqo',", $mResponseDDQ);
        $regex = "('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))"; 
        $replaceResponseRegX = str_replace($regex, '"', $mResponseDDQE);
        $temp = str_replace("{'", '{"', $replaceResponseRegX);
        $temp1 = str_replace(": '", ': "', $temp);
        $temp2 = str_replace(", '", ', "', $temp1);
        $temp3 = str_replace("Ō'", 'O', $temp2);
        $temp4 = str_replace("ō'", 'o', $temp3); 
        $temp5 = str_replace("':", '":', $temp4);
        $temp6 = str_replace("',", '",', $temp5); 
        $temp7 = str_replace("'},", '"},', $temp6); 
        $temp8 = str_replace("'}]", '"}]', $temp7);  */

        // For Server
        /* $sheetName = $sheet;
        $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python gread.py ' .$spreadsheetId .'sheetname' .$sheet); 
        $versionNum = shell_exec($py_command);
        $versionNum = str_replace("\r\n","",$versionNum);
        //echo $versionNum; */
       
        //$json_object = json_encode($settingsData);
        $output = file_put_contents($jsonFile, $settingsData); 
        echo 'Publishing settings data to server';
    } else if ($sheet == 'Directory') {
        $jsonFile = "../sheets/" . $spreadsheetId . "/directory.json";

        // For Local
        /* $sheetName = $sheet;
        $python_file_name = "gread.py "; 
        $python_execution = "python ".$python_file_name .$spreadsheetId .'sheetname' .$sheetName; 
        $directoryData = shell_exec($python_execution); */

        // For Server
        /* $sheetName = $sheet;
        $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python gread.py ' .$spreadsheetId .'sheetname' .$sheet); 
        $versionNum = shell_exec($py_command);
        $versionNum = str_replace("\r\n","",$versionNum);
        //echo $versionNum; */


        $sheetName = $sheet;
        /* $python_file_name = "gread.py "; 
        $python_execution = "python ".$python_file_name .$spreadsheetId .'sheetname' .$sheetName;  */
        $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python gread.py ' .$spreadsheetId .'sheetname' .$sheetName); 
        $directoryData = shell_exec($py_command);

        /* $mResponseSC = str_replace("�", "", $directoryData);
        $mResponseSCS = str_replace(': "', "", $mResponseSC);
        $mResponseSCSE = str_replace('",', "',", $mResponseSCS);
        $mResponseDQ = str_replace('"', "dqo", $mResponseSCSE);
        $mResponseDDQ = str_replace(': dqo', ": 'dqo", $mResponseDQ);
        $mResponseDDQE = str_replace('dqo,', "dqo',", $mResponseDDQ);
        $regex = "('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))"; 
        $replaceResponseRegX = str_replace($regex, '"', $mResponseDDQE);
        $temp = str_replace("{'", '{"', $replaceResponseRegX);
        $temp1 = str_replace(": '", ': "', $temp);
        $temp2 = str_replace(", '", ', "', $temp1);
        $temp3 = str_replace("Ō'", 'O', $temp2);
        $temp4 = str_replace("ō'", 'o', $temp3); 
        $temp5 = str_replace("':", '":', $temp4);
        $temp6 = str_replace("',", '",', $temp5); 
        $temp7 = str_replace("'},", '"},', $temp6); 
        $temp8 = str_replace("'}]", '"}]', $temp7);  */
        
        


        /* $mResponseSC = directoryData.replace(/�/g, "");
        $mResponseSCS = mResponseSC.replace(/: "/g, ": '");
        $mResponseSCSE = mResponseSCS.replace(/",/g, "',") 
        var mResponseDQ = mResponseSCSE.replace(/"/g, "dqo") 
        var mResponseDDQ = mResponseDQ.replace(/: dqo/g, ": 'dqo") 
        var mResponseDDQE = mResponseDDQ.replace(/dqo,/g, "dqo',") 
        const regex = /('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))/g; 
        let replaceResponseRegX = mResponseDDQE.replace(regex, '"').replace(/{'/g, '{"').replace(/: '/g, ': "').replace(/, '/g, ', "').replace(/Ō'/g, 'O').replace(/ō'/g, 'o'); 
        let replaceResponse = replaceResponseRegX.replace(/\\'/g, "'");  */
       
        //$json_object = json_encode($temp8);
        $output = file_put_contents($jsonFile, $directoryData); 
        echo 'Publishing directory data to server';
    } else if ($sheet == 'Events') {
        $jsonFile = "../sheets/" . $spreadsheetId . "/events.json";

        // For Local
        /* $sheetName = $sheet;
        $python_file_name = "gread.py "; 
        $python_execution = "python ".$python_file_name .$spreadsheetId .'sheetname' .$sheetName; 
        $eventsData = shell_exec($python_execution); */


        /* $mResponseSC = str_replace("�", "", $eventsData);
        $mResponseSCS = str_replace(': "', "", $mResponseSC);
        $mResponseSCSE = str_replace('",', "',", $mResponseSCS);
        $mResponseDQ = str_replace('"', "dqo", $mResponseSCSE);
        $mResponseDDQ = str_replace(': dqo', ": 'dqo", $mResponseDQ);
        $mResponseDDQE = str_replace('dqo,', "dqo',", $mResponseDDQ);
        $regex = "('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))"; 
        $replaceResponseRegX = str_replace($regex, '"', $mResponseDDQE);
        $temp = str_replace("{'", '{"', $replaceResponseRegX);
        $temp1 = str_replace(": '", ': "', $temp);
        $temp2 = str_replace(", '", ', "', $temp1);
        $temp3 = str_replace("Ō'", 'O', $temp2);
        $temp4 = str_replace("ō'", 'o', $temp3); 
        $temp5 = str_replace("':", '":', $temp4);
        $temp6 = str_replace("',", '",', $temp5); 
        $temp7 = str_replace("'},", '"},', $temp6); 
        $temp8 = str_replace("'}]", '"}]', $temp7); 
        $temp9 = str_replace("Description'", 'Description":"', $temp8);  */
        

        // For Server
        /* $sheetName = $sheet;
        $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python gread.py ' .$spreadsheetId .'sheetname' .$sheet); 
        $versionNum = shell_exec($py_command);
        $versionNum = str_replace("\r\n","",$versionNum);
        //echo $versionNum; */

        $sheetName = $sheet;
        /* $python_file_name = "gread.py "; 
        $python_execution = "python ".$python_file_name .$spreadsheetId .'sheetname' .$sheetName;  */
        $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python gread.py ' .$spreadsheetId .'sheetname' .$sheetName); 
        $eventsData = shell_exec($py_command);


       
        //$json_object = json_encode($settingsData);
        $output = file_put_contents($jsonFile, $eventsData); 
        echo 'Publishing events data to server';
    } else if ($sheet == 'Kiosks') {
        $jsonFile = "../sheets/" . $spreadsheetId . "/kiosks.json";

        // For Local
       /*  $sheetName = $sheet;
        $python_file_name = "gread.py "; 
        $python_execution = "python ".$python_file_name .$spreadsheetId .'sheetname' .$sheetName; 
        $kiosksData = shell_exec($python_execution); */

        /* $mResponseSC = str_replace("�", "", $kiosksData);
        $mResponseSCS = str_replace(': "', "", $mResponseSC);
        $mResponseSCSE = str_replace('",', "',", $mResponseSCS);
        $mResponseDQ = str_replace('"', "dqo", $mResponseSCSE);
        $mResponseDDQ = str_replace(': dqo', ": 'dqo", $mResponseDQ);
        $mResponseDDQE = str_replace('dqo,', "dqo',", $mResponseDDQ);
        $regex = "('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))"; 
        $replaceResponseRegX = str_replace($regex, '"', $mResponseDDQE);
        $temp = str_replace("{'", '{"', $replaceResponseRegX);
        $temp1 = str_replace(": '", ': "', $temp);
        $temp2 = str_replace(", '", ', "', $temp1);
        $temp3 = str_replace("Ō'", 'O', $temp2);
        $temp4 = str_replace("ō'", 'o', $temp3); 
        $temp5 = str_replace("':", '":', $temp4);
        $temp6 = str_replace("',", '",', $temp5); 
        $temp7 = str_replace("'},", '"},', $temp6); 
        $temp8 = str_replace("'}]", '"}]', $temp7);  */

        // For Server
        /* $sheetName = $sheet;
        $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python gread.py ' .$spreadsheetId .'sheetname' .$sheet); 
        $versionNum = shell_exec($py_command);
        $versionNum = str_replace("\r\n","",$versionNum);
        //echo $versionNum; */

        $sheetName = $sheet;
        /* $python_file_name = "gread.py "; 
        $python_execution = "python ".$python_file_name .$spreadsheetId .'sheetname' .$sheetName;  */
        $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python gread.py ' .$spreadsheetId .'sheetname' .$sheetName); 
        $kiosksData = shell_exec($py_command);


       
        //$json_object = json_encode($settingsData);
        $output = file_put_contents($jsonFile, $kiosksData); 
        echo 'Publishing kiosk data to server';
    }
?>