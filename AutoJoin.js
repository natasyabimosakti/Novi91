// ==UserScript==
// @name         AUTO  JOIN
// @namespace    http://tampermonkey.net/
// @version      0.11
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
var cekjoin1 = document.getElementsByClassName('native-text')[10]
var cekjoin2 = document.getElementsByClassName('native-text')[11]
var cekjoin3 = document.getElementsByClassName('native-text')[12]
var cekjoin4 = document.getElementsByClassName('native-text')[13]
var cekjoin5 = document.getElementsByClassName('native-text')[14]
setInterval(function(){
    document.querySelectorAll("[aria-label='Bergabung grup']")[0].click()

    if(cekjoin1||cekjoin2||cekjoin3||cekjoin4||cekjoin5){
        if(cekjoin1.textContent.includes("Bergabung grup")==true) {
            document.getElementsByClassName('native-text')[10].click();
            window.location.reload()
        }
        if(cekjoin2.textContent.includes("Bergabung grup")==true) {
            document.getElementsByClassName('native-text')[11].click();
            window.location.reload()
        }
        if(cekjoin3.textContent.includes("Bergabung grup")==true) {
            document.getElementsByClassName('native-text')[12].click();
            window.location.reload()
        }
        if(cekjoin4.textContent.includes("Bergabung grup")==true) {
            document.getElementsByClassName('native-text')[13].click();
            window.location.reload()
        }
        if(cekjoin5.textContent.includes("Bergabung grup")==true) {
            document.getElementsByClassName('native-text')[14].click();
            window.location.reload()
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
