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
var CoinNumUI = (function (_super) {
    __extends(CoinNumUI, _super);
    function CoinNumUI() {
        var _this = _super.call(this) || this;
        /**加载皮肤 */
        _this.skinName = "resource/eui_skins/CoinNumber.exml";
        return _this;
    }
    CoinNumUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.operation();
    };
    CoinNumUI.prototype.operation = function () {
    };
    return CoinNumUI;
}(eui.Component));
__reflect(CoinNumUI.prototype, "CoinNumUI");
