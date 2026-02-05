// ==UserScript==
// @name         Script 1: Data Fetcher (Fixed)
// @match        https://*.facebook.com/*
// @grant        GM_xmlhttpRequest
// @connect      api.telegram.org
// @connect      raw.githubusercontent.com
// ==/UserScript==

(async function () {
    'use strict';
    // 1. Definisikan variabel di level atas agar bisa diakses semua fungsi dalam scope ini
    const namagroup18 = 'Jawatengah';
    const Comment18 = 'bejo1';
    const URLGROUP = `https://raw.githubusercontent.com/natasyabimosakti/Novi91/main/Comment/${Comment18}.json`;
    const URLADMIN = "https://raw.githubusercontent.com/natasyabimosakti/ADMIN/refs/heads/main/Admin_group_Lama.json";

    // Fungsi Ambil Admin
    async function fetchAdminListFromGitHub() {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: URLADMIN,
                onload: function (response) {
                    try {
                        const data = JSON.parse(response.responseText);
                        localStorage.setItem('adminList_Shared', JSON.stringify(data.admins));
                        console.log("✅ Admin Fetch Success");
                        resolve();
                    } catch (e) {
                        console.error("❌ Parse Admin Error:", e);
                        resolve(); // Tetap resolve agar tidak macet
                    }
                },
                onerror: () => resolve()
            });
        });
    }

    // Fungsi Ambil Group
    async function fetchGroupsFromGitHub() {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: URLGROUP,
                onload: function (response) {
                    try {
                        const data = JSON.parse(response.responseText);
                        let finalArray = [];

                        // 1. Masukkan data dari GitHub (Filter yang bukan TEST)
                        data.forEach((item) => {
                            if (item.group && item.group !== "TEST") {
                                finalArray.push({
                                    group: item.group,
                                    comment: item.comment
                                });
                            }
                        });

                        // 2. Masukkan data lokal hardcode
                        finalArray.push({
                            group: namagroup18,
                            comment: Comment18
                        });

                        // 3. Simpan ke LocalStorage
                        localStorage.setItem('groupList_Shared', JSON.stringify(finalArray));
                        console.log(`✅ Group Fetch Success: ${finalArray.length} items saved.`);
                        resolve();
                    } catch (e) {
                        console.error("❌ Parse Group Error:", e);
                        resolve();
                    }
                },
                onerror: () => resolve()
            });
        });
    }

    // Jalankan urutan
    console.log("📡 Memulai sinkronisasi data...");
    await fetchAdminListFromGitHub();
    await fetchGroupsFromGitHub();
    console.log("🏁 Semua data sudah siap di LocalStorage.");

})();
