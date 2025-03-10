// ==UserScript==
// @name         Anti Spam
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/refs/heads/main/anti%20spam.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/refs/heads/main/anti%20spam.js
// @author       You
// @match        http*://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// ==/UserScript==

var lasturlku
var jar = setInterval(function(){



    if(location.href.includes("group")){
        lasturlku=location.href
        return;
    }

    if(location.href.length <= 40 ){
        if(document.getElementsByClassName("vscroller")[0].getElementsByTagName("img")[0]){
            document.getElementsByClassName("vscroller")[0].getElementsByTagName("img")[0].click()
        }
    }


},100)



var ujar = setInterval(function(){



    if(lasturlku.length > 10){

    if(location.href.length <= 40 ){
        location.href = lasturlku

        return;
    }
    }

},200)
