<html>
<head>
  <meta charset="UTF-8" />
  
  <meta http-equiv='cache-control' content='no-cache'>
  <meta http-equiv='expires' content='0'>
  <meta http-equiv='pragma' content='no-cache'>

  <!-- <meta http-equiv="EXPIRES" content="Sat, 27 July 2024 11:00:00 GMT" /> -->

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="apple-mobile-web-app-capable" content="yes" />

  <!--title>ZapSheet - Game Library</title-->
  <title>Map - Log</title>
  <link rel="stylesheet" href="../css/style.css?version=" + Math.random() />
  <link rel="icon" type="image/x-icon" href="../zap_icons_map.png?version=1.8" />
  <link rel="apple-touch-icon" href="../zap_icons_map.png?version=1.7" />
</head>
<script src="../js-package/md5.js?version=" + Math.ramdom() ></script>
<script src="../js-package/device-uuid.min.js?version=" + Math.ramdom() ></script>
<script>
    /* function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
        }
        return vars;
    }
    window.addEventListener('load', (event) => {
        var sheet_Id = (getUrlVars()["id"]) ? getUrlVars()["id"].split('/')[0] : '';
        if(sheet_Id != '') {
            var deviceUID = md5(new DeviceUUID().get()).toString();
            window.location = sheet_Id + '/' + deviceUID + '.json'
        } 
    }) */
    </script>
<body>
    
    <?php
        // Read query string param
        /* $var_example_php = "<script>document.write(deviceUID);</script>";
        echo $var_example_php;
        $sheetId = '';
        if ((isset($_REQUEST['id'])) && (!empty($_REQUEST['id'])))
        {
            $sheetId = $_REQUEST['id'];
        } else {
            $sheetId = 'null';
        }
        if($sheetId != 'null') {
            $machineId =  $var_example_php;//getMachineId();
            $actualJSONFile = ($machineId . '.json');
        }

        //function listFolderFiles($dir){
            //exit;
            $dir = '.';
            $ffs = scandir($dir);
            unset($ffs[array_search('.', $ffs, true)]);
            unset($ffs[array_search('..', $ffs, true)]);
            // prevent empty ordered elements
            echo './' . $sheetId;
            if (count($ffs) < 1)
                return;
            echo '<div style="font-family:Font-default; color:#7353a3; font-size:3vh; padding:1vh;">';
            echo 'Map Logs</br></br>';
            foreach($ffs as $ff){
                $blacklist = array('index.php');
                if (!in_array($ff, $blacklist)) {
                    if($sheetId != 'null') {
                        //echo $actualJSONFile . ' ---- ', $ff;
                        //$actualJSONFile = '1';
                        //$ff = '1';
                        if($actualJSONFile == $ff) {
                            echo ($dir.'/'.$ff);
                            //header('Location: ' . $dir.'/'.$ff );
                            exit;
                        }
                    } else {
                        echo '<div style="font-family:Font-default; font-size:2vh; margin-top:1vh;"><a style="color:#7353a3" href='.$dir.'/'.$ff. ' target="_blank">'.$ff;
                        if(is_dir($dir.'/'.$ff)) listFolderFiles($dir.'/'.$ff);
                        echo '</a></div>';
                    }
                }
            }
            echo '</div>';

        exit; */

        $sheetId = '';
        if ((isset($_REQUEST['id'])) && (!empty($_REQUEST['id'])))
        {
            $sheetId = $_REQUEST['id'];
        } else {
            $sheetId = 'null';
        }
        if($sheetId != 'null') {
            //$machineId = getMachineId();
            //$actualJSONFile = ($sheetId . '_' . $machineId . '.json');
        }
        //function listFolderFiles($dir){
            $dir = './' . $sheetId;

            /* echo is_dir($dir);

            exit; */
            if(!file_exists($dir) && !is_dir($dir)){
                echo '<div style="font-family:Font-default; color:#ffffff; font-size:2.1vh; padding:1vh; background-color: #7353a3;">';
                echo 'Logs ('. $sheetId .')</div>';
                echo '<div style="font-family:Font-default; color:#999999; font-size:2vh; padding-left: 1vh;margin-top:1vh;">No log files available for this spreadsheet</div>';
                return;
            }

            $ffs = scandir($dir);
            unset($ffs[array_search('.', $ffs, true)]);
            unset($ffs[array_search('..', $ffs, true)]);
            // prevent empty ordered elements
            
            if (count($ffs) < 1) {
                echo '<div style="font-family:Font-default; color:#ffffff; font-size:2.1vh; padding:1vh; background-color: #7353a3;">';
                echo 'Logs ('. $sheetId .')</div>';
                echo '<div style="font-family:Font-default; color:#999999; font-size:2vh; padding-left: 1vh;margin-top:1vh;">No log files available for this spreadsheet</div>';
                return;
            }


            echo '<div style="font-family:Font-default; color:#ffffff; font-size:2.1vh; padding:1vh; background-color: #7353a3;">';
            echo 'Logs ('. $sheetId .')</div>';
            foreach($ffs as $ff){
                $blacklist = array('index.php');
                if (!in_array($ff, $blacklist)) {
                    /* if($sheetId != 'null') {
                        if($actualJSONFile == $ff) {
                            header('Location: ' . $dir.'/'.$ff );
                            exit;
                        }
                    } else { */
                     $disFileName = explode('.json', $ff)[0];
                        echo '<div style="font-family:Font-default; font-size:2vh; margin-top:1vh; padding-left: 1vh;"><a style="color:#666666" href='.$dir.'/'.$ff. ' target="_blank">'.$disFileName;
                        /* if(is_dir($dir.'/'.$ff)) listFolderFiles($dir.'/'.$ff); */
                        echo '</a></div>';
                    /* } */
                } 
            }

            /* clearstatcache(); */
            echo '</div>';
        //}

        // To generate the system unique Id based on some defined params
        /* function getMachineId() {
            $fingerprint = [php_uname(), disk_total_space('.'), filectime('/'), phpversion()];
            //return hash('sha256', json_encode($fingerprint));
            return md5(json_encode($fingerprint));
        } */
        //listFolderFiles('.');
    ?>
</body>
</html>