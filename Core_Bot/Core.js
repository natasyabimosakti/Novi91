// babon_core.js
window.initBabonLogic = function (namagroup18, Comment18) {


    // --- 1. ANTI-THROTTLE & KEEP-ALIVE (Solusi Tab Background) ---
    (function () {
        // Memaksa properti visibility agar selalu 'visible'
        Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: true });
        Object.defineProperty(document, 'hidden', { value: false, writable: true });
        Object.defineProperty(document, 'hasFocus', { value: () => true, writable: true });

        // Blokir event listener yang mencoba mendeteksi perpindahan tab
        const origAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, listener, options) {
            if (['visibilitychange', 'blur', 'focus', 'pagehide', 'webkitvisibilitychange'].includes(type)) return;
            return origAddEventListener.call(this, type, listener, options);
        };

        setInterval(() => {
            if (document.hidden !== false) {
                Object.defineProperty(document, 'hidden', { value: false, writable: true });
                Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: true });
                window.dispatchEvent(new Event('mousemove'));


          
