class HistorySkinUI extends eui.Component {

    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/diySkin/HistorySkin.exml";
    }
    public trend:eui.Image;
    public record:eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.trend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTrend, this);
        this.record.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRecord, this);
    }

    private showTrend() {
        $InfoPanal.getResultHistory();
        $InfoPanal.visible = true;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.tipsGroup.visible = false;
        $InfoPanal.recordGroup.visible = false;
        $InfoPanal.historyGroup.visible = true;
    }

    private showRecord() {
        $InfoPanal.getBetRecord();
        $InfoPanal.visible = true;
        $InfoPanal.recordGroup.visible = true;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.tipsGroup.visible = false;
        $InfoPanal.historyGroup.visible = false;
    }
}
