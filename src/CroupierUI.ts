class CroupierUI extends eui.Component {

    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/diySkin/Croupier.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.operation();
    }

    private operation() {
    }
}
