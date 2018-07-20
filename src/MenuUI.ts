class MenuUI extends eui.Component {

    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/diySkin/Menu.exml";
    }

    public home: eui.Image;
    public info: eui.Image;
    public help: eui.Image;
    public code: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
        this.info.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGameInfo, this);
        this.code.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSourceCode, this);
    }

    private showTips() {
        $InfoPanal.visible = true;
        $InfoPanal.tipsGroup.visible = true;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.recordGroup.visible = false;
        $InfoPanal.historyGroup.visible = false;
        $InfoPanal.gameInfo.visible = false;
        $InfoPanal.sourceCodeG.visible = false;
    }

    private showGameInfo() {
        $InfoPanal.visible = true;
        $InfoPanal.tipsGroup.visible = false;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.recordGroup.visible = false;
        $InfoPanal.historyGroup.visible = false;
        $InfoPanal.gameInfo.visible = true;
        $InfoPanal.sourceCodeG.visible = false;

        $InfoPanal.gameAddr.text = $ContractAddress;
        $ContractInstance.methods.getCurrentBalance().call().then((data) => {
            $InfoPanal.balance.text = $Web3.utils.fromWei(data, 'ether');
        });
        $ContractInstance.methods.getPublicData().call().then((data) => {
            $InfoPanal.gameName.text = data[0];
            $InfoPanal.creator.text = data[2];
            $InfoPanal.createTime.text = data[3];
            $InfoPanal.historyCoin.text = $Web3.utils.fromWei(data[4], 'ether');
        });
    }

    private showSourceCode() {
        $InfoPanal.visible = true;
        $InfoPanal.tipsGroup.visible = false;
        $InfoPanal.settleGroup.visible = false;
        $InfoPanal.recordGroup.visible = false;
        $InfoPanal.historyGroup.visible = false;
        $InfoPanal.gameInfo.visible = false;
        $InfoPanal.sourceCodeG.visible = true;

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open($getContract, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify({
            "addr": $ContractAddress,
            "pageSize": 200,
            "pageNum": 1,
        }));
        request.addEventListener(egret.Event.COMPLETE, (event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            let data = JSON.parse(request.response);
            if (data.result) {
                if (data.result.length > 0 && data.result[0].txHash) {
                    $Web3.eth.getTransaction(data.result[0].txHash).then((data) => {
                        $InfoPanal.sourceCode.text = $Web3.utils.hexToUtf8(data.datasourcecode)
                    })
                } else {
                    $InfoPanal.sourceCode.text = "未查询到相关信息";
                }
            }
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, (err) => {
            console.log("error:" + String(err));
        }, this);
    }
}
