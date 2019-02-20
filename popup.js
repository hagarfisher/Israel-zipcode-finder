$(function () {
    $('#btn_check').click(function () { checkCurrentTab(); });
});

function checkCurrentTab() {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        console.log('sending message...')
        // request content_script to retrieve title element innerHTML from current tab
        chrome.tabs.sendMessage(tabs[0].id, "getHeadTitle", function (obj) {
            console.log('receiving response... ', obj)
            //$("#log").html(obj);
        });
    });
};

document.addEventListener('DOMContentLoaded', function () {
    chrome.windows.getCurrent(function (currentWindow) {
        chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
            // inject content_script to current tab
            chrome.tabs.executeScript(activeTabs[0].id, { file: 'content_script.js', allFrames: false });
        });
    });
});

function log(txt) {
    var h = Math.random()
    $("#log").html(h + "<br>" + txt);
}