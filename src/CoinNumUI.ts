class CoinNumUI extends eui.Component {
    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/CoinNumber.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.operation();
    }

    public balancePool: eui.Label;
    public myBalance: eui.Label;

    private operation() {
    }
}
