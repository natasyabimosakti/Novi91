// ==UserScript==
// @name         Token extractor Pay4d
// @namespace    http://tampermonkey.net/
// @version      2025-12-19
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    const links = document.querySelectorAll('a[onclick]');
    let found = false;

    links.forEach(a => {
        const onclick = a.getAttribute('onclick');
        if (!onclick) return;

        const match = onclick.match(/https:\/\/cmd\.private88win\.com\/cmd\/launch\?token=([^']+)/);

        if (match) {
            found = true;
            const token = decodeURIComponent(match[1]);

            console.log("TOKEN DITEMUKAN:", token);

            // --- Toast ---
            let toast = document.createElement("div");
            toast.innerHTML = token;
            toast.style = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #000;
                    color: #fff;
                    padding: 12px 18px;
                    border-radius: 5px;
                    box-shadow: 0px 0px 10px rgba(0,0,0,0.4);
                    z-index: 999999;
                    font-size: 15px;
                `;

                document.body.appendChild(toast);

                setTimeout(() => toast.remove(), 6000);
            }
        });

    if (!found) {
        console.log("Token tidak ditemukan");
    }
})();
