const url = require('url');

void function test() {
    const $ = document.querySelector.bind(document);
    const webview = $('#webview');
    const captureWebview = $('#captureWebview');
    // preload
    const preloadFile = 'file://' + require('path').resolve('./preload.js');
    webview.setAttribute('preload', preloadFile);

    // Forwards, backwords, refresh, and loadURL
    const forwards = $('#forwards');
    forwards.addEventListener('click', () => {
        if (webview.canGoForward()) {
            webview.goForward();
        }
    });
    const backwords = $('#backwords');
    backwords.addEventListener('click', () => {
        if (webview.canGoBack()) {
            webview.goBack();
        }
    });
    const refresh = $('#refresh');
    refresh.addEventListener('click', () => {
        webview.reload();
    });
    const search = $('#search');
    search.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = search.url.value;
        webview.loadURL(url);
    });

    let webContents;
    // webview.addEventListener('did-stop-loading', () => {
    //     injectJS()
    //     console.log('did-stop-loading')
    // });
    // webview.addEventListener('load-commit', () => {
    //     injectJS()
    //     console.log('load-commit');
    // });
    // webview.addEventListener('did-finish-load', () => {
    //     injectJS()
    //     console.log('did-finish-load');
    // });
    // webview.addEventListener('did-frame-finish-load', () => {
    //     injectJS()
    //     console.log('did-frame-finish-load');
    // });
    // webview.addEventListener('did-start-loading', () => {
    //     injectJS()
    //     console.log('did-start-loading');
    // });

    webview.addEventListener('dom-ready', e => {
        console.log('webiew dom-ready');
        injectJS();
        injectCSS();
        webview.executeJavaScript(`3 + 2`, false, result =>
            console.log('webview exec callback: ' + result)
        )
        // Uncaught TypeError: Cannot read property 'then' of undefined
        // .then(result => console.log('webview exec then: ' + result))

        // Inject JS

        // Get webContents
        if (!webContents) {
            webContents = webview.getWebContents();
            webContents.on('dom-ready', e => {
                console.log('webContents dom-ready');
            });

            // 通信/renderer环境 发
            webview.send('our-secrets', 'ping');

            // Inject JS
            webContents.executeJavaScript(`1 + 2`, false, result =>
                console.log('webContents exec callback: ' + result)
            ).then(result =>
                console.log('webContents exec then: ' + result)
            );

            // Scroll into view after in-page navigation
            webContents.on('did-navigate-in-page', (isMainFrame, pageUrl) => {
                const anchor = (url.parse(pageUrl).hash || '').slice(1);
                webContents.executeJavaScript(`
          void function() {
            var el;
            if ('${anchor}') {
							el = document.querySelector('#${anchor}');
            }
            if (el) {
							el.scrollIntoView();
							console.log('scrolled into view');
            }
            else {
              el = document.querySelector('.book-body');
              if (el) {
                el.scrollTop = 0;
              }
            }
          }();
        `);
            });

            // Eager style injection to solve the problem of style flicker
            // webContents.on('page-title-updated', () => {
            //   injectCSS();
            // });
        }

        // Enable Device Emulation
        webContents.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1');
        const size = {
            width: 320,
            height: 480
        };
        webContents.enableDeviceEmulation({
            screenPosition: 'mobile',
            screenSize: size,
            viewSize: size
        });

        // Open DevTools
        // webContents.openDevTools({
        // 	mode: 'detach'
        // });
    });
    // 通信/renderer环境 收
    webview.addEventListener('ipc-message', (event) => {
        //! 消息属性叫channel，有些奇怪，但就是这样
        console.log(event.channel)
    })
    // Intercept new window behavior
    webview.addEventListener('new-window', e => {
        event.preventDefault();
        webview.loadURL(e.url);
    });
    // Export console message
    webview.addEventListener('console-message', e => {
        console.log('webview: ' + e.message);
    });

    function injectCSS() {
        console.log('inject CSS');
        webview.insertCSS(`
          body, p {
            color: #ccc !important;
            background-color: #333 !important;
          }
    `);
    }

    function injectJS() {
        webview.executeJavaScript(`document.querySelector('div.myui-player__item.clearfix').innerHTML = ''`);
        console.log('inject JS');
        // webview.executeJavaScript(`console.log('open <' + document.title + '> at ${new Date().toLocaleString()}')`);

    }
}();
