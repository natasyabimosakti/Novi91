// ==UserScript==
// @name         Otomatis Warnai
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  Otomatis
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function isSingaporeExceptionTime() {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const totalMinutes = hour * 60 + minutes;
        const inRange = (startH, startM, endH, endM) => {
            const start = startH * 60 + startM;
            const end = endH * 60 + endM;
            return totalMinutes >= start && totalMinutes <= end;
        };

        if (day === 1 && totalMinutes >= 1080) return true;
        if (day === 2 && totalMinutes <= 1430) return true;
        if (day === 4 && totalMinutes >= 1080) return true;
        if (day === 5 && totalMinutes <= 1430) return true;
        return false;
    }
    function highlightLinks() {
        const exceptionSingapore = isSingaporeExceptionTime();
        const anchors = document.getElementsByTagName("a");
        for (let a of anchors) {
            const text = a.textContent.toUpperCase();

            if (text.includes("SINGAPORE")) {
                a.style.color = exceptionSingapore ? "black" : "red";
            } else if (text.includes("SYDNEY") || text.includes("HONGKONG")) {
                a.style.color = "red";
            }
        }
        for (let a of anchors) {
            const titleDiv = a.querySelector(".game-title");
            if (!titleDiv) continue;

            const text = titleDiv.textContent.toUpperCase();

            if (text.includes("SINGAPORE")) {
                titleDiv.style.setProperty("color", exceptionSingapore ? "black" : "red", "important");
            } else if (text.includes("SYDNEY") || text.includes("HONGKONG")) {
                titleDiv.style.setProperty("color", "red", "important");
            }
        }
    }

    highlightLinks();
    const observer = new MutationObserver(() => {
        highlightLinks();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setInterval(highlightLinks, 60000);
})();
