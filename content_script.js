function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function inputZipcode(zipcode) {
    document.getElementById("billing:postcode").value = zipcode
}

function parseHtml(htmlString) {
    var el = document.createElement('html');
    el.innerHTML = htmlString;
    var zipcode = el.getElementsByTagName("BODY")[0].innerHTML;
    inputZipcode(zipcode.trim().substr(4, 7));
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //create a var that gets the city/address/house number first
        var city = document.getElementById("billing:city").value
        var street = document.getElementById("billing:street1").value
        var houseNum = document.getElementById("billing:street2").value
        //do this so you can access the mail services' api.
        var url = "https://www.israelpost.co.il/zip_data.nsf/SearchZip?OpenAgent&Location=" + city + "&POB=&Street=" + street + "&House=" + houseNum + "&Entrance="
        httpGetAsync(url, parseHtml);
    });