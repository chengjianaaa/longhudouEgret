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
var MenuUI = (function (_super) {
    __extends(MenuUI, _super);
    function MenuUI() {
        var _this = _super.call(this) || this;
        /**加载皮肤 */
        _this.skinName = "resource/eui_skins/diySkin/Menu.exml";
        return _this;
    }
    MenuUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
    };
    MenuUI.prototype.showTips = function () {
        $InfoPanal.visible = true;
        $InfoPanal.tipsGroup.visible = true;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.recordGroup.visible = false;
        $InfoPanal.historyGroup.visible = false;
    };
    return MenuUI;
}(eui.Component));
__reflect(MenuUI.prototype, "MenuUI");
