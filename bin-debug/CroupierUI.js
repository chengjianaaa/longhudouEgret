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
var CroupierUI = (function (_super) {
    __extends(CroupierUI, _super);
    function CroupierUI() {
        var _this = _super.call(this) || this;
        /**加载皮肤 */
        _this.skinName = "resource/eui_skins/diySkin/Croupier.exml";
        return _this;
    }
    CroupierUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.operation();
    };
    CroupierUI.prototype.operation = function () {
    };
    return CroupierUI;
}(eui.Component));
__reflect(CroupierUI.prototype, "CroupierUI");
