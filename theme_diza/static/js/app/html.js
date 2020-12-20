// Script 1
document.documentElement.className = document.documentElement.className + ' yes-js js_active js';
// Script 2
(function(a, d) {
    if (a._nsl === d) {
        a._nsl = [];
        var c = function() {
            if (a.jQuery === d) setTimeout(c, 33);
            else {
                for (var b = 0; b < a._nsl.length; b++) a._nsl[b].call(a, a.jQuery);
                a._nsl = {
                    push: function(b) {
                        b.call(a, a.jQuery)
                    }
                }
            }
        };
        c()
    }
})(window);
// Script 3
function setREVStartSize(e) {
    window.RSIW = window.RSIW === undefined ? window.innerWidth : window.RSIW;
    window.RSIH = window.RSIH === undefined ? window.innerHeight : window.RSIH;
    try {
        //modified
        if (document.getElementById(e.c)) {
            var pw = document.getElementById(e.c).parentNode.offsetWidth,
                newh;
            pw = pw === 0 || isNaN(pw) ? window.RSIW : pw;
            e.tabw = e.tabw === undefined ? 0 : parseInt(e.tabw);
            e.thumbw = e.thumbw === undefined ? 0 : parseInt(e.thumbw);
            e.tabh = e.tabh === undefined ? 0 : parseInt(e.tabh);
            e.thumbh = e.thumbh === undefined ? 0 : parseInt(e.thumbh);
            e.tabhide = e.tabhide === undefined ? 0 : parseInt(e.tabhide);
            e.thumbhide = e.thumbhide === undefined ? 0 : parseInt(e.thumbhide);
            e.mh = e.mh === undefined || e.mh == "" || e.mh === "auto" ? 0 : parseInt(e.mh, 0);
            if (e.layout === "fullscreen" || e.l === "fullscreen")
                newh = Math.max(e.mh, window.RSIH);
            else {
                e.gw = Array.isArray(e.gw) ? e.gw : [e.gw];
                for (var i in e.rl)
                    if (e.gw[i] === undefined || e.gw[i] === 0) e.gw[i] = e.gw[i - 1];
                e.gh = e.el === undefined || e.el === "" || (Array.isArray(e.el) && e.el.length == 0) ? e.gh : e.el;
                e.gh = Array.isArray(e.gh) ? e.gh : [e.gh];
                for (var i in e.rl)
                    if (e.gh[i] === undefined || e.gh[i] === 0) e.gh[i] = e.gh[i - 1];
                var nl = new Array(e.rl.length),
                    ix = 0,
                    sl;
                e.tabw = e.tabhide >= pw ? 0 : e.tabw;
                e.thumbw = e.thumbhide >= pw ? 0 : e.thumbw;
                e.tabh = e.tabhide >= pw ? 0 : e.tabh;
                e.thumbh = e.thumbhide >= pw ? 0 : e.thumbh;
                for (var i in e.rl) nl[i] = e.rl[i] < window.RSIW ? 0 : e.rl[i];
                sl = nl[0];
                for (var i in nl)
                    if (sl > nl[i] && nl[i] > 0) {
                        sl = nl[i];
                        ix = i
                    }
                var m = pw > (e.gw[ix] + e.tabw + e.thumbw) ? 1 : (pw - (e.tabw + e.thumbw)) / (e.gw[ix]);
                newh = (e.gh[ix] * m) + (e.tabh + e.thumbh)
            }
            if (window.rs_init_css === undefined) window.rs_init_css = document.head.appendChild(document.createElement("style"));
            document.getElementById(e.c).height = newh + "px";
            window.rs_init_css.innerHTML += "#" + e.c + "_wrapper { height: " + newh + "px }"
        }
    } catch (e) {
        console.log("Failure at Presize of Slider:" + e)
    }
};
// Script 4
window._nsl.push(function($) {
    $(document).ready(function() {
        var $container = $('#nsl-custom-login-form-1');
        $container.find('.nsl-container').addClass('nsl-container-embedded-login-layout-below').css('display', 'block');
        $container.appendTo($container.closest('form'))
    })
});
// Script 5
window._nsl.push(function($) {
    $(document).ready(function() {
        var $container = $('#nsl-custom-login-form-2');
        $container.find('.nsl-container').addClass('nsl-container-embedded-login-layout-below').css('display', 'block');
        $container.appendTo($container.closest('form'))
    })
});
// Script 6
(function() {
    function maybePrefixUrlField() {
        if (this.value.trim() !== '' && this.value.indexOf('http') !== 0) {
            this.value = "http://" + this.value
        }
    }
    var urlFields = document.querySelectorAll('.mc4wp-form input[type="url"]');
    if (urlFields) {
        for (var j = 0; j < urlFields.length; j++) {
            urlFields[j].addEventListener('blur', maybePrefixUrlField)
        }
    }
})();
var c = document.body.className;
c = c.replace(/woocommerce-no-js/, 'woocommerce-js');
document.body.className = c;
if (typeof revslider_showDoubleJqueryError === "undefined") {
    function revslider_showDoubleJqueryError(sliderID) {
        var err = "<div class='rs_error_message_box'>";
        err += "<div class='rs_error_message_oops'>Oops...</div>";
        err += "<div class='rs_error_message_content'>";
        err += "You have some jquery.js library include that comes after the Slider Revolution files js inclusion.<br>";
        err += "To fix this, you can:<br>&nbsp;&nbsp;&nbsp; 1. Set 'Module General Options' -> 'Advanced' -> 'jQuery & OutPut Filters' -> 'Put JS to Body' to on";
        err += "<br>&nbsp;&nbsp;&nbsp; 2. Find the double jQuery.js inclusion and remove it";
        err += "</div>";
        err += "</div>";
        var slider = document.getElementById(sliderID);
        slider.innerHTML = err;
        slider.style.display = "block"
    }
};
// Script 7
(function(undefined) {
    var _targetWindow = "prefer-popup";
    window.NSLPopup = function(url, title, w, h) {
        var userAgent = navigator.userAgent,
            mobile = function() {
                return /\b(iPhone|iP[ao]d)/.test(userAgent) || /\b(iP[ao]d)/.test(userAgent) || /Android/i.test(userAgent) || /Mobile/i.test(userAgent)
            },
            screenX = window.screenX !== undefined ? window.screenX : window.screenLeft,
            screenY = window.screenY !== undefined ? window.screenY : window.screenTop,
            outerWidth = window.outerWidth !== undefined ? window.outerWidth : document.documentElement.clientWidth,
            outerHeight = window.outerHeight !== undefined ? window.outerHeight : document.documentElement.clientHeight - 22,
            targetWidth = mobile() ? null : w,
            targetHeight = mobile() ? null : h,
            V = screenX < 0 ? window.screen.width + screenX : screenX,
            left = parseInt(V + (outerWidth - targetWidth) / 2, 10),
            right = parseInt(screenY + (outerHeight - targetHeight) / 2.5, 10),
            features = [];
        if (targetWidth !== null) {
            features.push('width=' + targetWidth)
        }
        if (targetHeight !== null) {
            features.push('height=' + targetHeight)
        }
        features.push('left=' + left);
        features.push('top=' + right);
        features.push('scrollbars=1');
        var newWindow = window.open(url, title, features.join(','));
        if (window.focus) {
            newWindow.focus()
        }
        return newWindow
    };
    var isWebView = null;

    function checkWebView() {
        if (isWebView === null) {
            function _detectOS(ua) {
                if (/Android/.test(ua)) {
                    return "Android"
                } else if (/iPhone|iPad|iPod/.test(ua)) {
                    return "iOS"
                } else if (/Windows/.test(ua)) {
                    return "Windows"
                } else if (/Mac OS X/.test(ua)) {
                    return "Mac"
                } else if (/CrOS/.test(ua)) {
                    return "Chrome OS"
                } else if (/Firefox/.test(ua)) {
                    return "Firefox OS"
                }
                return ""
            }

            function _detectBrowser(ua) {
                var android = /Android/.test(ua);
                if (/CriOS/.test(ua)) {
                    return "Chrome for iOS"
                } else if (/Edge/.test(ua)) {
                    return "Edge"
                } else if (android && /Silk\//.test(ua)) {
                    return "Silk"
                } else if (/Chrome/.test(ua)) {
                    return "Chrome"
                } else if (/Firefox/.test(ua)) {
                    return "Firefox"
                } else if (android) {
                    return "AOSP"
                } else if (/MSIE|Trident/.test(ua)) {
                    return "IE"
                } else if (/Safari\//.test(ua)) {
                    return "Safari"
                } else if (/AppleWebKit/.test(ua)) {
                    return "WebKit"
                }
                return ""
            }

            function _detectBrowserVersion(ua, browser) {
                if (browser === "Chrome for iOS") {
                    return _getVersion(ua, "CriOS/")
                } else if (browser === "Edge") {
                    return _getVersion(ua, "Edge/")
                } else if (browser === "Chrome") {
                    return _getVersion(ua, "Chrome/")
                } else if (browser === "Firefox") {
                    return _getVersion(ua, "Firefox/")
                } else if (browser === "Silk") {
                    return _getVersion(ua, "Silk/")
                } else if (browser === "AOSP") {
                    return _getVersion(ua, "Version/")
                } else if (browser === "IE") {
                    return /IEMobile/.test(ua) ? _getVersion(ua, "IEMobile/") : /MSIE/.test(ua) ? _getVersion(ua, "MSIE ") : _getVersion(ua, "rv:")
                } else if (browser === "Safari") {
                    return _getVersion(ua, "Version/")
                } else if (browser === "WebKit") {
                    return _getVersion(ua, "WebKit/")
                }
                return "0.0.0"
            }

            function _getVersion(ua, token) {
                try {
                    return _normalizeSemverString(ua.split(token)[1].trim().split(/[^\w\.]/)[0])
                } catch (o_O) {}
                return "0.0.0"
            }

            function _normalizeSemverString(version) {
                var ary = version.split(/[\._]/);
                return (parseInt(ary[0], 10) || 0) + "." + (parseInt(ary[1], 10) || 0) + "." + (parseInt(ary[2], 10) || 0)
            }

            function _isWebView(ua, os, browser, version, options) {
                switch (os + browser) {
                    case "iOSSafari":
                        return !1;
                    case "iOSWebKit":
                        return _isWebView_iOS(options);
                    case "AndroidAOSP":
                        return !1;
                    case "AndroidChrome":
                        return parseFloat(version) >= 42 ? /;wv/.test(ua) : /\d{2}\.0\.0/.test(version) ? !0 : _isWebView_Android(options)
                }
                return !1
            }

            function _isWebView_iOS(options) {
                var document = (window.document || {});
                if ("WEB_VIEW" in options) {
                    return options.WEB_VIEW
                }
                return !("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || !1)
            }

            function _isWebView_Android(options) {
                if ("WEB_VIEW" in options) {
                    return options.WEB_VIEW
                }
                return !("requestFileSystem" in window || "webkitRequestFileSystem" in window || !1)
            }
            var options = {};
            var nav = window.navigator || {};
            var ua = nav.userAgent || "";
            var os = _detectOS(ua);
            var browser = _detectBrowser(ua);
            var browserVersion = _detectBrowserVersion(ua, browser);
            isWebView = _isWebView(ua, os, browser, browserVersion, options)
        }
        return isWebView
    }

    function isAllowedWebViewForUserAgent() {
        var nav = window.navigator || {};
        var ua = nav.userAgent || "";
        if (/Instagram/.test(ua)) {
            return !0
        } else if (/FBAV/.test(ua) || /FBAN/.test(ua)) {
            return !0
        }
        return !1
    }
    window._nsl.push(function($) {
        window.nslRedirect = function(url) {
            $('<div style="position:fixed;z-index:1000000;left:0;top:0;width:100%;height:100%;"></div>').appendTo('body');
            window.location = url
        };
        var targetWindow = _targetWindow || 'prefer-popup',
            lastPopup = !1;
        $(document.body).on('click', 'a[data-plugin="nsl"][data-action="connect"],a[data-plugin="nsl"][data-action="link"]', function(e) {
            if (lastPopup && !lastPopup.closed) {
                e.preventDefault();
                lastPopup.focus()
            } else {
                var $target = $(this),
                    href = $target.attr('href'),
                    success = !1;
                if (href.indexOf('?') !== -1) {
                    href += '&'
                } else {
                    href += '?'
                }
                var redirectTo = $target.data('redirect');
                if (redirectTo === 'current') {
                    href += 'redirect=' + encodeURIComponent(window.location.href) + '&'
                } else if (redirectTo && redirectTo !== '') {
                    href += 'redirect=' + encodeURIComponent(redirectTo) + '&'
                }
                if (targetWindow !== 'prefer-same-window' && checkWebView()) {
                    targetWindow = 'prefer-same-window'
                }
                if (targetWindow === 'prefer-popup') {
                    lastPopup = NSLPopup(href + 'display=popup', 'nsl-social-connect', $target.data('popupwidth'), $target.data('popupheight'));
                    if (lastPopup) {
                        success = !0;
                        e.preventDefault()
                    }
                } else if (targetWindow === 'prefer-new-tab') {
                    var newTab = window.open(href + 'display=popup', '_blank');
                    if (newTab) {
                        if (window.focus) {
                            newTab.focus()
                        }
                        success = !0;
                        e.preventDefault()
                    }
                }
                if (!success) {
                    window.location = href;
                    e.preventDefault()
                }
            }
        });
        var googleLoginButton = $('a[data-plugin="nsl"][data-provider="google"]');
        if (googleLoginButton.length && checkWebView() && !isAllowedWebViewForUserAgent()) {
            googleLoginButton.remove()
        }
    })
})();