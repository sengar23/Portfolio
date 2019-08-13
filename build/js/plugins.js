// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
var win_w = window.innerWidth;
var win_h = $(window).height();

var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
var ESC = 27;
var ENTER = 13;
(function(global) {

    var apple_phone = /iPhone/i,
        apple_ipod = /iPod/i,
        apple_tablet = /iPad/i,
        android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
        android_tablet = /Android/i,
        windows_phone = /IEMobile/i,
        windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
        other_blackberry = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera = /Opera Mini/i,
        other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
        seven_inch = new RegExp('(?:' + 'Nexus 7' + '|' + 'BNTV250' + '|' + 'Kindle Fire' + '|' + 'Silk' + '|' + 'GT-P1000' + ')', 'i');
    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };
    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;

        this.apple = {
            phone: match(apple_phone, ua),
            ipod: match(apple_ipod, ua),
            tablet: match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.android = {
            phone: match(android_phone, ua),
            tablet: !match(android_phone, ua) && match(android_tablet, ua),
            device: match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone: match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry: match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera: match(other_opera, ua),
            firefox: match(other_firefox, ua),
            device: match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;
        if (typeof window === 'undefined') {
            return this;
        }
    };
    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;

        return IM;
    };
    if (typeof module != 'undefined' && module.exports && typeof window === 'undefined') {
        module.exports = IsMobileClass;
    } else if (typeof module != 'undefined' && module.exports && typeof window !== 'undefined') {
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        define(global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();

    }
})(this);

console.log(isMobile.any);
console.log(isMobile.phone);
