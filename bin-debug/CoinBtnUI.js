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
var CoinBtnUI = (function (_super) {
    __extends(CoinBtnUI, _super);
    function CoinBtnUI() {
        var _this = _super.call(this) || this;
        /**加载皮肤 */
        _this.skinName = "resource/eui_skins/CoinBtn.exml";
        return _this;
    }
    CoinBtnUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.getPrice();
    };
    CoinBtnUI.prototype.getPrice = function () {
        var _this = this;
        this.label1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCoin.bind(this, this.label1), this);
        this.label2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCoin.bind(this, this.label2), this);
        this.label3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCoin.bind(this, this.label3), this);
        this.label4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCoin.bind(this, this.label4), this);
        $ContractInstance.methods.getPrice().call().then(function (data) {
            _this.label1.text = data[0];
            _this.label2.text = data[1];
            _this.label3.text = data[2];
            _this.label4.text = data[3];
            _this.chooseCoin(_this.label1);
        });
    };
    /**
     * 选中下注币的函数
     */
    CoinBtnUI.prototype.chooseCoin = function (obj, e) {
        $BetCoinChoose = obj.text;
        switch (obj.name) {
            case "label1":
                this.coin1Xz.visible = true;
                this.coin2Xz.visible = false;
                this.coin3Xz.visible = false;
                this.coin4Xz.visible = false;
                break;
            case "label2":
                this.coin1Xz.visible = false;
                this.coin2Xz.visible = true;
                this.coin3Xz.visible = false;
                this.coin4Xz.visible = false;
                break;
            case "label3":
                this.coin1Xz.visible = false;
                this.coin2Xz.visible = false;
                this.coin3Xz.visible = true;
                this.coin4Xz.visible = false;
                break;
            case "label4":
                this.coin1Xz.visible = false;
                this.coin2Xz.visible = false;
                this.coin3Xz.visible = false;
                this.coin4Xz.visible = true;
                break;
        }
    };
    return CoinBtnUI;
}(eui.Component));
__reflect(CoinBtnUI.prototype, "CoinBtnUI");
