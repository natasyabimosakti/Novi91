// ==UserScript==
// @name         Anti Spam
// @namespace    http://tampermonkey.net/
// @version      3.16
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/refs/heads/main/anti%20spam.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/refs/heads/main/anti%20spam.js
// @author       You
// @match        http*://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// @run-at       document-end
// ==/UserScript==

var lasturlku = "";
var jar = setInterval(function(){
    if(location.href.includes("group")){
        lasturlku = location.href;
        return;
    }
    if(location.href.length <= 39){
        var vsc = document.getElementsByClassName("vscroller");
        if(vsc.length > 0){
            var img = vsc[0].getElementsByTagName("img")[0];
            if(img){
                img.click();
            }
        }
    }
}, 500);

var ujar = setInterval(function(){
    if(typeof lasturlku === "string" && lasturlku.length > 10){
        if(location.href.length <= 5){
            location.href = lasturlku;
            return;
        }
    }
}, 1500);

setInterval(function(){
    var btn = document.getElementsByTagName("button")[0];
    if(btn && typeof btn.value === "string" && (btn.value.includes("Dismiss") || btn.value.includes("Tutup"))){
        btn.click();
    }
}, 1500);


