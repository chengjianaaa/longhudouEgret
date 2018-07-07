class CoinBtnUI extends eui.Component {

    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/CoinBtn.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.getPrice();
    }

    public coin1: eui.Image;
    public coin2: eui.Image;
    public coin3: eui.Image;
    public coin4: eui.Image;
    public label1: eui.Label;
    public label2: eui.Label;
    public label3: eui.Label;
    public label4: eui.Label;
    public coin1Xz: eui.Image;
    public coin2Xz: eui.Image;
    public coin3Xz: eui.Image;
    public coin4Xz: eui.Image;

    private getPrice(): void {
        this.label1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCoin.bind(this, this.label1), this);
        this.label2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCoin.bind(this, this.label2), this);
        this.label3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCoin.bind(this, this.label3), this);
        this.label4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseCoin.bind(this, this.label4), this);
        $ContractInstance.methods.getPrice().call().then((data) => {
            this.label1.text = data[0];
            this.label2.text = data[1];
            this.label3.text = data[2];
            this.label4.text = data[3];
            this.chooseCoin(this.label1);
        });
    }

    /**
     * 选中下注币的函数
     */
    private chooseCoin(obj, e: egret.TouchEvent): void {
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
    }
}
