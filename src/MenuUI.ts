class MenuUI extends eui.Component {

    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/Menu.exml";
    }

    public home: eui.Image;
    public wallet: eui.Image;
    public help: eui.Image;
    public share: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
    }

    private showTips() {
        $InfoPanal.visible = true;
        $InfoPanal.tipsGroup.visible = true;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.recordGroup.visible = false;
        $InfoPanal.historyGroup.visible = false;
    }
}
