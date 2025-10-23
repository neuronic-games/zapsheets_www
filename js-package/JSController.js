///////////////////////////////////////////////////////////////////////////////////////////
// All global vars 
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
// For Force Reload
let forceReload = false;
let backgroundLoaded = false;
let onNewDevice = false;
let daillyEventsAll = []
let dailyEventsOnly = []
var slideStatus = "stop"
var timerCount = 0
let splashTime;
let idleFrom = ''
let idleTime;
let idleTimeOut = 60 // Idle threshold 3 MINS
let idleStatus = false
let privateDataList = []
let eventsDataList = []
let kioskDataList = []
let sheet_Name = ''
let splash_img = ''
let splashDelaySec = 0
// For version
let currentVersion = ''
let slideShowLoaded = false;
let backgroundWorker = null;
let activeMenuOption = ''
let events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
let settingDataList = []
var game_action = ''
let isJson;
let isJSONData;
let isToggle = false;
let movePinToEnd = []
let movePinToTop = []
let currentSheetVersion = 0;
let RefreshAppVersionTime = 10; // Default time

let deviceUID = null
let systemMemoryUsed = ''
let systemName = ''
var errorMessage = []
var cacheFirst = true;

var mapVersionNum = 0
var settingVersion = 0
// Controller version
let controllerVerion = 5
let appDataLoaded = false;
let homeLoader = ''
///////////////////////////////////////////////////////////////////////////////////////////
// Getting current App version (version.js)
function getCurrentLiveVersion() {
    var newScript = document.createElement('script');
    newScript.id = 'map_version';
    newScript.type = 'text/javascript';
    newScript.src = './js-package/version.js?version=' + UIVersion;
    document.getElementsByTagName('head')[0].appendChild(newScript);
}
///////////////////////////////////////////////////////////////////////////////////////////
// Getting current App module working (mainMain.js)
function getCurrentMapMainVersion() {
    var mapScript = document.createElement('script');
    mapScript.id = 'map_Script';
    mapScript.type = 'text/javascript';
    mapScript.src = './js-package/mapMain.js?version=' + UIVersion;
    mapScript.onload = checkLoadStat()
    document.getElementsByTagName('head')[0].appendChild(mapScript);
}
///////////////////////////////////////////////////////////////////////////////////////////
/**
 * 
 */
function checkLoadStat() {

}
///////////////////////////////////////////////////////////////////////////////////////////
let currentRunningVersion = 0;
checkVersion();
///////////////////////////////////////////////////////////////////////////////////////////
/**
 * checkVersion
 */
function checkVersion() {
    if(window.navigator.onLine == true) {
        // Version files
        getCurrentLiveVersion();
        // Game file
        getCurrentMapMainVersion();
    } else {
        // Version files
        getCurrentLiveVersion();
        // Game file
        getCurrentMapMainVersion();
    }

    setTimeout(function() {
        currentRunningVersion = _version;
        periodicVersion = _version;
        checkAppVersionStatus()
    }, 4000)
}
///////////////////////////////////////////////////////////////////////////////////////////
/**
 * 
 */
function checkAppVersionStatus() {
    let versionPeriodicTimer = setTimeout(function() {
        clearTimeout(versionPeriodicTimer)
        if(_version != currentRunningVersion) {
            currentRunningVersion = _version
        }
        checkAppVersionStatus();
    }, RefreshAppVersionTime * 1000)
}
////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 
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
//////////////////////////////////////////////////////////////////////////////////////////
