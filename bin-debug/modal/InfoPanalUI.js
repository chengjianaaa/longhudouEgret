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
var InfoPanalUI = (function (_super) {
    __extends(InfoPanalUI, _super);
    function InfoPanalUI() {
        var _this = _super.call(this) || this;
        /**加载皮肤 */
        _this.skinName = "resource/eui_skins/modal/InfoPanal.exml";
        return _this;
    }
    InfoPanalUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.operation();
    };
    InfoPanalUI.prototype.operation = function () {
        var _this = this;
        this.visible = false;
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.visible = false;
        }, this);
        this.ruleLabel.text = "规则\n" +
            "1、智能合约只派两门牌：龙、虎。每门各派一只牌。\n" +
            "2、牌面点数由A到K，A为最小，K为最大，不区分花色，点数大者获胜，牌面点数大小顺序: K、Q、J、10、9、8、7、6、5、4、3、2、A，点数相同则为和。\n" +
            "3、玩家可投注龙、虎、和三门，如买中龙或虎，则1赔1，两门牌相同即为和，买和的赔率为1赔8。\n" +
            "赔率\n" +
            "1、下注龙, 1赔1。\n" +
            "2、下注虎, 1赔1。\n" +
            "3、下注和, 1赔8。";
    };
    /**
     * 生成近50场的结果
     */
    InfoPanalUI.prototype.getResultHistory = function () {
        var _this = this;
        $ContractInstance.methods.getResultHistory().call().then(function (data) {
            var x = 0, y = 0;
            var long = 0;
            var hu = 0;
            var he = 0;
            for (var i = 1; i <= data.length; i++) {
                var src = "resource/assets/longhudou/level1modal/";
                switch (data[i - 1]) {
                    case "0":
                        src += "cp_loong.png";
                        long++;
                        break;
                    case "1":
                        src += "cp_tiger.png";
                        hu++;
                        break;
                    case "2":
                        src += "cp_he.png";
                        he++;
                        break;
                    default:
                }
                var image = new eui.Image();
                image.source = src;
                image.x = x + 52;
                image.y = y + 52;
                image.anchorOffsetX = 52;
                image.anchorOffsetY = 52;
                _this.hisScrollerG.addChild(image);
                x += 145;
                if (i % 8 == 0) {
                    y += 130;
                    x = 0;
                }
            }
            _this.totalLongBet.text = String(long);
            _this.totalHuBet.text = String(hu);
            _this.totalHeBet.text = String(he);
        });
    };
    /**
     * 下注记录
     */
    InfoPanalUI.prototype.getBetRecord = function () {
        for (var i = 0; i < $BetRecord.length; i++) {
            this.getImg($BetRecord[i].betChoose, i, 140);
            this.getLabel($BetRecord[i].betCoins, i, 430);
            this.getLabel($BetRecord[i].winCoin, i, 720);
            this.getImg($BetRecord[i].result, i, 970);
        }
        this.betCoin.text = egret.localStorage.getItem("chipCoinsAll");
        this.resCoin.text = egret.localStorage.getItem("balanceCoisaAll");
    };
    /**
     * 得到图片地址
     */
    InfoPanalUI.prototype.getImgUrl = function (choose) {
        var src = "resource/assets/longhudou/level1modal/";
        switch (choose) {
            case "0":
                src += "cp_loong.png";
                break;
            case "1":
                src += "cp_tiger.png";
                break;
            case "2":
                src += "cp_he.png";
                break;
            default:
                src = '';
        }
        return src;
    };
    /**
     * 得到图片
     * @param choose
     * @param i
     */
    InfoPanalUI.prototype.getImg = function (choose, i, offset) {
        if (this.getImgUrl(choose) == "") {
            return;
        }
        var image = new eui.Image();
        image.source = this.getImgUrl(choose);
        image.anchorOffsetX = 52;
        image.anchorOffsetY = 52;
        image.x = offset;
        image.y = 150 + i * 120;
        this.recordG.addChild(image);
    };
    InfoPanalUI.prototype.getLabel = function (choose, i, offset) {
        var label = new eui.Label();
        label.text = choose;
        label.width = 130;
        label.height = 30;
        label.anchorOffsetX = 65;
        label.anchorOffsetY = 15;
        label.textColor = '#8d7257';
        this.recordG.addChild(label);
        label.x = offset;
        label.y = 150 + i * 120;
    };
    return InfoPanalUI;
}(eui.Component));
__reflect(InfoPanalUI.prototype, "InfoPanalUI");
