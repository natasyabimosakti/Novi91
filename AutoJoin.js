// ==UserScript==
// @name         AUTO  JOIN
// @namespace    http://tampermonkey.net/
// @version      0.12
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/AutoJoin.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/AutoJoin.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       window.close
// ==/UserScript==

var refresh = 400;

setInterval(function(){
    for(var i = 0; i <= document.getElementsByClassName('native-text').length;i++){
       if( document.getElementsByClassName('native-text')[i].textContent.includes('Bergabung grup')||document.getElementsByClassName('native-text')[i].textContent.includes('Join')){
           document.getElementsByClassName('native-text')[i].click()
       }
    }


    if(document.URL.includes('search')){
        if(document.getElementsByClassName('native-text')[2]){
            if(document.getElementsByClassName('native-text')[2].textContent.includes("grup")){


                if(document.getElementsByClassName('native-text')[8].textContent == "Lihat" || document.getElementsByClassName('native-text')[8].textContent == "Gabung") {
                    document.getElementsByClassName('native-text')[8].click()
                }
                if(document.getElementsByClassName('native-text')[11].textContent == "Lihat" || document.getElementsByClassName('native-text')[11].textContent == "Gabung") {
                    document.getElementsByClassName('native-text')[11].click()
                }
                if(document.getElementsByClassName('native-text')[10].textContent == "Lihat" || document.getElementsByClassName('native-text')[10].textContent == "Gabung") {
                    document.getElementsByClassName('native-text')[10].click()
                }
                if(document.getElementsByClassName('native-text')[9].textContent == "Lihat" || document.getElementsByClassName('native-text')[9].textContent == "Gabung") {
                    document.getElementsByClassName('native-text')[9].click()
                }


            }
        }

        if (document.querySelectorAll("[data-module-result-type='group']")[0]){
            document.querySelectorAll("[type='submit']")[0].click()

        }

    }

},refresh * 10)
