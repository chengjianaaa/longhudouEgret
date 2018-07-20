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
var HistorySkinUI = (function (_super) {
    __extends(HistorySkinUI, _super);
    function HistorySkinUI() {
        var _this = _super.call(this) || this;
        /**加载皮肤 */
        _this.skinName = "resource/eui_skins/diySkin/HistorySkin.exml";
        return _this;
    }
    HistorySkinUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.trend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTrend, this);
        this.record.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRecord, this);
    };
    HistorySkinUI.prototype.showTrend = function () {
        $InfoPanal.getResultHistory();
        $InfoPanal.visible = true;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.tipsGroup.visible = false;
        $InfoPanal.recordGroup.visible = false;
        $InfoPanal.gameInfo.visible = false;
        $InfoPanal.sourceCodeG.visible = false;
        $InfoPanal.historyGroup.visible = true;
    };
    HistorySkinUI.prototype.showRecord = function () {
        $InfoPanal.getBetRecord();
        $InfoPanal.visible = true;
        $InfoPanal.recordGroup.visible = true;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.tipsGroup.visible = false;
        $InfoPanal.historyGroup.visible = false;
        $InfoPanal.gameInfo.visible = false;
        $InfoPanal.sourceCodeG.visible = false;
    };
    return HistorySkinUI;
}(eui.Component));
__reflect(HistorySkinUI.prototype, "HistorySkinUI");
