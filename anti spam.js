// ==UserScript==
// @name         Anti Spam
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/refs/heads/main/anti%20spam.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/refs/heads/main/anti%20spam.js
// @author       You
// @match        http*://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

var lasturlku= ""
var jar = setInterval(function(){


    


    if(location.href.length <= 40 ){
        if(document.getElementsByClassName("vscroller")[0].getElementsByTagName("img")[0]){
            document.getElementsByClassName("vscroller")[0].getElementsByTagName("img")[0].click()
        }
    }


},1500)
