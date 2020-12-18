webpackJsonp([7],{

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pwa_action_sheet", function() { return PWAActionSheet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_f86805ad_js__ = __webpack_require__(361);

var PWAActionSheet = /** @class */ (function () {
    function PWAActionSheet(hostRef) {
        Object(__WEBPACK_IMPORTED_MODULE_0__core_f86805ad_js__["h" /* r */])(this, hostRef);
        this.cancelable = true;
        this.options = [];
        this.open = false;
        this.onSelection = Object(__WEBPACK_IMPORTED_MODULE_0__core_f86805ad_js__["d" /* c */])(this, "onSelection", 7);
    }
    PWAActionSheet.prototype.componentDidLoad = function () {
        var _this = this;
        requestAnimationFrame(function () {
            _this.open = true;
        });
    };
    PWAActionSheet.prototype.dismiss = function () {
        if (this.cancelable) {
            this.close();
        }
    };
    PWAActionSheet.prototype.close = function () {
        var _this = this;
        this.open = false;
        setTimeout(function () {
            _this.el.parentNode.removeChild(_this.el);
        }, 500);
    };
    PWAActionSheet.prototype.handleOptionClick = function (e, i) {
        e.stopPropagation();
        this.onSelection.emit(i);
        this.close();
    };
    PWAActionSheet.prototype.render = function () {
        var _this = this;
        return (Object(__WEBPACK_IMPORTED_MODULE_0__core_f86805ad_js__["g" /* h */])("div", { class: "wrapper" + (this.open ? ' open' : ''), onClick: function () { return _this.dismiss(); } }, Object(__WEBPACK_IMPORTED_MODULE_0__core_f86805ad_js__["g" /* h */])("div", { class: "content" }, Object(__WEBPACK_IMPORTED_MODULE_0__core_f86805ad_js__["g" /* h */])("div", { class: "title" }, this.header), this.options.map(function (option, i) { return Object(__WEBPACK_IMPORTED_MODULE_0__core_f86805ad_js__["g" /* h */])("div", { class: "action-sheet-option", onClick: function (e) { return _this.handleOptionClick(e, i); } }, Object(__WEBPACK_IMPORTED_MODULE_0__core_f86805ad_js__["g" /* h */])("div", { class: "action-sheet-button" }, option.title)); }))));
    };
    Object.defineProperty(PWAActionSheet.prototype, "el", {
        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_0__core_f86805ad_js__["f" /* g */])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PWAActionSheet, "style", {
        get: function () { return ":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,Roboto,sans-serif}.wrapper,:host{display:-ms-flexbox;display:flex}.wrapper{-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:transparent;-webkit-transition:background-color .4s cubic-bezier(.36,.66,.04,1);transition:background-color .4s cubic-bezier(.36,.66,.04,1)}.wrapper.open{background-color:rgba(0,0,0,.32)}.title{color:#999;height:23px;line-height:23px;padding-bottom:17px;-webkit-padding-end:16px;padding-inline-end:16px;-webkit-padding-start:16px;padding-inline-start:16px;padding-left:16px;padding-right:16px;padding-top:20px}.content{width:568px;-ms-flex-item-align:end;align-self:flex-end;background-color:#fff;-webkit-transition:-webkit-transform .4s cubic-bezier(.36,.66,.04,1);transition:-webkit-transform .4s cubic-bezier(.36,.66,.04,1);transition:transform .4s cubic-bezier(.36,.66,.04,1);transition:transform .4s cubic-bezier(.36,.66,.04,1),-webkit-transform .4s cubic-bezier(.36,.66,.04,1);-webkit-transform:translateY(100%);transform:translateY(100%)}.wrapper.open .content{-webkit-transform:translateY(0);transform:translateY(0)}\@media only screen and (max-width:568px){.content{width:100%}}.action-sheet-option{cursor:pointer;height:52px;line-height:52px}.action-sheet-button{color:#262626;font-size:16px;-webkit-padding-end:16px;padding-inline-end:16px;-webkit-padding-start:16px;padding-inline-start:16px;padding-left:16px;padding-right:16px;padding-top:0}.action-sheet-button:hover{background-color:#f6f6f6}"; },
        enumerable: true,
        configurable: true
    });
    return PWAActionSheet;
}());



/***/ })

});
//# sourceMappingURL=7.js.map