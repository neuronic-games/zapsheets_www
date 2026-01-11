<?php
    /* echo phpinfo();
    exit; */
    $spreadsheetId = $_POST['id'];
    $sheetVersion = $_POST['sheet_version'];
    $sheetTitle = $_POST['sheet_title'];
    $appVersion = $_POST['app_version'];
    $serverCheck = $_POST['poll_time'];;
    $kioskLocation = $_POST['kiosk_location'];
    $device_sessionId = $_POST['session_uuId'];
    //$memoryUsage = round(memory_get_peak_usage()/(1024 * 100), 2) . ' MB';
    $kioskNum = $_POST['kiosk'];
    $memoryUsage = $_POST['memory_used'];
    if($memoryUsage == '') {
        $memoryUsage = round(memory_get_peak_usage()/(1024 * 100), 2) . ' MB';
    }
    if($kioskNum != '') {
        $data = array(
            'Poll On' => $serverCheck,
            'Sheet Id' => $spreadsheetId,
            'Sheet Version' => $sheetVersion,
            'Sheet Title' => $sheetTitle,
            'App Version' => $appVersion,
            'Device Session Id' => $device_sessionId,
            'Kiosk' => $kioskNum,
            'Kiosk Location' => $kioskLocation,
            'Memory Usage' => $memoryUsage
        );
    } else {
        $data = array(
            'Poll On' => $serverCheck,
            'Sheet Id' => $spreadsheetId,
            'Sheet Version' => $sheetVersion,
            'Sheet Title' => $sheetTitle,
            'App Version' => $appVersion,
            'Device Session Id' => $device_sessionId,
            'Kiosk Location' => $kioskLocation,
            'Memory Usage' => $memoryUsage
        );
    }
    //$data[] = $tempData; //$_POST['data'];
    $machineId = $device_sessionId; //getMachineId();
    $tempArray = [];
    // Get current stored version id to respective spreadsheet named folder;
    $jsonLogFile = "log/" . $spreadsheetId . '/' . $device_sessionId . ".json";

    // Check if the folder is not exists then create one and 
    // create the version.json file there with default value (0.0)
    if (!file_exists($jsonLogFile)) {
        mkdir("log/" . $spreadsheetId, 0777, true);
        /* array_push($tempArray, $data);
        $jsonData = json_encode($tempArray);
        file_put_contents($jsonLogFile, stripslashes($jsonData)); */
    } /* else { */
        // Append to log.json file
        /* $inp = file_get_contents($jsonLogFile);
        $tempArray = json_decode($inp); */
        array_push($tempArray, $data);
        $jsonData = json_encode($tempArray);
        file_put_contents($jsonLogFile, stripslashes($jsonData));
    /* } */
    echo 'log data saved';
    function getMachineId() {
        /* $fingerprint = [php_uname(), disk_total_space('.'), filectime('/'), phpversion()]; */
        $fingerprint = $device_sessionId;
        //return hash('sha256', json_encode($fingerprint));
        //return md5(json_encode($fingerprint));
        return json_encode($fingerprint);
    }
?>