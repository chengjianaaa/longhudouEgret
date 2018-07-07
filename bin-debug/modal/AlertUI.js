var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var AlertUI = (function (_super) {
    __extends(AlertUI, _super);
    function AlertUI() {
        var _this = _super.call(this) || this;
        /**加载皮肤 */
        _this.skinName = "resource/eui_skins/modal/AlertSkin.exml";
        return _this;
    }
    AlertUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.operation();
    };
    // 你还未登陆钱包，请先登陆！
    // 你的资金不足，请前往钱包充值！
    // 网络连接错误，请检查网络重新下注！
    AlertUI.prototype.operation = function () {
        var _this = this;
        this.visible = false;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.visible = false;
            _this.label.text = "错误！";
        }, this);
    };
    return AlertUI;
}(eui.Component));
__reflect(AlertUI.prototype, "AlertUI");
