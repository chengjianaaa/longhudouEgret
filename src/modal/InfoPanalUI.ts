class InfoPanalUI extends eui.Component {
    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/modal/InfoPanal.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.operation();
    }

    public bgBack:eui.Rect;
    public historyGroup:eui.Group;
    public totalLongBet:eui.Label;
    public totalHeBet:eui.Label;
    public totalHuBet:eui.Label;
    public hisScroller:eui.Scroller;
    public hisScrollerG:eui.Group;
    public settleGroup:eui.Group;
    public longWin:eui.Image;
    public huWin:eui.Image;
    public he:eui.Image;
    public winCoin:eui.Label;
    public longCoin:eui.Label;
    public huCoin:eui.Label;
    public heCoin:eui.Label;
    public longPoker:eui.Image;
    public huPoker:eui.Image;
    public tipsGroup:eui.Group;
    public ruleLabel:eui.Label;
    public recordGroup:eui.Group;
    public betCoin:eui.Label;
    public resCoin:eui.Label;
    public recordS:eui.Scroller;
    public recordG:eui.Group;
    public close:eui.Image;


    private operation() {
        this.visible = false;
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.visible = false;
        }, this);
        this.ruleLabel.text = "规则\n" +
            "1、智能合约只派两门牌：龙、虎。每门各派一只牌。\n" +
            "2、牌面点数由A到K，A为最小，K为最大，不区分花色，点数大者获胜，牌面点数大小顺序: K、Q、J、10、9、8、7、6、5、4、3、2、A，点数相同则为和。\n" +
            "3、玩家可投注龙、虎、和三门，如买中龙或虎，则1赔1，两门牌相同即为和，买和的赔率为1赔8。\n" +
            "赔率\n" +
            "1、下注龙, 1赔1。\n" +
            "2、下注虎, 1赔1。\n" +
            "3、下注和, 1赔8。";
    }

    /**
     * 生成近50场的结果
     */
    private getResultHistory() {
        $ContractInstance.methods.getResultHistory().call().then((data) => {
            let x = 0, y = 0;
            let long = 0;
            let hu = 0;
            let he = 0;
            for (let i: number = 1; i <= data.length; i++) {
                let src = "resource/assets/longhudou/level1modal/";
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
                let image = new eui.Image();
                image.source = src;
                image.x = x + 52;
                image.y = y + 52;
                image.anchorOffsetX = 52;
                image.anchorOffsetY = 52;
                image.skewY = 180;
                this.hisScrollerG.addChild(image);
                y += 140;
                if (i % 8 == 0) {
                    x += 130;
                    y = 0;
                }
            }
            this.totalLongBet.text = String(long);
            this.totalHuBet.text = String(hu);
            this.totalHeBet.text = String(he);
        });
    }

    /**
     * 下注记录
     */
    private getBetRecord() {
        for (let i = 0; i < $BetRecord.length; i++) {
            this.getImg($BetRecord[i].betChoose, i, 130);
            this.getLabel($BetRecord[i].betCoins, i, 430);
            this.getLabel($BetRecord[i].winCoin, i, 700);
            this.getImg($BetRecord[i].result, i, 940);
        }
    }

    /**
     * 得到图片地址
     */
    private getImgUrl(choose) {
        let src = "resource/assets/longhudou/level1modal/";
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
                src = ''
        }
        return src;
    }

    /**
     * 得到图片
     * @param choose
     * @param i
     */
    private getImg(choose, i, offset) {
        if(this.getImgUrl(choose) == ""){
            return
        }
        let image = new eui.Image();
        image.source = this.getImgUrl(choose);
        image.anchorOffsetX = 52;
        image.anchorOffsetY = 52;
        image.skewY = 180;
        image.x = 150 + i * 120;
        image.y = offset;
        this.recordG.addChild(image);
    }

    private getLabel(choose, i, offset) {
        let label = new eui.Label();
        label.text = choose;
        label.width = 130;
        label.height = 30;
        label.anchorOffsetX = 65;
        label.anchorOffsetY = 15;
        label.skewY = 180;
        label.rotation = -90;
        label.textColor = '#8d7257';
        this.recordG.addChild(label);
        label.x = 150 + i * 120;
        label.y = offset;
    }
}
