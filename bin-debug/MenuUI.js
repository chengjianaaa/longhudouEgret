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
        this.info.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGameInfo, this);
        this.code.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSourceCode, this);
    };
    MenuUI.prototype.showTips = function () {
        $InfoPanal.visible = true;
        $InfoPanal.tipsGroup.visible = true;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.recordGroup.visible = false;
        $InfoPanal.historyGroup.visible = false;
        $InfoPanal.gameInfo.visible = false;
        $InfoPanal.sourceCodeG.visible = false;
    };
    MenuUI.prototype.showGameInfo = function () {
        $InfoPanal.visible = true;
        $InfoPanal.tipsGroup.visible = false;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.recordGroup.visible = false;
        $InfoPanal.historyGroup.visible = false;
        $InfoPanal.gameInfo.visible = true;
        $InfoPanal.sourceCodeG.visible = false;
        $InfoPanal.gameAddr.text = $ContractAddress;
        $ContractInstance.methods.getCurrentBalance().call().then(function (data) {
            $InfoPanal.balance.text = $Web3.utils.fromWei(data, 'ether');
        });
        $ContractInstance.methods.getPublicData().call().then(function (data) {
            $InfoPanal.gameName.text = data[0];
            $InfoPanal.creator.text = data[2];
            $InfoPanal.createTime.text = data[3];
            $InfoPanal.historyCoin.text = $Web3.utils.fromWei(data[4], 'ether');
        });
    };
    MenuUI.prototype.showSourceCode = function () {
        $InfoPanal.visible = true;
        $InfoPanal.tipsGroup.visible = false;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.recordGroup.visible = false;
        $InfoPanal.historyGroup.visible = false;
        $InfoPanal.gameInfo.visible = false;
        $InfoPanal.sourceCodeG.visible = true;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open($getContract, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify({
            "addr": $ContractAddress,
            "pageSize": 200,
            "pageNum": 1,
        }));
        request.addEventListener(egret.Event.COMPLETE, function (event) {
            var request = event.currentTarget;
            var data = JSON.parse(request.response);
            if (data.result) {
                if (data.result.length > 0 && data.result[0].txHash) {
                    $Web3.eth.getTransaction(data.result[0].txHash).then(function (data) {
                        $InfoPanal.sourceCode.text = $Web3.utils.hexToUtf8(data.datasourcecode);
                    });
                }
                else {
                    $InfoPanal.sourceCode.text = "未查询到相关信息";
                }
            }
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (err) {
            console.log("error:" + String(err));
        }, this);
    };
    return MenuUI;
}(eui.Component));
__reflect(MenuUI.prototype, "MenuUI");
