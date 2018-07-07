class AlertUI extends eui.Component {

    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/modal/AlertSkin.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.operation();
    }

    public btn: eui.Image;
    public label: eui.Label;
    // 你还未登陆钱包，请先登陆！
    // 你的资金不足，请前往钱包充值！
    // 网络连接错误，请检查网络重新下注！
    private operation() {
        this.visible = false;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.visible = false;
            this.label.text = "错误！";
        }, this);
    }
}
