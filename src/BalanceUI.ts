class BalanceUI extends eui.Component {
    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/diySkin/Balance.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.getBalance();
        setInterval(this.getBalance.bind(this), 10000);
    }

    public balancePool: eui.Label;
    public myBalance: eui.Label;

    private getBalance() {
        $ContractInstance.methods.getCurrentBalance().call().then((data) => {
            this.balancePool.text = Number($Web3.utils.fromWei(data, 'ether')).toFixed(2);
        });
        $Web3.eth.getBalance($MyAddress).then((balance) => {
            this.myBalance.text = Number($Web3.utils.fromWei(balance, 'ether')).toFixed(2);
        });
    }
}
