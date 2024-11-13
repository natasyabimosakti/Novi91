// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-09-11
// @description  try to take over the world!
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