const u = navigator.userAgent;
// Android终端
const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
// IOS 终端
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

if (!window.native) window.native = {};

const andoirFunction = (callback) => {
  if (window.native.WebViewJavascriptBridge) {
    callback(window.native.WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      "WebViewJavascriptBridgeReady",
      function () {
        callback(window.native.WebViewJavascriptBridge);
      },
      false
    );
  }
};
const iosFuntion = (callback) => {
  if (window.native.WebViewJavascriptBridge) {
    return callback(window.native.WebViewJavascriptBridge);
  }
  if (window.native.WVJBCallbacks) {
    return window.native.WVJBCallbacks.push(callback);
  }
  window.native.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement("iframe");
  WVJBIframe.style.display = "none";
  WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
};

window.native.setupWebViewJavascriptBridge = isAndroid
  ? andoirFunction
  : iosFuntion;

if (isAndroid) {
  /**
   * 与安卓交互时，不调用这个函数会导致：
   *      1、H5 可以正常调用 安卓这边的事件函数，但是无法再调用到 H5 的回调函数
   *
   * 前提 setupWebViewJavascriptBridge 这个函数使用的是 andoirFunction 这个，否则还是会导致上面 1 的现象出现
   */
  window.native.setupWebViewJavascriptBridge(function (bridge) {
    // 注册 H5 界面的默认接收函数（与安卓交互时，不注册这个事件无法接收回调函数）
    bridge.init(function (msg, responseCallback) {
      responseCallback("JS 返回给原生的消息内容");
    });
  });
}

/**
 * 调用app分享功能
 * @param {*} params 
 * @param {*} cb 
 */
window.native.handleShare = function (params, cb) {
  window.native.setupWebViewJavascriptBridge((bridge) => {
    bridge.callHandler("m_shareUrl", params, (data) => {
      cb && cb(data);
    });
  });
};

/**
 * 注册方向切换功能
 * @param {*} cb 
 */
window.native.handleSensorChange = function (cb) {
  window.native.setupWebViewJavascriptBridge((bridge) => {
    bridge.registerHandler("sensorChanged", (data) => {
      cb && cb(data);
    });
  });
};
