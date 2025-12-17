////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// For Refresh the page
///////////////////////////////////////////////////////////////////////////////////////////
function getCurrentVersion() {
    if(window.navigator.onLine == true) {
        // Loading version.js dynamically for [mac fix]
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = './js-package/version.js?version=' + UIVersion
        document.getElementsByTagName('head')[0].appendChild(newScript);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////
/**
 * Hide Splash screen
 */
function HideSplashScreen() {
    if(backgroundLoaded == false){return}
    document.getElementById("splashScreen").style.opacity = 0;
    document.getElementById("splashScreen").style.transition = "all 0.5s";
    let elementSplash = document.getElementById('splashScreen');
    elementSplash.addEventListener("transitionend", () => {
        document.getElementById('splashScreen').style.display = 'none'
        document.getElementById('splashScreen').style.opacity = 0
        document.getElementById('splashScreen').style.overflow = "hidden"
    });
    let detectDeviceType = () =>
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            ? 'Mobile'
            : 'Desktop';
    if(detectDeviceType() == 'Desktop') {
        document.getElementById('defaultBG').style.display = 'block'
    } else {
        document.getElementById('defaultBG').style.display = 'block'
    }
    setTimeout(function() {
        if(document.getElementById("splashScreen").style.opacity == 1) {
            slideStatus = "active"
        } else {
            if(idleStatus == true) {
            slideStatus = "cycling"
            } else {
            slideStatus = "active"
            }
        }
        document.getElementById('splashScreen').style.display = 'none'
        document.getElementById('splashScreen').style.opacity = 0
        document.getElementById('splashScreen').style.overflow = "hidden"
    }, 550)
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Hide Event Screen
 * @returns 
 */
function HideEventScreen() {
    document.getElementById("eventScreen").style.opacity = 0;
    document.getElementById("eventScreen").style.transition = "all 0.5s";
    let elementSplash = document.getElementById('eventScreen');
    elementSplash.addEventListener("transitionend", () => {
    document.getElementById('eventScreen').style.display = 'none'
    document.getElementById('eventScreen').style.opacity = 0
    document.getElementById('eventScreen').style.overflow = "hidden"
    });
    setTimeout(function() {
        if(document.getElementById("eventScreen").style.opacity == 1) {
            slideStatus = "active"
        } else {
            if(idleStatus == true) {
            slideStatus = "cycling"
            } else {
            slideStatus = "active"
            }
        }
        document.getElementById('eventScreen').style.display = 'none'
        document.getElementById('eventScreen').style.opacity = 0
        document.getElementById('eventScreen').style.overflow = "hidden"

    }, 550)
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Show Splash screen
 */
function ShowSplashScreen() {
    document.getElementById('splashScreen').style.display = 'flex'
    document.getElementById("splashScreen").style.opacity = 1;
    document.getElementById("splashScreen").style.transition = "all 0.5s";
    let elementSplash = document.getElementById('splashScreen');
    elementSplash.addEventListener("transitionend", () => {
        document.getElementById('splashScreen').style.display = 'flex'
        document.getElementById('splashScreen').style.overflow = "hidden"
    });
    if(splashDelaySec > 0) {
        splashTime = setTimeout(HideSplashTime, (splashDelaySec * 1000))
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Show event screen
 */
function ShowEventScreen() {
    document.getElementById('eventScreen').style.display = 'flex'
    document.getElementById("eventScreen").style.opacity = 1;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Window event listener
 */
window.addEventListener('keydown', onCheckingUserData)
function onCheckingUserData() {
    if (event.key === 'Enter') {
        checkUserFillData()
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function getBrowserType() {
    let bType = ''
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
      bType = 'Opera'
    } else if (navigator.userAgent.indexOf("Edg") != -1) {
      bType = 'Edge'
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      bType = 'Chrome'
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      bType = 'Safari'
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      bType = 'Firefox'
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        bType = 'IE'
    } else {
      bType = 'unKnown'
    }
    return bType;
}
//////////////////////
// Checking iOS devices
function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function getDeviceType() {
    let dType;
    if(iOS()){
        dType = true;
    } else {
        dType = false;
    }
    return dType;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Checking open browser stats
 */
if (window.performance) {
    /* if (performance.navigation.type == 1) {
        // For loading cache always
        if(sheet_Id != undefined) {
        }
        loadType = "refresh"
    } else {
        if(sheet_Id != undefined) {
        }
        loadType = "normal"
    } */
   loadType = "refresh"
}
//////////////////////////////////////////////////////////////////////////////////////////////////
// Slick Slide
function checkSlickStatus() {
    let slickStatusTimer = setTimeout(function() {
        clearTimeout(slickStatusTimer)
        if(timerCount == 2) {
            slideStatus = "active"
            timerCount = 0
        }
        timerCount++
        checkSlickStatus()
    }, 7000)
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * update slideshow timer
 */
function updateSlideshowTimer() {
    let sliderTimerEvent = setTimeout(function() {
        clearTimeout(sliderTimerEvent)
        var nDate = moment(new Date()).format("h:mm A")
        document.getElementById('sliderDate').innerHTML = nDate;
        updateSlideshowTimer()
        // Activate when needed
        //updateSlidesEventStatus()
        updateEventsListStatus() 
        //RemoveAndRecreate()
    }, 1000)
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Remove and recreate slick slide
 * No needed here for now
 */
function RemoveAndRecreate() {
    //const removeReCreate = setTimeout(function() {
    let removeReCreate = setTimeout(function() {
    clearTimeout(removeReCreate)
        RefreshAllSlides()
        updateSlidesEventStatus()
        //RemoveAndRecreate()
    }, 60 * 1000)
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Refreshing all slick slides
 * No needed here for now
 */
function RefreshAllSlides() {
    //console.log("Slider refresh")
    renderSliderItems()
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Splash time
 */
/* let splashTime; */
function HideSplashTime() {
    clearTimeout(splashTime)
    //console.log("Hide Splash Screen")
    if(MODE_TYPE == 'list') {
    idleFrom = 'list'
    } else {
    idleFrom = ''
    }
    HideSplashScreen()
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * IDLE TIMEOUT
 */
// Event to check for
events.forEach(function (name) {
    document.addEventListener(name, resetIdleTimer, true);
});
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * idle out function
 * @returns 
 */
function idleOut() {
    if(eventsDataList == undefined || eventsDataList == 'undefined' || eventsDataList == null) {
        idleTime = setTimeout(idleOut, (idleTimeOut * 1000))
        return;
    }
    if(idleTimeOut == "" || game_action == 'sync') {return}
    idleStatus = true
    clearTimeout(idleTime);
    if(MODE_TYPE == "slideshow" || MODE_TYPE == 'list') {
        if(MODE_TYPE == 'list') {
            idleFrom = 'list'
        } else {
            idleFrom = ''
        }
        let enable_Screensaver = 'FALSE';
        $.each(settingDataList, function (index, row) {
            if(row["Name"] == "EnableScreensaver") {
                enable_Screensaver = row['Value']
            }
        })
        if(idleStatus) {
            // Show default map
            setActiveMenu(null, -1)
            if(enable_Screensaver == 'TRUE') {
                if(activeMenuOption == 'directory') {
                    setActiveDirectory('events')
                } else {
                    setActiveDirectory('directory')
                }
            } else {
                setActiveDirectory('directory')
            }
        }
    }
    idleTime = setTimeout(idleOut, (idleTimeOut * 1000))
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Restart idle timer
 */
function resetIdleTimer() {
    if(idleStatus == true || idleStatus == undefined) {
        idleStatus = false
        slideStatus = "active"
        HideSplashScreen()
        // setTo default
        setActiveMenu(null, -1)
        setActiveDirectory('directory')
    }
    clearTimeout(idleTime);
    idleTime = setTimeout(idleOut, (idleTimeOut * 1000))
}
/////////////////////////////////////////////////////////////////////////////////////
/**
 * function to get the url variables passed in url
 * @returns 
 */
/* function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
    }
    return vars;
} */
/////////////////////////////////////////////////////////////////////////////
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
    document.getElementById("loadingTxt").scrollTop += 100;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function used to get the app provate data from sheet
 */
function getGamesPrivateData() {
  
    let rootFolder = "../sheets/" + sheet_Id + "/" + target;

    setTimeout(function() {
    // iOS Fix
    var cookiesStat = checkCookieStatus();
    if(cookiesStat) {
        if(loadType == "normal") {
            document.getElementById("loadingTxt").innerHTML += "Loading Directory From Cache..<br>"
            updateInfoTextView();
            setTimeout(function() {
                // Check for username passed from querystring else set the username from sheet data
                privateLoaded = true
                checkUserQueryString()
            }, 1000)
        } else {
            //document.getElementById("loadingTxt").innerHTML += window.navigator.onLine == true ? "Loading Directory From Server..<br>" : "Loading Directory From Local Cache..<br>"
            if(mapVersionNum == settingVersion) {
                document.getElementById("loadingTxt").innerHTML += "Loading Directory From Local Cache..<br>"
            } else {
                document.getElementById("loadingTxt").innerHTML += "Loading Directory From Server..<br>"
            }
            updateInfoTextView()

            var directoryRequest = $.ajax({ 
                //url: "sheets/" + sheet_Id + "/directory.json?version=" + currentSheetVersion,
                url: rootFolder + "/directory.json?version=" + UIVersion, 
                cache: true,
                type: 'GET',
                dataType: "text",
                success: function (response) {
                    if(response == '' || response.length == 0) {
                        privateLoaded = true
                        document.getElementById("loadingTxt").innerHTML += "<font color='red'>Error: No map directory data available.</font><br>"
                        updateInfoTextView()
                        checkUserQueryString();
                        return
                    }
                    privateDataList = []
                    var mResponse = response.replace(/�/g, "")
                    var newPrivateData = eval(mResponse)
                    for(var i=0; i<newPrivateData.length; i++) {
                        var privateDataString = JSON.stringify(newPrivateData[i]);
                        if(isJSONData(privateDataString) == false) {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Directory Sheet : (Row: ' + i + ")</font><br>"
                            updateInfoTextView()
                        } else {
                            privateDataList[i] = isJSONData(privateDataString)
                        }
                    }
                    privateLoaded = true
                    //console.log(privateDataList, '...')
                    //console.log('check query string....')
                    checkUserQueryString()
                }
            })
            // Clear memory
            directoryRequest.onreadystatechange = null;
            directoryRequest.abort = null;
            directoryRequest = null;
        }
    } else {
        //document.getElementById("loadingTxt").innerHTML += window.navigator.onLine == true ? "Loading Directory From Server..<br>" : "Loading Directory From Local Cache..<br>"
        if(mapVersionNum == settingVersion) {
            document.getElementById("loadingTxt").innerHTML += "Loading Directory From Local Cache..<br>"
        } else {
            document.getElementById("loadingTxt").innerHTML += "Loading Directory From Server..<br>"
        }
        updateInfoTextView()
        var directoryRequest = $.ajax({ 
        url: rootFolder + "/directory.json?version=" + UIVersion,
        cache: true,
        type: 'GET',
        dataType: "text",
        success: function (response) {
            if(response == '' || response.length == 0) {
                privateLoaded = true
                document.getElementById("loadingTxt").innerHTML += "<font color='red'>Error: No map directory data available.</font><br>"
                updateInfoTextView()
                return
            }
            privateDataList = []
            var mResponse = response.replace(/�/g, "")
            var newPrivateData = eval(mResponse)
            for(var i=0; i<newPrivateData.length; i++) {
                var privateDataString = JSON.stringify(newPrivateData[i]);
                if(isJSONData(privateDataString) == false) {
                    document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Directory Sheet : (Row: ' + i + ")</font><br>"
                    updateInfoTextView()
                } else {
                    privateDataList[i] = isJSONData(privateDataString)
                }
            }
            // Check for username passed from querystring else set the username from sheet data
            privateLoaded = true
            checkUserQueryString()
        }
        })
        // Clear memory
        directoryRequest.onreadystatechange = null;
        directoryRequest.abort = null;
        directoryRequest = null;
    }
    }, 100)
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function tp load Setting from spreadsheet
 */
function getGamesSettingData() {
    //console.log("GET SETTINGS DATA")
    // showing message
    //return
  
  let rootFolder = "../sheets/" + sheet_Id + "/" + target;

    document.getElementById("loadingTxt").innerHTML += "Checking Settings..<br>"
    updateInfoTextView()
    setTimeout(function() {
        var cookieStat = checkCookieStatus();
        if(cookieStat) {
            if(loadType == "normal") {
                // In case if any image missing during initial download
                //PreloadAllImages();
                document.getElementById("loadingTxt").innerHTML += "Loading Images From Cache..<br>"
                updateInfoTextView()
                setTimeout(function() {
                    PreloadAllToCache();
                }, 10)
                setTimeout(function() {
                    document.getElementById("loadingTxt").innerHTML += "Checking Settings Cache..<br>"
                    updateInfoTextView()
                }, 1500)
                setTimeout(function() {
                    settingLoaded = true
                    // showing message
                    document.getElementById("loadingTxt").innerHTML += "Loading Settings From Cache..<br>"
                    updateInfoTextView()
                    // Show Setting data to the log
                    splash_img = ''
                    splashDelaySec = 5
                    idleTimeOut = 60
                    currentVersion = ''
                    $.each(settingDataList, function (index, row) {
                        if(row["Name"] == "SplashImageUrl") {
                            if(row["Value"] == "" || row["Value"] == undefined) {
                                //splash_img = "./images/earshot-games_splash.png";
                            } else {
                                let imgPath = ""
                                if(window.navigator.onLine == true) {
                                    if (row["Value"].includes("https://drive.google.com")) {
                                        imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                                        imgPath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion;

                                    } else {
                                        let name = row["Value"].split('/')
                                        let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                                        let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                                        imgPath = imagePath;
                                    }
                                } else {
                                    if (row["Value"].includes("https://drive.google.com")) {
                                        imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                                        imgPath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion
                                    } else {
                                        let name = row["Value"].split('/')
                                        let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                                        let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                                        imgPath = imagePath;
                                    }
                                }
                                if(imgPath == '') {
                                    let name = row["Value"].split('/')
                                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                                    splash_img = imagePath
                                } else {
                                    splash_img = imgPath
                                }
                            }
                        }
                        if(row["Name"] == "SplashImageDelaySec") {
                            splashDelaySec = row["Value"]
                        }
                        if(row["Name"] == "TimeoutSec") {
                            idleTimeOut = row["Value"]
                            if(idleTimeOut == '') {
                                idleTimeOut = 60
                            }
                        }

                        // Add Language toggle option if defined
                        if(row["Name"] == "AddLanguage") {
                            if(row["Value"] == "" || row["Value"] == undefined) {
                                row["Value"] = ""
                            }
                            addLanguage = row["Value"]
                        }
                        // Add Language toggle option if defined
                        if(row["Name"] == "AddLanguage") {
                            if(row["Value"] == "" || row["Value"] == undefined) {
                                row["Value"] = ""
                            }
                            addLanguage = row["Value"]
                        }
                        if(row["Name"] == "Layout") {
                            if(row["Value"] == "" || row["Value"] == undefined) {
                                //row["Value"] = "Basic Horizontal"
                                row["Value"] = "Horizontal with Event Slider"
                            }
                            activeLayout = row["Value"]
                            var head  = document.getElementsByTagName('head')[0];
                            var link  = document.createElement('link');
                            link.rel  = 'stylesheet';
                            link.type = 'text/css';
                            link.href = 'layout/' + row["Value"] + '/style.css?version=11';
                            link.media = 'all';
                            head.appendChild(link);
                            setTimeout(function() {
                                // Load list at start
                                //getGamesPrivateData()
                                getMapKioskData()
                            }, 1000)
                        }
                        // For PollTime
                        if(row["Name"] == "PollTime") {
                            if(row["Value"] != "" || row["Value"] != undefined) {
                                pollTime = row["Value"]
                            }
                        }
                        // For Version
                        if(row["Name"] == "Version" && row["Name"] != undefined) {
                            console.log("VERSION HERE 1")
                        }
                    
                    })
                    // Set splash image from sheet
                    resetIdleTimer()
                    //console.log("HERE")
                    document.getElementById("splashImg").src = splash_img
                    // Center Logic
                    setTimeout(function(){
                        let img = new Image()
                        img.src = splash_img
                        img.onload = function() {
                            //console.log(this.width + 'x' + this.height);
                            let xDiff = 0
                            let yDiff = 0
                            if(this.width > window.innerWidth) {
                                xDiff = (window.innerWidth - this.width)/2
                            }
                            if(this.height > window.innerWidth) {
                                yDiff = (window.innerHeight - this.height)/2
                            }
                        }
                    }, 100)
                }, 2000)
            } else {
                //console.log("IN REFRESH")
                var settingRequest = $.ajax({ 
                    //url: 'sheets/' + sheet_Id + "/settings.json?version=" + currentSheetVersion,
                    url: rootFolder + "/settings.json?version=" + UIVersion,
                    cache: true,
                    type: 'GET',
                    dataType: "text",
                    error: function(e) {
                        document.getElementById("loadingTxt").innerHTML += "<font color='red'>Error: Map data not published.</font><br>"
                        updateInfoTextView()
                        fetchSheetDetailsPeriodically();
                        return
                    },
                    success: function (response) {
                        if(response == "" || response.length == 0) {
                            //checkUserQueryString()
                            document.getElementById("loadingTxt").innerHTML += "<font color='red'>Error: No settings data available.</font><br>"
                            updateInfoTextView()
                            return
                        }
                        settingDataList = []
                        var mResponse = response.replace(/�/g, "")
                        var newSettingsData = eval(mResponse)
                        for(var i=0; i<newSettingsData.length; i++) {
                            var settingsDataString = JSON.stringify(newSettingsData[i]);
                            if(isJSONData(settingsDataString) == false) {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Settings Sheet : (Row: ' + i + ")</font><br>"
                                updateInfoTextView()
                            } else {
                                settingDataList[i] = isJSONData(settingsDataString)
                            }
                        }

                        //document.getElementById("loadingTxt").innerHTML += window.navigator.onLine == true ? "Loading Settings From Server..<br>" : "Loading Settings From Local Cache..<br>"
                        updateInfoTextView()

                        settingLoaded = true
                        splash_img = ''
                        splashDelaySec = 5
                        idleTimeOut = 60
                        currentVersion = ''
                        $.each(settingDataList, function (index, row) {
                            if(row["Name"] == "SplashImageUrl") {
                                if(row["Value"] == "" || row["Value"] == undefined) {
                                    //splash_img = "./images/earshot-games_splash.png";
                                } else {
                                    let imgPath = ""
                                    if(window.navigator.onLine == true) {
                                        if (row["Value"].includes("https://drive.google.com")) {
                                            imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                                            imgPath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion;

                                        } else {
                                            let name = row["Value"].split('/')
                                            let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                                            let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion

                                            imgPath = imagePath;
                                        }
                                    } else {
                                        if (row["Value"].includes("https://drive.google.com")) {
                                            imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                                            imgPath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion
                                        } else {
                                            let name = row["Value"].split('/')
                                            let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                                            let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                                            imgPath = imagePath;
                                        }
                                    }
                                    if(imgPath == '') {
                                        let name = row["Value"].split('/')
                                        let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                                        let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                                        splash_img = imagePath
                                    } else {
                                        splash_img = imgPath
                                    }
                                }
                            }
                            if(row["Name"] == "SplashImageDelaySec") {
                                splashDelaySec = row["Value"]
                            }
                            if(row["Name"] == "TimeoutSec") {
                                idleTimeOut = row["Value"]
                                if(idleTimeOut == '') {
                                    idleTimeOut = 60
                                }
                                // Load list at start
                                //getGamesPrivateData()
                            }
                            // Add Language toggle option if defined
                            if(row["Name"] == "AddLanguage") {
                                if(row["Value"] == "" || row["Value"] == undefined) {
                                    row["Value"] = ""
                                }
                                addLanguage = row["Value"]
                            }
                            if(row["Name"] == "Layout") {
                                if(row["Value"] == "" || row["Value"] == undefined) {
                                    //row["Value"] = "Basic Horizontal"
                                    row["Value"] = "Horizontal with Event Slider"
                                } 
                                activeLayout = row["Value"]
                                // CHANGES MADE TO ADJUST THE LAYOUTS
                                // Load the css from the layout folder
                                var head  = document.getElementsByTagName('head')[0];
                                var link  = document.createElement('link');
                                link.rel  = 'stylesheet';
                                link.type = 'text/css';
                                link.href = './layout/' + row["Value"] + '/style.css?version=' + UIVersion;
                                link.media = 'all';
                                head.appendChild(link);
                            }
                            // For PollTime
                            if(row["Name"] == "PollTime") {
                                if(row["Value"] != "" || row["Value"] != undefined) {
                                    pollTime = row["Value"]
                                }
                            }
                            // For Version
                            if(row["Name"] == "Version" && row["Name"] != undefined) {
                                // Store version
                                settingVersion = row["Value"]
                                ////////////////////////////////////////
                                if(window.ldb != undefined) {
                                    window.ldb.get('mapVersion', function (value) {
                                        if(value == null) {
                                            window.ldb.set('mapVersion', row["Value"])
                                            mapVersionNum = row["Value"]
                                        } else {
                                            if(value != settingVersion) {
                                                window.ldb.set('mapVersion', row["Value"])
                                            } else {
                                                mapVersionNum = value
                                            }
                                        }
                                    })
                                } else {
                                    console.log("ELSE")
                                    window.ldb.set('mapVersion', row["Value"])
                                    mapVersionNum = row["Value"]
                                }
                                ///////////////////////////////////////

                                setTimeout(function() {
                                    //console.log("getting kiosk data...")
                                    getMapKioskData()
                                }, 1000)
                            }
                        })

                        ////////////////////////////////////////////////////////
                        // Change Message
                        window.ldb.get('mapVersion', function (value) {
                            mapVersionNum = value
                            if(mapVersionNum == settingVersion) {
                                document.getElementById("loadingTxt").innerHTML += "Loading Settings From Local Cache..<br>"
                                document.getElementById('versionText').innerHTML = '[' + controllerVerion + ' - ' + _version + ' - ' + settingVersion +']'
                            } else {
                                document.getElementById("loadingTxt").innerHTML += "Loading Settings From Server..<br>" 
                                document.getElementById('versionText').innerHTML = '' + controllerVerion + ' - ' + _version + ' - ' + settingVersion +''
                            }
                        })
                        ////////////////////////////////////////////////////////

                        resetIdleTimer()
                        document.getElementById("splashImg").src = splash_img
                        setTimeout(function(){
                            let img = new Image()
                            img.src = splash_img
                            img.onload = function() {
                                let xDiff = 0
                                let yDiff = 0
                                if(this.width > window.innerWidth) {
                                    xDiff = (window.innerWidth - this.width)/2
                                }
                                if(this.height > window.innerWidth) {
                                    yDiff = (window.innerHeight - this.height)/2
                                }
                            }
                        }, 100)
                    }
                })
                // Clear memory
                settingRequest.onreadystatechange = null;
                settingRequest.abort = null;
                settingRequest = null;
            }
        } else {
            //console.log("SHOW COOKIES MESSAGE AND BUTTON TO CONTINUE")
            // showing message
            document.getElementById("loadingTxt").innerHTML += "Browser cookies disabled. Enable it for best experience.<br>"
            updateInfoTextView()
            document.getElementById("btnCont").style.display = 'inline-block'
            let detectDeviceType = () =>
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            ? 'Mobile'
            : 'Desktop';
            if(detectDeviceType() == 'Desktop') {
                document.getElementById('spinningLoader').style.top = '47vh; !important'
            } else {
                document.getElementById('spinningLoader').style.top = '47vh; !important'
            }
        }
    }, 1000)
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function to get kiosk data from the spreadsheet
 */
function getMapKioskData() {
    let rootFolder = "../sheets/" + sheet_Id + "/" + target;

    //console.log("Now try to load kiosk data")
    document.getElementById("loadingTxt").innerHTML += "Checking Kiosks..<br>"
    updateInfoTextView()
    setTimeout(function(){
        var cookieStat = checkCookieStatus();
        if(cookieStat) {
            if(loadType == "normal" /* && currentVersion == 'Same' */) {
                document.getElementById("loadingTxt").innerHTML += "Checking Kiosks Cache..<br>"
                updateInfoTextView()
            } else {
                if(mapVersionNum == settingVersion) {
                    document.getElementById("loadingTxt").innerHTML += "Loading Kiosks From Local Cache..<br>"
                } else {
                    document.getElementById("loadingTxt").innerHTML += "Loading Kiosks From Server..<br>";
                }
                updateInfoTextView()
                var kioskRequest = $.ajax({ 
                    url: rootFolder + "/kiosks.json?version=" + UIVersion, 
                    cache: true,
                    type: 'GET',
                    dataType: "text",
                    success: function (response) {
                        if(response == "" || response.length == 0) {
                            //checkUserQueryString()
                            document.getElementById("loadingTxt").innerHTML += "No kiosks data available ..<br>"
                            updateInfoTextView()
                            return
                        }
                        kioskDataList = []
                        var mResponse = response.replace(/�/g, "")
                        var newKiosksData = eval(mResponse)
                        for(var i=0; i<newKiosksData.length; i++) {
                            var kiosksDataString = JSON.stringify(newKiosksData[i]);
                            if(isJSONData(kiosksDataString) == false) {
                                document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Kiosks Sheet : (Row: ' + i + ")</font><br>"
                                updateInfoTextView()
                            } else {
                                kioskDataList[i] = isJSONData(kiosksDataString)
                            }
                        }
                        //console.log('GET GAME PRIVATE DATA...')
                        getGamesPrivateData()
                    }
                })
                // Clear memory
                kioskRequest.onreadystatechange = null;
                kioskRequest.abort = null;
                kioskRequest = null;
            }
        } else {
            
            // showing message
            if(mapVersionNum == settingVersion) {
                document.getElementById("loadingTxt").innerHTML += "Loading Kiosks From Local Cache..<br>"
            } else {
                document.getElementById("loadingTxt").innerHTML += "Loading Kiosks From Server..<br>"
            }
            updateInfoTextView()
            var kioskRequest = $.ajax({ 
                url: rootFolder + "/kiosks.json?version=" + UIVersion,
                cache: true, 
                type: 'GET',
                dataType: "text",
                success: function (response) {
                    if(response == "") {
                        //checkUserQueryString()
                        document.getElementById("loadingTxt").innerHTML += "No kiosks data available ..<br>"
                        updateInfoTextView()
                        return
                    }
                    if(response == '' || response.length == 0) {
                        privateLoaded = true
                        //checkUserQueryString()
                        document.getElementById("loadingTxt").innerHTML += "No kiosks data available ..<br>"
                        updateInfoTextView()
                        return
                    }
                    kioskDataList = []
                    var mResponse = response.replace(/�/g, "")
                    var newKiosksData = eval(mResponse)
                    for(var i=0; i<newKiosksData.length; i++) {
                        var kiosksDataString = JSON.stringify(newKiosksData[i]);
                        //newstr += JSON.stringify(isJSON(pp))
                        if(isJSONData(kiosksDataString) == false) {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Kiosks Sheet : (Row: ' + i + ")</font><br>"
                            updateInfoTextView()
                        } else {
                            kioskDataList[i] = isJSONData(kiosksDataString)
                        }
                    }
                    getGamesPrivateData()
                }
            })
            // Clear memory
            kioskRequest.onreadystatechange = null;
            kioskRequest.abort = null;
            kioskRequest = null;
        }
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////
// Getting return message from backgroundAPI worker
//////////////////////////////////////////////////////////////////////////////////////////////////
function getMLocalMachinInformation() {
    if(window.navigator.onLine == true) {
        // $.ajax({
        //     url: 'getMachineInfo.php', 
        //     type:'POST', 
        //     cache: false, 
        //     // async: false,
        //     success: function (response) {
        //         console.log(response)
        //         if(response != '' || response != null || response != undefined) {
        //             //systemMemoryUsed = response.split('-B-')[0];
        //             //console.log(response.split('-B-'), " --- ")
        //             //systemName = response.split('-B-')[1];
        //             systemName = response;
        //         }
        //     }
        // })
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Window onload function
 */


$(document).ready(function() {
    deviceUID = md5(new DeviceUUID().get()).toString();
    // To generate randome UUID
    //console.log(window.crypto.randomUUID(), " --- ")
    /////////////////////////////////////////////////////////
    // Fetch Machin info
    //getMLocalMachinInformation()
    ////////////////////////////////////////////////////////
    sheet_Id = getUrlVars()["id"];
    target = getUrlVars()["target"] ? getUrlVars()["target"] : 'live';
    setVersion_Id = (getUrlVars()["publish_id"]) ? getUrlVars()["publish_id"].split('/')[0] : 'undefined';
    getKiosk_Num = (getUrlVars()["kiosk"]) ? getUrlVars()["kiosk"].split('/')[0] : '1';
    ////////////////////////////////////////////////////////
    // Store values
    //getSetSheetAndKiosk()
    ////////////////////////////////////////////////////////
    loadType = 'refresh'
    if(loadType == 'refresh') {
        // if(sheet_Id == '') {
        //     document.getElementById("loadingTxt").innerHTML += "<font color='red'>Error: Sheet Id not defined.</font><br>"
        //     updateInfoTextView()
        //     return
        // }
       if(sheet_Id == '') {
        checkUserQueryString();
        return
       }
        forceReload = true;
        ReloadCurrentData();
    }
    return
})
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function to check the params pass for the spreadsheet id or link
 */
function checkUserFillData() {
    /* document.getElementById('defaultScreen').style.display = 'flex' */
    document.getElementById('page-header').style.display = 'none'
    document.getElementById('page-footer').style.display = 'none'
    document.getElementById('spinningLoader').style.display = 'none'
    document.getElementById('loaderPre').style.display = 'flex'

    document.getElementById('loadingTxt').style.display = 'none'
    


    document.getElementById('preloaderCircle').style.display = 'flex';
    document.getElementById('versionText').style.display = 'block'
    document.getElementById('versionText').innerHTML = ''
    document.getElementById('splashScreenSection').style.display = 'flex'

    // Change user activity type
    loadType = "refresh"
    // Store the actual link of the app
    let winLoc = window.location.href.split("?")[0]
    // get the values from the search form
    let uSheetId = document.getElementById("usheetId").value
    //console.log(uSheetId.length, " len ", uSheetId)
    if(uSheetId != "") {
        /////////////////////////////////////////////
        // Fix deprecated functionality
        /* $(".cardList").html(""); */
        /////////////////////////////////////////////
        document.getElementById("cardList").innerHTML = ("");
        let splitParam = "https://docs.google.com/spreadsheets/d/"
        if(uSheetId.length > 30) {
            let correctURL = uSheetId.includes(splitParam)
            if(correctURL) {
                // Get Google Sheet url
                sheet_Id = uSheetId.split(splitParam)[1].split("/")[0]
            } else {
                sheet_Id = uSheetId
            }
            showloader()
            setTimeout(function() {
                window.history.replaceState({}, "null", (winLoc + "?id=" + sheet_Id))
                getGamesSettingData()
            }, 100)
        } else {
            // For user name
            showloader()
            setTimeout(function() {
                checkUserQueryString()
            }, 100)
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * To check json in correct format
 * @param {*} str 
 * @returns 
 */
//const isJson = (str) => {
isJson = (str) => {
    try{
        let json = JSON.parse(str);
        return json;
    }catch (e){
        //Error
        //JSON is not okay
        return false;
    }
    return true;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 
 */
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
/**
 * Check user passed params authenticity
 */
function checkUserQueryString() {
    let rootFolder = "../sheets/" + sheet_Id + "/" + target;

    setTimeout(function() {
    let messageBody = ""
    if(sheet_Id == "") {
        messageBody = "Sheet Id Or Sheet URL is wrong or missing."
    } else if(sheet_Id != "" && privateDataList.length == 0) {
        messageBody = "Share the Google Sheet with<br>editor@zsheets-378406.iam.gserviceaccount.com<br>as Editor."
    } 
    if(sheet_Id == '' /* || (sheet_Id != '' && privateDataList.length == 0) */) {

        document.getElementById('preloaderCircle').style.display = 'none';
        document.getElementById('slowConnectionStart').style.display = 'none'
        document.getElementById('versionText').style.display = 'none'
        document.getElementById('splashScreenSection').style.display = 'none'
        document.getElementById('loaderPre').style.display = 'none'

        document.getElementById('page-header').style.display = 'flex'
        document.getElementById('page-footer').style.display = 'flex'

        document.getElementById("cardList").innerHTML = (`<div id="sheetIdForm" class="text-center mt-4 pt-4" style="position: relative; margin-top: 3% !important; width:100%; height:38vh; display:flex; flex-direction:column;justify-content:center; z-index:9999999999 !important;">
            <h5 class="text-center" style="color:red; display:${(sheet_Id != "" && privateDataList.length > 0) ? 'none' : 'block'}; font-family:Font-default; text-transform:none">${messageBody}</h5>
            <h4 class="text-center h3 mb-3" style="position:relative;top: 1em; z-index:9; font-family:Font-default; letter-spacing: -1px; font-weight: 700;">ENTER YOUR GOOGLE SHEET ID, OR GOOGLE SHEET URL</h4>
            <div id="settingBox" class="text-center mt-4 pt-4" style="width: 60%; position:relative; height: auto; left: 20%;background-color: #FFFFFF; box-shadow: 0 0 0 3px #FFFFFF, 0 0 0 3px #FFFFFF; margin-top: 0em !important; border-radius: 2px;">
            <div style="border: 2px solid #FFFFFF; padding: 5px; border-radius: 5px; position: relative; width: 96%; left: 2%; top: -10px;">
                <input class="form-control" type="text" id="usheetId" name="usheetId" style="position: relative; margin-top: 0px; width: 100%;margin-left: 0em; height: 2.5em; font-family: 'Font-default';" pattern="[A-Za-z0-9]+" onkeydown="if(['Space'].includes(arguments[0].code)){return false;}"/>
            </div>
            <button onPointerDown="checkUserFillData();" class="btn_submit" style="position:relative; margin-top:-1em;margin-bottom:0.5em; right:0px"><img src="images/btn_img.png" class="img-fluid" width="70" /></button>
            </div>
            </div>
        </div>`)
        hideloader();
        sheet_Id = ""
        user_name = ""
        return
    } else {
        // Check cookies stat
        var cookiesStat = checkCookieStatus()
        //console.log(cookiesStat, " cookie ", currentVersion)
        if(cookiesStat) {
            if(loadType == "normal" /* && currentVersion == 'Same' */) {
            document.getElementById("loadingTxt").innerHTML += "Loading Events From Cache..<br>"
            updateInfoTextView()
            resetIdleTimer()
            document.getElementById("splashImg").src = splash_img
            setTimeout(function(){
                let img = new Image()
                img.src = splash_img
                img.onload = function() {
                    let xDiff = 0
                    let yDiff = 0
                    if(this.width > window.innerWidth) {
                        xDiff = (window.innerWidth - this.width)/2
                    }
                    if(this.height > window.innerWidth) {
                        yDiff = (window.innerHeight - this.height)/2
                    }
                }
            }, 100)
            // showing background
            showBackgroundImage();
            setTimeout(function () {
                // set splash image
                splash_img = ''
                splashDelaySec = 5
                idleTimeOut = 60
                currentVersion = ''
                let slideshowStat = 0
                $.each(settingDataList, function (index, row) {
                    if(row["Name"] == "SlideshowDelaySec" || row["Name"] == "SlideshowDelaySec ") {
                        slideshowStat = row["Value"]
                        if(slideshowStat == undefined) {
                        slideshowStat = 5
                        }
                    }
                    if(row["Name"] == "SplashImageUrl") {
                        if(row["Value"] == "" || row["Value"] == undefined) {
                            //splash_img = "./images/earshot-games_splash.png";
                        } else {
                            let imgPath = ""
                            
                            if(window.navigator.onLine == true) {
                                if (row["Value"].includes("https://drive.google.com")) {
                                    imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                                    imgPath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion;

                                } else {
                                    let name = row["Value"].split('/')
                                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];

                                    // Prev
                                    /* let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;
                                    imgPath = imagePath;
                                }
                            } else {
                                //imgPath = "./images/earshot-games_splash.png";
                                if (row["Value"].includes("https://drive.google.com")) {
                                    imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                                    imgPath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion

                                } else {
                                    let name = row["Value"].split('/')
                                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                                    imgPath = imagePath;
                                }
                            }
                            if(imgPath == '') {
                                let name = row["Value"].split('/')
                                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];

                                
                                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                                splash_img = imagePath
                            } else {
                                splash_img = imgPath
                            }
                        }
                    }
                    if(row["Name"] == "SplashImageDelaySec") {
                        splashDelaySec = row["Value"]
                    }
                    // Add Language toggle option if defined
                    if(row["Name"] == "AddLanguage") {
                        if(row["Value"] == "" || row["Value"] == undefined) {
                            row["Value"] = ""
                        }
                        addLanguage = row["Value"]
                    }
                    // For Layout
                    if(row["Name"] == "Layout") {
                        if(row["Value"] == "" || row["Value"] == undefined) {
                            //row["Value"] = "Basic Horizontal"
                            row["Value"] = "Horizontal with Event Slider"
                        } 
                        activeLayout = row["Value"]
                        // CHANGES MADE TO ADJUST THE LAYOUTS
                        // Load the css from the layout folder
                        var head  = document.getElementsByTagName('head')[0];
                        var link  = document.createElement('link');
                        link.rel  = 'stylesheet';
                        link.type = 'text/css';
                        link.href = './layout/' + row["Value"] + '/style.css?version=' + UIVersion;
                        link.media = 'all';
                        head.appendChild(link);
                    }
                    // For PollTime
                    if(row["Name"] == "PollTime") {
                        if(row["Value"] != "" || row["Value"] != undefined) {
                            pollTime = row["Value"]
                        }
                    }
                    // For Version
                    if(row["Name"] == "Version" && row["Name"] != undefined) {
                    }
                    if(row["Name"] == "TimeoutSec") {
                        idleTimeOut = row["Value"]
                        if(idleTimeOut == '') {
                        idleTimeOut = 60
                        }
                    }
                })
                CreateFirstUIScreen()
                // Hide the top border
                document.getElementById('page-header').style.display = 'none'
                document.getElementById('page-footer').style.display = 'none'
                gameLoaded = true
                // Show splash screen
                if(splashDelaySec >= 0) {
                    if(splash_img != '') {
                        ShowSplashScreen()
                    } else {
                        //console.log('hide so')
                        document.getElementById('splashScreen').style.display = 'none'
                        document.getElementById('splashScreen').style.opacity = 0
                        document.getElementById('splashScreen').style.overflow = "hidden"
                    }
                }
                setTimeout(function() {
                    // Show main container
                    document.getElementById('mainAppContainer').style.display = 'flex';
                    // Left Align
                    document.getElementById('mainAppContainer').style.flexDirection = 'column';
                    // Right Align
                    //document.getElementById('mainAppContainer').style.flexDirection = 'row-reverse';
                    //document.getElementById('map-0').style.color = "Red"
                    updateSlideshowTimer()
                }, 10)
                if(slideshowStat > 0) {
                    viewSlideShowHTML()
                    setTimeout(function() {
                        MODE_TYPE = "slideshow"
                        idleStatus = true
                        if(MODE_TYPE == "slideshow") {
                            slideStatus = "cycling"
                            clickedSlideID = -1
                        }
                        if(document.getElementById("splashScreen").style.opacity == 1) {
                        } else {
                            slideStatus = "cycling"
                        }
                    }, 350)
                    } else {
                }
                hideloader();
            }, 3000)
            // Neede to use to show loading imaages message
            //CreateFirstUIScreen()
            } else {


            if(mapVersionNum == settingVersion) {
                document.getElementById("loadingTxt").innerHTML += "Loading Events From Local Cache..<br>"
            } else {
                document.getElementById("loadingTxt").innerHTML += "Loading Events From Server..<br>";
            }
            updateInfoTextView()
            //$('.related_events').css('opacity', '0')
            document.getElementById('related_events').style.opacity = 0
            document.getElementById('slideLoading').style.display = 'flex'
            document.getElementById('slideLoading').innerHTML = activeLanguage == 'eng' ? "Loading Event Slides.." : "Cargando diapositivas del evento.."
            setTimeout(function() {
                //alert(sheet_Id)
                var eventRequest = $.ajax({
                url: rootFolder + "/events.json?version=" + UIVersion, 
                cache: true,
                type: 'GET',
                dataType: "text",
                success: function (response) {
                    if(response == '' || response.length == 0) {
                        privateLoaded = true
                        //checkUserQueryString()
                        document.getElementById("loadingTxt").innerHTML += "<font color='red'>Error: No events data available.</font><br>"
                        updateInfoTextView()
                        // showing background
                        /* showBackgroundImage();
                        CreateFirstUIScreen() */
                        return
                    } 
                    var mResponse = response.replace(/�/g, "")
                    var newEventsData = eval(mResponse)
                    for(var i=0; i<newEventsData.length; i++) {
                        var eventDataString = JSON.stringify(newEventsData[i]);
                        //console.log(isJSON(pp), " --- ")
                        //newstr += JSON.stringify(isJSON(pp))
                        if(isJSONData(eventDataString) == false) {
                            document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Events Sheet : (Row: ' + (i+2) + ")</font><br>"
                            updateInfoTextView()
                        } else {
                            eventsDataList[i] = isJSONData(eventDataString)
                        }
                    }

                    //console.log(eventsDataList, '.....')
                    // showing background
                    showBackgroundImage();
                    CreateFirstUIScreen()
                    // CHANGE HERE FORCE RELOAD
                    return;

                    
                }
                })
                ///////////////////
                // Clear memory
                eventRequest.onreadystatechange = null;
                eventRequest.abort = null;
                eventRequest = null;
                ///////////////////
            }, 1000)
            }
        } else {
            //window.ldb.delete('zapMap_eventsData')
            // Mac Fix
            if(mapVersionNum == settingVersion) {
                document.getElementById("loadingTxt").innerHTML += "Waiting From Local Sheet..<br>"
            } else {
                document.getElementById("loadingTxt").innerHTML += "Waiting From Server Sheet..<br>"
            }
            updateInfoTextView()

            //$('.related_events').css('opacity', '0')
            document.getElementById('related_events').style.opacity = 0
            document.getElementById('slideLoading').style.display = 'flex'
            document.getElementById('slideLoading').innerHTML = activeLanguage == 'eng' ? "Loading Event Slides.." : "Cargando diapositivas del evento.."

            setTimeout(function() {
            var eventRequest = $.ajax({
                url: rootFolder + "/events.json?version=" + UIVersion, 
                cache: true,
                type: 'GET',
                dataType: "text",
                success: function (response) {
                //console.log(response, " >>>")
                //return;
                if(response == '' || response.length == 0) {
                    privateLoaded = true
                    //checkUserQueryString()
                    document.getElementById("loadingTxt").innerHTML += "<font color='red'>No events data available.</font><br>"
                    updateInfoTextView()
                    // showing background
                    showBackgroundImage();
                    CreateFirstUIScreen()
                    return
                }
                ////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////
                var mResponse = response.replace(/�/g, "")
                var newEventsData = eval(mResponse)
                for(var i=0; i<newEventsData.length; i++) {
                    var eventDataString = JSON.stringify(newEventsData[i]);
                    //console.log(isJSON(pp), " --- ")
                    //newstr += JSON.stringify(isJSON(pp))
                    if(isJSONData(eventDataString) == false) {
                        document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Events Sheet : (Row: ' + i + ")</font><br>"
                        updateInfoTextView()
                    } else {
                        var checkDataFormat = isJSONData(eventDataString)
                        console.log(typeof(checkDataFormat.Duration), " CHECKING DURATION 1") 
                        eventsDataList[i] = isJSONData(eventDataString)
                    }
                }
                /////////////////////////////////////////////////////////////////////////////////


                // showing background
                showBackgroundImage();

                CreateFirstUIScreen()

                // FORCE LOAD ONLY
                return;

                // Hide the top border
                document.getElementById('page-header').style.display = 'none'
                document.getElementById('page-footer').style.display = 'none'
                document.getElementById('splashScreen').style.display = 'none'
                document.getElementById('splashScreen').style.opacity = 0
                document.getElementById('splashScreen').style.overflow = "hidden"
                var slideshowStat = 5
                splash_img = ''
                splashDelaySec = 5
                idleTimeOut = 60
                currentVersion = ''
                $.each(settingDataList, function (index, row) {
                    if(row["Name"] == "SlideshowDelaySec") {
                    slideshowStat = row["Value"]
                    if(slideshowStat == undefined) {
                        slideshowStat = 5
                    }
                    }
                    if(row["Name"] == "SplashImageUrl") {
                    if(row["Value"] == "" || row["Value"] == undefined) {
                        splash_img = "./images/earshot-games_splash.png";
                    } else {
                        let imgPath = ""
                        if(window.navigator.onLine == true) {
                        if (row["Value"].includes("https://drive.google.com")) {
                        imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                        imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        } 
                        } else {
                        imgPath = "./images/earshot-games_splash.png";
                        }
                        if(imgPath == '') {
                        splash_img = row["Value"]
                        } else {
                        splash_img = imgPath
                        }
                    }
                    }
                    if(row["Name"] == "SplashImageDelaySec") {
                    splashDelaySec = row["Value"]
                    }
                    // Add Language toggle option if defined
                    if(row["Name"] == "AddLanguage") {
                        if(row["Value"] == "" || row["Value"] == undefined) {
                            row["Value"] = ""
                        }
                        addLanguage = row["Value"]
                    }
                    if(row["Name"] == "Layout") {
                        if(row["Value"] == "" || row["Value"] == undefined) {
                            //row["Value"] = "Basic Horizontal"
                            row["Value"] = "Horizontal with Event Slider"
                        } 
                        //row["Value"] = "Horizontal with Event Slider"
                        //row["Value"] = "Horizontal with Combined Events"
                        activeLayout = row["Value"]
                        // CHANGES MADE TO ADJUST THE LAYOUTS
                        // Load the css from the layout folder
                        //console.log(row["Value"], " Layout")
                        var head  = document.getElementsByTagName('head')[0];
                        var link  = document.createElement('link');
                        link.rel  = 'stylesheet';
                        link.type = 'text/css';
                        //link.href = 'layout/' + row["Value"] + '/style.css?version=' + Math.random(999999999999);
                        link.href = 'layout/' + row["Value"] + '/style.css';
                        link.media = 'all';
                        head.appendChild(link);
                    }
                    // For PollTime
                    if(row["Name"] == "PollTime") {
                        if(row["Value"] != "" || row["Value"] != undefined) {
                            pollTime = row["Value"]
                        }
                    }
                    // For Version
                    if(row["Name"] == "Version" && row["Name"] != undefined) {
                        // Changes Made : 21-5-24
                        /* window.ldb.get('zapMap_VersionNum', function (value) {
                            if(value == null || value != row["Value"]) {
                            window.ldb.set('zapMap_VersionNum', row["Value"])
                            currentVersion = "New"
                            } else if(value == row["Value"]) {
                            currentVersion = "Same"
                            }
                        }); */
                    }
                    if(row["Name"] == "TimeoutSec") {
                    idleTimeOut = row["Value"]
                    if(idleTimeOut == '') {
                        idleTimeOut = 60
                    }
                    }
                })
                // Show splash screen
                if(splashDelaySec >= 0) {
                    if(splash_img != '') {
                        ShowSplashScreen()
                    } else {
                    document.getElementById('splashScreen').style.display = 'none'
                    document.getElementById('splashScreen').style.opacity = 0
                    document.getElementById('splashScreen').style.overflow = "hidden"
                    }
                }

                setTimeout(function() {
                    // Show main container
                    document.getElementById('mainAppContainer').style.display = 'flex';
                    // Left Align
                    document.getElementById('mainAppContainer').style.flexDirection = 'column';
                    // Right Align
                    //document.getElementById('mainAppContainer').style.flexDirection = 'row-reverse';
                    updateSlideshowTimer()
                }, 1500)

                if(slideshowStat > 0) {
                    // init slideshow timer
                    viewSlideShowHTML()
                    setTimeout(function() {
                    MODE_TYPE = "slideshow"
                    idleStatus = true
                    if(MODE_TYPE == "slideshow") {
                        slideStatus = "cycling"
                        clickedSlideID = -1
                    }
                    if(document.getElementById("splashScreen").style.opacity == 1) {
                    } else {
                        slideStatus = "cycling"
                    }
                    }, 350)
                } else {
                }
                // Hiding Loader
                hideloader();
                }
            })
            ///////////////////
            // Clear memory
            eventRequest.onreadystatechange = null;
            eventRequest.abort = null;
            eventRequest = null;
            ///////////////////
            }, 1000)
        }
    }
}, 100)
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Hide preloader
 */
function hideloader() {
    document.getElementById('spinningLoader').style.display = 'none'
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Show preloader
 */
function showloader() {
    document.getElementById('spinningLoader').style.display = 'block'
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
 * Create event slides
 */
function viewSlideShowHTML() {
    slides_loaded = false
    $('#myModal2').modal('hide');
    MODE_TYPE = 'slideshow'

    // Fix for jquery deprecated fuctionality
    /////////////////////////////////////////////////////////////////////////////////////
    /* $('.related_events').append(`<div class="slider_item"><div id='loadingSlides'>
    <div id='slideTxt'>LOADING SLIDES...</div></div><div>
    `); */
    document.getElementById('related_events').innerHTML = (`<div class="slider_item"><div id='loadingSlides'>
        <div id='slideTxt'>LOADING SLIDES...</div></div><div>
    `);
    /////////////////////////////////////////////////////////////////////////////////////
    
    // Manual SlideShow View
    /* $("body").addClass("AnimateView");
    initiateRelatedEventsSlider(); */

    setTimeout(function() {
        activeLanguage = 'eng'
        /* renderSliderItems() */
    }, 100)
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Render event slides
 */
function renderSliderItems() {

    /////////////////////////////////////////////////////////////////
    // Remove deprecated functionality
    /* if($('.related_events').html() != ''){
        $('.related_events').slick('unslick').html('');
    } */
    ////////////////////////////////////////////////////////////////
    if(document.getElementById('related_events').innerHTML != ''){
        document.getElementById('related_events').slick('unslick').innerHTML = ('');
    }


    //$('.related_events').css('opacity', '0')
    document.getElementById('related_events').style.opacity = 0

    // Get the list of daily event
    var dailyEvent = filterEventsBasedOnDayTime();

    prevRenderEvents = dailyEvent.length;

    let current = moment(new Date(),["HH.mm"]).format("hh:mm A");
    let currentTime = moment(current, 'hh:mm A').format('HH:mm')

    let suggestedGamesHTML = ""
    for (var loop = 0; loop < dailyEvent.length; loop++) {
        //console.log(activeLanguage, " ----- ")
        let eventName = activeLanguage == 'eng' ? dailyEvent[loop].Name.replaceAll('dqo', '"') : dailyEvent[loop]["Name ES"].replaceAll('dqo', '"')
        
        var timeList = dailyEvent[loop].Time.split(',')
        //console.log(timeList, " timeList")
        let eventTime = ''
        for (var s=0; s<timeList.length; s++) {
            let startEventTime = timeList[s].split('-')[0].replace(' ', '');
            let endEventTime =  timeList[s].split('-')[1].replace(' ', '');
            var startTimeTest = moment(startEventTime, 'hh:mm A').format('HH:mm')
            
            var startTimeTestDisp = moment(startEventTime, 'h:mm').format('h:mm A')
            if(startTimeTestDisp.indexOf('12') != -1 && startTimeTestDisp.indexOf('AM' != -1)) {
                startTimeTestDisp = moment(startEventTime, 'h:mm A').format('H:mm A')
            }

            //console.log(moment(startEventTime, 'hh:mm A').format('HH:mm A'), " ----- ", moment(startEventTime, 'h:mm A').format('H:mm A'))

            var endTimeTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
            //console.log(currentTime, '<=', endTimeTest)
            
            if(currentTime >= startTimeTest && currentTime <= endTimeTest) {
                //console.log(currentTime, '>=', startTimeTest, '&&', currentTime, '<=', endTimeTest)
                //console.log("ENTER HERE")
                eventTime =  startTimeTestDisp;
                //break;
            } if(currentTime < startTimeTest && currentTime <= endTimeTest) {
                //console.log("ENTER HERE 1")
                eventTime =  startTimeTestDisp; 
                //break;
            }
        } 


        //console.log(eventTime, " >>>>")
        
        let eventTimeEnd = moment(dailyEvent[loop].End, ["HH.mm"]).format("hh:mm A");


        /*
        var mResponseDQ = mResponseSCSE.replace(/"/g, "dqo") 
        var mResponseDDQ = mResponseDQ.replace(/: dqo/g, ": 'dqo") 
        var mResponseDDQE = mResponseDDQ.replace(/dqo,/g, "dqo',")
        */

        let eventLocation = dailyEvent[loop].Location.replaceAll('dqo', '"')
        let eventImagePath =  dailyEvent[loop].Image

        let eventQRCode = dailyEvent[loop]['QR Code']
        let eventDesc = dailyEvent[loop].Description.replaceAll('dqo', '"')

        let isHappeningNow = 0
                suggestedGamesHTML += `<div id="sliderItem_${loop}" class="slider_item" onPointerDown="setActiveEventHighligh(event, ${loop}), onItemClick(event, '${encodeURIComponent(JSON.stringify(dailyEvent[loop]).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29"))}', ${loop})"><p id="sliderEventName_${loop}" class=${activeLanguage == 'eng' ? "eventSlide" : "eventSlide_ES"}>${eventName}</p><p id="sliderItemTime_${loop}" class="eventSlideTime">${eventTime + ' - ' + eventLocation}</p></div>`

                

            
    }

    //////////////////////////////////////////////////////////////////
    // Remove Deprecated functionality
    /* $('.related_events').html(suggestedGamesHTML); */
    //////////////////////////////////////////////////////////////////
    document.getElementById('related_events').innerHTML = (suggestedGamesHTML);

    setTimeout(function() {
        //updateSlidesEventStatus();
        //slideShowLoaded = true
        
        setTimeout(function() {
            initiateRelatedEventsSlider();
            slideShowLoaded = true
            //console.log($('.related_events').length, " >>>>>>>>>>>>>>>>>>>>>>>>>>")
            // Check event data for the current and forthcoming events for today
            //console.log(dailyEvent.length, " >>>>")

            // New Change
            //setActiveLanguage(activeLanguage)

            if(dailyEvent.length > 0) {
                //$('.related_events').css('opacity', '1')
                document.getElementById('related_events').style.opacity = 1
                document.getElementById('slideLoading').style.display = 'none'
            } else {
                //$('.related_events').css('opacity', '0')
                document.getElementById('related_events').style.opacity = 0
                document.getElementById('slideLoading').style.display = 'flex'
                document.getElementById('slideLoading').innerHTML = activeLanguage == 'eng' ? "NO EVENTS TODAY" : "NO HAY EVENTOS HOY"
            }
            //$('.related_events').slick('slickPlay')
        }, 5000)
    }, 1000)
}
//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Initialized the event slick slides based on resolution
 */
function initiateRelatedEventsSlider() {
    if ($('.related_events').find('div').length) {
        $('.related_events').not('.slick-initialized').slick({
            lazyLoad: 'ondemand',
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow:'<img class="a-left control-c prev slick-prev" src="images/earshot-games_btn_left.png?version=1.1" style="width:70px !important; height:auto; left:-10px; z-index:1;">',
            nextArrow:'<img class="a-right control-c next slick-next" src="images/earshot-games_btn_right.png?version=1.1" style="width:70px !important; height:auto; right:-10px; z-index:1;">',
            responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            ]
        });
        $('.related_events').slick('slickPlay')
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Window read function
 */
/* jQuery(document).ready(function ($) {
    //////////////////////////////////////////////////////////////////////////////////////////////////
    $(document).click(function(event) {
    //if you click on anything except the modal itself or the "open modal" link, close the modal
    let toggleTimer = setTimeout(function() {
        clearTimeout(toggleTimer)
        if (!$("#myModal2").is(":visible") ) {
        } 
    }, 500)
    });
}); */
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
/**
 * Hiding list Slide show
 */
function hideSliderShowSection() {
    $('.list-slideshow-section').addClass('d-none');
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Show list slide show
 */
function displaySliderShowSection() {
    $('.list-slideshow-section').removeClass('d-none');
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function setActiveMenuHighligh(event, menuIndex) {
    downIndex = menuIndex
    if(event != null) {
        if (event.cancelable) event.preventDefault();
    }

    $.each(privateDataList, function (index, row) {
        if(document.getElementById('map-' + index).style.color == 'orange') { 
            document.getElementById('map-' + index).className = '';
            document.getElementById('map-' + index).className = 'removeEffect';
            document.getElementById('map-' + index).style.color = 'white'
        }
    })
    document.getElementById('map-' + menuIndex).className = ''
    document.getElementById('map-' + menuIndex).className = 'showEffect';
}

function MakeMenuNormal(event) {
    downIndex = -1;
    upIndex = -1;
    if(event != null) {
        if (event.cancelable) event.preventDefault();
    }
    $.each(privateDataList, function (index, row) {
        /* if(activeLayout == "Horizontal with Combined Events") {
             document.getElementById('map-' + index).style.color = 'white'
        } else {
             document.getElementById('map-' + index).style.color = 'black'
        } */
        if(document.getElementById('map-' + index).style.color != 'orange') { 
            document.getElementById('map-' + index).className = ''
            document.getElementById('map-' + index).className = 'removeEffect';
        }
    })
}

function setActiveEventHighligh(event, index) {
    //downIndex = index
    if(event != null) {
        if (event.cancelable) event.preventDefault();
    }
    onEvents = true
    var dailyEvent = filterAllEventsBasedOnDayTime();
    $.each(dailyEvent, function (index_row, row) {
        if(document.getElementById('event_' + index_row).style.color == 'orange') { 
            document.getElementById('event_' + index_row).className = '';
            document.getElementById('event_' + index_row).className = 'removeEventEffect';
            document.getElementById('event_' + index_row).style.color = 'white'
        }
    })
    document.getElementById('event_' + index).className = ''
    document.getElementById('event_' + index).className = 'showEventEffect';
}

function MakeEventNormal(event) {
    upIndex = -1
    downIndex = -1
    if(event != null) {
        if (event.cancelable) event.preventDefault();
    }
    /* onEvents = false */
    var dailyEvent = filterAllEventsBasedOnDayTime();
    //console.log(dailyEvent.length, " --- ")
    $.each(dailyEvent, function (index, row) {
        //console.log(document.getElementById('event_' + index).style.color, " ---- ")
        //if(event != null) {
        //if(!document.getElementById('event_' + index).classList.contains('showEventEffect')) {
            if(document.getElementById('event_' + index).style.color != 'orange') { 
                document.getElementById('event_' + index).className = ''
                document.getElementById('event_' + index).className = 'removeEventEffect';
                //document.getElementById('event_' + index).style.color = 'white'
            } 
        //}
        /* } else {
            document.getElementById('event_' + index).className = ''
            document.getElementById('event_' + index).className = 'removeEventEffect';
        } */
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function to make the directory menu active
 * when selected or default
 * @param {*} menuIndex 
 * @returns 
 */
function setActiveMenu(event, menuIndex) {
    let rootFolder = "../sheets/" + sheet_Id + "/" + target;

    if(event != null) {
        if (event.cancelable) event.preventDefault();
    }

    ////////////////////////////////////////////////////////////////////////////
    // free memory
    //document.getElementById("locationmapImageHolder").onMouseDown = null;
    //document.getElementById("locationmapImageHolder").touchstart = null;
    document.getElementById("locationmapImageHolder").onPointerDown = null;
    ////////////////////////////////////////////////////////////////////////////

    //console.log("New script")

    // Hide Location Image Holder
    document.getElementById("locationmapImageHolder").style.display = 'none'
    /* MakeMenuNormal(null)
    MakeEventNormal(null) */
    //////////////////////////////////////////////////////
    // Make the events to load on timer based
    onEvents = false
    //////////////////////////////////////////////////////
    upIndex = menuIndex;
    //console.log(downIndex, " -- ", upIndex)

    /////////////////////////////////////////////////////////////////////////
    /* if(downIndex != upIndex) {
        document.getElementById('mapImageHolder').src = ''
        document.getElementById('mapImageHolder').style.display = 'none'
        return
    }  */
   /////////////////////////////////////////////////////////////////////////

    activeMenuIndex = menuIndex
    if(menuIndex == -1) {
        //console.log("Not click")
        //let defImgPath = 'images/map/zapsheets_map_map-main.png'
        let defImgPath = ''
        $.each(privateDataList, function (index, row) {
           /*  document.getElementById('map-' + index).style.color = 'black' */
           if(activeLayout == "Horizontal with Combined Events") {
                document.getElementById('map-' + index).style.color = 'white'
           } else {
                document.getElementById('map-' + index).style.color = 'black'
           }
            /* document.getElementById('map-' + index).className = ''
            document.getElementById('map-' + index).className = 'removeEffect'; */
        })
        ////////////////////////////////////////////////////////////////////
        // Disable all selected map and event menu
        MakeEventNormal(event)
        MakeMenuNormal(event)
        document.getElementById('mapImageHolder').src = ''
        document.getElementById('mapImageHolder').style.display = 'none'
        ////////////////////////////////////////////////////////////////////

    } else {

        if(document.getElementById('map-' + menuIndex).style.color == 'orange') { return }
        //document.getElementById('loadingMap').style.display = 'block'

        //console.log("clicked")

        var imgPath = ""
        ///////////////////////////////////////////////////////////////////////////////////
        // Previous
        if (privateDataList[menuIndex]['Map Image'].includes("https://drive.google.com")) {
            imgid = privateDataList[menuIndex]['Map Image'].split('https://drive.google.com')[1].split('/')[3];
            imgPath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion;
        } else {
            let name =  privateDataList[menuIndex]['Map Image'].split('/')
            let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
            let imagePath =  rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;
            imgPath = imagePath
        }
        if(privateDataList[menuIndex]['Map Image'] != '') {
            document.getElementById('mapImageHolder').style.display = 'block'
            document.getElementById('mapImageHolder').src = imgPath
        } else {
            document.getElementById('mapImageHolder').src = ''
            document.getElementById('mapImageHolder').style.display = 'none'
        }
       ////////////////////////////////////////////////////////////////////////////////////////

        //document.getElementById('mapImageHolder').src = imgPath

        $.each(privateDataList, function (index, row) {
            if(activeLayout == "Horizontal with Combined Events") {
                document.getElementById('map-' + index).style.color = 'white'
            } else {
                document.getElementById('map-' + index).style.color = 'black'
            }
            //document.getElementById('map-' + index).style.color = 'black'
        })

        //console.log(document.getElementById('map-' + menuIndex).style.color, " ---- ")

        /* document.getElementById('map-' + menuIndex).style.color = 'red' */
        document.getElementById('map-' + menuIndex).style.color = 'orange'
        //document.getElementById('map-' + menuIndex).className = 'removeEffect';

        //////////////////////////////////////////////////////////////////////

        let circle = document.createElement('span')
        /* circle.style.position = 'relative'
        circle.style.display = 'block'
        circle.style.left = '0px'
        circle.style.top = '0px'
        circle.style.width = '5vh'
        circle.style.height = '5vh'
        circle.style.backgroundColor = 'white'
        circle.style.borderRadius = '50%'
        circle.style.transform = 'translate(-50%, -50%)'
        circle.style.animation =  'zoom 1s infinite'
        circle.style.overflow = 'hidden' */
        document.getElementsByClassName('showEffect')[0].appendChild(circle)

       /*  let x = e.clientX - e.target.offsetLeft
        let y = e.clientY - e.target.offsetTop

        console.log(e.clientX, " CX ")

        let circle = document.createElement('span')
        circle.style.left = x + 'px'
        circle.style.top = y + 'px'

        document.getElementById('map-' + menuIndex).appendChild(circle) */

        setTimeout(() => {
            circle.remove()
            //document.getElementById('map-' + menuIndex).className = 'removeEffect'
        }, 1000);

        
    }
    
    //console.log(imgPath, " >>>>>")
    //document.getElementById('mapImageHolder').src = imgPath //privateDataList[menuIndex]['Map Image']
    //document.getElementById('mapImageHolder').style.opacity = 0
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowLocationMap(locationMap) {
    //console.log(locationMap, " LM")
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function to toggle between directory view and event view
 * And make then active as selected
 * @param {*} type 
 */
function setActiveDirectory(type) {
    //console.log(type, " Clicked")
    //HideEventScreen();

    
    // Storing the current active menu
    activeMenuOption = type

    //console.log(activeMenuOption)

    // Hide Location Image Holder
    document.getElementById("locationmapImageHolder").style.display = 'none'
    /* MakeMenuNormal(null)
    MakeEventNormal(null) */

    if(type == 'directory') {

        HideEventScreen();
        document.getElementById('directoryList').style.display = 'block';
        document.getElementById('mapListContainer').style.display = 'block';
        document.getElementById('eventList').style.display = 'none';


        // CSS Animation
        document.getElementById('mapListContainer').classList.add('fadeIn')


        if(activeLayout == "Horizontal with Combined Events") {
            document.getElementById('directoryView').style.color = 'white'
            document.getElementById('eventView').style.color = '#9ACAEA'
            /* document.getElementById('directoryView').style.borderBottom = '12px solid'; */
            document.getElementById('directoryView').style.borderBottom = '4vh solid';
           /*  document.getElementById('directoryView').style.position = 'relative';
            document.getElementById('directoryView').style.marginTop= '15px'; */
           /*  document.getElementById('eventView').style.borderBottom = '0px solid'; */
           document.getElementById('eventView').style.borderBottom = '0vh solid';
            /* document.getElementById('eventView').style.position = 'relative';
            document.getElementById('eventView').style.marginTop= '15px'; */
           
        } else {
            document.getElementById('directoryView').style.color = 'red'
            document.getElementById('eventView').style.color = 'black' 
            /* document.getElementById('directoryView').style.borderBottom = '8px solid';
            document.getElementById('eventView').style.borderBottom= '0px solid'; */
        }

    } else if(type == 'events') {
        if(activeEventObject != null && onEvents) {
            ShowEventScreen();
            document.getElementById('eventDataContainer').style.display = 'block'
            document.getElementById('eventImageBlock').style.display = 'block'
        } else {
            HideEventScreen()
        }

        document.getElementById('directoryList').style.display = 'block';
        document.getElementById('mapListContainer').style.display = 'none';
        document.getElementById('eventList').style.display = 'block';



        // CSS Animation
        document.getElementById('eventList').classList.add('fadeIn')

        // transition
        if(activeLayout == "Horizontal with Combined Events") {
            document.getElementById('directoryView').style.color = '#9ACAEA'
            document.getElementById('eventView').style.color = 'white'
            /* document.getElementById('eventView').style.borderBottom= '12px solid'; */
            document.getElementById('eventView').style.borderBottom= '4vh solid';
            /* document.getElementById('eventView').style.position = 'relative';
            document.getElementById('eventView').style.marginTop= '15px'; */
            /* document.getElementById('directoryView').style.borderBottom= '0px solid'; */
            document.getElementById('directoryView').style.borderBottom= '0vh solid';
            /* document.getElementById('directoryView').style.position = 'relative';
            document.getElementById('directoryView').style.marginTop= '15px'; */
        } else {
            document.getElementById('directoryView').style.color = 'black'
            document.getElementById('eventView').style.color = 'red' 
            //document.getElementById('eventView').style.borderBottom= '8px solid';
            //document.getElementById('directoryView').style.borderBottom= '0px solid';
        }

        //console.log(activeEventObject, " --- ", activeEventIndex)
        if(activeEventObject != null && activeEventIndex != -1) {

            //onItemClick(null, activeEventObject.replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29"), activeEventIndex)

            //let dailyEvent = filterAllEventsBasedOnDayTime()



            /* downIndex = activeEventIndex
            upIndex = activeEventIndex; */

            //onItemClick(null, activeEventObject.replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29"), activeEventIndex)
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function to check image load complate status
 */
function CheckImgLoaded() {
    //document.getElementById('loadingMap').style.display = 'none'
    /* document.getElementById('mapImageHolder').style.opacity = 1;
    document.getElementById('mapImageHolder').style.transition = 'opacity 0.5s linear'; */
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function to filter the directory list based on the GROUP
 * @returns 
 */
function filterDirectoryDataByGroup() {
    var groupList = []
    var gListData = []
    var index = 0
    var divString = ''

    //console.log(privateDataList, " >>>>")

    for(var i=0; i<privateDataList.length; i++) {
        //console.log(groupList.includes(privateDataList[i].Group), " >>>> ", privateDataList[i].Group)
        if(groupList.includes(privateDataList[i].Group) == false) {
            //index = 0
            //console.log(index, " index ", privateDataList[i].Group)
            //console.log(privateDataList[i].Group, " --- ", i)
            groupList.push(privateDataList[i].Group)
            /* var objData = new Object()
            objData.name = privateDataList[i].Group
            objData.data = privateDataList[i]
            gListData.push(objData) */
            /* gListData[i] = privateDataList[i].Group
            gListData[i][i] = privateDataList[i] */

            var objData = new Object()
            objData.name = privateDataList[i].Group
            objData.data = privateDataList[i]
            gListData.push(objData)
            //gListData[i].data = (objData)
            
            
        } else {
            //console.log(privateDataList[i].Group, " --- ", i)
            //const iterator = groupList.values();
            let iterator = groupList.values();
            //for (const value of iterator) {
            for (let value of iterator) {
                if(value == privateDataList[i].Group) {
                    //console.log(groupList.indexOf(value), " index vallue ", i)
                    //console.log(index, " index else ", value)
                    //gListData[i] = privateDataList[i].Group
                    //gListData[groupList.indexOf(value)][i] = privateDataList[i]
                    //var objData = new Object()
                    //objData.data = privateDataList[i]
                    gListData[groupList.indexOf(value)]['z-'+index] = privateDataList[i]
                    //gListData[groupList.indexOf(value)].data.data = (privateDataList[i])
                   
                    index++
                }
            }
        }
    }

    
    ///////////////////////////////////////////////////////////////////////////////
    return gListData;
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function to create the default initial UI screen
 * Directory and Events
 */
function CreateFirstUIScreen() {

    let rootFolder = "../sheets/" + sheet_Id + "/" + target;

    // For new layout
    // Hide slick slider
    //console.log(activeLayout, " .....")

    document.getElementById("loadingTxt").innerHTML += 'Creating Map And Events List..<br>'
    updateInfoTextView()



    setTimeout(function(){

    
        //console.log("Enter -- ", activeLayout)

        // showing/Hiding Top slider based on option selected
        if(activeLayout == 'Horizontal with Combined Events') {
            document.getElementById('topSlider').style.display = 'none'
            document.getElementById('directoryContainer').style.height = '84vh'
        }

        // Check Language
        //console.log(addLanguage, " language option")
        if(addLanguage == "ES") {
            document.getElementById('languageToggle').style.display = 'flex'
        } else if(addLanguage == '' || addLanguage == 'undefined') {
            document.getElementById('languageToggle').style.display = 'none'
        }

        //console.log("Enter -- Style")

        // Add Directory
        var itemToAdd = ''

        //console.log(privateDataList, " >>NO FILTER>>")
        var groupListFilterData = filterDirectoryDataByGroup();

        //console.log(groupListFilterData, " >>>>>")

        var itemIndex = 0

        //var divElem = ""
        /* itemToAdd = `<div id="mapListContainer" class="directoryItem"><div style="
        position: relative;
        width: 100%;
    ">` */

    itemToAdd = `<div id="mapListContainer" class="directoryItem"><div style="
                    position: relative;
                    width: 100%; display: flex;
                    flex-wrap: wrap;
                    flex-direction: column;
                    height: 74vh;
                ">`

        if(groupListFilterData.length > 0) {
            $.each(groupListFilterData, function (index, row) {
                //console.log(row.name, " DATA")
                //console.log(Object.keys(row), " DDDDDD")
                //console.log(groupListFilterData[index].data, " Length b")
                // If value is in data
                if(Object.keys(row).length-1 == 1) {
                    //console.log(groupListFilterData[index].data, " first value")
                    if(groupListFilterData[index].data.Group != undefined) {
                        

                        itemToAdd += `<div class="groupTitle" id='group-${index}'>` + groupListFilterData[index].data.Group.replaceAll('dqo', '"') + `</div><div class="directoryNameTitle" onPointerDown="setActiveMenuHighligh(event, ${itemIndex}), setActiveMenu(event, ${itemIndex})" id='map-${itemIndex}'>` + groupListFilterData[index].data.Name.replaceAll('dqo', '"') + `</div></div>`
                        
                        itemIndex++
                    }
                    //console.log(itemIndex, " main itemIndex")
                } else {
                    //console.log(groupListFilterData[index].data.Group, " GROUP")
                    if(groupListFilterData[index].data.Group != '') {
                        itemToAdd += `<div style="display: flex;
                        flex-wrap: wrap;
                        flex-direction: column;
                        height: 74vh;"><div class="groupTitle" id='group-${index}'>` + groupListFilterData[index].data.Group.replaceAll('dqo', '"') + `</div>` 
                    }
                    //console.log(row, " 11")
                    let itemCount = 0
                    $.each(Object.keys(row), function (index1, row1) {
                        if(row1 != 'name') {
                            //console.log(itemCount, " ---- ")
                            

                            itemToAdd += `<div class="directoryNameTitle" onPointerDown="setActiveMenuHighligh(event, ${itemIndex}),  setActiveMenu(event, ${itemIndex})" id='map-${itemIndex}'>` + groupListFilterData[index][row1].Name.replaceAll('dqo', '"') + `</div>`

                            

                            itemIndex++
                            
                        
                        }
                        //divElem += `<div>` + groupListFilterData[index][row1].Group + `</div><div>` + groupListFilterData[index][row1].Name + ' - ' +  groupListFilterData[index][row1].Description + `</div>`
                        //divElem += `<div>` + groupListFilterData[index][row1].Name + ' - ' +  groupListFilterData[index][row1].Description + `</div></div>`
                    })
                    //console.log(groupListFilterData[index].data, " else value")
                    itemToAdd += '</div>'
                }

                
            })
        } else {
            itemToAdd += `<div class="noactive" style='margin-top: 2vh; margin-left: -1vh;'>NO MAP DATA AVAILABLE</div>` 
        }

        itemToAdd += `</div>`


        

        var eventsToAdd = ''

        eventsToAdd += `<div class="eventHappeningContainer"><div class="activeEvent"></div><div style="position: relative;
                        margin-left: 3vh; margin-top:0.2vh">Happening Now</div></div>`


        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        //console.log("FILTER ALL EVENTS")
        var dailyEvent = filterAllEventsBasedOnDayTime(); 
        //console.log(dailyEvent.length, " >>>")
        //////////////////////////////////////////////////////////////////////

        // set index for Top events
        let topIndex = -1
        let bottomIndex = -1
        let noPin = -1
        
        if(dailyEvent.length > 0) {
            $.each(dailyEvent, function (index, row) {
                let eventName = dailyEvent[index].Name.replaceAll('dqo', '"')
                //let eventTime = moment(dailyEvent[index].Start, ["HH.mm"]).format("hh:mm A");
                //let eventTime = moment(dailyEvent[index].Time.split('-')[0].replace(' ', ''), ["HH.mm"]).format("hh:mm A");

                let eventTime = moment(dailyEvent[index].Time.split('-')[0].replace(' ', ''), ["HH.mm"]).format("hh:mm A");

                let eventLocation = dailyEvent[index].Location.replaceAll('dqo', '"')
                
                let eventImagePath =  dailyEvent[index].Image
                let eventQRCode = dailyEvent[index]['QR Code']
                let eventDesc = dailyEvent[index].Description.replaceAll('dqo', '"')

                var timeList = dailyEvent[index].Time.split(',')
                var eventTimeStr = ''
                for (var s=0; s<timeList.length; s++) {
                    let startEventTime = ''
                    let endEventTime = ''
                    if(timeList[s].indexOf('-') != -1) {
                        startEventTime = timeList[s].split('-')[0].replace(' ', '');
                        endEventTime =  timeList[s].split('-')[1].replace(' ', '');
                        //console.log(endEventTime, " 11111")
                    } else {
                        startEventTime = moment(timeList[s], 'h:mm A').format('hh:mm A');
                        let eventDuration =  dailyEvent[index].Duration;
                        //endEventTime = moment(startEventTime).add(eventDuration, 'minutes').format('hh:mm')
                        //let endTimeTest = moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm')
                        //endEventTime = moment(timeList[s], 'h:mm A').add(eventDuration, 'minutes').format('hh:mm A')
                        
                        
                        //endEventTime = moment(startEventTime, 'h:mm A').add(eventDuration, 'minutes').format('h:mm A')
                        endEventTime = eventDuration != '' ? moment(startEventTime, 'h:mm A').add(eventDuration, 'minutes').format('h:mm A') : moment('23:59', 'h:mm A').format('h:mm A')
                        
                        //console.log(endEventTime, " EEEE")
                    }

                    

                    //return
                    

                    var startTimeTest = moment(startEventTime, 'hh:mm A').format('HH:mm')
                    
                    
                    var startTimeTestDisp = moment(startEventTime, 'h:mm').format('h:mm A')
                    if(startTimeTestDisp.indexOf('12') != -1 && startTimeTestDisp.indexOf('AM' != -1)) {
                        startTimeTestDisp = moment(startEventTime, 'h:mm A').format('H:mm A')
                    } else {
                        startTimeTestDisp = moment(startEventTime, 'h:mm A').format('h:mm A')
                    }


                    //console.log(startTimeTestDisp, " TIME")


                    //console.log(startTimeTestDisp.indexOf('12') + " --- " + startTimeTestDisp.indexOf('AM'), " is 12 midnight")
                    /* var dt = moment(startTimeTestDisp, ["h:mm A"]).format("hh A");
                    console.log(dt, " dt") */


                    var endTimeTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
                    
                    

                    var endTimeTestDisp = moment(endEventTime, 'h:mm').format('h:mm A')
                    if(endTimeTestDisp.indexOf('12') != -1 && endTimeTestDisp.indexOf('AM' != -1)) {
                        endTimeTestDisp = moment(endEventTime, 'h:mm A').format('H:mm A')
                    } else {
                        endTimeTestDisp = moment(endEventTime, 'h:mm A').format('h:mm A')
                    }

                    //console.log(endTimeTestDisp, " EVENTS")


                    eventTimeStr += `<div class="eventDateContainer"><div class="normalEvent"></div><div style="position: relative;
                    margin-left: 3vh; margin-top:0.2vh">` + startTimeTestDisp + ' - ' + endTimeTestDisp + '</div></div>'
                    //eventTimeStr += startTimeTestDisp + ' - ' + endTimeTestDisp + '<br>'
                } 


                
                // New Pin Logic
                if(dailyEvent[index]['Pin'] != undefined) {
                    if(dailyEvent[index]['Pin'] == 'Top') {
                        topIndex = 1
                    } 
                    if(dailyEvent[index]['Pin'] == 'Bottom') {
                        bottomIndex = 1
                    } else if(dailyEvent[index]['Pin'] == '') {
                        noPin = 1
                        if(topIndex == 1) {
                            topIndex = 2
                        }
                    }
                    if(topIndex == 2) {
                        topIndex = -1
                        eventsToAdd += `<div class='pinContainer'><div class="pinTopBorder"></div></div>`
                    }
                    if(bottomIndex == 1 && noPin == 1) {
                        noPin = -1
                        bottomIndex = -1
                        eventsToAdd += `<div class='pinContainer'><div class="pinBottomBorder"></div></div>`
                    }
                }
                

                eventsToAdd += `<div id="event_${index}" class="directoryItem" onPointerDown="setActiveEventHighligh(event, ${index}), onItemClick(event, '${encodeURIComponent(JSON.stringify(dailyEvent[index]).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29"))}', ${index})"><div style="display: flex;"><div id="eventTime_${index}" style="position: relative; width: 45%;">` + eventTimeStr + `</div><div id="eventDetails_${index}" style="position: relative; width: 55%; margin-left:3vh">` + eventName + `<div style="color:lightgray;"><img src="images/map/location.png" alt="" class="eventListLocationIcon" />` + eventLocation + `</div></div></div></div>`

                
                
            })
        } else {
            eventsToAdd = `<div class="noactive">NO ACTIVE OR FUTURE EVENTS NOW</div>` 
        }

        

        document.getElementById("directoryContainer").innerHTML = (`<div id='directoryEventTitle' class="text-center mt-4 pt-4 directoryHolder"><p id='directoryView' onPointerDown="setActiveDirectory('directory')" style="user-select: none; cursor: default;">MAP</p><p id='eventView' onPointerDown="setActiveDirectory('events')" style="user-select: none; cursor: default;">EVENTS</p></div><div class="menuBase"></div><div id="directoryList" class="text-center mt-4 pt-4 directoryHolder">
        ` + itemToAdd + `
        </div></div>
        <div id="eventList" class="text-center mt-4 pt-4 directoryHolder" style='display:none'>
        ` + eventsToAdd + `
        </div>`)


        //console.log("LOADING IMAGES")

        if(loadType == 'refresh') {
            //document.getElementById("loadingTxt").innerHTML += window.navigator.onLine == true ? "Loading Images From Server..<br>" : "Loading Images From Local Cache..<br>"
            if(mapVersionNum == settingVersion) {
                document.getElementById("loadingTxt").innerHTML += "Loading Images From Local Cache..<br>"
            } else {
                document.getElementById("loadingTxt").innerHTML += "Loading Images From Server..<br>"
            }
            updateInfoTextView()
            setTimeout(function(){
               /*  document.getElementById("loadingTxt").innerHTML += "Loading Images From Server..<br>"
                updateInfoTextView() */
                PreloadAllToCache();
            }, 10)
            // Prelpad Image
        //console.log("Loading images")
        
           
        }

        
        
        //} else {

            // Duplicate Message Fix
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Load first menu image
            setActiveMenu(null, -1)
            setActiveDirectory('directory')

            setInitLanguage(activeLanguage)

            // if(slideShowLoaded) {
            //     setActiveLanguage(activeLanguage)
            // }

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Add Here I am image from kiosk tab
            let kiosk_Image = ''
            for (var i=0; i<kioskDataList.length; i++) {
                if(kioskDataList[i].ID == getKiosk_Num) {
                    //console.log(kioskDataList[i].Image)
                    if (kioskDataList[i].Image.includes("https://drive.google.com")) {
                        let imgid = kioskDataList[i].Image.split('https://drive.google.com')[1].split('/')[3];
                        kiosk_Image = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

                    } else {
                        // Cache Image
                        let name = kioskDataList[i].Image.split('/')
                        let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                        kiosk_Image = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;
                    }
                    //document.getElementById('kioskImageHolder').src = kioskDataList[i].Image 
                    document.getElementById('kioskImageHolder').src = kiosk_Image
                }
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Add Here text image
            let text_Image = ''
            $.each(settingDataList, function (index, row) {
            if(row['Name'] == 'TextImage') {
                    if(row['Value'] != '') {
                    if (row['Value'].includes("https://drive.google.com")) {
                        let imgid = row['Value'].split('https://drive.google.com')[1].split('/')[3];
                        // Cache Image
                        text_Image = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;
                    } else {
                        // Cache Image
                        let name = row['Value'].split('/')
                        let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                        text_Image = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;
                        console.log(">>>>>>" + text_Image);
                    }
                }
                document.getElementById('textImageHolder').src = text_Image
                }
            })
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////

           /*  loadType = 'normal' */
            // Start Periodic Timer
            fetchSheetDetailsPeriodically();

    }, 0)

}
////////////////////////////////////////////////////////////////////////////////////////////////////
function showBackgroundImage() {
    let rootFolder = "../sheets/" + sheet_Id + "/" + target;
    let defBGImgPath = ''
    //if(window.navigator.onLine == true) {
        $.each(settingDataList, function (index_setting, row_setting) {
            if(row_setting['Name'] == 'BackgroundImage') {
                if(row_setting['Value'] != '') {
                    if (row_setting['Value'].includes("https://drive.google.com")) {
                        let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                        let imagePath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion;

                        defBGImgPath = imagePath;
                    } else {
                        let name = row_setting['Value'].split('/')
                        let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                        let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;
                        defBGImgPath = imagePath
                    }
                }
            }
        })
    /* } else {
        if(activeLayout == 'Horizontal with Combined Events') {
            defBGImgPath = 'images/map/cmh_wayfinding_bg.png'
        } else {
            defBGImgPath = 'images/map/zapsheets_map_bg.png'
        }
    } */
    //console.log(defBGImgPath, " ---")
    document.getElementById('defaultBG').style.display = 'block'
    document.getElementById('defaultBGImage').src = defBGImgPath
    ////////////////////////////////////////////////////////////////////
    document.getElementById('defaultBGImage').onload = function() {
        //console.log("Background loaded")
        backgroundLoaded = true;
    }
    document.getElementById('defaultBGImage').onerror = () => {
        backgroundLoaded = true;
    };
    ////////////////////////////////////////////////////////////////////


    // Load default map image
    let defImgPath = ''
    $.each(settingDataList, function (index_setting, row_setting) {
        //console.log(row_setting['Name'], " --- ")
        if(row_setting['Name'] == 'DefaultMapImage') {
            
            if(row_setting['Value'] != '') {
                if (row_setting['Value'].includes("https://drive.google.com")) {
                    let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                    let imagePath = rootFolder+ '/cacheImages/' + imgid + ".png?version=" + UIVersion;

                    defImgPath = imagePath;
                } else {
                    let name = row_setting['Value'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    let imagePath = rootFolder+ '/cacheImages/' + imageName + "?version=" + UIVersion;
                    defImgPath = imagePath
                }
            }
        }
    })
    imgPath = defImgPath;
    checkIfImageExists(imgPath, (isExists) => {
        if(isExists) {
            //console.log('Caching ',  defImgPath)
            document.getElementById('defaultMapImageHolder').style.display = 'block'
            document.getElementById('defaultMapImageHolder').src = imgPath
        } else {
            document.getElementById('defaultMapImageHolder').style.display = 'none'
        }
    })
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function to set the active init language
 * ENGLIST | SPANISH
 * @param {*} lang 
 */
function setInitLanguage(lang) {
    if(lang == 'eng') {
        if(activeLayout == "Horizontal with Combined Events") {
            document.getElementById('langEng').style.color = 'White'
            document.getElementById('langSpa').style.color = '#9ACAEA'
            document.getElementById('langSpa').style.borderBottom = '0px solid';
            document.getElementById('langEng').style.borderBottom = '3px solid';
        } else {
            document.getElementById('langEng').style.color = 'red'
            document.getElementById('langSpa').style.color = 'black'
            document.getElementById('langSpa').style.borderBottom = '0px solid';
            document.getElementById('langEng').style.borderBottom = '3px solid';
        }
        activeLanguage = 'eng'
    } else {
        if(activeLayout == "Horizontal with Combined Events") {
            document.getElementById('langEng').style.color = '#9ACAEA'
            document.getElementById('langSpa').style.color = 'White'
            document.getElementById('langSpa').style.borderBottom = '3px solid';
            document.getElementById('langEng').style.borderBottom = '0px solid';
        } else {
            document.getElementById('langEng').style.color = 'black'
            document.getElementById('langSpa').style.color = 'red'
            document.getElementById('langSpa').style.borderBottom = '3px solid';
            document.getElementById('langEng').style.borderBottom = '0px solid';
        }
        activeLanguage = 'spa'
    }
}
/////////////////////////////////////////////////////////////////////////////
/**
 * function to set the active language
 * ENGLIST | SPANISH
 * And update the UI based on it
 * @param {*} lang 
 */
function setActiveLanguage(event, lang) {
    if(event != null) {
        if (event.cancelable) event.preventDefault();
    }
    if(lang == 'eng') {
        if(activeLayout == "Horizontal with Combined Events") {
            document.getElementById('langEng').style.color = 'white'
            document.getElementById('langSpa').style.color = '#9ACAEA'
            document.getElementById('langEng').style.borderBottom = '3px solid';
            document.getElementById('langSpa').style.borderBottom = '0px solid';
        } else {
            document.getElementById('langEng').style.color = 'red'
            document.getElementById('langSpa').style.color = 'black'
            document.getElementById('langSpa').style.borderBottom = '0px solid';
            document.getElementById('langEng').style.borderBottom = '3px solid';
        }
        activeLanguage = 'eng'
    } else {
        if(activeLayout == "Horizontal with Combined Events") {
            document.getElementById('langEng').style.color = '#9ACAEA'
            document.getElementById('langSpa').style.color = 'white'
            document.getElementById('langSpa').style.borderBottom = '3px solid';
            document.getElementById('langEng').style.borderBottom = '0px solid';
        } else {
            document.getElementById('langEng').style.color = 'black'
            document.getElementById('langSpa').style.color = 'red'  
            document.getElementById('langSpa').style.borderBottom = '3px solid';
            document.getElementById('langEng').style.borderBottom = '0px solid';
        }
        activeLanguage = 'spa'
    }
    // Change the UI as languaga selection
    UpdateUIBasedOnActiveLanguage()
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Update the UI based on language selected
 */
function UpdateUIBasedOnActiveLanguage() {

    let current = moment(new Date(),["HH.mm"]).format("hh:mm A");

    if(activeLanguage == 'eng') {
        document.getElementById('directoryView').innerHTML = 'MAP';
        document.getElementById('eventView').innerHTML = 'EVENTS'
        /* document.getElementById('directoryEventTitle').style.width = '300px' */
        document.getElementById('directoryEventTitle').style.width = '96%'

        document.getElementById('sponsorText').innerHTML = 'SPONSORED BY'
        document.getElementById('whereText').innerHTML = 'WHERE:'
        /////////////////////////////////////////////////////////////////////////////

        // Change Directory View
        var groupListFilterData = filterDirectoryDataByGroup();
        
        $.each(groupListFilterData, function (index, row) {
            if(Object.keys(row).length-1 == 1) {
                document.getElementById('group-' + index).innerHTML = groupListFilterData[index].data["Group"].replaceAll('dqo', '"')
            } else {
                document.getElementById('group-' + index).innerHTML = groupListFilterData[index].data["Group"].replaceAll('dqo', '"')
            }
        })
        // data items
        $.each(privateDataList, function (index, row) {
            //document.getElementById('map-' + index).innerHTML = row['Name'].replaceAll('dqo', '"') + ' - ' + row['Description'].replaceAll('dqo', '"')
            document.getElementById('map-' + index).innerHTML = row['Name'].replaceAll('dqo', '"')
        })
        /////////////////////////////////////////////////////////////////////////////
        if(activeMenuIndex == -1) {
            let defImgPath = 'images/map/zapsheets_map_map-main.png'
            $.each(settingDataList, function (index_setting, row_setting) {
                if(row_setting['Name'] == 'DefaultMapImage') {
                    let name =  row_setting['Value'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    let imagePath = rootFolder+ '/cacheImages/' + imageName + "?version=" + UIVersion;
                    defImgPath = imagePath
                }
            })
            imgPath = defImgPath;
            document.getElementById('mapImageHolder').src = imgPath
            // Display defauly BG ENG Version
            //console.log(defBGImgPath, ">>>>>>>>>>>>>>>")
            //document.getElementById('defaultBGImage').src = defBGImgPath
        } 
        /////////////////////////////////////////////////////////////////////////////
        var dailyEvent = filterEventsBasedOnDayTime(); //filterAllEventsBasedOnDayTime(); 
        //console.log("CALLED")
        //var dailyEvent = filterAllEventsBasedOnDayTime(); 
        for (var loop = 0; loop < dailyEvent.length; loop++) {
            let eventName = activeLanguage == 'eng' ? dailyEvent[loop].Name.replaceAll('dqo', '"') : dailyEvent[loop]["Name ES"].replaceAll('dqo', '"')
            //let eventTime = moment(dailyEvent[loop].Start, ["HH.mm"]).format("hh:mm A");
            
            //let eventTime = moment(dailyEvent[loop].Time.split('-')[0].replace(' ', ''), ["HH.mm"]).format("hh:mm A");

            let eventTimeTest = moment(dailyEvent[loop].Time.split('-')[0].replace(' ', ''), 'hh:mm A').format('HH:mm')
            
            let eventTime = moment(eventTimeTest, 'h:mm').format('h:mm A')
            if(eventTime.indexOf('12') != -1 && eventTime.indexOf('AM' != -1)) {
                eventTime = moment(eventTimeTest, 'h:mm A').format('H:mm A')
            }

            //console.log(eventTime, '>>>>>>>>>>>>>>>>>>>>')

            let eventLocation = activeLanguage == 'eng' ? dailyEvent[loop].Location.replaceAll('dqo', '"') : dailyEvent[loop]["Location ES"].replaceAll('dqo', '"')

            if(document.getElementById('sliderItemTime_' + loop) != null) {
                document.getElementById('sliderItemTime_' + loop).innerHTML = (eventTime + ' - ' + eventLocation)
            }
            if(document.getElementById('sliderEventName_' + loop) != null) {
                document.getElementById('sliderEventName_' + loop).innerHTML = eventName
            }

           /*  $('.related_events').find('#sliderEventName_' + loop).removeClass('eventSlide_ES')
            $('.related_events').find('#sliderEventName_' + loop).addClass('eventSlide') */

            $('.related_events').find('#sliderItem_' + loop).removeClass('slider_item')
            $('.related_events').find('#sliderItem_' + loop).addClass('slider_item_es')
        }

        $('.related_events').slick('refresh');
        /////////////////////////////////////////////////////////////////////////////
        var dailyEvent = filterAllEventsBasedOnDayTime();
        if(dailyEvent.length > 0) {
            $.each(dailyEvent, function (index, row) {
                let eventName = dailyEvent[index].Name.replaceAll('dqo', '"')
                //let eventTime = moment(dailyEvent[index].Start, ["HH.mm"]).format("hh:mm A");
                let eventTime = moment(dailyEvent[index].Time.split('-')[0].replace(' ', ''), ["HH.mm"]).format("hh:mm A");
                
                let eventLocation = dailyEvent[index].Location.replaceAll('dqo', '"')

                /////////////////////////////////////////////////////////////////////////
                var timeList = dailyEvent[index].Time.split(',')
                var eventTimeStr = ''
                for (var s=0; s<timeList.length; s++) {
                    let startEventTime = timeList[s].split('-')[0].replace(' ', '');
                    let endEventTime =  timeList[s].split('-')[1].replace(' ', '');
                    let eventTimeTest = moment(startEventTime, 'hh:mm A').format('HH:mm')
                    
                    let eventTimeTestDisp = moment(startEventTime, 'h:mm').format('h:mm A')
                    if(eventTimeTestDisp.indexOf('12') != -1 && eventTimeTestDisp.indexOf('AM' != -1)) {
                        eventTimeTestDisp = moment(startEventTime, 'h:mm A').format('H:mm A')
                    }


                    var eventTimeEndTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
                    
                    var eventTimeEndTestDisp = moment(endEventTime, 'h:mm').format('h:mm A')
                    if(eventTimeEndTestDisp.indexOf('12') != -1 && eventTimeEndTestDisp.indexOf('AM' != -1)) {
                        eventTimeEndTestDisp = moment(endEventTime, 'h:mm A').format('H:mm A')
                    }

                    var currentTime = moment(current, 'hh:mm A').format('HH:mm')
                    
                    //console.log(currentTime, '<=', endTimeTest)
                    //console.log(currentTime, '>=', startTimeTest, '&&', currentTime, '<=', endTimeTest)
                    
                    if(currentTime >= eventTimeTest && currentTime <= eventTimeEndTest) {
                        //eventTimeStr += `<font color="orange">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + `</font><br>`


                        eventTimeStr += `<div class="eventDateContainer"><div class="activeEvent"></div><div style="position: relative;
                        margin-left: 3vh;">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + '</div></div>'



                        //activeTime = eventTimeTest
                        //break;
                    //} else { //if(currentTime < eventTimeTest && currentTime <= eventTimeEndTest) {
                    } else if(currentTime <= eventTimeTest && currentTime <= eventTimeEndTest) {
                        //activeTime = eventTimeTest;
                        //break;
                        //eventTimeStr += eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + `<br>`

                        

                        eventTimeStr += `<div class="eventDateContainer"><div style="normalEvent"></div><div style="position: relative;
                        margin-left: 3vh;">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + '</div></div>'
                    }
                } 
                document.getElementById('eventTime_' + index).innerHTML = eventTimeStr
                document.getElementById('eventDetails_' + index).innerHTML = eventName + `<div style="color:lightgray;">` + eventLocation + `</div>`
                /////////////////////////////////////////////////////////////////////////
                //document.getElementById('event_' + index).innerHTML = eventName + " - (" + eventTime + " - " + eventLocation + ')'
            })
        } else {
            document.getElementById('eventList').innerHTML = `<div class="noactive">NO ACTIVE OR FUTURE EVENTS NOW</div>` 
        }
        /////////////////////////////////////////////////////////////////////////////
        if(activeEventObject != null) {
            let eventName = activeLanguage == 'eng' ? JSON.parse(decodeURIComponent(activeEventObject)).Name.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")") : JSON.parse(decodeURIComponent(itemObject))["Name ES"].replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
            let eventLocation = activeLanguage == 'eng' ? JSON.parse(decodeURIComponent(activeEventObject)).Location.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")") : JSON.parse(decodeURIComponent(itemObject))["Location ES"].replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
            let eventDesc = activeLanguage == 'eng' ? JSON.parse(decodeURIComponent(activeEventObject)).Description.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")") : JSON.parse(decodeURIComponent(activeEventObject))["Description ES"].replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
            // fill fetails
            //document.getElementById('eventTitle').innerHTML = String(eventName).replaceAll('dqo', '"').toUpperCase();
            document.getElementById('eventTitle').innerHTML = String(eventName).replaceAll('dqo', '"');
            document.getElementById('eventDesc').innerHTML = String(eventDesc).replaceAll('dqo', '"');
            document.getElementById('eventsLocation').innerHTML = String(eventLocation).replaceAll('dqo', '"');
        }
        /////////////////////////////////////////////////////////////////////////////
    } else {
        document.getElementById('directoryView').innerHTML = 'MAPA';
        document.getElementById('eventView').innerHTML = 'EVENTOS'
        /* document.getElementById('directoryEventTitle').style.width = '320px' */
        document.getElementById('directoryEventTitle').style.width = '96%'

        document.getElementById('sponsorText').innerHTML = 'PATROCINADO POR'
        document.getElementById('whereText').innerHTML = 'DÓNDE:'
        /////////////////////////////////////////////////////////////////////////////
        // Change Directory View
        var groupListFilterData = filterDirectoryDataByGroup();
        $.each(groupListFilterData, function (index, row) {
            if(Object.keys(row).length-1 == 1) {
                document.getElementById('group-' + index).innerHTML = groupListFilterData[index].data["Group ES"].replaceAll('dqo', '"')
            } else {
                document.getElementById('group-' + index).innerHTML = groupListFilterData[index].data["Group ES"].replaceAll('dqo', '"')
            }
        })
        // data items
        $.each(privateDataList, function (index, row) {
            //document.getElementById('map-' + index).innerHTML = row['Name ES'].replaceAll('dqo', '"') + ' - ' + row['Description ES'].replaceAll('dqo', '"')
            document.getElementById('map-' + index).innerHTML = row['Name ES'].replaceAll('dqo', '"')
        })
        /////////////////////////////////////////////////////////////////////////////
        //console.log(activeMenuIndex, " >> in ES")
        if(activeMenuIndex == -1) {
            let defImgPath = './images/map/zapsheets_map_map-main-es.png'
            $.each(settingDataList, function (index_setting, row_setting) {
                if(row_setting['Name'] == 'DefaultMapImage') {
                    // Prev
                    //defImgPath = row_setting['Value ES']
                    let name =  row_setting['Value ES'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                    // New
                    defImgPath = imagePath
                }
            })
            imgPath = defImgPath;
            document.getElementById('mapImageHolder').src = imgPath
             // Display defauly BG ENG Version
             //document.getElementById('defaultBGImage').src = defBGImgPath
        } 

        let defBGImgPath = ''
        /* if(window.navigator.onLine == true) { */
            $.each(settingDataList, function (index_setting, row_setting) {
                if(row_setting['Name'] == 'BackgroundImage') {
                    //defBGImgPath = row_setting['Value ES']
                    let name = row_setting['Value ES'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                    //console.log('images/map/cacheImages/' + imageName, " imagePath")

                    // Actual
                    //defBGImgPath = row_setting['Value ES']
                    // New
                    defBGImgPath = imagePath
                }
            })
        /* } else {
            if(activeLayout == 'Horizontal with Combined Events') {
                defBGImgPath = 'images/map/cmh_wayfinding_bg.png'
            } else {
                defBGImgPath = 'images/map/zapsheets_map_bg_es.png'
            }
        } */
         // Display defauly BG ENG Version
         console.log(defBGImgPath, " >>>>")
         document.getElementById('defaultBGImage').src = defBGImgPath
        ////////////////////////////////////////////////////////////////////////////////
        /* // slider data
        slideShowLoaded = false
        $('.related_events').css('opacity', '0')
        document.getElementById('slideLoading').style.display = 'flex'
        document.getElementById('slideLoading').innerHTML = "Cargando diapositivas del evento.."
        setTimeout(function() {
            renderSliderItems();
        }, 1000) */
        /////////////////////////////////////////////////////////////////////////////
        // Trying
        var dailyEvent = filterEventsBasedOnDayTime(); //filterAllEventsBasedOnDayTime(); 
        for (var loop = 0; loop < dailyEvent.length; loop++) {
            let eventName = dailyEvent[loop]["Name ES"].replaceAll('dqo', '"')
            //let eventTime = moment(dailyEvent[loop].Start, ["HH.mm"]).format("hh:mm A");
            //let eventTime = moment(dailyEvent[loop].Time.split('-')[0].replace(' ', ''), ["HH.mm"]).format("hh:mm A");

            let eventTimeTest = moment(dailyEvent[loop].Time.split('-')[0].replace(' ', ''), 'hh:mm A').format('HH:mm')
            
            let eventTime = moment(eventTimeTest, 'h:mm').format('h:mm A')
            if(eventTime.indexOf('12') != -1 && eventTime.indexOf('AM' != -1)) {
                eventTime = moment(eventTimeTest, 'h:mm A').format('H:mm A')
            }
            

            let eventLocation = dailyEvent[loop]["Location ES"].replaceAll('dqo', '"')

            //console.log(eventLocation, " >>>")

            if(document.getElementById('sliderItemTime_' + loop) != null) {
                document.getElementById('sliderItemTime_' + loop).innerHTML = (eventTime + ' - ' + eventLocation)
            }
            if(document.getElementById('sliderEventName_' + loop) != null) {
                document.getElementById('sliderEventName_' + loop).innerHTML = eventName
            }

           /*  $('.related_events').find('#sliderEventName_' + loop).removeClass('eventSlide')
            $('.related_events').find('#sliderEventName_' + loop).addClass('eventSlide_ES') */

            $('.related_events').find('#sliderItem_' + loop).removeClass('slider_item')
            $('.related_events').find('#sliderItem_' + loop).addClass('slider_item_es')
        }

        $('.related_events').slick('refresh');
        /////////////////////////////////////////////////////////////////////////////
        var dailyEvent = filterAllEventsBasedOnDayTime(); 
        if(dailyEvent.length > 0) {
            $.each(dailyEvent, function (index, row) {
                let eventName = dailyEvent[index]["Name ES"].replaceAll('dqo', '"')
                //let eventTime = moment(dailyEvent[index].Start, ["HH.mm"]).format("hh:mm A");
                let eventTime = moment(dailyEvent[index].Time.split('-')[0].replace(' ', ''), ["HH.mm"]).format("hh:mm A");

                let eventLocation = dailyEvent[index]["Location ES"].replaceAll('dqo', '"')

                /////////////////////////////////////////////////////////////////////////
                var timeList = dailyEvent[index].Time.split(',')
                var eventTimeStr = ''
                for (var s=0; s<timeList.length; s++) {
                    let startEventTime = timeList[s].split('-')[0].replace(' ', '');
                    let endEventTime =  timeList[s].split('-')[1].replace(' ', '');
                    let eventTimeTest = moment(startEventTime, 'hh:mm A').format('HH:mm')
                    
                    let eventTimeTestDisp = moment(startEventTime, 'h:mm').format('h:mm A')
                    if(eventTimeTestDisp.indexOf('12') != -1 && eventTimeTestDisp.indexOf('AM' != -1)) {
                        eventTimeTestDisp = moment(startEventTime, 'h:mm A').format('H:mm A')
                    }

                    var eventTimeEndTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
                    
                    var eventTimeEndTestDisp = moment(endEventTime, 'h:mm').format('h:mm A')
                    if(eventTimeEndTestDisp.indexOf('12') != -1 && eventTimeEndTestDisp.indexOf('AM' != -1)) {
                        eventTimeEndTestDisp = moment(endEventTime, 'h:mm A').format('H:mm A')
                    }

                    var currentTime = moment(current, 'hh:mm A').format('HH:mm')
                    
                    //console.log(currentTime, '<=', endTimeTest)
                    //console.log(currentTime, '>=', startTimeTest, '&&', currentTime, '<=', endTimeTest)
                    
                    if(currentTime >= eventTimeTest && currentTime < eventTimeEndTest) {
                        //eventTimeStr += `<font color="orange">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + `</font><br>`


                        eventTimeStr += `<div class="eventDateContainer"><div class="activeEvent"></div><div style="position: relative;
                        margin-left: 3vh;">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + '</div></div>'


                        //activeTime = eventTimeTest
                        //break;
                    //} else { //if(currentTime < eventTimeTest && currentTime <= eventTimeEndTest) {
                    } else if(currentTime <= eventTimeTest && currentTime <= eventTimeEndTest) {
                        //activeTime = eventTimeTest;
                        //break;
                        //eventTimeStr += eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + `<br>`

                        eventTimeStr += `<div class="eventDateContainer"><div class="normalEvent"></div><div style="position: relative;
                        margin-left: 3vh;">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + '</div></div>'
                    }
                } 
                document.getElementById('eventTime_' + index).innerHTML = eventTimeStr

                //console.log(eventName + `<br>` + eventLocation, " AAAAA")

                document.getElementById('eventDetails_' + index).innerHTML = eventName + `<div style="color:lightgray;">` + eventLocation + `</div>`

                /////////////////////////////////////////////////////////////////////////


                //document.getElementById('event_' + index).innerHTML = eventName + " - (" + eventTime + " - " + eventLocation + ')'
            })
        } else {
            document.getElementById('eventList').innerHTML = `<div class="noactive">NO HAY EVENTOS ACTIVOS O FUTUROS AHORA</div>` 
        }
        /////////////////////////////////////////////////////////////////////////////
        if(activeEventObject != null) {
            let eventName = activeLanguage == 'eng' ? JSON.parse(decodeURIComponent(activeEventObject)).Name.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")") : JSON.parse(decodeURIComponent(activeEventObject))["Name ES"].replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
            let eventLocation = activeLanguage == 'eng' ? JSON.parse(decodeURIComponent(activeEventObject)).Location.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")") : JSON.parse(decodeURIComponent(activeEventObject))["Location ES"].replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
            let eventDesc = activeLanguage == 'eng' ? JSON.parse(decodeURIComponent(activeEventObject)).Description.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")") : JSON.parse(decodeURIComponent(activeEventObject))["Description ES"].replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
            // fill fetails
            //document.getElementById('eventTitle').innerHTML = String(eventName).replaceAll('dqo', '"').toUpperCase();
            document.getElementById('eventTitle').innerHTML = String(eventName).replaceAll('dqo', '"');
            document.getElementById('eventDesc').innerHTML = String(eventDesc).replaceAll('dqo', '"');
            document.getElementById('eventsLocation').innerHTML = String(eventLocation).replaceAll('dqo', '"');
        }
        /////////////////////////////////////////////////////////////////////////////
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
function checkIfImageExists(url, callback) {
    //const img = new Image();
    let img = new Image();
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
/**
 * Preloading all app images
 */
function PreloadAllImages() {
    // Caching Directory Map Images
    
    //if(window.navigator.onLine == true) {
        //console.log("AAAAA")

        var dailyEvent = eventsDataList; //filterAllEventsBasedOnDayTime();
        /* var AllImageCount = settingDataList.length + privateDataList.length + dailyEvent.length + kioskDataList.length;
        console.log(AllImageCount, " Total Images") */
        


        $.each(settingDataList, function (index_setting, row_setting) {
            
            if(row_setting['Name'] == 'BackgroundImage') {
                if(row_setting['Value'] != '') {
                    if (row_setting['Value'].includes("https://drive.google.com")) {
                        let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        setTimeout(function() {
                            /* if(row_setting['Value'] != undefined) {
                                checkIfImageExists(imgPath, (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(imgPath)
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            /* if(row_setting['Value'] != undefined) {
                                checkIfImageExists(row_setting['Value'], (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(row_setting['Value'])
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(row_setting['Value'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
                    }
                }
                if(row_setting['Value ES'] != '') {
                    if (row_setting['Value ES'].includes("https://drive.google.com")) {
                        let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        setTimeout(function() {
                            /* if(row_setting['Value ES']) {
                                checkIfImageExists(imgPath, (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(imgPath)
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            /* if(row_setting['Value ES']) {
                                checkIfImageExists(row_setting['Value ES'], (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(row_setting['Value ES'])
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(row_setting['Value ES'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
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
                            /* if(row_setting['Value'] != undefined) {
                                checkIfImageExists(imgPath, (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(imgPath)
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            /* if(row_setting['Value'] != undefined) {
                                checkIfImageExists(row_setting['Value'], (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(row_setting['Value'])
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(row_setting['Value'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
                    }
                }
                if(row_setting['Value ES'] != '') {
                    if (row_setting['Value ES'].includes("https://drive.google.com")) {
                        let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        setTimeout(function() {
                            /* if(row_setting['Value ES'] != undefined) {
                                checkIfImageExists(imgPath, (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(imgPath)
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            /* if(row_setting['Value ES'] != undefined) {
                                checkIfImageExists(row_setting['Value ES'], (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(row_setting['Value ES'])
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(row_setting['Value ES'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
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
                            /* if(row_setting['Value'] != undefined) {
                                checkIfImageExists(imgPath, (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(imgPath)
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            /* if(row_setting['Value'] != undefined) {
                                checkIfImageExists(row_setting['Value'], (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(row_setting['Value'])
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(row_setting['Value'])
                            } else {
                                downloadImagesLocally("") 
                            }
                        }, 50);
                    }
                }

                if(row_setting['Value ES'] != '') {
                    if (row_setting['Value ES'].includes("https://drive.google.com")) {
                        let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        setTimeout(function() {
                            /* if(row_setting['Value ES'] != undefined) {
                                checkIfImageExists(imgPath, (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(imgPath)
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            /* if(row_setting['Value ES'] != undefined) {
                                checkIfImageExists(row_setting['Value ES'], (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(row_setting['Value ES'])
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value ES'] != '') {
                                downloadImagesLocally(row_setting['Value ES'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
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
                            /* if(row_setting['Value'] != undefined) {
                                checkIfImageExists(imgPath, (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(imgPath)
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(imgPath)
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
                    } else {
                        // Cache Image
                        setTimeout(function() {
                            /* if(row_setting['Value'] != undefined) {
                                checkIfImageExists(row_setting['Value'], (exists) => {
                                    if (exists) {
                                        //console.log('Image exists. ')
                                        downloadImagesLocally(row_setting['Value'])
                                    } else {
                                        //console.error('Image does not exists.')
                                        downloadImagesLocally("")
                                    }
                                });
                            } */
                            if(row_setting['Value'] != '') {
                                downloadImagesLocally(row_setting['Value'])
                            } else {
                                downloadImagesLocally("")
                            }
                        }, 50);
                    }
                }
            }
        })


        //////////////////////// For map data ///////////////////////////
        $.each(privateDataList, function (i, row) {
            if(privateDataList[i]['Map Image'] != '' && privateDataList[i]['Map Image'] != undefined) {
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
                    }, 50);
                } else {
                    // Cache Image
                    setTimeout(function() {
                        if(privateDataList[i] != '') {
                            downloadImagesLocally(privateDataList[i]['Map Image'])
                        } else {
                            downloadImagesLocally("")
                        }
                    }, 50);
                }
            }
        })

        //////////////////////// For Event data ///////////////////////////
        $.each(eventsDataList, function (i, row) {
            if(eventsDataList[i].Image != '' && eventsDataList[i].Image != undefined) {
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
                    }, 50);
                } else {
                    // Cache Image
                    setTimeout(function() {
                        if(eventsDataList[i] != '') {
                            downloadImagesLocally(eventsDataList[i].Image)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, 50);
                }
            }

            //console.log(eventsDataList[i]['Map Image'], "-------")
            if(eventsDataList[i]['Map Image'] != '' && eventsDataList[i]['Map Image'] != undefined) {
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
                    }, 50);
                } else {
                    // Cache Image
                    setTimeout(function() {
                        if(eventsDataList[i] != '') {
                            downloadImagesLocally(eventsDataList[i]['Map Image'])
                        } else {
                            downloadImagesLocally("")
                        }
                    }, 50);
                }
            }
        })

        //////////////////////// For Kiosk data ///////////////////////////
        $.each(kioskDataList, function (i, row) {
            if(kioskDataList[i].Image != '' && kioskDataList[i].Image != undefined) {
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
                    }, 50)
                } else {
                    // Cache Image
                    setTimeout(function() {
                        if(kioskDataList[i] != '') {
                            downloadImagesLocally(kioskDataList[i].Image)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, 50)
                }
            }
        })
       

        return;

        for (var i=0; i<privateDataList.length; i++) {

            if(privateDataList[i]['Map Image'] != '') {
                if (privateDataList[i]['Map Image'].includes("https://drive.google.com")) {
                    let imgid = privateDataList[i]['Map Image'].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";

                    // Cache Image
                    setTimeout(function() {
                        /* if(privateDataList[i] != undefined) {
                            checkIfImageExists(imgPath, (exists) => {
                                if (exists) {
                                    //console.log('Image exists. ')
                                    downloadImagesLocally(imgPath)
                                } else {
                                    //console.error('Image does not exists.')
                                    downloadImagesLocally("")
                                }
                            });
                        } */
                        if(privateDataList[i] != '') {
                            downloadImagesLocally(imgPath)
                        } else {
                            downloadImagesLocally("") 
                        }
                    }, 50);
                } else {
                    // Cache Image
                    /* checkIfImageExists(privateDataList[i]['Map Image'], (exists) => {
                        if (exists) {
                          //console.log('Image exists. ')
                        } else {
                          //console.error('Image does not exists.')
                        }
                    }); */
                    //setTimeout(function() {
                        if(privateDataList[i] != '') {
                            //console.log(privateDataList[i]['Map Image'], " 4162")
                            downloadImagesLocally(privateDataList[i]['Map Image'])
                        } else {
                            downloadImagesLocally("")
                        }
                        /* if(privateDataList[i] != undefined) {
                            checkIfImageExists(privateDataList[i]['Map Image'], (exists) => {
                                if (exists) {
                                    //console.log('Image exists. ')
                                    downloadImagesLocally(privateDataList[i]['Map Image'])
                                } else {
                                    //console.error('Image does not exists.')
                                    downloadImagesLocally("")
                                }
                            });
                        } */
                    //}, 1);
                }
            }
        }
        // Caching Event Images
        for (var j=0; j<dailyEvent.length; j++) {
            if(dailyEvent[j].Image != '') {
                if (dailyEvent[j].Image.includes("https://drive.google.com")) {
                    let imgid = dailyEvent[j].Image.split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    setTimeout(function() {
                        /* if(dailyEvent[j] != undefined) {
                            checkIfImageExists(imgPath, (exists) => {
                                if (exists) {
                                    //console.log('Image exists. ')
                                    downloadImagesLocally(imgPath)
                                } else {
                                    //console.error('Image does not exists.')
                                    downloadImagesLocally("")
                                }
                            });
                        } */
                        if(dailyEvent[j] != '') {
                            downloadImagesLocally(imgPath)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, 50);
                } else {
                    // Cache Image
                    setTimeout(function() {
                        /* if(dailyEvent[j] != undefined) {
                            checkIfImageExists(dailyEvent[j].Image, (exists) => {
                                if (exists) {
                                    //console.log('Image exists. ')
                                    downloadImagesLocally(dailyEvent[j].Image)
                                } else {
                                    //console.error('Image does not exists.')
                                    downloadImagesLocally("")
                                }
                            });
                        } */
                        if(dailyEvent[j] != '') {
                            downloadImagesLocally(dailyEvent[j].Image)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, 50);
                }
            }

            //console.log(dailyEvent[j]['Map Image'], " CMI")

            if(dailyEvent[j]['Map Image'] != undefined) {
                if (dailyEvent[j]['Map Image'].includes("https://drive.google.com")) {
                    let imgid = dailyEvent[j]['Map Image'].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    setTimeout(function() {
                        /* if(dailyEvent[j] != undefined) {
                            checkIfImageExists(imgPath, (exists) => {
                                if (exists) {
                                    //console.log('Image exists. ')
                                    downloadImagesLocally(imgPath)
                                } else {
                                    //console.error('Image does not exists.')
                                    downloadImagesLocally("")
                                }
                            });
                        } */
                        if(dailyEvent[j] != '') {
                            downloadImagesLocally(imgPath)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, 50);
                } else {
                    // Cache Image
                    setTimeout(function() {
                        /* if(dailyEvent[j] != undefined) {
                            checkIfImageExists(dailyEvent[j]['Map Image'], (exists) => {
                                if (exists) {
                                    //console.log('Image exists. ')
                                    downloadImagesLocally(dailyEvent[j]['Map Image'])
                                } else {
                                    //console.error('Image does not exists.')
                                    downloadImagesLocally("")
                                }
                            });
                        } */
                        if(dailyEvent[j] != '') {
                            downloadImagesLocally(dailyEvent[j]['Map Image'])
                        } else {
                            downloadImagesLocally("")
                        }
                    }, 50);
                }
            }
        }
        /* for (var j=0; j<eventsDataList.length; j++) {
            if(eventsDataList[j].Image != '') {
                if (eventsDataList[j].Image.includes("https://drive.google.com")) {
                    let imgid = eventsDataList[j].Image.split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    downloadImagesLocally(imgPath)
                } else {
                    // Cache Image
                    downloadImagesLocally(eventsDataList[j].Image)
                }
            }
            if(eventsDataList[j]['Map Image'] != '' || eventsDataList[j]['Map Image'] != undefined) {
                if (eventsDataList[j]['Map Image'].includes("https://drive.google.com")) {
                    let imgid = eventsDataList[j]['Map Image'].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    downloadImagesLocally(imgPath)
                } else {
                    // Cache Image
                    downloadImagesLocally(eventsDataList[j]['Map Image'])
                }
            }
        } */
        // Caching kiosk Images
        for (var j=0; j<kioskDataList.length; j++) {
            if(kioskDataList[j].Image != '') {
                if (kioskDataList[j].Image.includes("https://drive.google.com")) {
                    let imgid = kioskDataList[j].Image.split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    setTimeout(function() {
                        /* if(kioskDataList[j] != undefined) {
                            checkIfImageExists(imgPath, (exists) => {
                                if (exists) {
                                    //console.log('Image exists. ')
                                    downloadImagesLocally(imgPath)
                                } else {
                                    //console.error('Image does not exists.')
                                    downloadImagesLocally("")
                                }
                            });
                        } */
                        if(kioskDataList[j] != '') {
                            downloadImagesLocally(imgPath)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, 50)
                } else {
                    // Cache Image
                    setTimeout(function() {
                        /* if(kioskDataList[j] != undefined) {
                            checkIfImageExists(kioskDataList[j].Image, (exists) => {
                                if (exists) {
                                    //console.log('Image exists. ')
                                    downloadImagesLocally(kioskDataList[j].Image)
                                } else {
                                    //console.error('Image does not exists.')
                                    downloadImagesLocally("")
                                }
                            });
                        } */
                        if(kioskDataList[j] != '') {
                            downloadImagesLocally(kioskDataList[j].Image)
                        } else {
                            downloadImagesLocally("")
                        }
                    }, 50)
                }
            }
        }
    /* } else {
        var defImg = new Image();
        defImg.src = 'images/map/cmh_wayfinding_bg.png'
        var defImg_def = new Image();
        defImg_def.src = 'images/map/earshot-games_splash.png'
        var defImg_eng = new Image();
        defImg_eng.src = 'images/map/zapsheets_map_bg.png'
        var defImg_es = new Image();
        defImg_es.src = 'images/map/zapsheets_map_bg_es.png'
    } */

    
    // preload to cache
    ///////////////////////////////////////////////////////////////////////////////////
    //PreloadAllToCache()
    ///////////////////////////////////////////////////////////////////////////////////
}

//////////////////////////////////////////////////////////////////////////////////////
/**
 * 
 * @returns 
 */
function getAllImageCount() {
    var tempCount = 0
    $.each(eventsDataList, function (i, row) {
        //console.log(eventsDataList[i].Image, " Event Image Path")
        if(eventsDataList[i].Image != '' /* && eventsDataList[i].Image != undefined */) {
            /* checkIfImageExists(eventsDataList[i].Image, (exists) => {
                if (exists) {
                    //console.log('Event Image exists. ')
                    tempCount++;
                } 
            }); */
            tempCount++;
        }
        if(eventsDataList[i]['Map Image'] != '' /* && eventsDataList[i]['Map Image'] != undefined */) {
            /* checkIfImageExists(eventsDataList[i].Image, (exists) => {
                if (exists) {
                    //console.log('Event Image exists. ')
                    tempCount++;
                } 
            }); */
            tempCount++;
        }
    })
    $.each(settingDataList, function (index_setting, row_setting) {
        if(row_setting['Name'] == 'TextImage' || row_setting['Name'] == 'DefaultMapImage' || row_setting['Name'] == 'BackgroundImage' || row_setting['Name'] == 'SplashImageUrl') {
            if(row_setting['Value'] != '' /* && row_setting['Value'] != undefined */) {
                /* checkIfImageExists(row_setting['Value'], (exists) => {
                    if (exists) {
                        //console.log('Image exists. ')
                        tempCount++;
                    } 
                }); */
                tempCount++
            }
            if(row_setting['Value ES'] != '' /* && row_setting['Value ES'] != undefined */) {
                /* checkIfImageExists(row_setting['Value ES'], (exists) => {
                    if (exists) {
                        //console.log('Image exists. ')
                        tempCount++;
                    } 
                }); */
                tempCount++
            }
        }
    })

    $.each(privateDataList, function (index, row) {
        if(privateDataList[index]['Map Image'] != '' /* && privateDataList[index]['Map Image'] != undefined */) {
            /* checkIfImageExists(privateDataList[i]['Map Image'], (exists) => {
                if (exists) {
                    //console.log('Image exists. ')
                    tempCount++;
                } 
            }); */
            tempCount++;
        }
    })

    //for(var i=0; i<kioskDataList.length; i++) {
    $.each(kioskDataList, function (i, row) {
        if(kioskDataList[i].Image != '' /* && kioskDataList[i].Image != undefined */) {
            /* checkIfImageExists(kioskDataList[i].Image, (exists) => {
                if (exists) {
                    //console.log('Image exists. ')
                    tempCount++;
                } 
            }); */
            tempCount++;
        }
    })

    return tempCount;
}
//////////////////////////////////////////////////////////////////////////////////////
/**
 * 
 * @param {*} _count 
 */
function showMessageInfo(_count) {
    var lastline = document.getElementById("loadingTxt").innerHTML.split('<br>')
    var prevMessage = ''
    var msgIndex = 0;
    var actualMessage = ''
    for (var i=0; i<lastline.length; i++) {
        /* if(lastline[i].indexOf('Error') != -1) {
            //errorMessage = lastline[i] + "<br>";
            msgIndex = 4
        } else {
            msgIndex = 2
        } */
       
        if(i < lastline.length-2) {
            prevMessage += lastline[i] + "<br>";
        } else {
            //prevMessage += '';
        }
    }
    //console.log(errorMessage, " >")
    var newMessage = "Loading Images (" + (_count) + "/" + getAllImageCount() + ")...<br>";
    document.getElementById("loadingTxt").innerHTML = prevMessage + newMessage;
    updateInfoTextView()


    // Check all Preload Cache Image and the move to enable app section
    if(_count == getAllImageCount()) {
        //console.log("ENTER HERER - ", errorMessage)
        if(errorMessage.length > 0) {
            for(var i=0; i<errorMessage.length; i++) {
                document.getElementById("loadingTxt").innerHTML += errorMessage[i];
                updateInfoTextView()
            }
        }
        errorMessage = []
        checkAndLoadAppScreenOnceReady()
    }
}
//////////////////////////////////////////////////////////////////////////////////////
/**
 * 
 */
function checkAndLoadAppScreenOnceReady() {
    if(forceReload == false) {
        setTimeout(function() {
            //PreloadAllImages()
            document.getElementById("loadingTxt").innerHTML += 'All Maps and Events Data Loaded.<br>'
            updateInfoTextView()

            document.getElementById("loadingTxt").innerHTML += "All Images Has Been Cached.<br>"
            updateInfoTextView();

            ////////////////////////////////////////////////////////////////////////////////////////////
            // Save log
            let kiosk_location = ''
            let sheet_version = ''
            let sheet_title = ''
            let poll_time_string = ''
            $.each(settingDataList, function (index, row) {
                if(row['Name'] == 'Title') {
                    sheet_title = row['Value']
                }
                
                if(row['Name'] == 'Version') {
                    sheet_version = row['Value']
                }
            })

            $.each(kioskDataList, function (index_kiosk, row_Kiosk) {
                if(kioskDataList[index_kiosk].Location != '') {
                    kiosk_location = kioskDataList[index_kiosk].Location
                } 
            })
            let currentDate = new Date();
            /* document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('MM/DD/YYYY HH:mm:ss').toLocaleString() + "<br>"
            updateInfoTextView() */
            poll_time_string = moment(currentDate).format('MM/DD/YYYY HH:mm:ss').toLocaleString()
            // push status ajax call block
            saveInfoToLog(_version, poll_time_string, sheet_title, sheet_version, kiosk_location)
            ////////////////////////////////////////////////////////////////////////////////////////////

        }, 500)
    } else {
        setTimeout(function() {
            //PreloadAllImages()
            document.getElementById("loadingTxt").innerHTML += 'All Maps and Events Data Loaded.<br>'
            updateInfoTextView()
            
            document.getElementById("loadingTxt").innerHTML += "All Images Has Been Cached.<br>"
            updateInfoTextView();
            ////////////////////////////////////////////////////////////////////////////////////////////
            // Save log
            let kiosk_location = ''
            let sheet_version = ''
            let sheet_title = ''
            let poll_time_string = ''
            $.each(settingDataList, function (index, row) {
                if(row['Name'] == 'Title') {
                    sheet_title = row['Value']
                }
                
                if(row['Name'] == 'Version') {
                    sheet_version = row['Value']
                }
            })

            $.each(kioskDataList, function (index_kiosk, row_Kiosk) {
                if(kioskDataList[index_kiosk].Location != '') {
                    kiosk_location = kioskDataList[index_kiosk].Location
                } 
            })
            let currentDate = new Date();
            /* document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('MM/DD/YYYY HH:mm:ss').toLocaleString() + "<br>"
            updateInfoTextView() */
            poll_time_string = moment(currentDate).format('MM/DD/YYYY HH:mm:ss').toLocaleString()
            // push status ajax call block
            saveInfoToLog(_version, poll_time_string, sheet_title, sheet_version, kiosk_location)
            ////////////////////////////////////////////////////////////////////////////////////////////
        }, 500) 
    }

    setTimeout(function() {
        /* document.getElementById('preloaderCircle').style.display = 'none';
        document.getElementById('slowConnectionStart').style.display = 'none'
        document.getElementById('versionText').style.display = 'none'
        document.getElementById('splashScreenSection').style.display = 'none'

        // Hide new Loader
        homeLoader.hide(); */

        //console.log("Redirected")
        // document.getElementById("loadingTxt").innerHTML += 'All Maps and Events Data Loaded.<br>'
        // updateInfoTextView()
        if(forceReload) {
            // Enable the app ui screen
            enableAppScreen();
        } else {
            // Enable the app ui screen
            enableAppScreen();
        }
        appDataLoaded = true
    }, 500)
}
//////////////////////////////////////////////////////////////////////////////////////
function PreloadAllToCache() {
    //var dailyEvent = eventsDataList; //filterAllEventsBasedOnDayTime();
    var imgLoaded = 0;
    let rootFolder = './sheets/' + sheet_Id + "/" + target;
    
    $.each(settingDataList, function (index_setting, row_setting) {
        if(row_setting['Name'] == 'BackgroundImage') {
            if(row_setting['Value'] != '') {
                if (row_setting['Value'].includes("https://drive.google.com")) {
                    let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imgid + '.png')
                            let bgImage = new Image();
                            bgImage.src = imagePath;
                           
                           /*  document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                            updateInfoTextView() */
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                        }
                    })
                    //document.body.appendChild(bgImage);
                } else {
                    // Cache Image
                    let name = row_setting['Value'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;
                    
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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image ' + imageName + '</font><br>')
                        }
                    })
                }
            }
            if(row_setting['Value ES'] != '') {
                if (row_setting['Value ES'].includes("https://drive.google.com")) {
                    let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    
                    //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion : 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value ES'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image '  + imageName + '</font><br>')
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
                    //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999);

                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion : 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

                    //let isExists = checkIfImageExists('images/map/cacheImages/' + imgid)
                    checkIfImageExists(imagePath, (isExists) => {
                        if(isExists) {
                            //console.log('Caching '  + imgid + '.png')
                            let bgImage = new Image();
                            bgImage.src = imagePath;
                            /* document.getElementById("loadingTxt").innerHTML += 'Loading image '  + imgid + '.png from server.<br>'
                            updateInfoTextView() */
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            imgLoaded++
                           /*  document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image '  + imageName + '</font><br>')
                        }
                    })
                }
            }

            if(row_setting['Value ES'] != '') {
                if (row_setting['Value ES'].includes("https://drive.google.com")) {
                    let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion : 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;


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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                        }
                    })
                } else {
                    // Cache Image
                    let name = row_setting['Value ES'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image '  + imageName + '</font><br>')
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
                    //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion : 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            imgLoaded++
                           /*  document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;


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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image '  + imageName + '</font><br>')
                        }
                    })

                }
            }
            if(row_setting['Value ES'] != '') {
                if (row_setting['Value ES'].includes("https://drive.google.com")) {
                    let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion : 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value ES'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image '  + imageName + '</font><br>')
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
                    //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion : 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image '  + imageName + '</font><br>')
                        }
                    })
                }
            }
            if(row_setting['Value ES'] != '') {
                if (row_setting['Value ES'].includes("https://drive.google.com")) {
                    let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion : 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                        }
                    })

                } else {
                    // Cache Image
                    let name = row_setting['Value ES'].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    
                    // New Changes
                    //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                    //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                    // Prev
                    /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

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
                            imgLoaded++
                            showMessageInfo(imgLoaded)
                        } else {
                            //console.log('Error: '  + imageName + ' does not exists in server cache.')
                            imgLoaded++
                            /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                            updateInfoTextView() */
                            errorMessage.push('<font color="red">Error: Missing Image '  + imageName + '</font><br>')
                        }
                    })

                }
            }
        }
        
    })

    //for (var i=0; i<privateDataList.length; i++) {
    $.each(privateDataList, function (i, row_setting) {
        if(privateDataList[i]['Map Image'] != '') {
            if (privateDataList[i]['Map Image'].includes("https://drive.google.com")) {
                let imgid = privateDataList[i]['Map Image'].split('https://drive.google.com')[1].split('/')[3];
                let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                // Cache Image
                //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999);
                //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                // Prev
                /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion : 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion; */
                let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

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
                        imgLoaded++
                        showMessageInfo(imgLoaded)
                    } else {
                        //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                        imgLoaded++
                        /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                        updateInfoTextView() */
                        errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                    }
                })

            } else {
                // Cache Image
                let name = privateDataList[i]['Map Image'].split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                
                // New Changes
                //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                // Prev
                /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

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
                        imgLoaded++
                        showMessageInfo(imgLoaded)
                    } else {
                        //console.log('Error: '  + imageName + ' does not exists in server cache.')
                        imgLoaded++
                        /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                        updateInfoTextView() */
                        errorMessage.push('<font color="red">Error: Missing Image '  + imageName + '</font><br>')
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
                //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999);
                //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                // Prev
                /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion : 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion; */
                let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

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
                        imgLoaded++
                        showMessageInfo(imgLoaded)
                    } else {
                        //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                        imgLoaded++
                        /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                        updateInfoTextView() */
                        errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                    }
                })
            } else {
                // Cache Image
                let name = eventsDataList[j].Image.split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                
                // New Changes
                //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                // Prev
                /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;


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
                        imgLoaded++
                        showMessageInfo(imgLoaded)
                    } else {
                        //console.log('Error: '  + imageName + ' does not exists in server cache.')
                        imgLoaded++
                        /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                        updateInfoTextView() */
                        errorMessage.push('<font color="red">Error: Missing Image '  + imageName + '</font><br>')
                    }
                })
            }
        }
        if(eventsDataList[j]['Map Image'] != '') {
            if (eventsDataList[j]['Map Image'].includes("https://drive.google.com")) {
                let imgid = eventsDataList[j]['Map Image'].split('https://drive.google.com')[1].split('/')[3];
                let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                // Cache Image
                //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999);
                //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                // Prev
                /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion : 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion; */
                let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

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
                        imgLoaded++
                        showMessageInfo(imgLoaded)
                    } else {
                        //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                        imgLoaded++
                        /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                        updateInfoTextView() */
                        errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                    }
                })
            } else {
                // Cache Image
                let name = eventsDataList[j]['Map Image'].split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                
                // New Changes
                //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                // Prev
                /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

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
                        imgLoaded++
                        showMessageInfo(imgLoaded)
                    } else {
                        //console.log('Error: '  + imageName + ' does not exists in server cache.')
                        imgLoaded++
                        /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>' */
                        errorMessage.push('<font color="red">Error: Missing Image '  + imageName + '</font><br>')
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
                //let imagePath = 'images/map/cacheImages/' + imgid + '.png?version=' + Math.random(99999999999);
                //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                // Prev
                /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion : 'images/map/cacheImages/' + imgid + '.png?version=' + currentSheetVersion; */
                let imagePath = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

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
                        imgLoaded++
                        showMessageInfo(imgLoaded)
                    } else {
                        //console.log('Error: '  + imgid + '.png does not exists in server cache.')
                        imgLoaded++
                        /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image ' + imgid + '.png</font><br>'
                        updateInfoTextView() */
                        errorMessage.push('<font color="red">Error: Missing Image ' + imgid + '.png</font><br>')
                    }
                })
            } else {
                // Cache Image
                let name = kioskDataList[j].Image.split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                
                // New Changes
                //let imagePath = 'images/map/cacheImages/' + imageName + "?version=" + Math.random(99999999999);
                //let imagePath = './sheets/' + sheet_Id + '/cacheImages/' + imgid + '.png?version=' + Math.random();

                // Prev
                /* let imagePath = window.navigator.onLine == true && cacheFirst == false ? 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion : 'images/map/cacheImages/' + imageName + "?version=" + currentSheetVersion; */
                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

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
                        imgLoaded++
                        showMessageInfo(imgLoaded)
                    } else {
                        //console.log('Error: '  + imageName + ' does not exists in server cache.')
                        imgLoaded++
                        /* document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Missing Image '  + imageName + '</font><br>'
                        updateInfoTextView() */
                        errorMessage.push('<font color="red">Error: Missing Image '  + imageName + '</font><br>')
                    }
                })
            }
        }
    })
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/* function PreloadAllImages1() {
    // Caching Directory Map Images
    if(window.navigator.onLine == true) {
        $.each(settingDataList, function (index_setting, row_setting) {
            if(row_setting['Name'] == 'BackgroundImage') {
                var imgHolderBGEN = new Image();
                imgHolderBGEN.src = row_setting['Value']


                if(row_setting['Value'] != '') {
                    if (row_setting['Value'].includes("https://drive.google.com")) {
                        let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        downloadImagesLocally(imgPath)
                    } else {
                        // Cache Image
                        downloadImagesLocally(row_setting['Value'])
                    }
                }

                var imgHolderBGES = new Image();
                imgHolderBGES.src = row_setting['Value ES']

                if(row_setting['Value ES'] != '') {
                    if (row_setting['Value ES'].includes("https://drive.google.com")) {
                        let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        downloadImagesLocally(imgPath)
                    } else {
                        // Cache Image
                        downloadImagesLocally(row_setting['Value ES'])
                    }
                }
            }
            if(row_setting['Name'] == 'DefaultMapImage') {
                var imgHolderDefEN = new Image();
                imgHolderDefEN.src = row_setting['Value']

                if(row_setting['Value'] != '') {
                    if (row_setting['Value'].includes("https://drive.google.com")) {
                        let imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        downloadImagesLocally(imgPath)
                    } else {
                        // Cache Image
                        downloadImagesLocally(row_setting['Value'])
                    }
                }

                var imgHolderDefES = new Image();
                imgHolderDefES.src = row_setting['Value ES']

                if(row_setting['Value ES'] != '') {
                    if (row_setting['Value ES'].includes("https://drive.google.com")) {
                        let imgid = row["Value ES"].split('https://drive.google.com')[1].split('/')[3];
                        let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                        // Cache Image
                        downloadImagesLocally(imgPath)
                    } else {
                        // Cache Image
                        downloadImagesLocally(row_setting['Value ES'])
                    }
                }
            }
        })

        for (var i=0; i<privateDataList.length; i++) {
            if(privateDataList[i]['Map Image'] != '') {
                if (privateDataList[i]['Map Image'].includes("https://drive.google.com")) {
                    let imgid = privateDataList[i]['Map Image'].split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    downloadImagesLocally(imgPath)
                } else {
                    // Cache Image
                    downloadImagesLocally(privateDataList[i]['Map Image'])
                }
            }
        }
        // Caching Event Images
        for (var j=0; j<eventsDataList.length; j++) {
            var imgHolderEvent = new Image();
            //console.log(eventsDataList[j].Image, " Loaded")
            imgHolderEvent.src = eventsDataList[j].Image
            //console.log(eventsDataList[j].Image, "Image")
            if(eventsDataList[j].Image != '') {
                if (eventsDataList[j].Image.includes("https://drive.google.com")) {
                    let imgid = eventsDataList[j].Image.split('https://drive.google.com')[1].split('/')[3];
                    let imgPath = "https://drive.google.com/thumbnail?id=" + imgid + "&sz=w3500";
                    // Cache Image
                    downloadImagesLocally(imgPath)
                } else {
                    // Cache Image
                    downloadImagesLocally(eventsDataList[j].Image)
                }
            }
        }
    } else {
        var defImg = new Image();
        defImg.src = 'images/map/cmh_wayfinding_bg.png'

        var defImg_def = new Image();
        defImg_def.src = 'images/map/earshot-games_splash.png'

        var defImg_eng = new Image();
        defImg_eng.src = 'images/map/zapsheets_map_bg.png'

        var defImg_es = new Image();
        defImg_es.src = 'images/map/zapsheets_map_bg_es.png'
    }
} */
////////////////////////////////////////////////////////////////////////////////////////////////////
function downloadImagesLocally(urlString) {
    let rootFolder = "../sheets/" + sheet_Id + "/" + target;
    if(window.navigator.onLine == false) {return}
    var downloadRequest = $.ajax({
        url: 'saveAs.php?version=' + UIVersion, 
        /* url: window.navigator.onLine == true && cacheFirst == false ? 'saveAs.php?version=' + Math.random() : 'saveAs.php',  */
        /* url: 'saveAs.php', */
        type:'POST', 
        data:{'imgURL' : urlString}, 
        /* cache: false, */
        cache: true,  
        /* async: false, */
        success: function (response) {
            //console.log(response, " response")
            //var dailyEvent = filterAllEventsBasedOnDayTime();
            var tempCount = 0
            $.each(eventsDataList, function (i, row) {
                //console.log(eventsDataList[i].Image, " Event Image Path")
                if(eventsDataList[i].Image != '' /* && eventsDataList[i].Image != undefined */) {
                    /* checkIfImageExists(eventsDataList[i].Image, (exists) => {
                        if (exists) {
                            //console.log('Event Image exists. ')
                            tempCount++;
                        } 
                    }); */
                    tempCount++;
                }
                if(eventsDataList[i]['Map Image'] != '' /* && eventsDataList[i]['Map Image'] != undefined */) {
                    /* checkIfImageExists(eventsDataList[i].Image, (exists) => {
                        if (exists) {
                            //console.log('Event Image exists. ')
                            tempCount++;
                        } 
                    }); */
                    tempCount++;
                }
            })
            $.each(settingDataList, function (index_setting, row_setting) {
                if(row_setting['Name'] == 'TextImage' || row_setting['Name'] == 'DefaultMapImage' || row_setting['Name'] == 'BackgroundImage' || row_setting['Name'] == 'SplashImageUrl') {
                    if(row_setting['Value'] != '' /* && row_setting['Value'] != undefined */) {
                        /* checkIfImageExists(row_setting['Value'], (exists) => {
                            if (exists) {
                                //console.log('Image exists. ')
                                tempCount++;
                            } 
                        }); */
                        tempCount++
                    }
                    if(row_setting['Value ES'] != '' /* && row_setting['Value ES'] != undefined */) {
                        /* checkIfImageExists(row_setting['Value ES'], (exists) => {
                            if (exists) {
                                //console.log('Image exists. ')
                                tempCount++;
                            } 
                        }); */
                        tempCount++
                    }
                }
            })

            $.each(privateDataList, function (index, row) {
                if(privateDataList[index]['Map Image'] != '' /* && privateDataList[index]['Map Image'] != undefined */) {
                    /* checkIfImageExists(privateDataList[i]['Map Image'], (exists) => {
                        if (exists) {
                            //console.log('Image exists. ')
                            tempCount++;
                        } 
                    }); */
                    tempCount++;
                }
            })

            //for(var i=0; i<kioskDataList.length; i++) {
            $.each(kioskDataList, function (i, row) {
                if(kioskDataList[i].Image != '' /* && kioskDataList[i].Image != undefined */) {
                    /* checkIfImageExists(kioskDataList[i].Image, (exists) => {
                        if (exists) {
                            //console.log('Image exists. ')
                            tempCount++;
                        } 
                    }); */
                    tempCount++;
                }
            })

            //console.log(tempCount, " actual count")
            var AllImageCount = tempCount; //settingDataList.length + privateDataList.length + dailyEvent.length + kioskDataList.length;
            //console.log(response, " response ", AllImageCount, " > ", imageLoadedCount)
            //setTimeout(function() {
            /*
            "Loading Map Assets..<br>"
            "Checking Settings..<br>"
            "Loading Settings From Sheet..<br>"
            "Loading Directory From Sheet..<br>"
            "Checking Kiosks..<br>"
            "Loading Kiosks From Sheet..<br>"
            "Loading Events From Sheet..<br>"
            "Loading Images (" + imageLoadedCount + "/" + AllImageCount + ") ..<br>"
            */
                /* document.getElementById("loadingTxt").innerHTML = "Loading Images (" + imageLoadedCount + "/" + AllImageCount + ") ..<br>" */

            var msgValue = "Loading Map Assets..<br>"
            msgValue += "Checking Settings..<br>"
            msgValue += "Loading Settings From Sheet..<br>"
            msgValue += "Checking Kiosks..<br>"
            msgValue += "Loading Kiosks From Sheet..<br>"
            msgValue += "Loading Directory From Sheet..<br>"
            msgValue += "Loading Events From Sheet..<br>"
            
            msgValue += "Loading Images (" + imageLoadedCount + "/" + AllImageCount + ") ..<br>"
            document.getElementById("loadingTxt").innerHTML = msgValue;
            updateInfoTextView()
            //console.log(document.getElementById("loadingTxt").innerHTML, " val")
            //}, 0)
            if(imageLoadedCount < AllImageCount) {
                imageLoadedCount++;
            } else {
                //console.log("Total Images loaded") 
                // Call function to enable the app screen

                ///////////////////////////////////////////////////////////////////////////////////
                // Load first menu image
                setActiveMenu(null, -1)
                setActiveDirectory('directory')
                setInitLanguage(activeLanguage)
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // Add Here I am image from kiosk tab
                let kiosk_Image = ''
                for (var i=0; i<kioskDataList.length; i++) {
                    if(kioskDataList[i].ID == getKiosk_Num) {
                        //console.log(kioskDataList[i].Image)
                        if (kioskDataList[i].Image.includes("https://drive.google.com")) {
                            let imgid = kioskDataList[i].Image.split('https://drive.google.com')[1].split('/')[3];
                            kiosk_Image = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

                        } else {
                            // Cache Image
                            let name = kioskDataList[i].Image.split('/')
                            let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                            kiosk_Image = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                        }
                        //document.getElementById('kioskImageHolder').src = kioskDataList[i].Image 
                        document.getElementById('kioskImageHolder').src = kiosk_Image
                    }
                }
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // Add Here text image
                let text_Image = ''
                $.each(settingDataList, function (index, row) {
                if(row['Name'] == 'TextImage') {
                        if(row['Value'] != '') {
                        if (row['Value'].includes("https://drive.google.com")) {
                            let imgid = row['Value'].split('https://drive.google.com')[1].split('/')[3];
                            text_Image =  rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

                        } else {
                            // Cache Image
                            let name = row['Value'].split('/')
                            let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                            text_Image =  rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                        }
                    }
                    document.getElementById('textImageHolder').src = text_Image
                    }
                })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // Start Periodic Timer
                fetchSheetDetailsPeriodically();
                // Refresh Slider
                RefreshSlickSlider()
                // 5/7/24
                //window.ldb.set('zapMap_SheetId', sheet_Id)

                //setTimeout(function() {
                    // Mac Fix 9/8/24
                /* let browserType = getBrowserType(); 
                let deviceBtype = getDeviceType()
                if(browserType != 'Safari' || deviceBtype == false) {
                    window.ldb.set(sheet_Id + '_SheetId', sheet_Id)
                } */
                //}, 100)
                ///////////////////////////////////////////////////////////////////////////////////
                setTimeout(function() {
                    //console.log("Redirected")
                    enableAppScreen();
                }, 100)
            }
            //console.log(AllImageCount, " Total Images")
        }
    })
    // Clear memory
    downloadRequest.onreadystatechange = null;
    downloadRequest.abort = null;
    downloadRequest = null;
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/* function downloadImagesLocally2(_type) {
    var urlString = ''
    var imgName = ''
    for (var i=0; i<privateDataList.length; i++) {
        //downloadImagesLocally(privateDataList[i]['Map Image'])
        let name = privateDataList[i]['Map Image'].split('/')
        //urlString += (name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1]) + ',' ;
        urlString += privateDataList[i]['Map Image'] + ',' ;
        imgName += (name[name.length-1].indexOf('?') != -1 ? name[name.length-1].split('?')[0] : name[name.length-1]) + ',' ;
        //console.log(name[name.length-1].indexOf('?'), " imside")
    }
    //console.log(urlString, " imgName")
    var saveRequest = $.ajax({
        url: 'saveAs.php?version=' + currentSheetVersion, 
        type:'POST', 
        data:{'imgURL' : urlString, 'imageName' : imgName}, 
        cache: true,  
        success: function (response) {
            console.log(response, " response")
        }
    })
    // Clear memory
    saveRequest.onreadystatechange = null;
    saveRequest.abort = null;
    saveRequest = null;
} */
////////////////////////////////////////////////////////////////////////////////////////////////////
/* function downloadImagesLocally1(url) {
    fetch(url, {mode: "no-cors",}).then(res => res.blob()).then(res => {
        //const link = document.createElement('a');
        let link = document.createElement('a');
        let name = url.split('/')
        let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
        console.log(imageName, " --- ", res)
        link.setAttribute('download', imageName)
        //const href = URL.createObjectURL(res)
        let href = URL.createObjectURL(res)
        //console.log(href)
        link.href = href
        link.setAttribute('target', '_blank');
        
        link.click();
        setTimeout(() => {
            URL.revokeObjectURL(href)
        }, 0)
    })
} */
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Click event on the event items 
 * LIST | SLIDES
 * @param {*} itemObject 
 */

/* .replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")") */

function onItemClick(event, itemObject, index) {

    //console.log("Event Menu Click")

    ////////////////////////////////////////////////////////////////////////////
    // Remove event listener click to free memory
    /* document.getElementById('event_' + index).onMouseDown = null
    document.getElementById('event_' + index).touchstart = null */
    document.getElementById('event_' + index).onPointerDown = null
    ////////////////////////////////////////////////////////////////////////////
    

    //console.log("-- on item click ---")

    if(event != null) {
        if (event.cancelable) event.preventDefault();
    }
    //console.log(JSON.parse(decodeURIComponent(itemObject)))

    upIndex = index


    //console.log('CALLED')

    // Hide Location Image Holder
    document.getElementById("locationmapImageHolder").style.display = 'none'

    document.getElementById('eventDataContainer').style.display = 'block'
    document.getElementById('eventImageBlock').style.display = 'block'
   /*  MakeMenuNormal(null)
    MakeEventNormal(null) */

    //console.log("UUPP - ", downIndex, " --- ", upIndex)

    /* if(downIndex != upIndex) {
        //document.getElementById('eventScreen').style.display = 'flex'
        HideEventScreen()
        return
    } */


    if(document.getElementById('event_' + index).style.color == 'orange') {return}


    // Store the clicked event details
    activeEventObject = itemObject;
    activeEventIndex = index;


    // Add class
    //document.getElementById('event_' + index).className = ''
    //document.getElementById('event_' + index).className = 'removeEventEffect'

    ////////////////////////////////////////////////////////////////////////////////
    let circle = document.createElement('span')
    //console.log(document.getElementsByClassName('showEventEffect')[0], " EFFECT ON EVENTS")
    document.getElementsByClassName('showEventEffect')[0].appendChild(circle)
    setTimeout(() => {
        circle.remove()
        //document.getElementById('event_' + index).className = ''
        //document.getElementById('event_' + index).className = 'removeEventEffect'
    }, 1000);


    ////////////////////////////////////////////////////////////////////////////////
    // Show Active event
    document.getElementById('event_' + index).style.color = 'orange'
    ////////////////////////////////////////////////////////////////////////////////

    /* // Change color
    document.getElementById('eventLocationIcon').style.filter = "invert(3%) sepia(13%) saturate(3054%) hue-rotate(200deg) brightness(95%) contrast(80%)"; */

    ////////////////////////////////////////////////////////////////////////////////
    

    let current = moment(new Date(),["HH.mm"]).format("hh:mm A");

    let eventName = activeLanguage == 'eng' ? JSON.parse(decodeURIComponent(itemObject)).Name.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")") : JSON.parse(decodeURIComponent(itemObject))["Name ES"].replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
    
    //let eventStart = moment(JSON.parse(decodeURIComponent(itemObject)).Start, ["HH.mm"]).format("hh:mm A");

    /////////////////////////////// NEEDED /////////////////////////////////////////
    let eventStart = moment(JSON.parse(decodeURIComponent(itemObject)).Time.split('-')[0].replace(' ', ''), ["H.mm"]).format("h:mm A");
    if(eventStart.indexOf('12') != -1 && eventStart.indexOf('AM' != -1)) {
        eventStart = moment(JSON.parse(decodeURIComponent(itemObject)).Time.split('-')[0].replace(' ', ''), ["H.mm"]).format('H:mm A')
    }

    //////////////////////////////////////////////////////////////////////////////////////////
        var timeList = JSON.parse(decodeURIComponent(itemObject)).Time.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")").split(',')
        //console.log(timeList, " >>>>>>>>>>>>>>")
        //console.log(JSON.parse(decodeURIComponent(itemObject)).Duration, " DDD")
        let eventTimeDuration = JSON.parse(decodeURIComponent(itemObject)).Duration;
        var eventTimeStr = ''
        for (var s=0; s<timeList.length; s++) {
            //console.log(timeList[s].split('-')[0], "-----", timeList[s].split('-')[1])
            //////////////////////////////////////////////////////////////////////////////////////////

            let startEventTime = ''
            let endEventTime = ''
            if(timeList[s].indexOf('-') != -1) {
                startEventTime = timeList[s].split('-')[0].replace(' ', '');
                endEventTime =  timeList[s].split('-')[1].replace(' ', '');
            } else {
                startEventTime = moment(timeList[s], 'h:mm A').format('HH:mm');
                let eventDuration =  eventTimeDuration;
                //endEventTime = moment(startEventTime).add(eventDuration, 'minutes').format('hh:mm')
                //let endTimeTest = moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm')
                //endEventTime = moment(timeList[s], 'h:mm A').add(eventDuration, 'minutes').format('hh:mm')
                
                
                //endEventTime = moment(startEventTime, 'h:mm A').add(eventDuration, 'minutes').format('h:mm A')
                endEventTime = eventDuration != '' ? moment(startEventTime, 'h:mm A').add(eventDuration, 'minutes').format('h:mm A') : moment('23:59', 'h:mm A').format('h:mm A')
                //console.log(endEventTime, " EEEE")
            }

            //////////////////////////////////////////////////////////////////////////////////////////
            /* let startEventTime = timeList[s].split('-')[0].replace(' ', '');
            let endEventTime =  timeList[s].split('-')[1].replace(' ', ''); */


            let eventTimeTest = moment(startEventTime, 'hh:mm A').format('HH:mm')
            
            let eventTimeTestDisp = moment(startEventTime, 'h:mm').format('h:mm A')
            if(eventTimeTestDisp.indexOf('12') != -1 && eventTimeTestDisp.indexOf('AM' != -1)) {
                eventTimeTestDisp = moment(startEventTime, 'h:mm A').format('H:mm A')
            } else {
                eventTimeTestDisp = moment(startEventTime, 'h:mm A').format('h:mm A') 
            }

            var eventTimeEndTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
            
            var eventTimeEndTestDisp = moment(endEventTime, 'h:mm').format('h:mm A')
            if(eventTimeEndTestDisp.indexOf('12') != -1 && eventTimeEndTestDisp.indexOf('AM' != -1)) {
                eventTimeEndTestDisp = moment(endEventTime, 'h:mm A').format('H:mm A')
            } else {
                eventTimeEndTestDisp = moment(endEventTime, 'h:mm A').format('h:mm A')
            }

            var currentTime = moment(current, 'hh:mm A').format('HH:mm')
            if(currentTime >= eventTimeTest && currentTime <= eventTimeEndTest) {
                eventTimeStr += `<div class="eventDateContainer"><div class="activeEvent"></div><div style="position: relative;
                margin-left: 3vh;">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + '</div></div>'
            } else { 
                eventTimeStr += `<div class="eventDateContainer"><div class="normalEvent"></div><div style="position: relative;
                margin-left: 3vh;">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + '</div></div>'
            }
        } 
    //eventTimeStr += `<div class="directoryItem">style="position: relative; width: 45%;">` + eventTimeStr + `</div></div>`
        

    //////////////////////////////////////////////////////////////////////////////////////////

    let eventLocation = activeLanguage == 'eng' ? JSON.parse(decodeURIComponent(itemObject)).Location.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")") : JSON.parse(decodeURIComponent(itemObject))["Location ES"].replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
    
    

    let eventImagePath =  JSON.parse(decodeURIComponent(itemObject)).Image
    //let eventImagePath =  imgPath;


    let eventQRCode = JSON.parse(decodeURIComponent(itemObject))['QR Code']
    let eventDesc = activeLanguage == 'eng' ? JSON.parse(decodeURIComponent(itemObject)).Description.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")") : JSON.parse(decodeURIComponent(itemObject))["Description ES"].replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")

    //if(window.navigator.onLine) {
        //console.log(eventImagePath, " >>>>")
        //eventImagePath = ''
        if(eventImagePath != '') {
            //console.log("AAAA")
            /* let name = eventImagePath.split('/')
            let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
            // New Changes
            let imagePath = 'images/map/cacheImages/' + imageName  */

            //console.log(JSON.parse(decodeURIComponent(itemObject)).Image, " ---- ")

            let eventImageURL = JSON.parse(decodeURIComponent(itemObject)).Image.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")

            let imagePath = ''
            if (eventImageURL.includes("https://drive.google.com")) {
                imgid = eventImageURL.split('https://drive.google.com')[1].split('/')[3];
                imagePath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion;

            } else {
                //let name = JSON.parse(decodeURIComponent(itemObject)).Image.split('/')
                let name = eventImageURL.split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;
            }

            // New
            document.getElementById("eventImg").style.display = 'block'
            document.getElementById("eventImg").src = imagePath
            // Previous
            //document.getElementById("eventImg").src = eventImagePath
        } else {
            //console.log("BBBB")
            //document.getElementById("eventImg").src = 'images/map/earshot-games_splash.png'
            document.getElementById("eventImg").style.display = 'none'
        }
    //} else {
        //document.getElementById("eventImg").src = 'images/map/earshot-games_splash.png'
       // document.getElementById("eventImg").style.display = 'none'
    //}
    // fill fetails
    //document.getElementById('eventTitle').innerHTML = String(eventName).replaceAll('dqo', '"').toUpperCase();
    document.getElementById('eventTitle').innerHTML = String(eventName).replaceAll('dqo', '"');
    
    if(activeLayout == "Horizontal with Combined Events") {
        document.getElementById('eventTimeLoc').innerHTML = eventTimeStr;
    } else {
        //document.getElementById('eventTimeLoc').innerHTML = String(eventStart).toUpperCase() + " - " + String(eventLocation).replaceAll('dqo', '"').toUpperCase();
        document.getElementById('eventTimeLoc').innerHTML = String(eventStart) + " - " + String(eventLocation).replaceAll('dqo', '"');  
    }
   // document.getElementById('eventTimeLoc').innerHTML = String(eventStart).toUpperCase() + " - " + String(eventLocation).replaceAll('dqo', '"').toUpperCase();
    //document.getElementById('eventTimeLoc').innerHTML = eventTimeStr;
    document.getElementById('eventDesc').innerHTML = String(eventDesc).replaceAll('dqo', '"');

    //console.log(eventQRCode, " eventQRCode")
    
    if(eventQRCode != '') {
        eventQRCode = 'https://zapsheets.com/map/'
        document.getElementById('barCodeBlock').style.display = 'block';
        // Generate QR CODE
        document.getElementById('slide_barcode').innerHTML = ''
        renderQRCode(`slide_barcode`, String(eventQRCode));
    } else {
        document.getElementById('barCodeBlock').style.display = 'none';
    }
    /* // Generate QR CODE
    document.getElementById('slide_barcode').innerHTML = ''
    renderQRCode(`slide_barcode`, String(eventQRCode)); */
    

    //console.log("item click done")

    // Check Sponsors,  Age, Tags
    //console.log(JSON.parse(decodeURIComponent(itemObject)).Sponsors, "SP")
    //console.log(JSON.parse(decodeURIComponent(itemObject)).Age, "AG")
    //console.log(JSON.parse(decodeURIComponent(itemObject)).Tags, "TG")

    // To Show Tags
    let tagString = ''
    

    if(activeLayout == "Horizontal with Combined Events") {
        let ageEvent = JSON.parse(decodeURIComponent(itemObject)).Age.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")

        let tagsEvent = JSON.parse(decodeURIComponent(itemObject)).Tags.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
        
        //console.log(JSON.parse(decodeURIComponent(itemObject)).Age, " ageEvent ", JSON.parse(decodeURIComponent(itemObject)))
        //console.log(ageEvent, " AGE ", tagsEvent)
        if(ageEvent != '') {
        //if(decodeURIComponent(itemObject).Age != undefined) {
        //if(JSON.parse(decodeURIComponent(itemObject)).Age != 'undefined' || JSON.parse(decodeURIComponent(itemObject)).Age != '') {
            document.getElementById('ageContainer').style.display = 'block'
            //document.getElementById('eventsAge').innerHTML = ageEvent.replaceAll('dqo', '"').toUpperCase();
            document.getElementById('eventsAge').innerHTML = ageEvent.replaceAll('dqo', '"');
        } else {
            document.getElementById('eventsAge').innerHTML = 'N/A'
            document.getElementById('ageContainer').style.display = 'none'
        }

       /*  if(tagsEvent == '') {
            console.log("ENTER BLANK TAG")
        } */

        //console.log(tagsEvent, "tagsEvent")
        if(tagsEvent != '') {
        //if(decodeURIComponent(itemObject).Tags != undefined) {
        //console.log(JSON.parse(decodeURIComponent(itemObject)).Tags, ">>>>>>>>")
        //if(JSON.parse(decodeURIComponent(itemObject)).Tags != 'undefined' || JSON.parse(decodeURIComponent(itemObject)).Tags != '' || JSON.parse(decodeURIComponent(itemObject)).Tags != '') {
            document.getElementById('etagContainer').style.display = 'block'
            //document.getElementById('eventsTag').innerHTML = tagsEvent.replaceAll('dqo', '"').toUpperCase();
            document.getElementById('eventsTag').innerHTML = tagsEvent.replaceAll('dqo', '"');
        } else {
            document.getElementById('eventsTag').innerHTML = 'N/A'
            document.getElementById('etagContainer').style.display = 'none'
        }


        let eventSponsor = JSON.parse(decodeURIComponent(itemObject)).Sponsors.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
        //console.log(decodeURIComponent(itemObject).Sponsors, "--------------", eventSponsor)
        
        if(eventSponsor != '') {
        //if(decodeURIComponent(itemObject).Sponsors != undefined) {
        //if(JSON.parse(decodeURIComponent(itemObject)).Sponsors != 'undefined' || JSON.parse(decodeURIComponent(itemObject)).Sponsors != '') {
            document.getElementById('eventsSponsor').style.display = 'block'
            document.getElementById('sponsorText').style.display = 'block'
            //document.getElementById('eventsSponsor').innerHTML = eventSponsor.replaceAll('dqo', '"').toUpperCase();
            document.getElementById('eventsSponsor').innerHTML = eventSponsor.replaceAll('dqo', '"');
        } else {
            document.getElementById('eventsSponsor').innerHTML = 'N/A'
            document.getElementById('eventsSponsor').style.display = 'none'
            document.getElementById('sponsorText').style.display = 'none'
        }
        if(eventLocation != null || eventLocation != '') {
            document.getElementById('eventLocationContainer').style.display = 'flex'
            //document.getElementById('eventsLocation').innerHTML = String(eventLocation).replaceAll('dqo', '"').toUpperCase();
            document.getElementById('eventsLocation').innerHTML = String(eventLocation).replaceAll('dqo', '"');

            // Precache load the location set
            document.getElementById('locationmapImageHolder').style.display = 'none'
            let eventImageURL = ''
                if(JSON.parse(decodeURIComponent(activeEventObject))['Map Image'] != undefined) {
                    eventImageURL = JSON.parse(decodeURIComponent(activeEventObject))['Map Image'].replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
                } 
                
                // Changes made on 1/8/24
                if(eventImageURL != '' && eventImageURL != undefined) {
                    /////////////////////////////////////////////////////////////////////////////////
                    // Change color
                    // Change color
                    document.getElementById('eventLocationIcon').style.filter = "invert(3%) sepia(13%) saturate(3054%) hue-rotate(200deg) brightness(95%) contrast(80%)";
                    /////////////////////////////////////////////////////////////////////////////////
                    // Show default map beneath
                    let imgPath = ''
                    let defImgPath = ''
                    $.each(settingDataList, function (index_setting, row_setting) {
                        if(row_setting['Name'] == 'DefaultMapImage') {
                            
                            if(activeLanguage == 'eng') {
                                let name = row_setting['Value'].split('/')
                                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                                defImgPath = imagePath
                            } else {
                                // Prev
                                let name = row_setting['Value ES'].split('/')
                                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;
                                // New
                                defImgPath = imagePath
                            }
                            imgPath = defImgPath;
                            //console.log("default Image path-- goes here - ", imgPath)
                            document.getElementById('defaultLocationMapImageHolder').src = imgPath
                        }
                    })
                    
                    /////////////////////////////////////////////////////////////////////////////////
                    let imagePath = ''
                    if (eventImageURL.includes("https://drive.google.com")) {
                        imgid = eventImageURL.split('https://drive.google.com')[1].split('/')[3];
                        imagePath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion;

                    } else {
                        let name = eventImageURL.split('/')
                        let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                        imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;
                        
                    }
                    if(eventImageURL != '') {
                        // New
                        //document.getElementById("eventImg").style.display = 'block'
                        //document.getElementById("eventImg").src = imagePath
                        //document.getElementById("locationmapImageHolder").style.display = 'block'
                        document.getElementById("locationMap").style.display = 'block'
                        document.getElementById("locationMap").src = imagePath; //'images/map/cacheImages/cmh_wayfinding_map.png'; //imagePath
                    } else {
                        //document.getElementById("eventImg").style.display = 'none'
                        //document.getElementById("eventImg").src = ''
                        //document.getElementById("locationmapImageHolder").style.display = 'none'
                        document.getElementById("locationMap").src = ''
                        document.getElementById("locationMap").style.display = 'none'

                    }


                    checkIfImageExists(imagePath, (exists) => {
                        if (exists) {
                            if(imagePath != '') {
                                // Always for default
                                /* document.getElementById('eventDataContainer').style.display = 'none'
                                document.getElementById('eventImageBlock').style.display = 'none'

                                document.getElementById('locationmapImageHolder').style.display = 'block' */

                                document.getElementById('defaultLocationMapImageHolder').style.display = 'block'
                                document.getElementById('defaultLocationMapImageHolder').src = imgPath

                            } else {
                                /* document.getElementById('eventDataContainer').style.display = 'block'
                                document.getElementById('eventImageBlock').style.display = 'block'

                                document.getElementById('locationmapImageHolder').style.display = 'none' */
                               /*  document.getElementById('defaultLocationMapImageHolder').src = ''
                                document.getElementById('defaultLocationMapImageHolder').style.display = 'none' */
                            }
                        } else {
                            document.getElementById('eventDataContainer').style.display = 'block'
                            document.getElementById('eventImageBlock').style.display = 'block'
                            document.getElementById('locationmapImageHolder').style.display = 'block'
                            /* document.getElementById('defaultLocationMapImageHolder').src = ''
                            document.getElementById('defaultLocationMapImageHolder').style.display = 'none' */
                            document.getElementById('defaultLocationMapImageHolder').style.display = 'block'
                            document.getElementById('defaultLocationMapImageHolder').src = imgPath
                        }
                    });

                    //////////////////////////////////////////////////////////////////////////
                    // Add Here I am image from kiosk tab
                    let kiosk_Image = ''
                   /*  for (var i=0; i<kioskDataList.length; i++) { */
                    $.each(kioskDataList, function (i, row) {
                        if(kioskDataList[i].ID == getKiosk_Num) {
                            if (kioskDataList[i].Image.includes("https://drive.google.com")) {
                                let imgid = kioskDataList[i].Image.split('https://drive.google.com')[1].split('/')[3];
                                // Cache Image
                                kiosk_Image = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

                            } else {
                                // Cache Image
                                let name = kioskDataList[i].Image.split('/')
                                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                                // New Changes
                                kiosk_Image = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                            }
                            document.getElementById('kioskLocationImageHolder').src = kiosk_Image
                        } 
                    })
                    /////////////////////////////////////////////////////////////////////////////////
                    // Add Here text image
                    let text_Image = ''
                    $.each(settingDataList, function (index, row) {
                        if(row['Name'] == 'TextImage') {
                                if(row['Value'] != '') {
                                if (row['Value'].includes("https://drive.google.com")) {
                                    let imgid = row['Value'].split('https://drive.google.com')[1].split('/')[3];
                                    // Cache Image
                                    text_Image = rootFolder + '/cacheImages/' + imgid + '.png?version=' + UIVersion;

                                } else {
                                    // Cache Image
                                    let name = row['Value'].split('/')
                                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                                    // New Changes
                                    text_Image = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;
                                }
                            }
                            document.getElementById('textLocationImageHolder').src = text_Image
                        }
                    })
                } else {
                    // Change color
                    document.getElementById('eventLocationIcon').style.filter = "none";
                }

            // Add Click event
            document.getElementById('eventLocationContainer').addEventListener('mouseup', onLocationClick)
            document.getElementById('eventLocationContainer').addEventListener('touchend', onLocationClick)
            

        } else {
            document.getElementById('eventDataContainer').style.display = 'block'
            document.getElementById('eventImageBlock').style.display = 'block'

            document.getElementById('eventsLocation').innerHTML = 'N/A'
            document.getElementById('eventLocationContainer').style.display = 'none'
        }
    } else {
        document.getElementById('sponsoredHolder').style.display = 'none'
        document.getElementById('tagContainer').style.display = 'none'
        //document.getElementById('eventTimeLoc').style.display = 'none'
        document.getElementById('eventsAge').style.display = 'none'
        document.getElementById('eventsSponsor').style.display = 'none'
        document.getElementById('eventLocationContainer').style.display = 'none'
    }

    //document.getElementById('eventsTag').innerHTML = tagString

    //ShowEventScreen()
    setTimeout(function() {
        //console.log("show event")
        ShowEventScreen()
    }, 10)
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function onLocationClick() {
    //console.log(activeEventObject, " activeEventObject")
    if(event != null) {
        if (event.cancelable) event.preventDefault();
    }

    if(activeEventObject == null) {return}
    //console.log('Location click 1')
    let eventImageURL = ''
    if(JSON.parse(decodeURIComponent(activeEventObject))['Map Image'] != undefined) {
        eventImageURL = JSON.parse(decodeURIComponent(activeEventObject))['Map Image'].replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")")
    } 
    
    if(eventImageURL != '' ) {

        document.getElementById('eventDataContainer').style.display = 'none'
        document.getElementById('eventImageBlock').style.display = 'none'
        document.getElementById('locationmapImageHolder').style.display = 'block'

        //-------------------------------------------------------------------------
        document.getElementById("eventImg").style.display = 'none'
        document.getElementById("eventDataContainer").style.display = 'none'
        document.getElementById("barCodeBlock").style.display = 'none'
        //-------------------------------------------------------------------------
        //////////////////////////////////////////////////////////////////////////////////
    } else {
        //console.log("ENTER BLANK")
        document.getElementById('eventDataContainer').style.display = 'block'
        document.getElementById('eventImageBlock').style.display = 'block'
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Click event on the event items 
 * LIST | SLIDES
 * @param {*} imgPath 
 * @param {*} eventName 
 * @param {*} eventStart 
 * @param {*} eventLocation 
 * @param {*} eventQRCode 
 * @param {*} eventDesc 
 * NOT NEEDED NOW
 */
/* function onItemClick1(imgPath, eventName, eventStart, eventLocation, eventQRCode, eventDesc) {
    //console.log("CLICK - ", imgPath)
    document.getElementById("eventImg").src = imgPath
    // fill fetails
    document.getElementById('eventTitle').innerHTML = String(eventName).toUpperCase();
    document.getElementById('eventTimeLoc').innerHTML = String(eventStart).toUpperCase() + " - " + String(eventLocation).toUpperCase();
    document.getElementById('eventDesc').innerHTML = String(eventDesc);

    // Generate QR CODE
    document.getElementById('slide_barcode').innerHTML = ''
    renderQRCode(`slide_barcode`, String(eventQRCode));

    //ShowEventScreen()
    setTimeout(function() {
        ShowEventScreen()
    }, 10)
} */
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function to filter active or upcomming events 
 * for the current day from the event list
 * @returns 
 */
/* function filterEventsBasedOnDayTime1() {
    var eventList = []
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date();
    var dayName = days[d.getDay()];
    //console.log(dayName, " ---- ")
    ////////////////////////////////////////////////////////////

    let current = moment(new Date(),["HH.mm"]).format("hh:mm A");

    

    // Logic for new date format
    // New Date format changes
    //let currentDay = moment(new Date()).format("MMM DD");
    let currentDay = moment(new Date()).format("MMM DD");

    //console.log(currentTest, " currentTest")
    //////////////////////////////////////////////////////////////
    //console.log(eventsDataList, " >>>>")

    for (var i=0; i<eventsDataList.length; i++) {
        
        //console.log(eventsDataList[i].Show, " Show")
        if(eventsDataList[i].Show == "TRUE") {
            ///////////////////////////////////////////////////////////////////////////////////////
            let eventTime = moment(eventsDataList[i].Start, ["HH.mm"]).format("hh:mm A");
            let eventTimeEnd = moment(eventsDataList[i].End, ["HH.mm"]).format("hh:mm A");
            var currentTime = moment(current, 'hh:mm A').format('HH:mm')
            var startTime = moment(eventTime, 'hh:mm A').format('HH:mm')
            var endTime = moment(eventTimeEnd, 'hh:mm A').format('HH:mm')
            ///////////////////////////////////////////////////////////////////////////////////////

            // filtering multiple days in a col
            var daysNames = eventsDataList[i].Occurrence.split(",")
            for (var j=0; j<daysNames.length; j++) {
                //console.log(daysNames[j] , '==', dayName)
                

                if(daysNames[j].indexOf('-') != -1) {
                    let startDay = daysNames[j].split('-')[0].replace(' ', '');
                    let endDay =  daysNames[j].split('-')[1].replace(' ', '');

                    // New Date format changes
                    
                    let eventStartDate =  moment(new Date(startDay)).format("MMM DD");
                    let eventEndDate =  moment(new Date(endDay)).format("MMM DD");


                    

                    if(currentDay >= eventStartDate && currentDay <= eventEndDate) {
                        if(currentTime <= endTime) {
                            eventList.push(eventsDataList[i]);
                        }
                    }
                }

                if(daysNames[j].replaceAll(' ', '') == dayName || daysNames[j].replace(' ', '') == currentDay.toString() || daysNames[j].replaceAll(' ', '') == 'Daily') {
                    //console.log(eventsDataList[i], " iii ")
                    ///////////////////////////////////////////////////////////////////////////////////////
                    
                    ///////////////////////////////////////////////////////////////////////////////////////

                    //console.log(currentTime, " --- ", eventList)

                    if(currentTime <= endTime) {
                        eventList.push(eventsDataList[i]);
                    }
                }
            }
        }
    }

    // Sorting the array with Start time.
    var sortedEventArray = eventList.sort(function (a, b) {
        return Date.parse(new Date().getFullYear() + " " + a.Start.slice(0, -2) + '' + a.Start.slice(-2)) - Date.parse(new Date().getFullYear() + " " + b.Start.slice(0, -2) + '' + b.Start.slice(-2))
	});

    
    
    return sortedEventArray;
} */
///////////////////////////////////////////////////////////////////////////////////////////////////
function filterEventsBasedOnDayTime() {

    if(window.navigator.onLine == false) {return}

    var eventList = []
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date();
    var dayName = days[d.getDay()];
    let current = moment(new Date(),["HH.mm"]).format("hh:mm A");
    var currentTime = moment(current, 'hh:mm A').format('HH:mm')
    // New Date format changes
    //let currentDay = moment(new Date()).format("MMM DD");
    let currentDay = moment(new Date()).format("MMM DD");
    // Store event disp type
    let showAllEvents = 'FALSE'
    $.each(settingDataList, function (index_setting, row_setting) {
        //console.log(row_setting['Name'], " --- ")
        if(row_setting['Name'] == 'ShowAllEvents') {
            showAllEvents = row_setting['Value']
        }
    })

    for (var i=0; i<eventsDataList.length; i++) {
        if(eventsDataList[i].Show == "TRUE") {
            var eventDates = eventsDataList[i].Date.split(",")
            var daysNames = eventsDataList[i].Occurrence.split(",")

            //console.log(eventDates, " --- ")
            if(eventDates == '') {
                //for(var dName=0; dName < daysNames.length; dName++) {
                    //if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {

                        ////////////////////////////////////////////////
                        // moment('23:59', 'hh:mm A').format('HH:mm')
                        var timeList = eventsDataList[i].Time.split(',')
                        for (var s=0; s<timeList.length; s++) {
                            if(eventsDataList[i].Duration != '' || eventsDataList[i].Duration == '') {
                                let startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                                let eventDuration =  eventsDataList[i].Duration;
                                let endEventTime = moment(startEventTime, 'hh:mm A')
                                let endTimeTest = eventDuration != '' ? moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm') : moment('23:59', 'hh:mm A').format('HH:mm')
                                //if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                    if(showAllEvents == 'FALSE') {
                                        if(currentTime <= endTimeTest) {
                                            for(var dName=0; dName < daysNames.length; dName++) {
                                                if(daysNames[dName].indexOf('-') != -1) {
                                                    let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                    let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                    //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                    if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                        eventList.push(eventsDataList[i]);
                                                    }
                                                } else { 
                                                    if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                        //console.log("ADDED -- ", daysNames[dName].replaceAll(' ', '') , '==', dayName)
                                                        eventList.push(eventsDataList[i]);
                                                        //break;
                                                    } else if(daysNames[dName] == '') {
                                                        eventList.push(eventsDataList[i]);
                                                        //break;
                                                    }
                                                }
                                            }
                                            break;
                                        }
                                    }
                                //}
                           /*  }  */
                        } else {
                            /* let startDay = eventDates[iDate].replaceAll(' ', '');
                            let endDay =  eventDates[iDate].replaceAll(' ', '');
                            let eventStartDate =  moment(new Date(startDay)).format("MMM DD");
                            let eventEndDate =  moment(new Date(endDay)).format("MMM DD");
                            var timeList = eventsDataList[i].Time.split(',')
                            for (var s=0; s<timeList.length; s++) { */
                                //let startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                                //let eventDuration =  eventsDataList[i].Duration;
                                //let endEventTime = moment(startEventTime, 'hh:mm A')
                                let startEventTime = moment(timeList[s].split('-')[0].replaceAll(' ', ''), 'hh:mm A').format('HH:mm');
                                let endEventTime = moment(timeList[s].split('-')[1].replaceAll(' ', ''), 'hh:mm A')
                                //let endTimeTest = moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm')
                                var endTimeTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
                                //console.log(startEventTime, " --- ", endTimeTest)
                                //if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                    if(showAllEvents == 'FALSE') {
                                        if(currentTime <= endTimeTest) {
                                            //console.log(daysNames.length, " --IN CHECK- ")
                                            for(var dName=0; dName < daysNames.length; dName++) {
                                                if(daysNames[dName].indexOf('-') != -1) {
                                                    let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                    let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                    //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                    if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                        eventList.push(eventsDataList[i]);
                                                    }
                                                } else { 
                                                    if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                        eventList.push(eventsDataList[i]);
                                                        //break;
                                                    } else if(daysNames[dName] == '') {
                                                        eventList.push(eventsDataList[i]);
                                                    // break;
                                                    }
                                                }
                                            }
                                            break;
                                        }
                                    }
                                //} 
                           /*  } */
                        }
                    }


                        ////////////////////////////////////////////////
                        
                    //}
                //}
            }
            for (var iDate=0; iDate < eventDates.length; iDate++) {
                //console.log(eventDates[iDate], ' --- ', eventsDataList[i].Name)
                if(eventDates[iDate].indexOf('-') != -1) {
                    let startDay = eventDates[iDate].split('-')[0].replaceAll(' ', '');
                    let endDay =  eventDates[iDate].split('-')[1].replaceAll(' ', '');
                    let eventStartDate =  moment(new Date(startDay)).format("MMM DD");
                    let eventEndDate =  moment(new Date(endDay)).format("MMM DD");
                    var timeList = eventsDataList[i].Time.split(',')
                    for (var s=0; s<timeList.length; s++) {
                        if(timeList[s].indexOf('-') != -1) {
                            let startEventTime = timeList[s].split('-')[0].replaceAll(' ', '');
                            let endEventTime =  timeList[s].split('-')[1].replaceAll(' ', '');
                            var startTimeTest = moment(startEventTime, 'hh:mm A').format('HH:mm')
                            var endTimeTest = moment(endEventTime, 'hh:mm A').format('HH:mm')

                            if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                if(currentTime <= endTimeTest) {
                                    for(var dName=0; dName < daysNames.length; dName++) {
                                        if(daysNames[dName].indexOf('-') != -1) {
                                            let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                            let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                            //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                            if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                eventList.push(eventsDataList[i]);
                                            }
                                        } else { 
                                            if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                eventList.push(eventsDataList[i]);
                                                //break;
                                            } else if(daysNames[dName] == '') {
                                                eventList.push(eventsDataList[i]);
                                            // break;
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                        } else {
                            if(eventsDataList[i].Duration != '' || eventsDataList[i].Duration == '') {
                                let startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                                let eventDuration =  eventsDataList[i].Duration;
                                let endEventTime = moment(startEventTime, 'hh:mm A')
                                let endTimeTest = eventDuration != '' ? moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm') : moment('23:59', 'hh:mm A').format('HH:mm')
                                if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                    if(showAllEvents == 'FALSE') {
                                        if(currentTime <= endTimeTest) {
                                            for(var dName=0; dName < daysNames.length; dName++) {
                                                if(daysNames[dName].indexOf('-') != -1) {
                                                    let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                    let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                    //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                    if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                        eventList.push(eventsDataList[i]);
                                                    }
                                                } else { 
                                                    if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                        //console.log("ADDED -- ", daysNames[dName].replaceAll(' ', '') , '==', dayName)
                                                        eventList.push(eventsDataList[i]);
                                                        //break;
                                                    } else if(daysNames[dName] == '') {
                                                        eventList.push(eventsDataList[i]);
                                                        //break;
                                                    }
                                                }
                                            }
                                            break;
                                        }
                                    }
                                   
                                } 
                            } else {
                                let startDay = eventDates[iDate].replaceAll(' ', '');
                                let endDay =  eventDates[iDate].replaceAll(' ', '');
                                let eventStartDate =  moment(new Date(startDay)).format("MMM DD");
                                let eventEndDate =  moment(new Date(endDay)).format("MMM DD");
                                var timeList = eventsDataList[i].Time.split(',')
                                for (var s=0; s<timeList.length; s++) {
                                    //let startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                                    //let eventDuration =  eventsDataList[i].Duration;
                                    //let endEventTime = moment(startEventTime, 'hh:mm A')
                                    let startEventTime = moment(timeList[s].split('-')[0].replaceAll(' ', ''), 'hh:mm A').format('HH:mm');
                                    let endEventTime = moment(timeList[s].split('-')[1].replaceAll(' ', ''), 'hh:mm A')
                                    //let endTimeTest = moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm')
                                    var endTimeTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
                                    //console.log(startEventTime, " --- ", endTimeTest)
                                    if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                        if(showAllEvents == 'FALSE') {
                                            if(currentTime <= endTimeTest) {
                                                for(var dName=0; dName < daysNames.length; dName++) {
                                                    if(daysNames[dName].indexOf('-') != -1) {
                                                        let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                        let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                        //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                        if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                            eventList.push(eventsDataList[i]);
                                                        }
                                                    } else { 
                                                        if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                            eventList.push(eventsDataList[i]);
                                                            //break;
                                                        } else if(daysNames[dName] == '') {
                                                            eventList.push(eventsDataList[i]);
                                                        // break;
                                                        }
                                                    }
                                                }
                                                break;
                                            }
                                        }
                                    } 
                                }
                            }
                        } 
                    }
                } else {
                    let startDay = eventDates[iDate].replaceAll(' ', '');
                    let endDay =  eventDates[iDate].replaceAll(' ', '');
                    let eventStartDate =  moment(new Date(startDay)).format("MMM DD");
                    let eventEndDate =  moment(new Date(endDay)).format("MMM DD");
                    if(eventsDataList[i].Duration != '' || eventsDataList[i].Duration == '') {
                        var timeList = eventsDataList[i].Time.split(',')
                        for (var s=0; s<timeList.length; s++) {
                            let startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                            let eventDuration =  eventsDataList[i].Duration;
                            let endEventTime = moment(startEventTime, 'hh:mm A')
                            let endTimeTest = eventDuration != '' ? moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm') : moment('23:59', 'hh:mm A').format('HH:mm');
                            if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                //console.log(showAllEvents, " --- ")
                                if(showAllEvents == 'FALSE') {
                                    //console.log(currentTime, " --- ", endTimeTest)
                                    if(currentTime <= endTimeTest) {
                                        //console.log(daysNames, " daysNames", daysNames.left)
                                        for(var dName=0; dName < daysNames.length; dName++) {
                                            if(daysNames[dName].indexOf('-') != -1) {
                                                let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                    eventList.push(eventsDataList[i]);
                                                }
                                            } else { 
                                                if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                    eventList.push(eventsDataList[i]);
                                                    //break;
                                                } else if(daysNames[dName] == '') {
                                                    eventList.push(eventsDataList[i]);
                                                    //break;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                            } 
                        }
                    } else {
                        let startDay = eventDates[iDate].replaceAll(' ', '');
                        let endDay =  eventDates[iDate].replaceAll(' ', '');
                        let eventStartDate =  moment(new Date(startDay)).format("MMM DD");
                        let eventEndDate =  moment(new Date(endDay)).format("MMM DD");
                        var timeList = eventsDataList[i].Time.split(',')
                        for (var s=0; s<timeList.length; s++) {
                            //let startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                            //let eventDuration =  eventsDataList[i].Duration;
                            //let endEventTime = moment(startEventTime, 'hh:mm A')
                            let startEventTime = moment(timeList[s].split('-')[0].replaceAll(' ', ''), 'hh:mm A').format('HH:mm');
                            let endEventTime = moment(timeList[s].split('-')[1].replaceAll(' ', ''), 'hh:mm A')
                            //let endTimeTest = moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm')
                            var endTimeTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
                            //console.log(startEventTime, " --- ", endTimeTest)
                            if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                if(showAllEvents == 'FALSE') {
                                    if(currentTime <= endTimeTest) {
                                        for(var dName=0; dName < daysNames.length; dName++) {
                                            if(daysNames[dName].indexOf('-') != -1) {
                                                let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                    eventList.push(eventsDataList[i]);
                                                }
                                            } else { 
                                                if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                    eventList.push(eventsDataList[i]);
                                                    //break;
                                                } else if(daysNames[dName] == '') {
                                                    eventList.push(eventsDataList[i]);
                                                // break;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                            } 
                        }
                    }
                }
            }
        }
    }

   // Sorting the array with Start time.
   var sortedEventArray = eventList.sort(function (a, b) {
        // New Logic [Previous sorted list]
        return Date.parse(new Date().getFullYear() + " " + a.Time.split('-')[0].replace(' ', '').slice(0, -2) + '' + a.Time.split('-')[0].replace(' ', '').slice(-2)) - Date.parse(new Date().getFullYear() + " " + b.Time.split('-')[0].replace(' ', '').slice(0, -2) + '' + b.Time.split('-')[0].replace(' ', '').slice(-2))
    });
    /////////////////////////////////////////////////////////////////////////
    // Used here [sort based on pin top and pin bottom]
    let pinDownArray = movePinToEnd(sortedEventArray)
    let pinAllEvents = movePinToTop(pinDownArray)
    return pinAllEvents;
    /////////////////////////////////////////////////////////////////////////
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * function to filter all, active or upcomming events 
 * for the current day from the event list
 * based on the 'showallevent' param from the spreadsheet setting
 * @returns 
 */

function filterAllEventsBasedOnDayTime() {

    //if(window.navigator.onLine == false) {return}

    var eventList = []
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date();
    var dayName = days[d.getDay()];
    let current = moment(new Date(),["HH.mm"]).format("hh:mm A");
    var currentTime = moment(current, 'hh:mm A').format('HH:mm')
    // New Date format changes
    //let currentDay = moment(new Date()).format("MMM DD");
    let currentDay = moment(new Date()).format("MMM DD");
    // Store event disp type
    let showAllEvents = 'FALSE'
    $.each(settingDataList, function (index_setting, row_setting) {
        //console.log(row_setting['Name'], " --- ")
        if(row_setting['Name'] == 'ShowAllEvents') {
            showAllEvents = row_setting['Value']
        }
    })

    for (var i=0; i<eventsDataList.length; i++) {
        if(eventsDataList[i].Show == "TRUE") {
            var eventDates = eventsDataList[i].Date.split(",")
            var daysNames = eventsDataList[i].Occurrence.split(",")

            //console.log(eventDates, " --- ")
            if(eventDates == '') {
                        ////////////////////////////////////////////////
                        var timeList = eventsDataList[i].Time.split(',')
                        for (var s=0; s<timeList.length; s++) {
                            if(eventsDataList[i].Duration != '' || eventsDataList[i].Duration == '') {
                                let startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                                let eventDuration =  eventsDataList[i].Duration;
                                let endEventTime = moment(startEventTime, 'hh:mm A')
                                let endTimeTest = eventDuration != '' ? moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm') : moment('23:59', 'hh:mm A').format('HH:mm')
                                //if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                    if(showAllEvents == 'FALSE') {
                                        if(currentTime <= endTimeTest) {
                                            for(var dName=0; dName < daysNames.length; dName++) {
                                                if(daysNames[dName].indexOf('-') != -1) {
                                                    let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                    let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                    //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                    if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                        eventList.push(eventsDataList[i]);
                                                    }
                                                } else { 
                                                    if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                        //console.log("ADDED -- ", daysNames[dName].replaceAll(' ', '') , '==', dayName)
                                                        eventList.push(eventsDataList[i]);
                                                        //break;
                                                    } else if(daysNames[dName] == '') {
                                                        eventList.push(eventsDataList[i]);
                                                        //break;
                                                    }
                                                }
                                            }
                                            break;
                                        }
                                    }
                                //}
                           /*  }  */
                        } else {
                                let startEventTime = moment(timeList[s].split('-')[0].replaceAll(' ', ''), 'hh:mm A').format('HH:mm');
                                let endEventTime = moment(timeList[s].split('-')[1].replaceAll(' ', ''), 'hh:mm A')
                                //let endTimeTest = moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm')
                                var endTimeTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
                                //console.log(startEventTime, " --- ", endTimeTest)
                                //if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                    if(showAllEvents == 'FALSE') {
                                        if(currentTime <= endTimeTest) {
                                            //console.log(daysNames.length, " --IN CHECK- ")
                                            for(var dName=0; dName < daysNames.length; dName++) {
                                                if(daysNames[dName].indexOf('-') != -1) {
                                                    let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                    let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                    //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                    if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                        eventList.push(eventsDataList[i]);
                                                    }
                                                } else { 
                                                    if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                        eventList.push(eventsDataList[i]);
                                                        //break;
                                                    } else if(daysNames[dName] == '') {
                                                        eventList.push(eventsDataList[i]);
                                                    // break;
                                                    }
                                                }
                                            }
                                            break;
                                        }
                                    }
                                //} 
                           /*  } */
                        }
                    }

                    //}
                //}
            }
            for (var iDate=0; iDate < eventDates.length; iDate++) {
                //console.log(eventDates[iDate], ' --- ', eventsDataList[i].Name)
                // SCENARIO 1
                if(eventDates[iDate].indexOf('-') != -1) {
                    let startDay = eventDates[iDate].split('-')[0].replaceAll(' ', '');
                    let endDay =  eventDates[iDate].split('-')[1].replaceAll(' ', '');
                    let eventStartDate =  moment(new Date(startDay)).format("MMM DD");
                    let eventEndDate =  moment(new Date(endDay)).format("MMM DD");
                    var timeList = eventsDataList[i].Time.split(',')
                    for (var s=0; s<timeList.length; s++) {
                        if(timeList[s].indexOf('-') != -1) {
                            let startEventTime = timeList[s].split('-')[0].replaceAll(' ', '');
                            let endEventTime =  timeList[s].split('-')[1].replaceAll(' ', '');
                            var startTimeTest = moment(startEventTime, 'hh:mm A').format('HH:mm')
                            var endTimeTest = moment(endEventTime, 'hh:mm A').format('HH:mm')

                            if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                if(currentTime <= endTimeTest) {
                                    for(var dName=0; dName < daysNames.length; dName++) {
                                        if(daysNames[dName].indexOf('-') != -1) {
                                            let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                            let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                            //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                            if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                eventList.push(eventsDataList[i]);
                                            }
                                        } else { 
                                            if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                eventList.push(eventsDataList[i]);
                                                //break;
                                            } else if(daysNames[dName] == '') {
                                                eventList.push(eventsDataList[i]);
                                            // break;
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                        } else {
                            if(eventsDataList[i].Duration != '') {
                                let startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                                let eventDuration =  eventsDataList[i].Duration;
                                let endEventTime = moment(startEventTime, 'hh:mm A')
                                let endTimeTest = eventDuration != '' ? moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm') : moment('23:59', 'hh:mm A').format('HH:mm')
                                if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                    if(showAllEvents == 'FALSE') {
                                        if(currentTime <= endTimeTest) {
                                            for(var dName=0; dName < daysNames.length; dName++) {
                                                if(daysNames[dName].indexOf('-') != -1) {
                                                    let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                    let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                    //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                    if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                        eventList.push(eventsDataList[i]);
                                                    }
                                                } else { 
                                                    if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                        //console.log("ADDED -- ", daysNames[dName].replaceAll(' ', '') , '==', dayName)
                                                        eventList.push(eventsDataList[i]);
                                                        //break;
                                                    } else if(daysNames[dName] == '') {
                                                        eventList.push(eventsDataList[i]);
                                                        //break;
                                                    }
                                                }
                                            }
                                            break;
                                        }
                                    }
                                   
                                } 
                            } else {
                                let startDay = eventDates[iDate].replaceAll(' ', '');
                                let endDay =  eventDates[iDate].replaceAll(' ', '');
                                let eventStartDate =  moment(new Date(startDay)).format("MMM DD");
                                let eventEndDate =  moment(new Date(endDay)).format("MMM DD");
                                var timeList = eventsDataList[i].Time.split(',')
                                for (var s=0; s<timeList.length; s++) {
                                    //let startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                                    //let eventDuration =  eventsDataList[i].Duration;
                                    //let endEventTime = moment(startEventTime, 'hh:mm A')
                                    let startEventTime = moment(timeList[s].split('-')[0].replaceAll(' ', ''), 'hh:mm A').format('HH:mm');
                                    let endEventTime = moment(timeList[s].split('-')[1].replaceAll(' ', ''), 'hh:mm A')
                                    //let endTimeTest = moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm')
                                    var endTimeTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
                                    //console.log(startEventTime, " --- ", endTimeTest)
                                    if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                        if(showAllEvents == 'FALSE') {
                                            if(currentTime <= endTimeTest) {
                                                for(var dName=0; dName < daysNames.length; dName++) {
                                                    if(daysNames[dName].indexOf('-') != -1) {
                                                        let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                        let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                        //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                        if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                            eventList.push(eventsDataList[i]);
                                                        }
                                                    } else { 
                                                        if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                            eventList.push(eventsDataList[i]);
                                                            //break;
                                                        } else if(daysNames[dName] == '') {
                                                            eventList.push(eventsDataList[i]);
                                                        // break;
                                                        }
                                                    }
                                                }
                                                break;
                                            }
                                        }
                                    } 
                                }
                            }
                        } 
                    }
                } else {
                    // SCENARION - 2 
                    let startDay = eventDates[iDate].replaceAll(' ', '');
                    let endDay =  eventDates[iDate].replaceAll(' ', '');
                    let eventStartDate =  moment(new Date(startDay)).format("MMM DD");
                    let eventEndDate =  moment(new Date(endDay)).format("MMM DD");
                    //console.log(eventsDataList[i].Duration, " duration")
                    if(eventsDataList[i].Duration != '') {
                        var timeList = eventsDataList[i].Time.split(',')
                        for (var s=0; s<timeList.length; s++) {
                            let startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                            let eventDuration =  eventsDataList[i].Duration;
                            let endEventTime = moment(startEventTime, 'hh:mm A')
                            let endTimeTest = eventDuration != '' ? moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm') : moment('23:59', 'hh:mm A').format('HH:mm')
                            if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                //console.log(showAllEvents, " --- ")
                                if(showAllEvents == 'FALSE') {
                                    //console.log(currentTime, " --- ", endTimeTest)
                                    if(currentTime <= endTimeTest) {
                                        //console.log(daysNames, " daysNames")
                                        for(var dName=0; dName < daysNames.length; dName++) {
                                            if(daysNames[dName].indexOf('-') != -1) {
                                                let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                    //console.log(eventsDataList[i].Name, " 1")
                                                    eventList.push(eventsDataList[i]);
                                                }
                                            } else { 
                                                if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                    //console.log(eventsDataList[i].Name, " 2")
                                                    eventList.push(eventsDataList[i]);
                                                    //break;
                                                } else if(daysNames[dName] == '') {
                                                    //console.log(eventsDataList[i].Name, " 3")
                                                    eventList.push(eventsDataList[i]);
                                                    //break;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                            } 
                        }
                    } else {
                        let startDay = eventDates[iDate].replaceAll(' ', '');
                        let endDay =  eventDates[iDate].replaceAll(' ', '');
                        let eventStartDate =  moment(new Date(startDay)).format("MMM DD");
                        let eventEndDate =  moment(new Date(endDay)).format("MMM DD");
                        var timeList = eventsDataList[i].Time.split(',')

                        //console.log(eventsDataList[i].Name, " CCCCC")

                        for (var s=0; s<timeList.length; s++) {
                            //let startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                            //let eventDuration =  eventsDataList[i].Duration;
                            //let endEventTime = moment(startEventTime, 'hh:mm A')

                            let startEventTime = ''
                            let endEventTime = ''

                            /* let startEventTime = moment(timeList[s].split('-')[0].replaceAll(' ', ''), 'hh:mm A').format('HH:mm');
                            let endEventTime = moment(timeList[s].split('-')[1].replaceAll(' ', ''), 'hh:mm A') */

                            if(timeList[s].indexOf("-") > 0) {
                                startEventTime = moment(timeList[s].split('-')[0].replaceAll(' ', ''), 'hh:mm A').format('HH:mm');
                                endEventTime = moment(timeList[s].split('-')[1].replaceAll(' ', ''), 'hh:mm A')
                            } else {
                                startEventTime = moment(timeList[s], 'hh:mm A').format('HH:mm');
                                endEventTime = moment('23:59', 'hh:mm A') 
                            }


                            //let endTimeTest = moment(endEventTime).add(eventDuration, 'minutes').format('HH:mm')
                            var endTimeTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
                            //console.log(startEventTime, " --- ", endTimeTest)
                            if(new Date(currentDay) >= new Date(eventStartDate) && new Date(currentDay) <= new Date(eventEndDate)) {
                                if(showAllEvents == 'FALSE') {
                                    if(currentTime <= endTimeTest) {
                                        //console.log(currentTime, " ---- ", endTimeTest, " --- ", eventsDataList[i].Name)
                                        for(var dName=0; dName < daysNames.length; dName++) {
                                            if(daysNames[dName].indexOf('-') != -1) {
                                                let startDay = daysNames[dName].split('-')[0].replaceAll(' ', '');
                                                let endDay =  daysNames[dName].split('-')[1].replaceAll(' ', '');
                                                //console.log(days.indexOf(startDay), " -- day range-- ", days.indexOf(endDay), '-- c>> ', days.indexOf(dayName))
                                                if(days.indexOf(dayName) >= days.indexOf(startDay) && days.indexOf(dayName) <= days.indexOf(endDay)) {
                                                    eventList.push(eventsDataList[i]);
                                                }
                                            } else { 
                                                if(daysNames[dName].replaceAll(' ', '') == dayName || daysNames[dName].replace(' ', '') == currentDay.toString() || daysNames[dName].replaceAll(' ', '') == 'Daily') {
                                                    eventList.push(eventsDataList[i]);
                                                    //break;
                                                } else if(daysNames[dName] == '') {
                                                    eventList.push(eventsDataList[i]);
                                                // break;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                            } 
                       /*  } */
                        }
                    }
                }
            }
        }
    }

   // Sorting the array with Start time.
   var sortedEventArray = eventList.sort(function (a, b) {
        // New Logic [Previous sorted list]
        return Date.parse(new Date().getFullYear() + " " + a.Time.split('-')[0].replace(' ', '').slice(0, -2) + '' + a.Time.split('-')[0].replace(' ', '').slice(-2)) - Date.parse(new Date().getFullYear() + " " + b.Time.split('-')[0].replace(' ', '').slice(0, -2) + '' + b.Time.split('-')[0].replace(' ', '').slice(-2))
    });
    /////////////////////////////////////////////////////////////////////////
    // Used here [sort based on pin top and pin bottom]
    let pinDownArray = movePinToEnd(sortedEventArray)
    let pinAllEvents = movePinToTop(pinDownArray)
    return pinAllEvents;
    /////////////////////////////////////////////////////////////////////////
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Refresh slick slide on event 10 sec to
 * update its list view if any
 */
function RefreshSlickSlider() {
    //const refreshSlider = setTimeout(function() {
    let refreshSlider = setTimeout(function() {
        clearTimeout(refreshSlider)
        if(slideShowLoaded) {
            $('.related_events').slick('refresh')
            RefreshSlickSlider()
        }
    }, 10000)
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function updateEventsListStatus() {
    //console.log("--- Event TIMER--")
    //return
    var dailyEvent = filterAllEventsBasedOnDayTime();
    let current = moment(new Date(),["HH.mm"]).format("hh:mm A");
    if(onEvents) {
        return;
    }
    var eventsToAdd = ''
    document.getElementById('eventList').innerHTML = ''
    eventsToAdd += `<div class="eventHappeningContainer"><div class="activeEvent"></div><div style="position: relative; margin-left:3vh; margin-top:0.2vh">Happening Now</div></div>`
    // set index for Top events
    let topIndex = -1
    let bottomIndex = -1
    let noPin = -1
    if(dailyEvent.length > 0) {
        for (var loop = 0; loop < dailyEvent.length; loop++) {
            let eventName = activeLanguage == 'eng' ? dailyEvent[loop].Name : dailyEvent[loop]['Name ES']
            let eventLocation = activeLanguage == 'eng' ? dailyEvent[loop].Location : dailyEvent[loop]['Location ES']
            let  eventTimeDuration = dailyEvent[loop].Duration;
            let activeTime = ''
            var timeList = dailyEvent[loop].Time.split(',')
            var eventTimeStr = ''
            for (var s=0; s<timeList.length; s++) {
                let startEventTime = ''
                let endEventTime = ''
                if(timeList[s].indexOf('-') != -1) {
                    startEventTime = timeList[s].split('-')[0].replace(' ', '');
                    endEventTime =  timeList[s].split('-')[1].replace(' ', '');
                } else {
                    startEventTime = moment(timeList[s], 'h:mm A').format('h:mm A');
                    let eventDuration =  eventTimeDuration;
                    endEventTime = eventDuration != '' ? moment(startEventTime, 'h:mm A').add(eventDuration, 'minutes').format('h:mm A') : moment('23:59', 'h:mm A').format('h:mm A')
                }
                let eventTimeTest = moment(startEventTime, 'hh:mm A').format('HH:mm')
                let eventTimeTestDisp = moment(startEventTime, 'h:mm').format('h:mm A')
                if(eventTimeTestDisp.indexOf('12') != -1 && eventTimeTestDisp.indexOf('AM' != -1)) {
                    eventTimeTestDisp = moment(startEventTime, 'h:mm A').format('H:mm A')
                } else {
                    eventTimeTestDisp = moment(startEventTime, 'h:mm A').format('h:mm A')
                }
                var eventTimeEndTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
                var eventTimeEndTestDisp = moment(endEventTime, 'h:mm').format('h:mm A')
                if(eventTimeEndTestDisp.indexOf('12') != -1 && eventTimeEndTestDisp.indexOf('AM' != -1)) {
                    eventTimeEndTestDisp = moment(endEventTime, 'h:mm A').format('H:mm A')
                } else {
                    eventTimeEndTestDisp = moment(endEventTime, 'h:mm A').format('h:mm A')
                }
                var currentTime = moment(current, 'hh:mm A').format('HH:mm')
                if(currentTime >= eventTimeTest && currentTime <= eventTimeEndTest) {
                    eventTimeStr += `<div class="eventDateContainer"><div class="activeEvent"></div><div style="position: relative;
                    margin-left: 3vh; margin-top:0.2vh">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + '</div></div>'
                } else if(currentTime <= eventTimeTest && currentTime <= eventTimeEndTest) {
                    eventTimeStr += `<div class="eventDateContainer"><div class="normalEvent"></div><div style="position: relative;
                    margin-left: 3vh; margin-top:0.2vh">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + '</div></div>'
                }
            } 
            // New Pin Logic
            if(dailyEvent[loop]['Pin'] != undefined) {
                if(dailyEvent[loop]['Pin'] == 'Top') {
                    topIndex = 1
                } 
                if(dailyEvent[loop]['Pin'] == 'Bottom') {
                    bottomIndex = 1
                } else if(dailyEvent[loop]['Pin'] == '') {
                    noPin = 1
                    if(topIndex == 1) {
                        topIndex = 2
                    }
                }
                if(topIndex == 2) {
                    topIndex = -1
                    eventsToAdd += `<div class='pinContainer'><div class="pinTopBorder"></div></div>`
                }
                if(bottomIndex == 1 && noPin == 1) {
                    noPin = -1
                    bottomIndex = -1
                    eventsToAdd += `<div class='pinContainer'><div class="pinBottomBorder"></div></div>`
                }
            }
            eventsToAdd += `<div id="event_${loop}" class="directoryItem" onPointerDown="setActiveEventHighligh(event, ${loop}), onItemClick(event, '${encodeURIComponent(JSON.stringify(dailyEvent[loop]).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29"))}', ${loop})"><div style="display: flex;"><div id="eventTime_${loop}" style="position: relative; width: 45%;">` + eventTimeStr + `</div><div id="eventDetails_${loop}" style="position: relative; width: 55%; margin-left:3vh;">` + eventName + `<div style="color:lightgray;"><img src="images/map/location.png" alt="" class="eventListLocationIcon" />` + eventLocation + `</div></div></div></div>`
        }
        document.getElementById('eventList').innerHTML = eventsToAdd;
    } else {
        document.getElementById('eventList').innerHTML = activeLanguage == 'eng' ? `<div class="noactive">NO ACTIVE OR FUTURE EVENTS NOW</div>` : `<div class="noactive">NO HAY EVENTOS ACTIVOS O FUTUROS AHORA</div>`
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
    // update selected event
    if(activeLayout == "Horizontal with Combined Events") {
        if(activeEventObject != null) {
            var timeList = JSON.parse(decodeURIComponent(activeEventObject)).Time.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")").split(',')

            let  eventTimeDuration = JSON.parse(decodeURIComponent(activeEventObject)).Duration;

            //console.log(timeList, " >>>>>>>>>>>>>>")
            var eventTimeStr = ''
            var checkEventStat = false
            for (var s=0; s<timeList.length; s++) {
                //console.log(timeList[s].split('-')[0], "-----", timeList[s].split('-')[1])
                let startEventTime = ''
                let endEventTime = ''
                if(timeList[s].indexOf('-') != -1) {
                    startEventTime = timeList[s].split('-')[0].replace(' ', '');
                    endEventTime =  timeList[s].split('-')[1].replace(' ', '');
                } else {
                    startEventTime = moment(timeList[s], 'h:mm A').format('h:mm A');
                    let eventDuration =  eventTimeDuration;
                    endEventTime = moment(startEventTime, 'h:mm A').add(eventDuration, 'minutes').format('h:mm A')
                }

                let eventTimeTest = moment(startEventTime, 'hh:mm A').format('HH:mm')
                
                let eventTimeTestDisp = moment(startEventTime, 'h:mm').format('h:mm A')
                if(eventTimeTestDisp.indexOf('12') != -1 && eventTimeTestDisp.indexOf('AM' != -1)) {
                    eventTimeTestDisp = moment(startEventTime, 'h:mm A').format('H:mm A')
                } else {
                    eventTimeTestDisp = moment(startEventTime, 'h:mm A').format('h:mm A')
                }

                var eventTimeEndTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
                
                var eventTimeEndTestDisp = moment(endEventTime, 'h:mm').format('h:mm A')
                if(eventTimeEndTestDisp.indexOf('12') != -1 && eventTimeEndTestDisp.indexOf('AM' != -1)) {
                    eventTimeEndTestDisp = moment(endEventTime, 'h:mm A').format('H:mm A')
                } else {
                    eventTimeEndTestDisp = moment(endEventTime, 'h:mm A').format('h:mm A')
                }

                var currentTime = moment(current, 'hh:mm A').format('HH:mm')
                if(currentTime >= eventTimeTest && currentTime <= eventTimeEndTest) {
                    
                    eventTimeStr += `<div class="eventDateContainer"><div class="activeEvent"></div><div style="position: relative;
                    margin-left: 3vh;">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + '</div></div>'
                } else { 
                    eventTimeStr += `<div class="eventDateContainer"><div class="normalEvent"></div><div style="position: relative;
                    margin-left: 3vh;">` + eventTimeTestDisp + ' - ' + eventTimeEndTestDisp + '</div></div>'
                }
                if(currentTime <= eventTimeEndTest) {
                    checkEventStat = true
                }
            } 
            // fill fetails
            document.getElementById('eventTimeLoc').innerHTML = eventTimeStr;
            ///////////////////////////////////////////////////////////////////////
            if(checkEventStat == false) {
                if(activeMenuIndex != -1) {
                    //setActiveMenu(null, -1)
                    //setActiveDirectory('directory')
                }
            }
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////
/**
 * function to show active event that is happening now
 * active event has different class to make it look different from others
 * @returns 
 */
function updateSlidesEventStatus() {
    
    return;

    var dailyEvent = filterEventsBasedOnDayTime();
    let current = moment(new Date(),["HH.mm"]).format("hh:mm A");
    
    for (var loop = 0; loop < dailyEvent.length; loop++) {
        let eventName = activeLanguage == 'eng' ? dailyEvent[loop].Name : dailyEvent[loop]['Name ES']
        //let eventTime = moment(dailyEvent[loop].Start, ["HH.mm"]).format("hh:mm A");

        let eventLocation = activeLanguage == 'eng' ? dailyEvent[loop].Location : dailyEvent[loop]['Location ES']


        //console.log(dailyEvent[loop].Time, " TIME")

        let isHappeningNow = 0
        let activeTime = ''
        //let eventTimeTest = ''
        var timeList = dailyEvent[loop].Time.split(',')
        //console.log(timeList, " >>>>>")
        for (var s=0; s<timeList.length; s++) {
            let startEventTime = timeList[s].split('-')[0].replace(' ', '');
            let endEventTime =  timeList[s].split('-')[1].replace(' ', '');
            let eventTimeTest = moment(startEventTime, 'hh:mm A').format('HH:mm')
            
            let eventTimeTestDisp = moment(startEventTime, 'h:mm').format('h:mm A')
            if(eventTimeTestDisp.indexOf('12') != -1 && eventTimeTestDisp.indexOf('AM' != -1)) {
                eventTimeTestDisp = moment(startEventTime, 'h:mm A').format('H:mm A')
            }

            var eventTimeEndTest = moment(endEventTime, 'hh:mm A').format('HH:mm')
            var currentTime = moment(current, 'hh:mm A').format('HH:mm')
            
            //console.log(currentTime, '<=', endTimeTest)
            //console.log(currentTime, '>=', startTimeTest, '&&', currentTime, '<=', endTimeTest)
            
            if(currentTime >= eventTimeTest && currentTime <= eventTimeEndTest) {
                isHappeningNow = currentTime >= eventTimeTest && currentTime <= eventTimeEndTest
                activeTime = eventTimeTestDisp
                //timeList.splice(s)
                break;
            } if(currentTime < eventTimeTest && currentTime <= eventTimeEndTest) {
                activeTime = eventTimeTestDisp;
                break;
            }
        } 

        //console.log(isHappeningNow, " >>>")
            if(isHappeningNow == 0 || isHappeningNow == false) {
            //console.log(loop, " NORMAL ", )
            if(activeLanguage == 'eng') {
                // document.querySelector("#post").querySelectorAll('.thumb')
                $('.related_events').find('#sliderItem_' + loop).removeClass('slider_item_happening')
                //$('.related_events').find('#sliderItem_' + loop).removeClass()
                $('.related_events').find('#sliderItem_' + loop).addClass('slider_item')
            } else {
                $('.related_events').find('#sliderItem_' + loop).removeClass('slider_item_es_happening')
                //$('.related_events').find('#sliderItem_' + loop).removeClass()
                $('.related_events').find('#sliderItem_' + loop).addClass('slider_item_es')
            }
        } else if(isHappeningNow == true) {
            if(activeLanguage == 'eng') {
                $('.related_events').find('#sliderItem_' + loop).removeClass('slider_item')
                //console.log(loop, " HAPPENING ", )
                //$('.related_events').find('#sliderItem_' + loop).removeClass()
                $('.related_events').find('#sliderItem_' + loop).addClass('slider_item_happening');
            } else {
                $('.related_events').find('#sliderItem_' + loop).removeClass('slider_item_es')
                //console.log(loop, " HAPPENING ", )
                //$('.related_events').find('#sliderItem_' + loop).removeClass()
                $('.related_events').find('#sliderItem_' + loop).addClass('slider_item_es_happening');
            }
        } 

        //console.log(activeTime, " >>>>")

        if(document.getElementById('sliderItemTime_' + loop) != null) {
            document.getElementById('sliderItemTime_' + loop).innerHTML = (activeTime + ' - ' + eventLocation)
        }
        if(document.getElementById('sliderEventName_' + loop) != null) {
            document.getElementById('sliderEventName_' + loop).innerHTML = eventName
        }
    }


        return


        let eventTime = moment(dailyEvent[loop].Time.split('-')[0].replace(' ', ''), ["HH.mm"]).format("hh:mm A");
        //let eventTimeEnd = moment(dailyEvent[loop].End, ["HH.mm"]).format("hh:mm A");
        let eventTimeEnd = moment(dailyEvent[loop].Time.split('-')[1].replace(' ', ''), ["HH.mm"]).format("hh:mm A");
        let isHappeningNow1 = 0
        var currentTime = moment(current, 'hh:mm A').format('HH:mm')
        var startTime = moment(eventTime, 'hh:mm A').format('HH:mm')
        var endTime = moment(eventTimeEnd, 'hh:mm A').format('HH:mm')

        //console.log(eventTime, " ---- ", eventTimeEnd)
        //$('#sliderItem_' + loop).addClass('slider_item_normal');
        //console.log("CCCCC")
        //console.log(currentTime , " >= ", endTime)
        /* if(currentTime.slice(0, -3) < endTime.slice(0, -3)) {
            isHappeningNow = currentTime.slice(0, -3) >= startTime.slice(0, -3) && currentTime.slice(0, -3) < endTime.slice(0, -3)
        } */

        if(currentTime < endTime) {
            //console.log(currentTime ,">=", startTime, '&&', currentTime, '<', endTime, " -- ", loop)
            isHappeningNow = currentTime >= startTime && currentTime < endTime
        }

        //console.log(isHappeningNow, " isHappeningNow")
        if(isHappeningNow == 0 || isHappeningNow == false) {
            //console.log(loop, " NORMAL ", )
            if(activeLanguage == 'eng') {
                $('.related_events').find('#sliderItem_' + loop).removeClass('slider_item_happening')
                //$('.related_events').find('#sliderItem_' + loop).removeClass()
                $('.related_events').find('#sliderItem_' + loop).addClass('slider_item')
            } else {
                $('.related_events').find('#sliderItem_' + loop).removeClass('slider_item_es_happening')
                //$('.related_events').find('#sliderItem_' + loop).removeClass()
                $('.related_events').find('#sliderItem_' + loop).addClass('slider_item_es')
            }
        } else if(isHappeningNow == true) {
            if(activeLanguage == 'eng') {
                $('.related_events').find('#sliderItem_' + loop).removeClass('slider_item')
                //console.log(loop, " HAPPENING ", )
                //$('.related_events').find('#sliderItem_' + loop).removeClass()
                $('.related_events').find('#sliderItem_' + loop).addClass('slider_item_happening');
            } else {
                $('.related_events').find('#sliderItem_' + loop).removeClass('slider_item_es')
                //console.log(loop, " HAPPENING ", )
                //$('.related_events').find('#sliderItem_' + loop).removeClass()
                $('.related_events').find('#sliderItem_' + loop).addClass('slider_item_es_happening');
            }
        } 
    //}

    //$('.related_events').slick('refresh')

    return
    ///////////////////////////////////////////////////////////////////////////////
    for (var loop = 0; loop < dailyEvent.length; loop++) {
        let eventName = dailyEvent[loop].Name
        let eventTime = moment(dailyEvent[loop].Start, ["HH.mm"]).format("hh:mm A");
        let eventTimeEnd = moment(dailyEvent[loop].End, ["HH.mm"]).format("hh:mm A");
        /* let eventLocation = dailyEvent[loop].Location
        let eventImagePath =  dailyEvent[loop].Image */

        let isHappeningNow = 0
        console.log(current, " ---- ", eventTimeEnd)
        if(current < eventTimeEnd) {
            console.log(current, " >= ", eventTime, " && <", eventTimeEnd)
            isHappeningNow = current >= eventTime && current < eventTimeEnd
        }
        console.log(isHappeningNow, " --- ", loop)
        if(isHappeningNow == 0) {
            /* if($('#sliderItem_' + loop).hasClass('slider_item_happening')) {
                $('#sliderItem_' + loop).removeClass('slider_item_happening');
                //$('#sliderItem_' + loop).addClass('slider_item');
            } */
            $('.related_events').find('#sliderItem_' + loop).removeClass('slider_item_happening')
        }

        if(isHappeningNow == true /* && $('#sliderItem_' + loop).hasClass('slider_item_happening') */) {
            //$('#sliderItem_' + loop).removeClass('slider_item');
            $('#sliderItem_' + loop).addClass('slider_item_happening');
            //console.log(loop, " -- ", isHappeningNow, " if")
        } 
    }
}
///////////////////////////////////////////////////////////////////////////////////
/**
 * function used for before change event of slick slider
 */
$('.related_events').on('beforeChange', function(vent, slick, current_slide_index, next_slide_index) {
})
/////////////////////////////////////////////////////////////////////////////////////
/**
 * function to render QR code for each event
 * @param {*} element 
 * @param {*} qrText 
 */
function renderQRCode(element, qrText){
    let QRText = ''
    if(qrText == '') {
        QRText = ""
    } else {
        QRText = qrText
    }
    let qrcodeGen = new QRCode(element, {
      text: QRText,
      width: 120,
      height: 120,
      colorDark : '#000',
      colorLight : '#fff',
      correctLevel : QRCode.CorrectLevel.H
    });	
  }
///////////////////////////////////////////////////////////////////////////////////
/**
 * loadSettingsData
 */
function loadSettingsData() {
    let rootFolder = "../sheets/" + sheet_Id + "/" + target;
    //console.log("CALL SJ ON LIVE")
    if(window.navigator.onLine == true) {
        var settingRequest = $.ajax({ 
            url: rootFolder + "/settings.json?version=" + UIVersion,
            cache: false, 
            type: 'GET',
            dataType: "text",
            success: function (response) {
                if(response == '' || response.length == 0) {
                    privateLoaded = true
                    //checkUserQueryString()
                    document.getElementById("loadingTxt").innerHTML += "No settings data available ..<br>"
                    updateInfoTextView()
                    return
                }
                settingDataList = []
                var mResponse = response.replace(/�/g, "")
                var newSettingsData = eval(mResponse)
                for(var i=0; i<newSettingsData.length; i++) {
                    var settingsDataString = JSON.stringify(newSettingsData[i]);
                    //newstr += JSON.stringify(isJSON(pp))
                    if(isJSONData(settingsDataString) == false) {
                        document.getElementById("loadingTxt").innerHTML += '<font color="red">Error: Settings Sheet : (Row: ' + i + ")</font><br>"
                        updateInfoTextView()
                    } else {
                        settingDataList[i] = isJSONData(settingsDataString)
                    }
                }
                $.each(settingDataList, function (index, row) {
                    if(row['Name'] == 'Version') {
                        currentSheetVersion = row['Value']
                    }
                })
            }
        })
        // Clear memory
        settingRequest.onreadystatechange = null;
        settingRequest.abort = null;
        settingRequest = null;
    }
}
//////////////////////////////////////////////////////////////////////////
/**
 * Function to poll the server periodically to fetch the sheet data when new version found
 */
function fetchSheetDetailsPeriodically() {
    //getMLocalMachinInformation();
    //console.log("Memeory - ", performance.memory.usedJSHeapSize)
    /* let browserType = getBrowserType(); 
    let deviceBtype = getDeviceType()
    if(browserType != 'Safari' || deviceBtype == false) {
        var nFractDigit	= nFractDigit !== undefined ? nFractDigit : 0;
        var precision	= Math.pow(10, nFractDigit);
        var i = Math.floor(Math.log(performance.memory.usedJSHeapSize) / Math.log(1024));
        //console.log(Math.round(performance.memory.usedJSHeapSize*precision / Math.pow(1024, i))/precision + ' MB');

        // Browser memory used
        systemMemoryUsed = Math.round(performance.memory.usedJSHeapSize*precision / Math.pow(1024, i))/precision + ' MB'
    } else {
        systemMemoryUsed = ''
    } */
   //console.log('checking periodically....', pollTime)
    let rootFolder = "./sheets/" + sheet_Id + "/" + target;
    let systemMemoryUsed = ''
    let periodicTimer = setTimeout(function() {
        let kiosk_location = ''
        let sheet_version = ''
        let sheet_title = ''
        let poll_time_string = ''
        let pushStatus = ''
        forceReload = false;
        clearTimeout(periodicTimer)
        if(window.navigator.onLine == true) {
            // get new app version
            /* getCurrentVersion(); */
            cacheFirst = false;
            var pushRequest = $.ajax({
                url: rootFolder + "/pushstatus.json?version=" + Math.random(), 
                cache: true,
                type: 'GET',
                dataType: "text",
                success: function (response) {
                    pushStatus = JSON.parse(response).push;
                    //console.log(pushStatus, " pushStatus")
                    // Get the app version
                    var versionRequest = $.ajax({
                        url: rootFolder + '/version.json?version=' + Math.random(), 
                        cache: true,
                        type: 'GET',
                        dataType: "text",
                        success: function (response) {
                            let versionResponse = JSON.parse(response)
                                $.each(settingDataList, function (index, row) {
                                    if(row['Name'] == 'Title') {
                                        sheet_title = row['Value']
                                        document.getElementById("loadingTxt").innerHTML = 'Sheet Title: ' + row['Value'] + '<br>'
                                        updateInfoTextView()
                                    }
                                    if(row['Name'] == 'SheetId') {
                                        document.getElementById("loadingTxt").innerHTML += 'Sheet Id: ' + row['Value'] + '<br>'
                                        updateInfoTextView()
                                    }
                                    if(row['Name'] == 'Version') {
                                        sheet_version = row['Value']
                                        document.getElementById("loadingTxt").innerHTML += 'Sheet Version: ' + versionResponse.version + '<br>'
                                        updateInfoTextView()

                                        // Add browser session id
                                        document.getElementById("loadingTxt").innerHTML += 'Session Id: ' + deviceUID + '<br>'
                                        updateInfoTextView()

                                        // Add kiosk id if present
                                        if(getKiosk_Num != '') {
                                            document.getElementById("loadingTxt").innerHTML += 'Kiosk: ' + getKiosk_Num + '<br>'
                                            updateInfoTextView()
                                        }
                                        document.getElementById('versionMapInfo').innerHTML = '' + Number(_version) + " - " + row['Value']
                                        updateInfoTextView()
                                    }
                                    if(row['Name'] == 'PublishedOn') {
                                        document.getElementById("loadingTxt").innerHTML += 'Sheet Published on: ' + row['Value'] + '<br>'
                                        updateInfoTextView()
                                    }
                                })
                                $.each(kioskDataList, function (index_kiosk, row_Kiosk) {
                                    if(kioskDataList[index_kiosk].Location != '') {
                                        kiosk_location = kioskDataList[index_kiosk].Location
                                    } 
                                })
                                document.getElementById("loadingTxt").innerHTML += 'App Version: ' + _version + '<br>'
                                updateInfoTextView()
                                let currentDate = new Date();
                                document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('MM/DD/YYYY HH:mm:ss').toLocaleString() + "<br>"
                                updateInfoTextView()
                                poll_time_string = moment(currentDate).format('MM/DD/YYYY HH:mm:ss').toLocaleString()

                                //console.log(currentSheetVersion, " --- ", versionResponse.version)

                                if(parseFloat(currentSheetVersion).toFixed(1) != parseFloat(versionResponse.version).toFixed(1)) {
                                    // set the sheet version here
                                    currentSheetVersion = versionResponse.version;
                                    document.getElementById("loadingTxt").innerHTML += 'New update found.<br>'
                                    updateInfoTextView()

                                    // Show App version
                                    document.getElementById("loadingTxt").innerHTML += 'Sheet Version: ' + versionResponse.version + '<br>'
                                    updateInfoTextView()

                                    // Add browser session id
                                    document.getElementById("loadingTxt").innerHTML += 'Session Id: ' + deviceUID + '<br>'
                                    updateInfoTextView()

                                    // Add kiosk id if present
                                    if(getKiosk_Num != '') {
                                        document.getElementById("loadingTxt").innerHTML += 'Kiosk: ' + getKiosk_Num + '<br>'
                                        updateInfoTextView()
                                    }
                                    currentVersion = "New";
                                    //ReloadDateInBackground();
                                    savePublishedStateToServer('false')
                                    //return
                                } else {
                                    // Show App version
                                    //document.getElementById("loadingTxt").innerHTML += 'Sheet Version: ' + value + '<br>'
                                    //updateInfoTextView()
                                    document.getElementById("loadingTxt").innerHTML += 'No update found.<br>'
                                    updateInfoTextView();
                                    currentVersion = "Same"
                                }

                                //return;
                                if(currentVersion == 'New') {
                                    //console.log("ENTER HERE NEW")
                                    // Reset All Values
                                    settingLoaded = false
                                    privateLoaded = false
                                    gameLoaded = false
                                    slides_loaded = false
                                    eventSliderActive = false

                                    slideShowLoaded = false

                                    prevRenderEvents = 0
                                    activeLanguage = "eng"
                                    inLanguageProcess = false
                                    activeMenuIndex = -1

                                    onNewDevice = false;
                                    // push status ajax call block
                                    saveInfoToLog(_version, poll_time_string, sheet_title, sheet_version, kiosk_location)

                                    // Update stored ldb
                                    window.ldb.set('mapVersion', versionResponse.version)

                                    //UpdateSW(versionResponse.version);
                                    // Reload updated data
                                    ReloadDateInBackground(versionResponse.version)
                                    //window.location.reload();
                                } else {
                                    /////////////////////////////////////////////////////////////////////////
                                    // push status ajax call block
                                    saveInfoToLog(_version, poll_time_string, sheet_title, sheet_version, kiosk_location)
                                    /////////////////////////////////////////////////////////////////////////
                                    //if(loadType != 'refresh') {
                                    fetchSheetDetailsPeriodically()
                                }
                                //fetchSheetDetailsPeriodically()
                           // });
                        }
                    })
                    // Clear memory
                    versionRequest.onreadystatechange = null;
                    versionRequest.abort = null;
                    versionRequest = null;
                }
            })
            ///////////////////
            // Clear memory
            pushRequest.onreadystatechange = null;
            pushRequest.abort = null;
            pushRequest = null;
            ///////////////////
            ///////////////////////////
            // Save data to server log
            ///////////////////////////
        } else {
            //console.log("NO INTERNET")
            cacheFirst = true;
            fetchSheetDetailsPeriodically()
        }
    }, pollTime * 1000)
    /* }, 3000) */
}
/////////////////////////////////////////////////////////////////////////////////
/**
 * 
 * @param {*} appVersion 
 * @param {*} polltimeString 
 * @param {*} sheetTitle 
 * @param {*} sheetVersion 
 * @param {*} kioskLocation 
 */
function saveInfoToLog(appVersion, polltimeString, sheetTitle, sheetVersion, kioskLocation) {
    if(window.navigator.onLine == true) {
        var saveRequest = $.ajax({
            url: 'saveLog.php?version=' + UIVersion, 
            type:'POST', 
            data:{'id' : sheet_Id, 'sheet_version' : sheetVersion, 'sheet_title' : sheetTitle, 'app_version' : _version, 'poll_time' : polltimeString, 'kiosk_location' : kioskLocation, 'session_uuId' : deviceUID, 'kiosk' : getKiosk_Num, 'memory_used' : systemMemoryUsed}, 
            cache: false,
            success: function (response) {
                //console.log(response)
            }
        })
        // Clear memory
        saveRequest.onreadystatechange = null;
        saveRequest.abort = null;
        saveRequest = null;
    }
}
////////////////////////////////////////////////////////////////////////////////
/**
 * enableAppScreen
 */
function enableAppScreen() {

    let rootFolder = "../sheets/" + sheet_Id + "/" + target;

    //console.log("AAAAA")
    if(isToggle == true) {return}
    //console.log("Enable App Screen")
    // Hide the top border
    document.getElementById('page-header').style.display = 'none'
    document.getElementById('page-footer').style.display = 'none'
    document.getElementById('loaderPre').style.display = 'none'
    /* document.getElementById('splashScreen').style.display = 'none'
    document.getElementById('splashScreen').style.opacity = 0
    document.getElementById('splashScreen').style.overflow = "hidden" */


    var slideshowStat = 5
    splash_img = ''
    splashDelaySec = 5
    idleTimeOut = 60
    currentVersion = ''
    $.each(settingDataList, function (index, row) {
    if(row["Name"] == "SlideshowDelaySec") {
        slideshowStat = row["Value"]
        if(slideshowStat == undefined) {
        slideshowStat = 5
        }
    }
    
    if(row["Name"] == "SplashImageUrl") {
        if(row["Value"] == "" || row["Value"] == undefined) {
            //splash_img = "./images/earshot-games_splash.png";
        } else {
            let imgPath = ""
            if(window.navigator.onLine == true) {
                if (row["Value"].includes("https://drive.google.com")) {
                    imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                    imgPath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion;
                } else {
                    let name = row["Value"].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                    imgPath = imagePath;
                }
            } else {
                //imgPath = "./images/earshot-games_splash.png";
                if (row["Value"].includes("https://drive.google.com")) {
                    imgid = row["Value"].split('https://drive.google.com')[1].split('/')[3];
                    imgPath = rootFolder + '/cacheImages/' + imgid + ".png?version=" + UIVersion;

                } else {
                    let name = row["Value"].split('/')
                    let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                    let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                    imgPath = imagePath;
                }
            }
            if(imgPath == '') {
                let name = row["Value"].split('/')
                let imageName = name[name.length-1].indexOf('?') ? name[name.length-1].split('?')[0] : name[name.length-1];
                let imagePath = rootFolder + '/cacheImages/' + imageName + "?version=" + UIVersion;

                //splash_img = row["Value"]
                splash_img = imagePath
            } else {
                splash_img = imgPath
            }
        }
    }
    if(row["Name"] == "SplashImageDelaySec") {
        splashDelaySec = row["Value"]
    }

    // Add Language toggle option if defined
    if(row["Name"] == "AddLanguage") {
        if(row["Value"] == "" || row["Value"] == undefined) {
            row["Value"] = ""
        }
        addLanguage = row["Value"]
    }
    // For Layout
    if(row["Name"] == "Layout") {
        if(row["Value"] == "" || row["Value"] == undefined) {
            //row["Value"] = "Basic Horizontal"
            row["Value"] = "Horizontal with Event Slider"
        } 
        //row["Value"] = "Horizontal with Event Slider"
        //row["Value"] = "Horizontal with Combined Events"
        activeLayout = row["Value"]
        // CHANGES MADE TO ADJUST THE LAYOUTS
        // Load the css from the layout folder
        //console.log(row["Value"], " Layout")
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = './layout/' + row["Value"] + '/style.css?version=' + UIVersion;
        link.media = 'all';
        head.appendChild(link);
    }

    // For PollTime
    if(row["Name"] == "PollTime") {
        if(row["Value"] != "" || row["Value"] != undefined) {
            pollTime = row["Value"]
        }
    }

    // For Version
    if(row["Name"] == "Version" && row["Name"] != undefined) {
    }
    if(row["Name"] == "TimeoutSec") {
        idleTimeOut = row["Value"]
        if(idleTimeOut == '') {
        idleTimeOut = 60
        }
    }
    })
    // showing background
    //showBackgroundImage();
    // Show splash screen
    //console.log(splashDelaySec, " splashDelaySec")
    if(splashDelaySec >= 0) {
    //console.log("splash_img > ", splash_img)
    if(splash_img != '') {
        //if(loadType == 'normal' || forceReload || onNewDevice) {
            //console.log("AAAA")
            ShowSplashScreen()
        //} 
        } else {
            document.getElementById('splashScreen').style.display = 'none'
            document.getElementById('splashScreen').style.opacity = 0
            document.getElementById('splashScreen').style.overflow = "hidden"
        }
    }
    setTimeout(function() {
        document.getElementById('mainAppContainer').style.display = 'flex';
        // Left Align
        document.getElementById('mainAppContainer').style.flexDirection = 'column';
        // Right Align
        //document.getElementById('mainAppContainer').style.flexDirection = 'row-reverse';
        updateSlideshowTimer()
    }, 10)

    if(slideshowStat > 0) {
        // init slideshow timer
        viewSlideShowHTML()
        setTimeout(function() {
            MODE_TYPE = "slideshow"
            idleStatus = true
            if(MODE_TYPE == "slideshow") {
            //idleStatus = true
            slideStatus = "cycling"
            clickedSlideID = -1
            }
            if(document.getElementById("splashScreen").style.opacity == 1) {
            } else {
            slideStatus = "cycling"
            }
        }, 350)
    } else {
    }
    // Hiding Loader
    hideloader();

    /////////////////////////////////////////////////////////////////////////
    // New Changes
    document.getElementById('preloaderCircle').style.display = 'none';
    document.getElementById('slowConnectionStart').style.display = 'none'
    document.getElementById('versionText').style.display = 'none'
    document.getElementById('splashScreenSection').style.display = 'none'

    // Hide new Loader
    homeLoader.hide();

    /////////////////////////////////////////////////////////////////////////


}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * getPublishedStateToServer
 */
function getPublishedStateToServer() {
    //let status = ''
    //console.log(sheet_Id, " --- ")
    if(window.navigator.onLine == true) {
        var getPushFromServer = $.ajax({
            url: 'getPushStatus.php?version=' + currentSheetVersion, 
            type:'POST', 
            data:{'id' : sheet_Id, 'target' : target}, 
            cache: false,
            success: function (response) {
                let status = response;
                return status;
            },
            error: function(e) {
                console.log("ERROR")
            }
        })
         ///////////////////
        // Clear memory
        getPushFromServer.onreadystatechange = null;
        getPushFromServer.abort = null;
        getPushFromServer = null;
        ///////////////////
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function savePublishedStateToServer(_value) {
    if(window.navigator.onLine == true) {
        var pushToServer = $.ajax({
            url: 'push/savePushStatus.php?version=' + UIVersion, 
            /* url: window.navigator.onLine == true ? 'push/savePushStatus.php?version=' + Math.random() : 'push/savePushStatus.php',  */
            type:'POST', 
            data:{'id' : sheet_Id, 'value' : _value}, 
            cache: false, 
            /* cache: true,  */
            /* async: false, */
            success: function (response) {
                //console.log("RESONSE - ", response)
            }
        })
        // Clear memory
        pushToServer.onreadystatechange = null;
        pushToServer.abort = null;
        pushToServer = null;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function ReloadCurrentData() {
    let rootFolder = "./sheets/" + sheet_Id + "/" + target;
    //console.log("Getting game setting data")
    //if(window.navigator.onLine == true) {
        var ReadCurrentData = $.ajax({
            url: rootFolder + "/version.json?version=" + UIVersion,
            cache: true,
            type: 'GET',
            dataType: "text",
            success: function (response) {
                let versionResponse = JSON.parse(response)
                // Check prev and new version
                let pushStatus = getPublishedStateToServer();
                // set current sheet version
                currentSheetVersion = versionResponse.version;
                currentVersion = "New"
                loadType = 'refresh'
                document.getElementById("loadingTxt").innerHTML = 'Loading Map Assets..<br>'
                updateInfoTextView()

                document.getElementById("loadingTxt").innerHTML = 'App Version: ' + _version + '<br>'
                updateInfoTextView()

                let currentDate = new Date();
                document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('MM/DD/YYYY HH:mm:ss') + "<br>"
                updateInfoTextView()

                setTimeout(function() {
                    document.getElementById("loadingTxt").innerHTML += 'Sheet Version: ' + versionResponse.version + '<br>'
                    updateInfoTextView()

                    // Add browser session id
                    document.getElementById("loadingTxt").innerHTML += 'Session Id: ' + deviceUID + '<br>'
                    updateInfoTextView()

                    // Add kiosk id if present
                    if(getKiosk_Num != '') {
                        document.getElementById("loadingTxt").innerHTML += 'Kiosk: ' + getKiosk_Num + '<br>'
                        updateInfoTextView()
                    }

                    /* document.getElementById('versionId').innerHTML = '' + Number(_version) + " - " + versionResponse.version;
                    updateInfoTextView() */

                    document.getElementById('versionMapInfo').innerHTML = '' + Number(_version) + " - " + versionResponse.version
                    updateInfoTextView()

                    getGamesSettingData();
                }, 0)
            },
            error:function(err) {
                console.log("Ajax error")
                checkUserQueryString();
                
            }
        })
        // Clear memory
        ReadCurrentData.onreadystatechange = null;
        ReadCurrentData.abort = null;
        ReadCurrentData = null;
   
}
////////////////////////////////////////////////////////////////////////////////////////////////////

function UpdateSW(sheetVersion) {
    // Refresh Service worker to restore the new version
    // Call
    //registerSW()
    navigator.serviceWorker.ready.then( registration => {
        //console.log("ENTER REFRESH")
        //registration.active.postMessage('update')
        registration.active.postMessage(sheetVersion)
    });
    //window.location.reload();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function ReloadDateInBackground(sheetVersion) {
    //console.log("Getting game setting data")
    loadType = 'refresh'
    cacheFirst = false;

    if(window.navigator.onLine == true) {
        // Update SW
        //UpdateSW(sheetVersion);
        //window.location.reload();


        /* if ("serviceWorker" in navigator) {
            navigator.serviceWorker
              .register("sw_map.js")
              .then((registration) => {
                // registration worked
                console.log("Registration succeeded.");
                registration.unregister().then((boolean) => {
                  // if boolean = true, unregister is successful
                  window.location.reload();
                });
              })
              .catch((error) => {
                // registration failed
                console.error(`Registration failed with ${error}`);
              });
          } */
        

    }
        document.getElementById("loadingTxt").innerHTML = 'Loading Map Assets..<br>'
        updateInfoTextView()

        document.getElementById("loadingTxt").innerHTML = 'App Version: ' + _version + '<br>'
        updateInfoTextView()

        let currentDate = new Date();
        document.getElementById("loadingTxt").innerHTML += "Checking server on " + moment(currentDate).format('YYYY/MM/DD HH:mm:ss') + "<br>"
        updateInfoTextView()

        setTimeout(function() {
            document.getElementById("loadingTxt").innerHTML += 'Sheet Version: ' + sheetVersion + '<br>'
            updateInfoTextView()

            // Add browser session id
            document.getElementById("loadingTxt").innerHTML += 'Session Id: ' + deviceUID + '<br>'
            updateInfoTextView()

            // Add kiosk id if present
            if(getKiosk_Num != '') {
                document.getElementById("loadingTxt").innerHTML += 'Kiosk: ' + getKiosk_Num + '<br>'
                updateInfoTextView()
            }

           /*  document.getElementById('versionId').innerHTML = '' + Number(_version) + " - " + sheetVersion
            updateInfoTextView() */

            document.getElementById('versionMapInfo').innerHTML = '' + Number(_version) + " - " + sheetVersion
            updateInfoTextView()

            getGamesSettingData();
            //savePublishedStateToServer('false')
        }, 0)
    //})
    

    ///////////////////////////////////////////////////////////////////////

    return;
    if(sheet_Id == '') {
        if(window.navigator.onLine == false) {
            // showing message
            document.getElementById("loadingTxt").innerHTML += "Checking Cache..<br>"
            updateInfoTextView()

            // 5/7/24
            //window.ldb.get('zapMap_VersionNum', function (value) {
            window.ldb.get(sheet_Id.toString() + '_VersionNum', function (value) {
                //console.log('zapMap_VersionNum is', value);
                currentVersion = "Same"
                setTimeout(function() {
                    checkUserQueryString()
                }, 2000)
            });
        } else {
            setTimeout(function() {
                checkUserQueryString()
            }, 2000)
        }
    } else {
        if(window.navigator.onLine == false) {
            // showing message
            document.getElementById("loadingTxt").innerHTML += "Checking Cache..<br>"
            updateInfoTextView()
            ///////////////////////////////////////////////////////////////////////////
        } else {
            //console.log("If no cache then wait...")
            //window.ldb.get('zapMap_SheetId', function (value) {
                window.ldb.get(sheet_Id.toString() + '_SheetId', function (value) {
                    //console.log('zapMap_SheetId is', value, " --- ", sheet_Id, " -- ", loadType); 
                    if(value != sheet_Id && loadType != 'refresh') {
                        //console.log("Different Sheet...")
                        //window.ldb.set('zapMap_SheetId', sheet_Id)
                        window.ldb.set(sheet_Id.toString() + '_SheetId', sheet_Id.toString())

                        window.ldb.set(sheet_Id.toString() + '_loadType', 'refresh')
                        window.location.reload()
                        return
                    } else {

                    //window.ldb.get('zapMap_VersionNum', function (value) {
                    window.ldb.get(sheet_Id.toString() + '_VersionNum', function (value) {
                        //console.log(value, " -------------- ")
                        if(value == null || value == '')  {
                            //console.log(sheet_Id + '_VersionNum is', value);
                            document.getElementById("loadingTxt").innerHTML += "Map data not available..<br>"
                            updateInfoTextView()
                            fetchSheetDetailsPeriodically()
                            return
                        } else {
                            // 5/7/24
                            //window.ldb.get('zapMap_settingData', function (value) {
                            window.ldb.get(sheet_Id.toString() + '_settingData', function (value) {
                                //console.log("zapMap_settingData > ", value)
                                settingDataList = value
                            });
                        }
                        //////////////////////////////////////////////////////////////////////////////////////////
                        //window.ldb.get('zapMap_loadType', function (value) {
                        window.ldb.get(sheet_Id.toString() + '_loadType', function (value) {
                            //console.log('zapMap_loadType is', value);
                            if(value == null || value == '') {
                                currentVersion = "Same"
                                loadType = "normal"
                            } else {
                                currentVersion = "New"
                                loadType = value;
                            }

                            if(currentVersion == "New") {
                                setTimeout(function() {
                                    getGamesSettingData()
                                }, 1000)
                            }
                        });
                    });
                }   
            });
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function CheckServerDataAvailable() {
    let rootFolder = "./sheets/" + sheet_Id + "/" + target;
    savePublishedStateToServer('true')
    let pushStatus = getPublishedStateToServer();
    //const cTimer = setTimeout(function() {
    let cTimer = setTimeout(function() {
        clearTimeout(cTimer)
        //if(window.navigator.onLine == true) {
            // Get the app version
            var checkServerData = $.ajax({
                url: rootFolder + "/version.json?version=" + UIVersion,
                cache: true,
                type: 'GET',
                dataType: "text",
                success: function (response) {
                    let versionResponse = JSON.parse(response)
                    if(parseFloat(value).toFixed(1) != parseFloat(versionResponse.version).toFixed(1) && pushStatus == 'true') {
                        currentVersion = "New"
                        savePublishedStateToServer('false')
                    } else if(value == '' || value == null || value == undefined) {
                        currentVersion = "New"
                        savePublishedStateToServer('false')
                    } else {
                        currentVersion = "Same"
                    }
                    if(currentVersion == 'New') {
                        // Reset All Values
                        settingLoaded = false
                        privateLoaded = false
                        gameLoaded = false
                        slides_loaded = false
                        eventSliderActive = false
                        slideShowLoaded = false
                        prevRenderEvents = 0
                        activeLanguage = "eng"
                        inLanguageProcess = false
                        activeMenuIndex = -1
                        if(sheet_Id != undefined) {
                        }
                        //UpdateSW(versionResponse.version);
                        ReloadDateInBackground(versionResponse.version)
                        //window.location.reload();
                    } 
                }
            })
            // Clear memory
            checkServerData.onreadystatechange = null;
            checkServerData.abort = null;
            checkServerData = null;
            ///////////////////
        //} 
    }, 100)
}
///////////////////////////////////////////////////////////////////////////////////
/**
 * 
 */
window.addEventListener('keydown', onKeyDownFunc);
function onKeyDownFunc() {
    if(event.code == 'F3') {
        event.preventDefault();
    }
}
///////////////////////////////////////////////////////////////////////////////////
/**
 * 
 */
window.addEventListener('keyup', onKeyUpfunc);
///////////////////////////////////////////////////////////////////////////////////
/**
 * 
 */
function hideLogScreen() {
    showloader();
    document.getElementById('mainAppContainer').style.display = 'none';
    document.getElementById('eventScreen').style.display = 'none';
    document.getElementById('defaultBG').style.display = 'none'
    document.getElementById('page-header').style.display = 'block'
    document.getElementById('page-footer').style.display = 'block'
    document.getElementById('spinningLoader').style.display = 'block'
    document.getElementById('loadingScreenImg').style.display = 'block'
    document.getElementById('loadingTxt').style.display = 'block'
    document.getElementById('versionText').style.display = 'none'
    document.getElementById('loadingTxt').style.zIndex = '99999999'
    document.getElementById('loadingTxt').style.backgroundColor = 'white'
    
    document.getElementById('loadingScreenImg').style.display = 'none'
}
///////////////////////////////////////////////////////////////////////////////////
/**
 * 
 */
function showLogScreen() {
    hideloader();
    document.getElementById('mainAppContainer').style.display = 'flex';
    document.getElementById('eventScreen').style.display = 'block';
    document.getElementById('defaultBG').style.display = 'block'
    document.getElementById('page-header').style.display = 'none'
    document.getElementById('page-footer').style.display = 'none'
    document.getElementById('spinningLoader').style.display = 'block'
    document.getElementById('loadingScreenImg').style.display = 'flex'
    document.getElementById('loadingTxt').style.display = 'block'
    document.getElementById('loadingTxt').style.zIndex = '0'
    document.getElementById('versionText').style.display = 'block'
    document.getElementById('loadingTxt').style.backgroundColor = 'transparent'

    document.getElementById('loadingScreenImg').style.display = 'block'
    
}
///////////////////////////////////////////////////////////////////////////////////
/**
 * 
 */
function onKeyUpfunc() {
    if(event.code == 'F3' && isToggle == false) {
        isToggle = true;
        hideLogScreen()
    } else if(event.code == 'F3' && isToggle == true) {
        isToggle = false;
        showLogScreen()
    }
}
///////////////////////////////////////////////////////////////////////////////////
/**
 * movePinToEnd 
 */
movePinToEnd = (arr) => {
    return arr.filter(item => item['Pin'] !== 'Bottom').concat(arr.filter(item => item['Pin'] === 'Bottom'))
}
///////////////////////////////////////////////////////////////////////////////////
/**
 * movePinToTop 
 */
movePinToTop = (arr) => {
    return arr.filter(item => item['Pin'] === 'Top').concat(arr.filter(item => item['Pin'] !== 'Top'))
}
///////////////////////////////////////////////////////////////////////////////////
 
