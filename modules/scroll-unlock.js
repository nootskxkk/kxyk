(function () {
    'use strict';
    function unlock() {
        if (document.fullscreenElement)
            return;
        document.documentElement.style.height = 'auto';
        document.documentElement.style.overflowY = 'auto';
        document.documentElement.style.overflowX = 'hidden';
        document.documentElement.style.position = 'static';
        document.body.classList.remove('dogbones-map-fullscreen-active');
        document.body.style.height = 'auto';
        document.body.style.overflowY = 'auto';
        document.body.style.overflowX = 'hidden';
        document.body.style.position = 'static';
        document.body.style.touchAction = 'pan-y';
        var shell = document.querySelector('.app-shell');
        if (shell) {
            shell.style.height = 'auto';
            shell.style.maxHeight = 'none';
            shell.style.overflow = 'visible';
            shell.style.position = 'relative';
            shell.style.touchAction = 'pan-y';
        }
    }
    window.addEventListener('load', unlock, { passive: true });
    window.addEventListener('pageshow', unlock, { passive: true });
    setTimeout(unlock, 50);
    setTimeout(unlock, 500);
    setTimeout(unlock, 1500);
})();
