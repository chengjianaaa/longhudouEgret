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
var PasswordUI = (function (_super) {
    __extends(PasswordUI, _super);
    function PasswordUI() {
        var _this = _super.call(this) || this;
        /**加载皮肤 */
        _this.skinName = "resource/eui_skins/modal/Password.exml";
        return _this;
    }
    PasswordUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.visible = false;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.verifyPwd, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModel, this);
    };
    PasswordUI.prototype.verifyPwd = function () {
        var _this = this;
        var promise = this.verifyWalletPwd(this.label.text);
        promise.then(function () {
            _this.visible = false;
        }, function (err) {
            $Alert.visible = true;
            $Alert.label.text = "密码错误，请重新输入";
        });
    };
    PasswordUI.prototype.loadWallet = function (pwd) {
        return $Web3.eth.accounts.wallet.load(pwd);
    };
    PasswordUI.prototype.verifyWalletPwd = function (pwd) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var wallet = _this.loadWallet(pwd);
                resolve(wallet);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    PasswordUI.prototype.closeModel = function () {
        this.visible = false;
    };
    return PasswordUI;
}(eui.Component));
__reflect(PasswordUI.prototype, "PasswordUI");
