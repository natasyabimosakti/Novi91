// ==UserScript==
// @name         Auto Switch Account
// @namespace    http://tampermonkey.net/
// @version      3.94
// @description  try to take over the world!
// @updateURL    https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/AutoSwitch.js
// @downloadURL  https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/AutoSwitch.js
// @author       You
// @match        http*://*/*
// @run-at       document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        window.close
// @grant        GM_xmlhttpRequest
// @connect      api.telegram.org
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
    const ik = setInterval(() => {
        cekMasalah()
        clearInterval(ik)
    }, 1000)   
         /* ===================== LAYER C: WATCHDOG ====================== */
    function watchdog(label, check, action, timeout = 10000, interval = 500) {


        let t = 0;
        const iv = setInterval(async () => {
            let bukan = document.querySelector("[data-tracking-duration-id]");
            if (bukan) {
                clearInterval(iv)
            }
            antistuck()
            try {
                if (check()) {
                    clearInterval(iv);
                    return;
                }
                t += interval;
                if (t >= timeout) {
                    clearInterval(iv);
                    console.warn("[WATCHDOG TIMEOUT]", label);
                    action && action();
                }
            } catch (e) {
                clearInterval(iv);
                console.error("[WATCHDOG ERROR]", label, e);
            }
        }, interval);
    }
    function antistuck() {
        let t = 0;
        const il = setInterval(async () => {
            let bukan = document.querySelector("[data-tracking-duration-id]");
            if (bukan) {
                clearInterval(il);
            }
            let btn =
                // tombol role button
                document.querySelector('div[role="button"] span:textEquals("Ya")')?.parentElement ||
                // tombol tanpa role
                findButtonByText("Ya") ||
                // tombol dengan aria-label
                document.querySelector('[aria-label="Ya"]');

            if (btn) {
                console.log("[LOGOUT] tombol YA ditemukan → klik");
                heavyClick(btn);
            }

        }, 2000);
    }
    async function cekMasalah() {
        try {
            const elem = document.querySelectorAll("[data-screen-key-action-ids]")[1];
            if (!elem) return;

            const dialog = elem.getElementsByClassName("dialog-vscroller")[0];
            if (!dialog) return;

            const isi = dialog.textContent.toLowerCase();
            if (isi.includes("masalah")) {
                location.href = "https://m.facebook.com/bookmarks/"
            }
        } catch (e) {
            console.warn("? Error saat cek masalah:", e);
        }
    }
    /* ===================== BASE FUNCTIONS ====================== */

    function waitForSelector(sel, timeout = 10000) {
        return new Promise(resolve => {

            const iv = setInterval(() => {
                let bukan = document.querySelector("[data-tracking-duration-id]");
                if (bukan) {
                    clearInterval(iv);
                }
                const el = document.querySelector(sel);
                if (el) { clearInterval(iv); resolve(el); }
            }, 200);
            setTimeout(() => { clearInterval(iv); resolve(null); }, timeout);
        });
    }

    function getCurrentAccountName() {
        const el = document.querySelector('[aria-label*="profil Anda"]') ||
            document.querySelector('[aria-label*="Lihat profil"]');
        if (!el) return null;
        const label = el.getAttribute('aria-label');
        if (!label) return null;
        return label.split(',')[0].trim().toLowerCase();
    }

    function normalizeUserName(str) {
        return str.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    async function clickByContainsText(txt) {
        const xpath = `//span[contains(text(), '${txt}')]/ancestor::div[@role='button']`;
        const el = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (el) { el.click(); return true; }
        return false;
    }

    async function confirmLogout() {
        console.log("[LOGOUT] mencari tombol konfirmasi...");
        let timeout = 0;

        while (timeout < 12000) {
            let bukan = document.querySelector("[data-tracking-duration-id]");
            if (bukan) break;
            // 1 — jangan klik terlalu cepat (modal animasi butuh ±150–300ms)
            await delay(200);

            // 2 — multi selector untuk tombol “Ya”
            let btn =
                // tombol role button
                findYaRoleButton() ||
                // tombol tanpa role
                findButtonByText("Ya") ||
                // tombol dengan aria-label
                document.querySelector('[aria-label="Ya"]');

            if (btn) {
                console.log("[LOGOUT] tombol YA ditemukan → klik");
                heavyClick(btn);
                await delay(500);
                return true;
            }

            // 3 — fallback: klik "Keluar" lagi (UI tertentu begitu)
            let fallback = document.querySelector('[role="button"][aria-label="Keluar"]');
            if (fallback) heavyClick(fallback);

            timeout += 300;
        }

        console.warn("[LOGOUT] konfirmasi tidak ditemukan → timeout");
        return false;
    }

    function delay(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
    function findYaRoleButton() {
        const nodes = document.querySelectorAll('div[role="button"] span');
        for (const span of nodes) {
            if (span.textContent.trim().toLowerCase() === "ya") {
                return span.closest('div[role="button"]');
            }
        }
        return null;
    }
    // selector text helper
    function findButtonByText(txt) {
        txt = txt.toLowerCase();
        return [...document.querySelectorAll('div,span,button')]
            .find(el => el.textContent.trim().toLowerCase() === txt);
    }

    // click yang Facebook respect
    function heavyClick(el) {
        try {
            el.click();
            el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
            el.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
            el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            el.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
            el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        } catch (e) {
            el.click();
        }
    }


    async function autoLogout() {
        const raw = getCurrentAccountName();
        if (raw) {
            const norm = normalizeUserName(raw);
            await GM.setValue("useAccount", norm);
            // ambil list lama dulu
            let lastList = await GM.getValue("lastAccount", "");
            let accounts = lastList ? lastList.split(",").map(a => a.trim()) : [];

            // tambahkan akun baru jika belum ada
            if (!accounts.includes(norm)) {
                accounts.push(norm);
                await GM.setValue("lastAccount", accounts.join(","));
                console.log("[SAVE] lastAccount =", accounts.join(","));
            } else {
                console.log("[SAVE] akun sudah ada:", norm);
            }
        } else console.warn("[WARN] tidak bisa baca nama akun");

        console.log("[LOGOUT] klik tombol Keluar...");
        const logoutBtn = document.querySelector("[role='button'][aria-label='Keluar']");
        if (logoutBtn) logoutBtn.click();
        else await clickByContainsText("Keluar");

        // watchdog confirm logout stuck
        watchdog("confirm-logout", () => !/bookmarks/i.test(location.href), () => location.reload(), 10000);

        await new Promise(r => setTimeout(r, 800));

        console.log("[LOGOUT] konfirmasi Ya...");
        await confirmLogout();

        console.log("[✓] Logout selesai");
    }

    async function processBookmarksTrigger() {
        console.log("[TRIGGER] halaman bookmarks terdeteksi");

        const profile = await waitForSelector('[aria-label*="profil Anda"], [aria-label*="Lihat profil"]', 8000);
        if (!profile) return console.warn("[TRIGGER] elemen profil tidak ditemukan → stop");

        console.log("[TRIGGER] profil ditemukan → tunggu 15 detik...");
        await new Promise(r => setTimeout(r, 15000));

        const still = document.querySelector('[aria-label*="profil Anda"], [aria-label*="Lihat profil"]');
        if (!still) return console.warn("[TRIGGER] elemen profil hilang setelah delay → stop");

        console.log("[TRIGGER] profil masih ada → lanjut logout");

        // watchdog stuck di bookmarks
        watchdog("bookmarks-post-trigger", () => !/bookmarks/i.test(location.href), () => location.reload(), 20000);

        await autoLogout();
    }

    /* ===================== LOGIN SECTION ====================== */

    function waitForLoginList(timeout = 15000) {
        return new Promise(resolve => {
            const iv = setInterval(() => {
                let bukan = document.querySelector("[data-tracking-duration-id]");
                if (bukan) {
                    clearInterval(iv);

                };
                const nodes = document.querySelectorAll('div[role="button"][aria-label]');
                if (nodes.length > 0) {
                    clearInterval(iv);
                    resolve(nodes);
                }
            }, 300);
            setTimeout(() => { clearInterval(iv); resolve(null); }, timeout);
        });
    }

    function normalize(s) {
        return s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    const blacklistKeywords = [
        "pengaturan", "gunakan", "switch", "login", "signup", "buat", "create", "akun", "profile"
    ];

    function fbClick(el) {
        try {
            el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            el.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
            el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        } catch (e) {
            el.click();
        }
    }

    async function pickAccount(nodes) {
        // block jika sudah di dalam akun
        if (document.querySelector("[data-tracking-duration-id]")) return;
        if (document.URL.includes('bookm')) return;

        // ambil list akun di DOM
        let list = Array.from(nodes).map(el => ({
// @version      3.NaN
            name: normalize(el.getAttribute("aria-label") || "")
        }));

        console.log("[LOGIN] raw:", list.map(v => v.name));

        // ambil data dari storage
        let lastRaw = await GM.getValue("lastAccount", "");
        let lastList = lastRaw ? lastRaw.split(",").map(a => a.trim()) : [];

        let useAccount = (await GM.getValue("useAccount", "")).trim();

        // filter akun yang bukan blacklist
        let candidates = list.filter(v => !blacklistKeywords.some(k => v.name.includes(k)));

        console.log("[LOGIN] candidates:", candidates.map(v => v.name));

        if (candidates.length === 0) return;

        let chosen = null;

        // 1️⃣ coba cari akun baru yang belum login
        let newCandidates = candidates.filter(v => !lastList.includes(v.name));
        if (newCandidates.length > 0) {
            chosen = newCandidates[0];
        } else {
            // 2️⃣ semua akun sudah ada → cari mulai dari useAccount
            let startIdx = lastList.indexOf(useAccount);
            if (startIdx === -1) startIdx = 0; // kalau useAccount hilang, mulai dari awal

            // loop dengan wrap-around
            for (let i = 0; i < lastList.length; i++) {
                let idx = (startIdx + 1 + i) % lastList.length;
                let name = lastList[idx];
                let found = candidates.find(v => v.name === name);
                if (found) {
                    chosen = found;
                    break;
                }
            }

            // fallback kalau semua gagal → pilih kandidat pertama
            if (!chosen) chosen = candidates[0];
        }

        console.log("[LOGIN] chosen:", chosen.name);

        fbClick(chosen.el);

        // update useAccount ke akun yang login sekarang
        await GM.setValue("useAccount", normalizeUserName(chosen.name));

        // watchdog untuk stuck setelah klik akun
        watchdog("post-pick", () => /bookmarks|checkpoint|login|home/i.test(location.href), () => location.reload(), 15000);
    }



    async function start() {
        const initial = await waitForLoginList();
        if (!initial) return console.warn("[LOGIN] no list → STOP");

        console.log("[LOGIN] list muncul → tunggu 20s");
        await new Promise(r => setTimeout(r, 20000));

        const check = document.querySelectorAll('div[role="button"][aria-label]');
        if (check.length === 0) return console.warn("[LOGIN] list hilang → STOP");

        const nodes = document.querySelectorAll('[role="button"][aria-label]');

        pickAccount(nodes);
    }

    /* ===================== MAIN INIT ====================== */

    // anti-stuck di halaman login
    watchdog("waiting-login", () =>
        document.querySelector('div[role="button"][aria-label]'),
        () => location.reload(),
        20000
    );

    if (/bookmarks/i.test(location.href)) {
        processBookmarksTrigger();
    }

    start();

})();
