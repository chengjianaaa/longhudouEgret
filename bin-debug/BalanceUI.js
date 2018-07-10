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
var BalanceUI = (function (_super) {
    __extends(BalanceUI, _super);
    function BalanceUI() {
        var _this = _super.call(this) || this;
        /**加载皮肤 */
        _this.skinName = "resource/eui_skins/diySkin/Balance.exml";
        return _this;
    }
    BalanceUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.getBalance();
        setInterval(this.getBalance.bind(this), 10000);
    };
    BalanceUI.prototype.getBalance = function () {
        var _this = this;
        $ContractInstance.methods.getCurrentBalance().call().then(function (data) {
            _this.balancePool.text = Number($Web3.utils.fromWei(data, 'ether')).toFixed(2);
        });
        $Web3.eth.getBalance($MyAddress).then(function (balance) {
            _this.myBalance.text = Number($Web3.utils.fromWei(balance, 'ether')).toFixed(2);
        });
    };
    return BalanceUI;
}(eui.Component));
__reflect(BalanceUI.prototype, "BalanceUI");
