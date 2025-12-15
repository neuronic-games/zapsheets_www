////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// For Refresh the page
//document.getElementById('versionId').innerHTML = 'Checking updates...'

///////////////////////////////////////////////////////////////////////////////////////////
function getCurrentVersion() {
 // Loading version.js dynamically for [mac fix]
 var newScript = document.createElement('script');
 newScript.type = 'text/javascript';
 newScript.src = '../js-package/version.js?version=' + Math.random();
 document.getElementsByTagName('head')[0].appendChild(newScript);
}
///////////////////////////////////////////////////////////////////////////////////////////
getCurrentVersion()

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 
     * @returns 
     */
    const detectDeviceType = () =>
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            ? 'Mobile'
            : 'Desktop';
    // Called whenever an update has been found and is installing
    //listener.onupdateinstalling = installingevent => console.log('Update is installing.');
    // Called whenever an update is done installing and is waiting
    var buttonElem = ''
    if(detectDeviceType() == 'Desktop') {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    buttonElem = `<p id='btnRefresh' style="position: absolute; right: 1em; top: .8em; font-weight: 700; border: 0; font-size: 1.2em; border-radius: 2px; padding:0.5em; color:#A7C1F6; cursor:pointer; z-index:99999; font-family: Font-default;">REFRESH</p>
        <p style="position: absolute; left: 0em; top: 1.2em; font-weight: 700; border: 0; font-size: 1.2em; border-radius: 2px; padding:0.5em">
        <img id='closeBox' src='images/close.png' alt="" style="filter: saturate(500%) contrast(800%) brightness(500%) 
        invert(100%) sepia(0%) hue-rotate(0deg); position: relative; width: 30px; top: -14px; left: 10px; cursor:pointer;" />
        </p>
        `
    } else {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    buttonElem = `<p id='btnRefresh' style="position: absolute; right: 0.5em; top: 0.8em; font-weight: 700; border: 0; font-size: 1.4em; border-radius: 2px; padding:0.5em; color:#A7C1F6; cursor:pointer; z-index:99999; font-family: Font-default;">REFRESH</p>
        <p style="position: absolute; left: 0.5em; top: 0.9em; font-weight: 700; border: 0; font-size: 1.2em; border-radius: 2px; padding:0.5em">
        <img id='closeBox' src='images/close.png' alt="" style="filter: saturate(500%) contrast(800%) brightness(500%) 
        invert(100%) sepia(0%) hue-rotate(0deg); position: relative; width: 30px; cursor:pointer;" />
        </p>`
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//localStorage.setItem("refreshStatus", "null")
/**
 * Global Variables
 */
var loadType = ""
var settingLoaded = false
var privateLoaded = false
var gameLoaded = false
var deviceType = ""
var clickedSlideID = -1
var slides_loaded = false
let gameMsg = ""
let eventSliderActive = false
let MODE_TYPE = ""
let pollTime = 10

let prevRenderEvents = 0
let activeLanguage = "eng"
let inLanguageProcess = false
let activeMenuIndex = -1

// To store active click object
let activeEventObject = null
let activeEventIndex = -1;

let activeLayout = ''
let addLanguage = ''

let onEvents = false;
let downIndex = -1;
let upIndex = -1;
let imageLoadedCount = 1
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Checking open browser stats
 */
if (window.performance) {
    //console.log("ENTER HERE")
    if (performance.navigation.type == 1) {
        //alert( "This page is reloaded" );
        // For loading cache always
        loadType = "refresh"
    } else {
        //alert( "This page is not reloaded");
        loadType = "normal"
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * IDLE TIMEOUT
 */
let idleFrom = ''
let idleTime;
let idleTimeOut = 60 // Idle threshold 3 MINS
let idleStatus = false
// Event to check for
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function to get the url variables passed in url
 * @returns 
 */
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
    }
    return vars;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
// TO LOAD PRIVATE DATA IN THE BEGINNING
let privateDataList = []
let eventsDataList = []
let kioskDataList = []

let sheet_Name = ''
let splash_img = ''
let splashDelaySec = 0
// For version
let currentVersion = ''
let slideShowLoaded = false;

let backgroundWorker = null
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * iOS FIX
 * @returns 
 */
function checkCookieStatus(){
    var cookieEnabled = navigator.cookieEnabled;
    return cookieEnabled;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * update message function
 */
function updateInfoTextView() {
    //document.getElementById("loadingTxt").scrollTop = 150;
    document.getElementById("loadingTxt").scrollTop += 100;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function tp load Setting from spreadsheet
 */
let settingDataList = []
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * variable to store the init urlvars
 */
var sheet_Id = (getUrlVars()["id"]) ? getUrlVars()["id"].split('/')[0] : '';
var isPreloadImages = (document.location.search.substr(1).split('&')[1] != '' && document.location.search.substr(1).split('&')[1] != undefined) ? document.location.search.substr(1).split('&')[1] : 'download_images';

//var setVersion_Id = (getUrlVars()["set_version"]) ? getUrlVars()["set_version"].split('/')[0] : 'undefined';
var setVersion_Id = (getUrlVars()["publish_id"]) ? getUrlVars()["publish_id"].split('/')[0] : 'undefined';
//var setVersion_Num = (getUrlVars()["version"]) ? getUrlVars()["version"].split('/')[0] : '';

var getKiosk_Num = (getUrlVars()["kiosk"]) ? getUrlVars()["kiosk"].split('/')[0] : '';

//console.log(sheet_Id, " ---- ", setVersion_Id, " ======= ", setVersion_Num)
//console.log(sheet_Id, " ---- ",)

//console.log(getKiosk_Num, " getKiosk_Num")
var game_action = ''
//////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateAppVersion() {
    //document.getElementById('versionId').innerHTML = 'Version ' + Number(_version).toFixed(1);
    document.getElementById('defaultBGImage').style.display = 'none'
    document.getElementById("loadingTxt").innerHTML = "Publishing sheet content..<br>"
   /*  document.getElementById("loadingTxt").innerHTML = "App Version: " + Number(_version).toFixed(1) + "<br>"
    updateInfoTextView() */
    
    var setVersion_Num = ''

    // Aut0 generated version number using the publish url
    //window.ldb.get('zapMap_VersionNum', function (value) {
    //window.ldb.get(sheet_Id + '_VersionNum', function (value) {
        /* if(value == null) {
            setVersion_Num = 1.0
        } else {
            setVersion_Num = Number(Math.abs(value) + 0.1).toFixed(1);
           //console.log(setVersion_Num, " New Version")
        } */
    //})

    // change status
    //savePublishedStateToServer('false');

    let currentDate = new Date();
   /*  document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('MM/DD/YYYY HH:mm:ss').toLocaleString() + "<br>"
    updateInfoTextView() */
    
    let date_str = moment(currentDate).format('MM/DD/YYYY-HH:mm:ss').toLocaleString();

    //console.log(date_str, " ---- From APP-----")
        //return
        const updateAppTimer = setTimeout(function() {

            clearTimeout(updateAppTimer)
            if(window.navigator.onLine == true) {
                //console.log("INTERNET ACTIVE")
                //document.getElementById("loadingTxt").innerHTML = "Publishing sheet content..<br>"
                //console.log('sheets/' + setVersion_Id + '/version.json')
                /////////////////////////////////////////////////////////////////////////////////
                // Modifying push stat
                var updateRequest = $.ajax({
                    url: 'pushSheet.php?version=' + Math.random(), 
                    type:'POST', 
                    data:{'id' : sheet_Id, 'sheetname' : '', 'date_string' : date_str}, 
                    cache: false, 
                    // async: false,
                    success: function (response) {
                        //console.log(response, " VERSION UPDATED")
                        // document.getElementById("loadingTxt").innerHTML += "Sheet Version: " + response.toString() + "<br>"
                        // updateInfoTextView()
                        document.getElementById('defaultBGImage').style.display = 'none'

                        setTimeout(function() {
                            // let currentDate = new Date();
                            // document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('YYYY/MM/DD HH:mm:ss') + "<br>"
                            // updateInfoTextView()
                            // Load Setting Data from server and save it to server settings.json file
                            getSettingsDataFromSheet();
                        }, 100)

                    }
                })
                ///////////////////
                // Clear memory
                updateRequest.onreadystatechange = null;
                updateRequest.abort = null;
                updateRequest = null;
                ///////////////////
                    /* setTimeout(function() {
                        // let currentDate = new Date();
                        // document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('YYYY/MM/DD HH:mm:ss') + "<br>"
                        // updateInfoTextView()
                        // Load Setting Data from server and save it to server settings.json file
                        getSettingsDataFromSheet();
                    }, 100) */
            } else {
                //console.log("NO INTERNET")
                document.getElementById("loadingTxt").innerHTML = "Waiting for active internet...<br>Retrying..." 
                UpdateAppVersion()
            }
        }, 5000)
    //})
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function getSettingsDataFromSheet() {
    if(window.navigator.onLine == true) {
        //console.log("INTERNET ACTIVE")
        //document.getElementById("loadingTxt").innerHTML = "Publishing sheet content..<br>"
        //console.log('sheets/' + setVersion_Id + '/version.json')
        /////////////////////////////////////////////////////////////////////////////////
        var updateRequest = $.ajax({
            url: 'pushSheet.php?version=' + Math.random(), 
            type:'POST', 
            data:{'id' : sheet_Id, 'sheetname' : 'Settings'}, 
            cache: false, 
           /*  async: false, */
            success: function (response) {
                console.log(response, " Setting Data")
                let settingResponse = response
                /* document.getElementById("loadingTxt").innerHTML += response.toString() + "<br>"
                updateInfoTextView() */
                //document.getElementById('defaultBGImage').style.display = 'none'

                let target = "live"
            	  let rootFolder = "../sheets/" + sheet_Id + "/" + target
              
                setTimeout(function() {
                    //let currentDate = new Date();
                    //document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('YYYY/MM/DD HH:mm:ss') + "<br>"
                    //updateInfoTextView()

                    // Load and store setting data to list
                    var settingRequest = $.ajax({
                        url: rootFolder + "/settings.json?version=" + Math.random(), 
                        cache: false, 
                       /*  async: false, */
                        type: 'GET',
                        dataType: "text",
                        success: function (response) {
                            //console.log(response, " READ DATA")
                            if(response.length == 0) {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Settings data not available.' + "</font><br>"
                                updateInfoTextView()
                            } else {

                                /* 
                                var mResponseSC = response.replace(/�/g, "")
                                var mResponseSCS = mResponseSC.replace(/: "/g, ": '") 
                                var mResponseSCSE = mResponseSCS.replace(/",/g, "',") 
                                var mResponseDQ = mResponseSCSE.replace(/"/g, "dqo") 
                                var mResponseDDQ = mResponseDQ.replace(/: dqo/g, ": 'dqo") 
                                var mResponseDDQE = mResponseDDQ.replace(/dqo,/g, "dqo',") 
                                const regex = /('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))/g; 
                                let replaceResponseRegX = mResponseDDQE.replace(regex, '"').replace(/{'/g, '{"').replace(/: '/g, ': "').replace(/, '/g, ', "').replace(/Ō'/g, 'O').replace(/ō'/g, 'o'); 
                                let replaceResponse = replaceResponseRegX.replace(/\\'/g, "'"); 
                                settingDataList = JSON.parse(replaceResponse)
                                //console.log('After Parse')
                                //console.log(settingDataList)
                                 */

                                //////////////////////////////////////////////////////////////////////////////
                                settingDataList = []
                                var mResponseSettings = response.replace(/�/g, "") 
                                var newSettingsData = eval(mResponseSettings)
                                for(var i=0; i<newSettingsData.length; i++) {
                                    var settingsDataSting = JSON.stringify(newSettingsData[i]);
                                    //console.log(isJSON(pp), " --- ")
                                    //newstr += JSON.stringify(isJSON(pp))
                                    if(isJSONData(settingsDataSting) == false) {
                                        document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Settings Sheet : (Row: ' + i + ")</font><br>"
                                        updateInfoTextView()
                                    } else {
                                        settingDataList[i] = isJSONData(settingsDataSting)
                                    }
                                }
                                //////////////////////////////////////////////////////////////////////////////

                                $.each(settingDataList, function (index, row) {
                                    if(row['Name'] == 'Title') {
                                        document.getElementById("loadingTxt").innerHTML = 'Sheet Title: ' + row['Value'] + '<br>'
                                        updateInfoTextView()
                                    }
                                    if(row['Name'] == 'SheetId') {
                                        document.getElementById("loadingTxt").innerHTML += 'Sheet Id: ' + row['Value'] + '<br>'
                                        updateInfoTextView()
                                    }
                                    if(row['Name'] == 'Version') {
                                        document.getElementById("loadingTxt").innerHTML += 'Sheet Version: ' + row['Value'] + '<br>'
                                        updateInfoTextView()
                                    }
                                    if(row['Name'] == 'PublishedOn') {
                                        document.getElementById("loadingTxt").innerHTML += 'Sheet Published on: ' + row['Value'] + '<br>'
                                        updateInfoTextView()
                                    }
                                })


                                document.getElementById("loadingTxt").innerHTML += "App Version: " + Number(_version).toFixed(1) + "<br>"
                                updateInfoTextView()

                                document.getElementById("loadingTxt").innerHTML += settingResponse.toString() + "<br>"
                                updateInfoTextView()


                                /////////////////////////////////////////////////////////////////////////////////////
                                // Show Setting data to the log
                                //document.getElementById("loadingTxt").innerHTML += "Sheet settings details..<br>"
                                //updateInfoTextView()
                                /* $.each(settingDataList, function (index_setting, row_setting) {
                                   if(row_setting['Name'] != '' && row_setting['Value'] != '') {
                                        document.getElementById("loadingTxt").innerHTML += row_setting['Name'] + ': ' + row_setting['Value'] + "<br>"
                                        updateInfoTextView()
                                   }
                                }) */
                                /////////////////////////////////////////////////////////////////////////////////////////

                            }

                            getDirectoryDataFromSheet()

                        },
                    })
                    ///////////////////
                    // Clear memory
                    settingRequest.onreadystatechange = null;
                    settingRequest.abort = null;
                    settingRequest = null;
                    ///////////////////


                    // Load Directory Data from server and save it to server settings.json file
                    //getDirectoryDataFromSheet()
                }, 100)
            }
        })
        ///////////////////
        // Clear memory
        updateRequest.onreadystatechange = null;
        updateRequest.abort = null;
        updateRequest = null;
        ///////////////////
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function getDirectoryDataFromSheet() {
    if(window.navigator.onLine == true) {
        //console.log("INTERNET ACTIVE")
        //document.getElementById("loadingTxt").innerHTML = "Publishing sheet content..<br>"
        //console.log('sheets/' + setVersion_Id + '/version.json')
        /////////////////////////////////////////////////////////////////////////////////
        var updateRequest = $.ajax({
            url: 'pushSheet.php?version=' + Math.random(), 
            type:'POST', 
            data:{'id' : sheet_Id, 'sheetname' : 'Directory'}, 
            cache: false, 
           /*  async: false, */
            success: function (response) {
                console.log(response, " Directory Data")
                document.getElementById("loadingTxt").innerHTML += response.toString() + "<br>"
                updateInfoTextView()
                //document.getElementById('defaultBGImage').style.display = 'none'

                let target = "live"
            	  let rootFolder = "../sheets/" + sheet_Id + "/" + target
              
                setTimeout(function() {
                    let currentDate = new Date();
                    //document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('YYYY/MM/DD HH:mm:ss') + "<br>"
                    //updateInfoTextView()

                    // Load and store setting data to list
                    var directoryRequest = $.ajax({
                        url: rootFolder + "/directory.json?version=" + Math.random(), 
                        cache: false, 
                       /*  async: false, */
                        type: 'GET',
                        dataType: "text",
                        success: function (response) {
                            //console.log(response, " READ DATA")
                            if(response.length == 0) {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Directory data not available.' + "</font><br>"
                                updateInfoTextView()
                            } else {

                                //////////////////////////////////////////////////////////////////////////////
                                privateDataList = []
                                var mResponsePrivate = response.replace(/�/g, "") 
                                var newPrivateData = eval(mResponsePrivate)
                                for(var i=0; i<newPrivateData.length; i++) {
                                    var privateDataSting = JSON.stringify(newPrivateData[i]);
                                    //console.log(isJSON(pp), " --- ")
                                    //newstr += JSON.stringify(isJSON(pp))
                                    if(isJSONData(privateDataSting) == false) {
                                        document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Directory Sheet : (Row: ' + i + ")</font><br>"
                                        updateInfoTextView()
                                    } else {
                                        privateDataList[i] = isJSONData(privateDataSting)
                                    }
                                }
                                //////////////////////////////////////////////////////////////////////////////
                                
                                /* var mResponseSC = response.replace(/�/g, "")
                                var mResponseSCS = mResponseSC.replace(/: "/g, ": '") 
                                var mResponseSCSE = mResponseSCS.replace(/",/g, "',") 
                                var mResponseDQ = mResponseSCSE.replace(/"/g, "dqo") 
                                var mResponseDDQ = mResponseDQ.replace(/: dqo/g, ": 'dqo") 
                                var mResponseDDQE = mResponseDDQ.replace(/dqo,/g, "dqo',") 
                                const regex = /('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))/g; 
                                let replaceResponseRegX = mResponseDDQE.replace(regex, '"').replace(/{'/g, '{"').replace(/: '/g, ': "').replace(/, '/g, ', "').replace(/Ō'/g, 'O').replace(/ō'/g, 'o'); 
                                let replaceResponse = replaceResponseRegX.replace(/\\'/g, "'"); 
                                privateDataList = JSON.parse(replaceResponse)
                                //console.log('After Parse') */

                                //////////////////////////////////////////////////////////////////////////////

                            }
                            getEventsDataFromSheet()
                        },
                    })
                    ///////////////////
                    // Clear memory
                    directoryRequest.onreadystatechange = null;
                    directoryRequest.abort = null;
                    directoryRequest = null;
                    ///////////////////

                    // Load Events Data from server and save it to server settings.json file
                    //getEventsDataFromSheet()
                }, 100)
            }
        })
        ///////////////////
        // Clear memory
        updateRequest.onreadystatechange = null;
        updateRequest.abort = null;
        updateRequest = null;
        ///////////////////
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
isJSONData = str => {
    //if (typeof str === 'string'){
      try {
        let p = JSON.parse(str)
        return p
      } catch(e){
      }
    //}
    return false
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function getEventsDataFromSheet() {
    let monthList = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let daysList = ['Mon', 'Tue','Wed','Thu','Fri','Sat','Sun']
    if(window.navigator.onLine == true) {
        //console.log("INTERNET ACTIVE")
        //document.getElementById("loadingTxt").innerHTML = "Publishing sheet content..<br>"
        //console.log('sheets/' + setVersion_Id + '/version.json')
        /////////////////////////////////////////////////////////////////////////////////
        var updateRequest = $.ajax({
            url: 'pushSheet.php?version=' + Math.random(), 
            type:'POST', 
            data:{'id' : sheet_Id, 'sheetname' : 'Events'}, 
            cache: false, 
           /*  async: false, */
            success: function (response) {
                //console.log(response, " Events Data")
                //return;
                document.getElementById("loadingTxt").innerHTML += response.toString() + "<br>"
                updateInfoTextView()
                //document.getElementById('defaultBGImage').style.display = 'none'

                let target = "live"
            	  let rootFolder = "../sheets/" + sheet_Id + "/" + target
                
                setTimeout(function() {
                    let currentDate = new Date();
                    //document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('YYYY/MM/DD HH:mm:ss') + "<br>"
                    //updateInfoTextView()
                    // Load and store setting data to list
                    var eventRequest = $.ajax({
                        url: rootFolder + "/events.json?version=" + Math.random(), 
                        cache: false, 
                       /*  async: false, */
                        type: 'GET',
                        dataType: "text",
                        success: function (response) {
                            //console.log(response.length, " READ DATA")
                            /* console.log(response, " --EVENTS--- ")
                            return */
                            if(response.length == 0) {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Events data not available.' + "</font><br>"
                                updateInfoTextView()
                            } else {
                                /////////////////////////////////////////////////////////////////
                                /* var jsontemp = response.replace((/([\w]+)(:)/g), "\"$1\"$2");
                                var correctjson = jsontemp.replace((/'/g), "\""); */
                                /* const regex1 = /([,\{] *)(\w+):/g;
                                const regex2 = /([,\{] *"\w+":)(?! *-?[0-9\.]+[,\}])(?! *[\{\[])( *)([^,\}]*)/g;
                                let json = response
                                  .replace(regex1, '"').replace(/{'/g, '{"').replace(/: '/g, ': "').replace(/, '/g, ', "').replace(/Ō'/g, 'O').replace(/ō'/g, 'o')
                                  .replace(regex2, '"').replace(/{'/g, '{"').replace(/: '/g, ': "').replace(/, '/g, ', "').replace(/Ō'/g, 'O').replace(/ō'/g, 'o'); 
                                let result = JSON.parse(json);
                                console.log(JSON.stringify(result, null, ' ')); */
                                //////////////////////////////////////////////////////////////////////////////
                                eventsDataList = []
                                var mResponseEvents = response.replace(/�/g, "") 
                                var newEventsData = eval(mResponseEvents)
                                for(var i=0; i<newEventsData.length; i++) {
                                    var eventDataSting = JSON.stringify(newEventsData[i]);
                                    //console.log(isJSON(pp), " --- ")
                                    //newstr += JSON.stringify(isJSON(pp))
                                    if(isJSONData(eventDataSting) == false) {
                                        document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Events Sheet : (Row: ' + i + ")</font><br>"
                                        updateInfoTextView()
                                    } else {
                                        var checkDataFormat = isJSONData(eventDataSting)
                                        //console.log(typeof(checkDataFormat.Duration), " CHECKING DURATION") 
                                        ///////////////////////////////////////////////////////////////////////////
                                        // For Date column
                                        if(checkDataFormat.Date != '') {
                                            //console.log(typeof checkDataFormat.Date, " DATE format")
                                            let dateToCheck = checkDataFormat.Date.split(',')
                                            for(var k=0; k<dateToCheck.length; k++) {
                                                //let myStringExists = ''
                                                if(dateToCheck[k].indexOf('-') == -1 ) {
                                                    //console.log(dateToCheck, " dateToCheckdateToCheck")
                                                    //return
                                                    //let stringToMatch = dateToCheck[k].split(',')[0].replaceAll(' ', '')

                                                    let stringMatch = dateToCheck[k].split(',')
                                                    let myStringExists = true;
                                                    for (var s=0; s<stringMatch.length; s++) {
                                                        //console.log(i + " === ", stringMatch[s], " >>> ", stringMatch[s].search(/\d/))
                                                       /*  let stringToMatch = stringMatch[s].split(' ')[0].replaceAll(' ', '')
                                                        let getMonthName = stringToMatch.substr(0,stringToMatch.seach(/\d/)); */

                                                        let stringToMatch = stringMatch[s].replaceAll(' ', '')
                                                        let getMonthNameIndex = stringToMatch.search(/\d/);
                                                        //console.log(stringToMatch.substr(0, getMonthNameIndex), " --- ")
                                                        let matchMonthName = stringToMatch.substring(0, getMonthNameIndex)

                                                        /* let getMonthName = stringMatch[s].substr(0,stringMatch[s].seach(/\d/));
                                                        let stringToMatch = getMonthName.replaceAll(' ', '') */

                                                        //console.log(matchMonthName, " MATCH STRING ", matchMonthName.length)
                                                        myStringExists = monthList.some(item => matchMonthName.includes(item) && matchMonthName.length == item.length);
                                                    }

                                                    //console.log(myStringExists, " --- " + i)
                                                    //console.log(dateToCheck[k], " DATE")
                                                    //let myStringExists = monthList.some(item => stringToMatch.includes(item) && stringToMatch.length == item.length);
                                                    // let dateExists = compareStrings(stringToMatch, stringToMatch)
                                                    //console.log(myStringExists, " >>>")

                                                    if(myStringExists == false) {
                                                        //console.log(typeof(checkDataFormat.Duration), " Error in row # " + (i+2) + " duration should be in number")
                                                        document.getElementById("loadingTxt").innerHTML += '<font color="red">ERROR: Events - Row: ' + (i+2) + " - Date should be a month name and date number format.</font><br>"
                                                        updateInfoTextView() 
                                                    }
                                                } else {
                                                    //console.log(dateToCheck, " --- ")
                                                    let stringMatch = dateToCheck[k].split(',')
                                                    let myStringExists = true;
                                                    for (var s=0; s<stringMatch.length; s++) {
                                                        if(stringMatch[s].indexOf('-')) {
                                                            let multipleDates = stringMatch[s].split('-');
                                                            for (var m=0; m<multipleDates.length; m++) {

                                                            //console.log(i + " === ", multipleDates[m], " >>> ", multipleDates[m].search(/\d/))
                                                        /*  let stringToMatch = stringMatch[s].split(' ')[0].replaceAll(' ', '')
                                                            let getMonthName = stringToMatch.substr(0,stringToMatch.seach(/\d/)); */

                                                            let stringToMatch = multipleDates[m].replaceAll(' ', '')
                                                            let getMonthNameIndex = stringToMatch.search(/\d/);
                                                            //console.log(stringToMatch.substr(0, getMonthNameIndex), " --- ")
                                                            let matchMonthName = stringToMatch.substring(0, getMonthNameIndex)

                                                            //console.log(matchMonthName, " in --- section")
                                                            /* let getMonthName = stringMatch[s].substr(0,stringMatch[s].seach(/\d/));
                                                            let stringToMatch = getMonthName.replaceAll(' ', '') */

                                                            //console.log(matchMonthName, " MATCH STRING ", matchMonthName.length)
                                                            myStringExists = monthList.some(item => matchMonthName.includes(item) && matchMonthName.length == item.length);
                                                            }
                                                        }
                                                    }
                                                    if(myStringExists == false) {
                                                        //console.log(typeof(checkDataFormat.Duration), " Error in row # " + (i+2) + " duration should be in number")
                                                        document.getElementById("loadingTxt").innerHTML += '<font color="red">ERROR: Events - Row: ' + (i+2) + " - Date should be a month name and date number format.</font><br>"
                                                        updateInfoTextView() 
                                                    }
                                                }
                                            }
                                        }
                                        ////////////////////////////////////////////////////////
                                        // For Occurrence
                                        if(checkDataFormat.Occurrence != '') {
                                            //console.log(typeof checkDataFormat.Date, " DATE format")
                                            let dateToCheck = checkDataFormat.Occurrence.split(',')
                                            for(var k=0; k<dateToCheck.length; k++) {
                                                //let myStringExists = ''
                                                if(dateToCheck[k].indexOf('-') == -1 ) {
                                                    let stringMatch = dateToCheck[k].split(',')
                                                    let myStringExists = true;
                                                    for (var s=0; s<stringMatch.length; s++) {
                                                        let stringToMatch = stringMatch[s].replaceAll(' ', '') + "1"
                                                        //console.log(stringToMatch, " ---- AAAA")
                                                        let getMonthNameIndex = stringToMatch.search(/\d/);
                                                        let matchMonthName = stringToMatch.substring(0, getMonthNameIndex)
                                                        //console.log(matchMonthName, " ---- AAAA")
                                                        myStringExists = daysList.some(item => matchMonthName.includes(item) && matchMonthName.length == item.length);
                                                    }
                                                    if(myStringExists == false) {
                                                        //console.log(typeof(checkDataFormat.Duration), " Error in row # " + (i+2) + " duration should be in number")
                                                        document.getElementById("loadingTxt").innerHTML += '<font color="red">ERROR: Events - Row: ' + (i+2) + " - Occurrence should be a weekday name format.</font><br>"
                                                        updateInfoTextView() 
                                                    }
                                                } else {
                                                    let stringMatch = dateToCheck[k].split(',')
                                                    let myStringExists = true;
                                                    for (var s=0; s<stringMatch.length; s++) {
                                                        if(stringMatch[s].indexOf('-')) {
                                                            let multipleDates = stringMatch[s].split('-');
                                                            for (var m=0; m<multipleDates.length; m++) {
                                                            //console.log(i + " === ", multipleDates[m], " >>> ", multipleDates[m].search(/\d/))
                                                            let stringToMatch = multipleDates[m].replaceAll(' ', '') + "1"
                                                            let getMonthNameIndex = stringToMatch.search(/\d/);
                                                            //console.log(stringToMatch.substr(0, getMonthNameIndex), " --- ")
                                                            let matchMonthName = stringToMatch.substring(0, getMonthNameIndex)
                                                            //console.log(matchMonthName, " in --- section")
                                                            myStringExists = daysList.some(item => matchMonthName.includes(item) && matchMonthName.length == item.length);
                                                            }
                                                        }
                                                    }

                                                    if(myStringExists == false) {
                                                        //console.log(typeof(checkDataFormat.Duration), " Error in row # " + (i+2) + " duration should be in number")
                                                        document.getElementById("loadingTxt").innerHTML += '<font color="red">ERROR: Events - Row: ' + (i+2) + " - Occurence should be a weekday name format.</font><br>"
                                                        updateInfoTextView() 
                                                    }
                                                }
                                            }
                                        }
                                        ////////////////////////////////////////////////////////
                                        // For Time format
                                        if(checkDataFormat.Time != '') {
                                            //console.log(typeof checkDataFormat.Date, " DATE format")
                                            let dateToCheck = checkDataFormat.Time.split(',')
                                            for(var k=0; k<dateToCheck.length; k++) {
                                                //let myStringExists = ''
                                                if(dateToCheck[k].indexOf('-') == -1 ) {
                                                    let stringMatch = dateToCheck[k].split(',')
                                                    let myStringExists = true;
                                                    for (var s=0; s<stringMatch.length; s++) {
                                                        let stringToMatch = stringMatch[s].replaceAll(' ', '')
                                                        //console.log(validateTimeString(stringToMatch), " in Time section")
                                                        //console.log(stringToMatch, " ---- AAAA")
                                                        /* let getMonthNameIndex = stringToMatch.search(/\d/);
                                                        let matchMonthName = stringToMatch.substring(0, getMonthNameIndex)
                                                        //console.log(matchMonthName, " ---- AAAA")
                                                        myStringExists = daysList.some(item => matchMonthName.includes(item) && matchMonthName.length == item.length); */

                                                        myStringExists = validateTimeString(stringToMatch)
                                                    }
                                                    if(myStringExists == false) {
                                                        //console.log(typeof(checkDataFormat.Duration), " Error in row # " + (i+2) + " duration should be in number")
                                                        document.getElementById("loadingTxt").innerHTML += '<font color="red">ERROR: Events - Row: ' + (i+2) + " - Time should be in 24-hour time format.</font><br>"
                                                        updateInfoTextView() 
                                                    }
                                                } else {
                                                    let stringMatch = dateToCheck[k].split(',')
                                                    let myStringExists = true;
                                                    for (var s=0; s<stringMatch.length; s++) {
                                                        if(stringMatch[s].indexOf('-')) {
                                                            let multipleDates = stringMatch[s].split('-');
                                                            for (var m=0; m<multipleDates.length; m++) {
                                                                //console.log(i + " === ", multipleDates[m], " >>> ", multipleDates[m].search(/\d/))
                                                                let stringToMatch = multipleDates[m].replaceAll(' ', '')
                                                                /* let getMonthNameIndex = stringToMatch.search(/\d/);
                                                                //console.log(stringToMatch.substr(0, getMonthNameIndex), " --- ")
                                                                let matchMonthName = stringToMatch.substring(0, getMonthNameIndex)
                                                                console.log(matchMonthName, " in --- section")
                                                                myStringExists = daysList.some(item => matchMonthName.includes(item) && matchMonthName.length == item.length); */
                                                                myStringExists = validateTimeString(stringToMatch)
                                                            }
                                                        }
                                                    }

                                                    if(myStringExists == false) {
                                                        //console.log(typeof(checkDataFormat.Duration), " Error in row # " + (i+2) + " duration should be in number")
                                                        document.getElementById("loadingTxt").innerHTML += '<font color="red">ERROR: Events - Row: ' + (i+2) + " - Time should be in 24-hour time format.</font><br>"
                                                        updateInfoTextView() 
                                                    }
                                                }
                                            }
                                        }
                                        ////////////////////////////////////////////////////////
                                        // For Duration column formatting
                                        if(checkDataFormat.Duration != '') {
                                            if(typeof checkDataFormat.Duration == 'string' && checkDataFormat.Time.indexOf('-') == -1) {
                                                //console.log(typeof(checkDataFormat.Duration), " Error in row # " + (i+2) + " duration should be in number")
                                                document.getElementById("loadingTxt").innerHTML += '<font color="red">ERROR: Events - Row: ' + (i+2) + " - Duration should be a number.</font><br>"
                                                updateInfoTextView() 
                                            }
                                        }
                                        ////////////////////////////////////////////////////////
                                        eventsDataList[i] = isJSONData(eventDataSting)
                                    }
                                }
                                //////////////////////////////////////////////////////////////////////////////


                                /* newArray.map(el => {
                                    console.log(`[>${el}<] ::::::::::::::::: ${isJSON(el)}`)
                                }) */

                                //console.log(eventsDataList, " final ", eventsDataList.length)
                                /* [response].map(el => {
                                    console.log(`[>${el}<] ::::::::::::::::: ${isJSON(el)}`)
                                }) */
                                //console.log(response)
                                //////////////////////////////////////////////////////////////////////////////
                                /* var mResponseSC = response.replace(/�/g, "")
                                var mResponseSCS = mResponseSC.replace(/: "/g, ": '") 
                                var mResponseSCSE = mResponseSCS.replace(/",/g, "',") 
                                var mResponseDQ = mResponseSCSE.replace(/"/g, "dqo") 
                                var mResponseDDQ = mResponseDQ.replace(/: dqo/g, ": 'dqo") 
                                var mResponseDDQE = mResponseDDQ.replace(/dqo,/g, "dqo',") 
                                const regex = /('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))/g; 
                                let replaceResponseRegX = mResponseDDQE.replace(regex, '"').replace(/{'/g, '{"').replace(/: '/g, ': "').replace(/, '/g, ', "').replace(/Ō'/g, 'O').replace(/ō'/g, 'o'); 
                                let replaceResponse = replaceResponseRegX.replace(/\\'/g, "'"); 

                                eventsDataList = JSON.parse(replaceResponse) */
                                //console.log('After Parse')
                                //console.log(settingDataList)
                                //////////////////////////////////////////////////////////////////////////////
                            }
                            getKiosksDataFromSheet()
                        },
                    })
                    ///////////////////
                    // Clear memory
                    eventRequest.onreadystatechange = null;
                    eventRequest.abort = null;
                    eventRequest = null;
                    ///////////////////

                    // Load Kiosks Data from server and save it to server settings.json file
                    //getKiosksDataFromSheet()
                }, 100)
            }
        })
        ///////////////////
        // Clear memory
        updateRequest.onreadystatechange = null;
        updateRequest.abort = null;
        updateRequest = null;
        ///////////////////
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function validateTimeString(txt) {
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(txt);
    return isValid;
  }
//////////////////////////////////////////////////////////////////////////////////////////////////
function getAllImagesToPublish() {
    var tempCount = 0
    $.each(eventsDataList, function (i, row) {
        if(eventsDataList[i].Image != '' && eventsDataList[i].Image != undefined) {
            tempCount++;
        }
        if(eventsDataList[i]['Map Image'] != '' && eventsDataList[i]['Map Image'] != undefined) {
            tempCount++;
        }
    })
    $.each(settingDataList, function (index_setting, row_setting) {
        if(row_setting['Name'] == 'TextImage' || row_setting['Name'] == 'DefaultMapImage' || row_setting['Name'] == 'BackgroundImage' || row_setting['Name'] == 'SplashImageUrl') {
            if(row_setting['Value'] != '' && row_setting['Value'] != undefined) {
                tempCount++
            }
            if(row_setting['Value ES'] != '' && row_setting['Value ES'] != undefined) {
                tempCount++
            }
        }
    })
    $.each(privateDataList, function (index, row) {
        if(privateDataList[index]['Map Image'] != '' && privateDataList[index]['Map Image'] != undefined) {
            tempCount++;
        }
    })
    $.each(kioskDataList, function (i, row) {
        if(kioskDataList[i].Image != '' && kioskDataList[i].Image != undefined) {
            tempCount++;
        }
    })

    return tempCount;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function getKiosksDataFromSheet() {
    if(window.navigator.onLine == true) {
        //console.log("INTERNET ACTIVE")
        //document.getElementById("loadingTxt").innerHTML = "Publishing sheet content..<br>"
        //console.log('sheets/' + setVersion_Id + '/version.json')
        /////////////////////////////////////////////////////////////////////////////////
        var updateRequest = $.ajax({
            url: 'pushSheet.php?version=' + Math.random(), 
            type:'POST', 
            data:{'id' : sheet_Id, 'sheetname' : 'Kiosks'}, 
            cache: false, 
           /*  async: false, */
            success: function (response) {
                console.log(response, " Kiosks Data")
                document.getElementById("loadingTxt").innerHTML += response.toString() + "<br>"
                updateInfoTextView()
                //document.getElementById('defaultBGImage').style.display = 'none'

                let target = "live"
            	  let rootFolder = "../sheets/" + sheet_Id + "/" + target
              
                setTimeout(function() {
                    let currentDate = new Date();
                    //document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('YYYY/MM/DD HH:mm:ss') + "<br>"
                    //updateInfoTextView()

                    // Load Setting Data from server and save it to server settings.json file
                    //getSettingsDataFromSheet();

                    // Reading saved data
                    var kioskRequest = $.ajax({
                        url: rootFolder + "/kiosks.json?version=" + Math.random(), 
                        cache: false, 
                       /*  async: false, */
                        type: 'GET',
                        dataType: "text",
                        success: function (response) {
                            //////////////////////////////////////////////////////////////////////////////
                            kioskDataList = []
                            var mResponseKiosks = response.replace(/�/g, "") 
                            var newKiosksData = eval(mResponseKiosks)
                            for(var i=0; i<newKiosksData.length; i++) {
                                var kiosksDataSting = JSON.stringify(newKiosksData[i]);
                                //console.log(isJSON(pp), " --- ")
                                //newstr += JSON.stringify(isJSON(pp))
                                if(isJSONData(kiosksDataSting) == false) {
                                    document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Kiosks Sheet : (Row: ' + i + ")</font><br>"
                                    updateInfoTextView()
                                } else {
                                    kioskDataList[i] = isJSONData(kiosksDataSting)
                                }
                            }
                            //////////////////////////////////////////////////////////////////////////////
                            /* 
                            //console.log(response, " READ DATA")
                            var mResponseSC = response.replace(/�/g, "")
                            var mResponseSCS = mResponseSC.replace(/: "/g, ": '") 
                            var mResponseSCSE = mResponseSCS.replace(/",/g, "',") 
                            var mResponseDQ = mResponseSCSE.replace(/"/g, "dqo") 
                            var mResponseDDQ = mResponseDQ.replace(/: dqo/g, ": 'dqo") 
                            var mResponseDDQE = mResponseDDQ.replace(/dqo,/g, "dqo',") 
                            const regex = /('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))/g; 
                            let replaceResponseRegX = mResponseDDQE.replace(regex, '"').replace(/{'/g, '{"').replace(/: '/g, ': "').replace(/, '/g, ', "').replace(/Ō'/g, 'O').replace(/ō'/g, 'o'); 
                            let replaceResponse = replaceResponseRegX.replace(/\\'/g, "'"); 
                            kioskDataList = JSON.parse(replaceResponse)
                            //console.log('After Parse')
                            //console.log(privateDataList) */
                            //////////////////////////////////////////////////////////////////////////////

                            if(isPreloadImages == 'download_images') {
                                // Message to info log
                                document.getElementById("loadingTxt").innerHTML += "Getting images..<br>Please wait..<br>"
                                updateInfoTextView()
                                // Preload All Images
                                PreloadAllImagesToServer();

                            } else {
                                /* window.ldb.set(sheet_Id.toString() + '_published', 'true') */
                                document.getElementById("loadingTxt").innerHTML += "All data published.<br>"
                                updateInfoTextView()

                                pushVersionToServer()

                                // Call PHP to save data to the json file
                                savePublishedStateToServer('true');

                            }
                            //////////////////////////////////////////////////////////////////////////////

                        },
                    })
                    ///////////////////
                    // Clear memory
                    kioskRequest.onreadystatechange = null;
                    kioskRequest.abort = null;
                    kioskRequest = null;
                    ///////////////////

                       /*  fetch('../sheets/' + sheet_Id + '/directory.json')
                        .then(response => response.text())
                        .then(text => console.log(text, ' json data')); */

                }, 100)
            }
        })
        ///////////////////
        // Clear memory
        updateRequest.onreadystatechange = null;
        updateRequest.abort = null;
        updateRequest = null;
        ///////////////////
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function savePublishedStateToServer(_value) {
    var saveRequest = $.ajax({
        url: 'savePushStatus.php?version=' + Math.random(), 
        type:'POST', 
        data:{'id' : sheet_Id, 'value' : _value}, 
        cache: false, 
       /*  async: false, */
        success: function (response) {
            console.log("RESONSE - ", response)
        }
    })
    ///////////////////
    // Clear memory
    saveRequest.onreadystatechange = null;
    saveRequest.abort = null;
    saveRequest = null;
    ///////////////////
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function PreloadAllImagesToServer() {
    // Caching Directory Map Images
    if(window.navigator.onLine == true) {
        let settingTimeout = 10
        $.each(settingDataList, function (index_setting, row_setting) {
            if(row_setting['Name'] == 'BackgroundImage') {
                if(row_setting['Value'] != '') {
                    if (row_setting['Value'].includes("https://drive.google.com")) {
                        let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(row_setting['Value'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    }
                }
                if(row_setting['Value ES'] != '') {
                    if (row_setting['Value ES'].includes("https://drive.google.com")) {
                        let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(row_setting['Value ES'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    }
                }
            }
            if(row_setting['Name'] == 'SplashImageUrl') {
                if(row_setting['Value'] != '') {
                    if (row_setting['Value'].includes("https://drive.google.com")) {
                        let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(row_setting['Value'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    }
                }
                if(row_setting['Value ES'] != '') {
                    if (row_setting['Value ES'].includes("https://drive.google.com")) {
                        let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(row_setting['Value ES'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    }
                }
            }
            if(row_setting['Name'] == 'DefaultMapImage') {
                if(row_setting['Value'] != '') {
                    if (row_setting['Value'].includes("https://drive.google.com")) {
                        let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(row_setting['Value'])
                            } else {
                                downloadImagesLocally("") 
                            }
                        }, (settingTimeout * index_setting));
                    }
                }

                if(row_setting['Value ES'] != '') {
                    if (row_setting['Value ES'].includes("https://drive.google.com")) {
                        let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(row_setting['Value ES'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    }
                }
            }

            if(row_setting['Name'] == 'TextImage') {
                if(row_setting['Value'] != '') {
                    if (row_setting['Value'].includes("https://drive.google.com")) {
                        let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(row_setting['Value'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, (settingTimeout * index_setting));
                    }
                }
            }
        })
        //////////////////////// For map data ///////////////////////////
        let privateTimeout = 300
        $.each(privateDataList, function (i, row) {
            if(privateDataList[i]['Map Image'] != '' /* && privateDataList[i]['Map Image'] != undefined */) {
                if (privateDataList[i]['Map Image'].includes("https://drive.google.com")) {
                    let imgid = privateDataList[i]['Map Image'].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    setTimeout(function() {
                        if(privateDataList[i] != '') {
                            downloadImagesLocally(imgPath)
                        } else {
                            downloadImagesLocally("") 
                        }
                    }, (privateTimeout * i));
                } else {
                    // Cache Image
                    setTimeout(function() {
                        if(privateDataList[i] != '') {
                            downloadImagesLocally(privateDataList[i]['Map Image'])
                        } else {
                            downloadImagesLocally("")
                        }
                    }, (privateTimeout * i));
                }
            }
        })
        //////////////////////// For Event data ///////////////////////////
        let eventTimeout = 500;
        $.each(eventsDataList, function (i, row) {
            if(eventsDataList[i].Image != '' /* && eventsDataList[i].Image != undefined */) {
                if (eventsDataList[i].Image.includes("https://drive.google.com")) {
                    let imgid = eventsDataList[i].Image.split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    setTimeout(function() {
                        if(eventsDataList[i] != '') {
                            downloadImagesLocally(imgPath)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, (eventTimeout * i));
                } else {
                    // Cache Image
                    setTimeout(function() {
                        if(eventsDataList[i] != '') {
                            downloadImagesLocally(eventsDataList[i].Image)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, (eventTimeout * i));
                }
            }
            if(eventsDataList[i]['Map Image'] != '' /* && eventsDataList[i]['Map Image'] != undefined */) {
                if (eventsDataList[i]['Map Image'].includes("https://drive.google.com")) {
                    let imgid = eventsDataList[i]['Map Image'].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    setTimeout(function() {
                        if(eventsDataList[i] != '') {
                            downloadImagesLocally(imgPath)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, (eventTimeout * i));
                } else {
                    // Cache Image
                    setTimeout(function() {
                        if(eventsDataList[i] != '') {
                            downloadImagesLocally(eventsDataList[i]['Map Image'])
                        } else {
                            downloadImagesLocally("")
                        }
                    }, (eventTimeout * i));
                }
            }
        })
        //////////////////////// For Kiosk data ///////////////////////////
        let kioskTimeout = 700
        $.each(kioskDataList, function (i, row) {
            if(kioskDataList[i].Image != '' /* && kioskDataList[i].Image != undefined */) {
                if (kioskDataList[i].Image.includes("https://drive.google.com")) {
                    let imgid = kioskDataList[i].Image.split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    setTimeout(function() {
                        if(kioskDataList[i] != '') {
                            downloadImagesLocally(imgPath)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, (kioskTimeout * i))
                } else {
                    // Cache Image
                    setTimeout(function() {
                        if(kioskDataList[i] != '') {
                            downloadImagesLocally(kioskDataList[i].Image)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, (kioskTimeout * i))
                }
            }
        })
    } 
}
//////////////////////////////////////////////////////////////////////////////////////////////////
// Getting return message from backgroundAPI worker
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Window onload function
 */
window.addEventListener('load', (event) => {
    //console.log(globalStatus, " check Status ")
    //console.log(isPreloadImages, " check Image download option")
    // Show Push Title
    document.getElementById('pushTitle').innerHTML = isPreloadImages == 'download_images' ? 'Publish All Content' : 'Publish Only Text'

    //return

    if(sheet_Id != '') {
        console.log("Enter into publishing the content")
        UpdateAppVersion()
    } else {
        console.log('show missing sheet id message')
        
    }
    //getGamesSettingData();
    return;

    // Clear all cached data
    /* window.ldb.delete('zapMap_VersionNum')
    window.ldb.delete('zapMap_settingData')
    window.ldb.delete('zapMap_eventsData')
    window.ldb.delete('zapMap_kioskData')
    window.ldb.delete('zapMap_loadType')
    window.ldb.delete('zapMap_SheetId')
    window.ldb.delete('zapMap_privateData') */
    /* window.ldb.delete(sheet_Id.toString() + '_VersionNum')
    window.ldb.delete(sheet_Id.toString() + '_settingData')
    window.ldb.delete(sheet_Id.toString() + '_eventsData')
    window.ldb.delete(sheet_Id.toString() + '_kioskData')
    window.ldb.delete(sheet_Id.toString() + '_loadType')
    window.ldb.delete(sheet_Id.toString() + '_SheetId')
    window.ldb.delete(sheet_Id.toString() + '_privateData')
    console.log("ALL CACHE CLEARED")
    return; */
    //console.log('sheed if = ', setVersion_Id)
})
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * To check json in correct format
 * @param {*} str 
 * @returns 
 */
const isJson = (str) => {
    try{
        JSON.parse(str);
    }catch (e){
        //Error
        //JSON is not okay
        return false;
    }
    return true;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Check user passed params authenticity
 */
/* function checkUserQueryString() {
    //console.log(' CHECKING QUERY STRING checkUserQueryString ', privateDataList.length)

    setTimeout(function() {
    let messageBody = ""
    if(sheet_Id == "") {
        messageBody = "Sheet Id Or Sheet URL is wrong or missing."
    } else if(sheet_Id != "" && settingDataList.length == 0) {
        messageBody = "Share the Google Sheet with<br>editor@zsheets-378406.iam.gserviceaccount.com<br>as Editor."
    } 
    if(sheet_Id == '' || (sheet_Id != '' && settingDataList.length == 0)){
        $(".cardList").html(`<div id="sheetIdForm" class="text-center mt-4 pt-4" style="position: relative; margin-top: 3% !important; width:100%; height:38vh; display:flex; flex-direction:column;justify-content:center; z-index:9999999999 !important;">
            <h5 class="text-center" style="color:red; display:${(sheet_Id != "" && settingDataList.length > 0) ? 'none' : 'block'}; font-family:Font-default;">${messageBody}</h5>
            <h4 class="text-center h3 mb-3" style="position:relative;top: 1em; z-index:9; font-family:Font-default; letter-spacing: -1px; font-weight: 700;">ENTER YOUR GOOGLE SHEET ID, OR GOOGLE SHEET URL</h4>
            <div id="settingBox" class="text-center mt-4 pt-4" style="width: 60%; position:relative; height: auto; left: 20%;background-color: #FFFFFF; box-shadow: 0 0 0 3px #FFFFFF, 0 0 0 3px #FFFFFF; margin-top: 0em !important; border-radius: 2px;">
            <div style="border: 2px solid #FFFFFF; padding: 5px; border-radius: 5px; position: relative; width: 96%; left: 2%; top: -10px;">
                <input class="form-control" type="text" id="usheetId" name="usheetId" style="position: relative; margin-top: 0px; width: 100%;margin-left: 0em; height: 2.5em; font-family: 'Font-default';" pattern="[A-Za-z0-9]+" onkeydown="if(['Space'].includes(arguments[0].code)){return false;}"/>
            </div>
            <button onClick="checkUserFillData();" class="btn_submit" style="position:relative; margin-top:-1em;margin-bottom:0.5em; right:0px"><img src="images/btn_img.png" class="img-fluid" width="70" /></button>
            </div>
            </div>
        </div>`)
        hideloader();
        sheet_Id = ""
        user_name = ""
        return
    } else {
        console.log("AAAAA")
        return;
    }
}, 100)
} */
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Hide preloader
 */
function hideloader() {
    /* $('.loader-spinner').addClass('d-none'); */
    $('.loader-spinner-text').addClass('d-none');
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Show preloader
 */
function showloader() {
    /* $('.loader-spinner').removeClass('d-none'); */
    $('.loader-spinner-text').removeClass('d-none');
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Check and return the actual conbination of urls
 * @param {*} str 
 * @returns 
 */
function combinations(str) {
    var fn = function(active, rest, a) {
        if (!active && !rest)
            return;
        if (!rest) {
            a.push(active);
        } else {
            fn(active + rest[0], rest.slice(1), a);
            fn(active, rest.slice(1), a);
        }
        return a;
    }
    return fn("", str, []);
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Reinit the window offset at top
 * @param {*} element 
 */
function scrollPage(element) {
    $('html, body').animate({
        scrollTop: $(element).offset().top
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      
      img.onerror = () => {
        callback(false);
      };
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
function downloadImagesLocally(urlString) {
    let dispImgName = ''
    if (urlString.includes("https://drive.google.com")) {
        imgid = urlString.split('https://drive.google.com')[1].split('/')[3];
        dispImgName = imgid + ".png"
    } else {
        let name =  urlString.split('/')
        let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
        dispImgName = imageName
    }

    //console.log(urlString, " --- URL")

    var saveRequest = $.ajax({
        url: '../saveAs.php?version=' + Math.random(), 
        type:'POST', 
        data:{'imgURL' : urlString, 'id' : sheet_Id}, 
        cache: false, 
       /*  async: false, */
        success: function (response) {
            var tempCount = 0
            $.each(eventsDataList, function (i, row) {
                if(eventsDataList[i].Image != '' && eventsDataList[i].Image != undefined) {
                    tempCount++;
                }
                if(eventsDataList[i]['Map Image'] != '' && eventsDataList[i]['Map Image'] != undefined) {
                    tempCount++;
                }
            })
            $.each(settingDataList, function (index_setting, row_setting) {
                if(row_setting['Name'] == 'TextImage' || row_setting['Name'] == 'DefaultMapImage' || row_setting['Name'] == 'BackgroundImage' || row_setting['Name'] == 'SplashImageUrl') {
                    if(row_setting['Value'] != '' /* && row_setting['Value'] != undefined */) {
                        tempCount++
                    }
                    if(row_setting['Value ES'] != '' /* && row_setting['Value ES'] != undefined */) {
                        tempCount++
                    }
                }
            })
            $.each(privateDataList, function (index, row) {
                if(privateDataList[index]['Map Image'] != '' /* && privateDataList[index]['Map Image'] != undefined */) {
                    tempCount++;
                }
            })
            $.each(kioskDataList, function (i, row) {
                if(kioskDataList[i].Image != '' /* && kioskDataList[i].Image != undefined */) {
                    tempCount++;
                }
            })

            var AllImageCount = tempCount; 
            /* var msgValue = "Loading Map Assets..<br>"
            msgValue += "Checking Settings..<br>"
            msgValue += "Loading Settings From Sheet..<br>"
            msgValue += "Checking Kiosks..<br>"
            msgValue += "Loading Kiosks From Sheet..<br>"
            msgValue += "Loading Directory From Sheet..<br>"
            msgValue += "Loading Events From Sheet..<br>" */

            /* let dispImgName = ''
            if (urlString.includes("https://drive.google.com")) {
                imgid = urlString.split('https://drive.google.com')[1].split('/')[3];
                dispImgName = imgid + ".png"
            } else {
                let name =  urlString.split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                dispImgName = imageName
            }

            console.log("dispImgName - ", dispImgName) */
            //setTimeout(function() {
                //document.getElementById("loadingTxt").innerHTML += "Publishing Images (" + imageLoadedCount + "/" + AllImageCount + ") ..<br>"
                //updateInfoTextView()

                /* document.getElementById("loadingTxt").innerHTML += "Publishing " + dispImgName + "<br>"
                updateInfoTextView() */

            //}, 100)

            ///////////////////////////////////////////////

            /* if (urlString.includes("https://drive.google.com")) {
                imgid = urlString.split('https://drive.google.com')[1].split('/')[3];
                dispImgName = imgid + ".png"
            } else {
                let name =  urlString.split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                dispImgName = imageName
            }
            checkIfImageExists('../images/map/cacheImages/' + dispImgName, (isExists) => {
                //console.log(imgPath, " --- ", isExists)
                if(isExists) {
                    console.log('Image exists - ', dispImgName)
                } else {
                    console.log('Image not exists - ', dispImgName)
                }
            }) */

            ///////////////////////////////////////////////
            var lastline = document.getElementById("loadingTxt").innerHTML.split('<br>')
            var prevMessage = ''
            for (var i=0; i<lastline.length; i++) {
                if(i < lastline.length-2) {
                    prevMessage += lastline[i] + "<br>";
                } else {
                    //prevMessage += '';
                }
            }
            var newMessage = "Publishing Images (" + (imageLoadedCount) + "/" + getAllImagesToPublish() + ")...<br>";
            document.getElementById("loadingTxt").innerHTML = prevMessage + newMessage;
            updateInfoTextView()
            ///////////////////////////////////////////////


            if(imageLoadedCount < AllImageCount) {
                imageLoadedCount++;
            } else {
                //globalStatus = true
                // Store the status to a cache object
                /* window.ldb.set(sheet_Id.toString() + '_published', 'true') */

                CheckImageStatus();

                pushVersionToServer();
                
                setTimeout(function() {
                    document.getElementById("loadingTxt").innerHTML += "All data published.<br>"
                    updateInfoTextView()

                    // Call PHP to save data to the json file
                    savePublishedStateToServer('true');
                }, 3000)
            }
        },
        error: function(e) {
            if(dispImgName != '') {
                document.getElementById("loadingTxt").innerHTML += "<font color='red'>ERROR: Missing Image " + dispImgName + ".</font><br>"
                updateInfoTextView()
            }

            if(imageLoadedCount < AllImageCount) {
                imageLoadedCount++;
            } else {
                /* window.ldb.set(sheet_Id.toString() + '_published', 'true') */

                CheckImageStatus();

                pushVersionToServer();
           
                setTimeout(function() {
                    document.getElementById("loadingTxt").innerHTML += "All data published.<br>"
                    updateInfoTextView()

                    // Call PHP to save data to the json file
                    savePublishedStateToServer('true');
                }, 3000) 
            }
        }
    })
    ///////////////////
    // Clear memory
    saveRequest.onreadystatechange = null;
    saveRequest.abort = null;
    saveRequest = null;
    ///////////////////
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function pushVersionToServer() {
    if(window.navigator.onLine == true) {
        let newVersion = 0
        $.each(settingDataList, function (index, row) {
            if(row['Name'] == 'Version') {
                console.log(row['Value'], " VERSION")
                newVersion = row['Value']
            }
        })

        //return;

        //let currentDate = new Date();
        //let date_str = moment(currentDate).format('MM/DD/YYYY-HH:mm:ss').toLocaleString();
        var updateRequest = $.ajax({
            url: 'pushSheet.php?version=' + Math.random(), 
            type:'POST', 
            data:{'id' : sheet_Id, 'sheetname' : 'Server', 'nVersion' : newVersion}, 
            cache: false, 
            // async: false,
            success: function (response) {
                console.log(response)
            }
        })
        ///////////////////
        // Clear memory
        updateRequest.onreadystatechange = null;
        updateRequest.abort = null;
        updateRequest = null;
        ///////////////////
    }
}

function cacheImage(tag, row_setting, rootFolder) {
    if(row_setting['Name'] == tag) {
        if(row_setting['Value'] != '') {
            if (row_setting['Value'].includes("https://drive.google.com")) {
                let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                // Cache Image
                /* let bgImage = new Image();
                bgImage.src = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999); */
                // // './sheets/' + sheet_Id + '/cacheImages/'

                // prev
                //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                checkIfImageExists(imagePath, (isExists) => {
                    if(isExists) {
                        //console.log('Caching '  + imgid + '.png')
                        let bgImage = new Image();
                        bgImage.src = imagePath;
                       /*  document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                        if(imgid != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView()
                        }
                    }
                })
                //document.body.appendChild(bgImage);
            } else {
                // Cache Image
                let name = row_setting['Value'].split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                // './sheets/' + sheet_Id + '/cacheImages/'
            
                // New Changes
                //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + Math.random();
                /* let bgImage = new Image();
                bgImage.src = imagePath */
                //document.body.appendChild(bgImage);

                //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                checkIfImageExists(imagePath, (isExists) => {
                
                    if(isExists) {
                        //console.log('Caching '  + imageName)
                        let bgImage = new Image();
                        bgImage.src = imagePath
                        /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imageName + ' does not exists in server cache.')
                        if(imageName != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView()
                        }
                    }
                })
            }
        }
        if(row_setting['Value ES'] != '') {
            if (row_setting['Value ES'].includes("https://drive.google.com")) {
                let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                // Cache Image
                // './sheets/' + sheet_Id + '/cacheImages/'

                // Prev
                //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                /* let bgImage = new Image();
                bgImage.src = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999); */
                //document.body.appendChild(bgImage);

                //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                checkIfImageExists(imagePath, (isExists) => {
                    if(isExists) {
                        //console.log('Caching '  + imgid + '.png')
                        let bgImage = new Image();
                        bgImage.src = imagePath;
                        /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                        if(imgid != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView()
                        }
                    }
                })

            } else {
                // Cache Image
                let name = row_setting['Value ES'].split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
            
                // New Changes
                // './sheets/' + sheet_Id + '/cacheImages/'

                // Prev
                //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + Math.random();

               /*  let bgImage = new Image();
                bgImage.src = imagePath */
                //document.body.appendChild(bgImage);

                //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                checkIfImageExists(imagePath, (isExists) => {
                    if(isExists) {
                        //console.log('Caching '  + imageName)
                        let bgImage = new Image();
                        bgImage.src = imagePath
                        /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imageName + ' does not exists in server cache.')
                        if(imageName != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView()
                        }
                    }
                })
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function CheckImageStatus() {
    let target = "live"
	let rootFolder = "../sheets/" + sheet_Id + "/" + target
  
    //var dailyEvent = eventsDataList; //filterAllEventsBasedOnDayTime();
    $.each(settingDataList, function (index_setting, row_setting) {
        cacheImage('BackgroundImage', row_setting, rootFolder);
      
        if(row_setting['Name'] == 'BackgroundImage') {
            if(row_setting['Value'] != '') {
                if (row_setting['Value'].includes("https://drive.google.com")) {
                    let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    /* let bgImage = new Image();
                    bgImage.src = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999); */
                    // // './sheets/' + sheet_Id + '/cacheImages/'

                    // prev
                    //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                    let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imgid + '.png')
                            let bgImage = new Image();
                            bgImage.src = imagePath;
                           /*  document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            if(imgid != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })
                    //document.body.appendChild(bgImage);
                } else {
                    // Cache Image
                    let name = row_setting['Value'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    
                    // New Changes
                    //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + Math.random();
                    /* let bgImage = new Image();
                    bgImage.src = imagePath */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                    checkIfImageExists(imagePath, (isExists) => {
                        
                        if(isExists) {
                            //console.log('Caching '  + imageName)
                            let bgImage = new Image();
                            bgImage.src = imagePath
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            if(imageName != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })
                }
            }
            if(row_setting['Value ES'] != '') {
                if (row_setting['Value ES'].includes("https://drive.google.com")) {
                    let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    // './sheets/' + sheet_Id + '/cacheImages/'

                    // Prev
                    //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                    let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    /* let bgImage = new Image();
                    bgImage.src = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999); */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imgid + '.png')
                            let bgImage = new Image();
                            bgImage.src = imagePath;
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            if(imgid != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value ES'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    // './sheets/' + sheet_Id + '/cacheImages/'

                    // Prev
                    //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + Math.random();

                   /*  let bgImage = new Image();
                    bgImage.src = imagePath */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imageName)
                            let bgImage = new Image();
                            bgImage.src = imagePath
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            if(imageName != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })
                }
            }
        }
        if(row_setting['Name'] == 'DefaultMapImage') {
            if(row_setting['Value'] != '') {
                if (row_setting['Value'].includes("https://drive.google.com")) {
                    let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    /* let bgImage = new Image();
                    bgImage.src = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999); */
                    //document.body.appendChild(bgImage);
                    // './sheets/' + sheet_Id + '/cacheImages/'

                    // Prev
                    //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                    let imagePath = rootFolder +  '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imgid + '.png')
                            let bgImage = new Image();
                            bgImage.src = imagePath;
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            if(imgid != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + Math.random();

                    /* let bgImage = new Image();
                    bgImage.src = imagePath; */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                    checkIfImageExists(imagePath, (isExists) => {
                        //console.log(isExists, " isExists map images ", ' ==== ', 'images/map/cacheImages/' + imageName)
                        if(isExists) {
                            let bgImage = new Image();
                            bgImage.src = imagePath;
                            //console.log('Caching '  + imageName)
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            if(imageName != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })
                }
            }

            if(row_setting['Value ES'] != '') {
                if (row_setting['Value ES'].includes("https://drive.google.com")) {
                    let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                    let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    /* let bgImage = new Image();
                    bgImage.src = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999); */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imgid + '.png')
                            let bgImage = new Image();
                            bgImage.src = imagePath
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            if(imgid != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })
                } else {
                    // Cache Image
                    let name = row_setting['Value ES'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + Math.random();

                    /* let bgImage = new Image();
                    bgImage.src = imagePath */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imageName)
                            let bgImage = new Image();
                            bgImage.src = imagePath
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            if(imageName != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })

                }
            }
        }

        if(row_setting['Name'] == 'SplashImageUrl') {
            if(row_setting['Value'] != '') {
                if (row_setting['Value'].includes("https://drive.google.com")) {
                    let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                    let imagePath = rootFolder +  + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                   /*  let bgImage = new Image();
                    bgImage.src = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999); */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imgid + '.png')
                            let bgImage = new Image();
                            bgImage.src = imagePath
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            if(imgid != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                    let imagePath = rootFolder +  + '/cacheImages/' + imageName + "?version=" + Math.random();

                    /* let bgImage = new Image();
                    bgImage.src = imagePath */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imageName)
                            let bgImage = new Image();
                            bgImage.src = imagePath
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            if(imageName != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })

                }
            }
            if(row_setting['Value ES'] != '') {
                if (row_setting['Value ES'].includes("https://drive.google.com")) {
                    let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                    let imagePath = rootFolder +  + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    /* let bgImage = new Image();
                    bgImage.src = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999); */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imgid + '.png')
                            let bgImage = new Image();
                            bgImage.src = imagePath
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            if(imgid != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value ES'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                    let imagePath = rootFolder +  + '/cacheImages/' + imageName + "?version=" + Math.random();

                    /* let bgImage = new Image();
                    bgImage.src = imagePath */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imageName)
                            let bgImage = new Image();
                            bgImage.src = imagePath
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            if(imageName != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })
                }
            }
        }
        if(row_setting['Name'] == 'TextImage') {
            if(row_setting['Value'] != '') {
                if (row_setting['Value'].includes("https://drive.google.com")) {
                    let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                    let imagePath = rootFolder +  + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    /* let bgImage = new Image();
                    bgImage.src = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999); */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imgid + '.png')
                            let bgImage = new Image();
                            bgImage.src = imagePath; 
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            if(imgid != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                    let imagePath = rootFolder +  + '/cacheImages/' + imageName + "?version=" + Math.random();

                    /* let bgImage = new Image();
                    bgImage.src = imagePath */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imageName)
                            let bgImage = new Image();
                            bgImage.src = imagePath
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            if(imageName != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })
                }
            }
            if(row_setting['Value ES'] != '') {
                if (row_setting['Value ES'].includes("https://drive.google.com")) {
                    let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                    let imagePath = rootFolder +  + '/cacheImages/' + imgid + '.png?version=' + Math.random();


                    /* let bgImage = new Image();
                    bgImage.src = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999); */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imgid + '.png')
                            let bgImage = new Image();
                            bgImage.src = imagePath
                           /*  document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            if(imgid != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value ES'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    // './sheets/' + sheet_Id + '/cacheImages/'
                    //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                    let imagePath = rootFolder +  + '/cacheImages/' + imageName + "?version=" + Math.random();

                    /* let bgImage = new Image();
                    bgImage.src = imagePath */
                    //document.body.appendChild(bgImage);

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imageName)
                            let bgImage = new Image();
                            bgImage.src = imagePath
                           /*  document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                            updateInfoTextView() */
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            if(imageName != '') {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                                updateInfoTextView()
                            }
                        }
                    })

                }
            }
        }
        
    })

    //for (var i=0; i<privateDataList.length; i++) {
    $.each(privateDataList, function (i, row_setting) {
        if(privateDataList[i]['Map Image'] != undefined) {
            if (privateDataList[i]['Map Image'].includes("https://drive.google.com")) {
                let imgid = privateDataList[i]['Map Image'].split('https://drive.google.com')[1].split('/')[3];
                let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                // Cache Image
                // './sheets/' + sheet_Id + '/cacheImages/'
                //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                let imagePath = rootFolder +  + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                /* let bgImage = new Image();
                bgImage.src = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999); */
                //document.getElementById('mapImageHolder').src = imagePath

                //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                checkIfImageExists(imagePath, (isExists) => {
                    if(isExists) {
                        //console.log('Caching '  + imgid + '.png')
                        let bgImage = new Image();
                        bgImage.src = imagePath
                        /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                        if(imgid != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView()
                        }
                    }
                })

            } else {
                // Cache Image
                let name = privateDataList[i]['Map Image'].split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                
                // New Changes
                // './sheets/' + sheet_Id + '/cacheImages/'
                //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + Math.random();

                /* let mapImage = new Image();
                //console.log(imagePath, " MAP Image>>>>>")
                mapImage.src = imagePath */
                //document.getElementById('mapImageHolder').src = imagePath
                //document.getElementById('mapImageHolder').src = imagePath

                //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                checkIfImageExists(imagePath, (isExists) => {
                    if(isExists) {
                        //console.log('Caching '  + imageName)
                        let mapImage = new Image();
                        mapImage.src = imagePath
                        /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imageName + ' does not exists in server cache.')
                        if(imageName != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView()
                        }
                    }
                })
            }
        }
    })
    // Caching Event Images
    //for (var j=0; j<dailyEvent.length; j++) {
    $.each(eventsDataList, function (j, row_setting) {
        if(eventsDataList[j].Image != '') {
            if (eventsDataList[j].Image.includes("https://drive.google.com")) {
                let imgid = eventsDataList[j].Image.split('https://drive.google.com')[1].split('/')[3];
                let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                // Cache Image
                // './sheets/' + sheet_Id + '/cacheImages/'
                //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + Math.random();

               /*  let bgImage = new Image();
                bgImage.src = 'images/map/cacheImages/' + imgid + '.png?vesion=' + Math.random(99999999999); */
                //document.body.appendChild(bgImage);
                
                //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                checkIfImageExists(imagePath, (isExists) => {
                    if(isExists) {
                        //console.log('Caching '  + imgid + '.png')
                        let bgImage = new Image();
                        bgImage.src = imagePath
                        /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                        if(imgid != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView()
                        }
                    }
                })
            } else {
                // Cache Image
                let name = eventsDataList[j].Image.split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                
                // New Changes
                // './sheets/' + sheet_Id + '/cacheImages/'
                //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + Math.random();

               /*  let bgImage = new Image();
                bgImage.src = imagePath */
                //document.body.appendChild(bgImage);
                
                //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                checkIfImageExists(imagePath, (isExists) => {
                    if(isExists) {
                        //console.log('Caching '  + imageName)
                        let bgImage = new Image();
                        bgImage.src = imagePath
                        /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imageName + ' does not exists in server cache.')
                        if(imageName != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView()
                        }
                    }
                })
            }
        }
        if(eventsDataList[j]['Map Image'] != '') {
            if (eventsDataList[j]['Map Image'].includes("https://drive.google.com")) {
                let imgid = eventsDataList[j]['Map Image'].split('https://drive.google.com')[1].split('/')[3];
                let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                // Cache Image
                // './sheets/' + sheet_Id + '/cacheImages/'
                //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                /* let bgImage = new Image();
                bgImage.src = 'images/map/cacheImages/' + imgid + '.png?vesion=' + Math.random(99999999999); */
                //document.body.appendChild(bgImage);
                
                //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                checkIfImageExists(imagePath, (isExists) => {
                    if(isExists) {
                        //console.log('Caching '  + imgid + '.png')
                        let bgImage = new Image();
                        bgImage.src = imagePath
                        /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                        if(imgid != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView()
                        }
                    }
                })
            } else {
                // Cache Image
                let name = eventsDataList[j]['Map Image'].split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                
                // New Changes
                // './sheets/' + sheet_Id + '/cacheImages/'
                //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + Math.random();

                /* let bgImage = new Image();
                bgImage.src = imagePath */
                //document.body.appendChild(bgImage);
                
                //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                checkIfImageExists(imagePath, (isExists) => {
                    if(isExists) {
                        //console.log('Caching '  + imageName)
                        let bgImage = new Image();
                        bgImage.src = imagePath
                       /*  document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imageName + ' does not exists in server cache.')
                        if(imageName != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView()
                        }
                    }
                })
            }
        }
    })
    // Caching kiosks data
    $.each(kioskDataList, function (j, row_setting) {
        if(kioskDataList[j].Image != '') {
            if (kioskDataList[j].Image.includes("https://drive.google.com")) {
                let imgid = kioskDataList[j].Image.split('https://drive.google.com')[1].split('/')[3];
                let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                // Cache Image
                // './sheets/' + sheet_Id + '/cacheImages/'
                //let imagePath = '../images/map/cacheImages/' + imgid + '.png?version=' + Math.random();
                let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                /* let bgImage = new Image();
                bgImage.src = 'images/map/cacheImages/' + imgid + '.png?vesion=' + Math.random(99999999999); */
                //document.body.appendChild(bgImage);
                
                //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                checkIfImageExists(imagePath, (isExists) => {
                    if(isExists) {
                        //console.log('Caching '  + imgid + '.png')
                        let bgImage = new Image();
                        bgImage.src = imagePath
                        /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                        if(imgid != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView()
                        }
                    }
                })
            } else {
                // Cache Image
                let name = kioskDataList[j].Image.split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                
                // New Changes
                // './sheets/' + sheet_Id + '/cacheImages/'
                //let imagePath = '../images/map/cacheImages/' + imageName + "?version=" + Math.random();
                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + Math.random();

                /* let bgImage = new Image();
                bgImage.src = imagePath */
                //document.body.appendChild(bgImage);
                
                //let isExists = checkIfImageExists('images/map/cacheImages/' + imageName)
                checkIfImageExists(imagePath, (isExists) => {
                    if(isExists) {
                        //console.log('Caching '  + imageName)
                        let bgImage = new Image();
                        bgImage.src = imagePath
                       /*  document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imageName + ' from server.<br>'
                        updateInfoTextView() */
                    } else {
                        //console.log('Error: '  + imageName + ' does not exists in server cache.')
                        if(imageName != '') {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView()
                        }
                    }
                })
            }
        }
    })
}