class CroupierUI extends eui.Component {

    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/Croupier.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.operation();
    }

    private operation() {
    }
}
