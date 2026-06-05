// Creating worker to do all process in the background
if (typeof(Worker) !== "undefined") {
    console.log('Yes! Web worker support!')

    // For test
    /* function timedCount() {
        postMessage('Data from worker');
    }
    timedCount(); */

    //console.log('---', navigator)
    let sheet_Id = '';
    let pollTime = '';
    let localDB = null;

    onmessage = function(event) {
        //console.log(event.data.poll, " in worker ")
        sheet_Id = event.data.sheetID
        pollTime = event.data.poll;
        cacheVersion = event.data.versionNum

        //console.log(event.data)
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    function fetchSheetDetailsPeriodically() {
        console.log(sheet_Id, " --- ", pollTime, '--- ')
        //return;
        //console.log(JSON.stringify({'jsonPath' : ('sheets/' + sheet_Id.toString() + '/version.json')}))
        const periodicTimer = setTimeout(function() {
            clearTimeout(periodicTimer)
            if(navigator.onLine == true) {
                console.log("INTERNET ACTIVE - ")
                // Get the app version

                let jsonURL = {
                    jsonPath : 'sheets/' + sheet_Id.toString() + '/version.json'
                }

                //fetch('../get_version.php', formData)
                fetch('../get_version_cache.php', {
                    "method": "POST", 
                    "headers": {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    "body": JSON.stringify(jsonURL)})
                .then(response => {
                    // Check if the request was successful
                    //console.log(response, " ----- ")
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Parse the response as JSON
                    return response.text();
                    //console.log(response.json(), " VALUES");
                })
                .then(data => {
                    // Handle the JSON data
                    console.log(data, " data");
                    console.log(JSON.stringify(cacheVersion), " = Version = ", JSON.stringify(data))

                    //if(JSON.stringify(value) != JSON.stringify(response)){
                    if(parseFloat(cacheVersion).toFixed(1) != parseFloat(data).toFixed(1)) {
                        console.log('Different values')
                        //window.ldb.set('zapMap_VersionNum', response)
                        // update the cache value with the new one.
                        //window.ldb.set(sheet_Id.toString() + '_VersionNum', response)
                        cacheVersion = data;
                    } else {
                        console.log("same value")
                        //fetchSettingDataFromSpreadsheet()
                        return
                    }
                    
                    //return
                })
                .catch(error => {
                    // Handle any errors that occurred during the fetch
                    console.error('Fetch error:', error);
                });
                    fetchSheetDetailsPeriodically()
            } else {
                //console.log("NO INTERNET")
               /*  fetchSheetDetailsPeriodically() */
            }
        }, pollTime * 1000)
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    function fetchSettingDataFromSpreadsheet() {
        let jsonURL = {
            sheetId : sheet_Id,
            sheet : 'Settings'
        }
        fetch('../private_data_cache.php', {
            "method": "POST", 
            "headers": {
                "Content-Type": "application/json; charset=utf-8"
            },
            "body": JSON.stringify(jsonURL)})
        .then(response => {
            // Check if the request was successful
            //console.log(response, " ----- ")
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the response as JSON
            return response.text();
            //console.log(response.json(), " VALUES");
        })
        .then(data => {
            // Handle the JSON data
            console.log(data, " data");
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // function to look for new update and fetch the data from spread sheet
    // Recursive
    setTimeout(function() {
        fetchSheetDetailsPeriodically()
    },2000)
    //////////////////////////////////////////////////////////////////////////////////////////////////////


} else {
    console.log('Sorry! No Web Worker support.')
}




  