// ==UserScript==
// @name         Anti Spam
// @namespace    http://tampermonkey.net/
// @version      2024-09-11
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
    

    if(location.href.includes("group")){
        lasturlku = location.href;

    }
    if(lasturlku.length > 10){

    if(location.href.length <= 40 ){
        location.href = lasturlku
        clearInterval(jar)
        return;
    }
    }

},1500)