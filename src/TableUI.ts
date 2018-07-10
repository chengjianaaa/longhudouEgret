import tr = egret.sys.tr;

class TableUI extends eui.Component {

    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/diySkin/BetTable.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.operation();
    }

    public table: eui.Image;
    public ratioHe1: eui.Label;
    public ratioLong: eui.Label;
    public ratioHu: eui.Label;
    public betCoin: eui.Label;
    public alarmGroup: eui.Group;
    public time: eui.Label;
    public readyTimeLabel: eui.Label;
    public timeNotice: eui.Label;
    public notice1Group: eui.Group;// 龙点击下注
    public notice1: eui.Image;
    public longRes: eui.Image;// 龙牌
    public notice2Group: eui.Group;// 和点击下注
    public notice2: eui.Image;
    public notice3Group: eui.Group;// 虎点击下注
    public notice3: eui.Image;
    public huRes: eui.Image;  // 虎牌

    private timer: Object; // 定时器
    private serverTime: any; // 服务器时间
    private settleTime: String; // 上次结算时间
    private readyTime: any = 0; // 准备时间

    private myBet: any[] = [0, 0, 0]; // 本局投注金额 龙 和 虎
    private currentChoose: String = ""; // 当前次下注的选中
    private betTips: egret.tween.TweenGroup;

    /**
     * 操作入口函数
     */
    private operation(): void {
        this.notice1Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.betFun.bind(this, this.notice1Group), this);
        this.notice2Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.betFun.bind(this, this.notice2Group), this);
        this.notice3Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.betFun.bind(this, this.notice3Group), this);
        $ContractInstance.methods.getBlockTime().call().then((arr) => {
            this.settleTime = arr[0];
        });
        this.getTime();
        this.watchBet();
        this.betTips.play();
        // this.timer = setInterval(this.timerBegin.bind(this), 1000);
    }

    /**
     * 解锁
     * @returns {Promise<any>}
     */
    private unlockAccount() {
        return new Promise((resolve, reject) => {
            $Web3.eth.personal.unlockAccount($MyAddress, this.getActiveAccountPwd(), (error, res) => {
                if (error) {
                    // 没有keystore
                    if (error.message.indexOf('file') !== -1) {
                        this.uploadKeyStore().then((flag) => {
                            if (flag) {
                                $Web3.eth.personal.unlockAccount($MyAddress, this.getActiveAccountPwd(), (error, res) => {
                                    resolve(res);
                                    reject(error);
                                })
                            }
                        })
                    } else {
                        // 密码错误
                        reject(error.message)
                    }
                    reject(error)
                }
                if (res) {
                    resolve(res)
                }
            })
        })
    }

    /**
     * 下注函数
     * $BetCoinChoose 下注金额
     * obj.name 下注对象
     */
    private betFun(obj, e) {
        let balancePool = Number($balance.balancePool.text);
        let myBalance = Number($balance.myBalance.text);
        if (this.serverTime < 5) {
            $Alert.label.text = "下注失败！剩余时间小于5s不能下注！";
            $Alert.visible = true;
            return
        }
        if (myBalance < 1) {
            $Alert.label.text = "余额不足，不能下注！";
            $Alert.visible = true;
            return
        }
        if ($BetCoinChoose == "0") {
            $Alert.label.text = "请先选择下注金额！";
            $Alert.visible = true;
            return
        }
        let choose = -1;
        switch (obj.name) {
            case "betLong":
                choose = 0;
                this.myBet[0] = $BetCoinChoose;
                break;
            case "betHu":
                choose = 1;
                this.myBet[2] = $BetCoinChoose;
                break;
            case "betHe":
                choose = 2;
                this.myBet[1] = $BetCoinChoose;
                break;
        }
        this.currentChoose = choose + "";
        let weiCoin = $Web3.utils.toWei($BetCoinChoose, 'ether');
        $loading.visible = true;
        $loading.label.text = "正在下注···";
        this.betAnimation();
        this.unlockAccount().then((bool) => {
            if (bool) {
                $ContractInstance.methods.sendBetInfo($MyAddress, choose, Math.floor(Math.random() * (10 ** 12)), weiCoin)
                    .send({
                        from: $MyAddress,
                        value: weiCoin,
                        gas: 1000000,
                        txType: 0,
                    })
                    .on('error', (err) => {
                        $loading.visible = false;
                        $Alert.label.text = String(err);
                        $Alert.visible = true;
                    })
                    .on('receipt', (receipt) => {
                        try {
                            let request = new egret.HttpRequest();
                            request.responseType = egret.HttpResponseType.TEXT;
                            request.open($uploadTxUrl, egret.HttpMethod.POST);
                            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            request.send(JSON.stringify({
                                "type": "1",
                                "sendAddr": receipt.from,
                                "revAddr": receipt.to,
                                "txHash": receipt.transactionHash,
                                "blockNum": receipt.blockNumber,
                                "amount": $BetCoinChoose
                            }));
                            request.addEventListener(egret.Event.COMPLETE, (event) => {
                                let request = <egret.HttpRequest>event.currentTarget;
                            }, this);
                            request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
                                $Alert.visible = true;
                                $Alert.label.text = '上传交易记录失败！';
                                $loading.visible = false;
                            }, this);
                        } catch (error) {
                            $loading.visible = false;
                            $Alert.visible = true;
                            $Alert.label.text = String(error);
                        }
                    })
            } else {
                $loading.visible = false;
                $Alert.visible = true;
                $Alert.label.text = "下注失败，keystore not found";
            }
        });
    }

    /**
     * 监听是否下注失败
     */
    private watchBet(): void {
        $ContractInstance.events
            .returnBetResult()
            .on('data', (event) => {
                if (event.returnValues) {
                    if (event.returnValues._addr == $MyAddress) {
                        $loading.visible = false;
                        if (event.returnValues._bool) {
                            $Alert.visible = true;
                            $Alert.label.text = '下注成功！请等待出牌结果！';
                            $BetRecord.push({
                                betChoose: this.currentChoose,
                                betCoins: $BetCoinChoose + ' FOF',
                                winCoin: '',
                                result: ''
                            })
                        } else {
                            $Alert.visible = true;
                            $Alert.label.text = '下注失败！本局已封盘（奖池金额不够）';
                        }
                    }
                }
            })
            .on('error', (err) => {
                if (err) {
                    if (event.returnValues._addr == $MyAddress) {
                        $loading.visible = false;
                        $Alert.visible = true;
                        $Alert.label.text = '下注失败！';
                    }
                }
            })
    }

    /**
     * 获取服务器time
     */
    private getTime(): void {
        try {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open($getTimerTimeUrl, egret.HttpMethod.GET);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        } catch (e) {
            $loading.visible = false;
            setTimeout(() => {
                $Alert.visible = true;
                $Alert.label.text = "节点异常，请联系管理员！";
                clearInterval(this.timer);
            }, 300)
        }
    }

    /**
     * 成功
     */
    private onGetComplete(event: egret.Event): void {
        let request = <egret.HttpRequest>event.currentTarget;
        let time = Number(request.response);
        this.serverTime = time < 0 ? 0 : time;
        this.time.text = this.serverTime + "S";
    }

    /**
     * 失败
     */
    private onGetIOError(event: egret.IOErrorEvent): void {
        $loading.visible = false;
        setTimeout(() => {
            $Alert.visible = true;
            $Alert.label.text = "网络连接错误，请检查网络！";
            clearInterval(this.timer);
        }, 300)
    }

    /**
     * 定时器函数
     */
    private timerBegin(): void {
        //倒计时
        if (this.serverTime <= 5) {
            this.settlement()
        }
        if (this.serverTime > 1) {
            this.serverTime--;
            this.longRes.source = "resource/assets/longhudou/poker/poker_back.png";
            this.huRes.source = "resource/assets/longhudou/poker/poker_back.png";
            this.time.text = this.serverTime + "S";
            if (this.serverTime % 5 == 0) {
                this.getTime();
            }
        }
        if (this.readyTime > 0) {
            this.readyTime--;
            this.readyTimeLabel.text = this.readyTime + "S";
            if (this.readyTime == 0) {
                this.readyTimeLabel.visible = false;
                this.time.visible = true;
                this.timeNotice.text = "下注时间";
                this.getTime();
                this.betTips.play();
            }
        }
    }

    /**
     * 开始结算的函数
     */
    private settlement(): void {
        if (this.serverTime == 1) {
            this.serverTime = 0;
            this.time.text = this.serverTime + "S";
            $loading.visible = true;
            $loading.label.text = "正在结算···";
            this.timeNotice.text = "结算时间";
            $InfoPanal.visible = false;
            $Alert.visible = false;
        }
        $ContractInstance.methods.getBlockTime().call().then((arr) => {
            let nowTime = arr[0].toString(10);
            if (this.settleTime != nowTime) { // 说明结算了
                this.settleTime = nowTime;

                let originalD = Number(arr[4][0].toString(10));
                let originalT = Number(arr[4][1].toString(10));
                /**
                 * 防止出现同花色同数字的情况
                 * @type {number}
                 */
                if (originalD == originalT) {
                    originalT += 13
                }

                let dragonNum = originalD % 13 + 1;
                let tigerNum = originalT % 13 + 1;
                $loading.visible = false;
                $InfoPanal.tipsGroup.visible = false;
                $InfoPanal.recordGroup.visible = false;
                $InfoPanal.historyGroup.visible = false;
                $Alert.visible = false;

                $InfoPanal.longWin.visible = dragonNum > tigerNum;
                $InfoPanal.huWin.visible = dragonNum < tigerNum;
                $InfoPanal.he.visible = dragonNum == tigerNum;

                $InfoPanal.longCoin.text = this.myBet[0] + " FOF";
                $InfoPanal.huCoin.text = this.myBet[2] + " FOF";
                $InfoPanal.heCoin.text = this.myBet[1] + " FOF";

                let figure = "";
                if (originalD < 13) {
                    figure = "fangkuai"
                } else if (originalD < 26) {
                    figure = "heitao"
                } else if (originalD < 39) {
                    figure = "hongtao"
                } else {
                    figure = "meihua"
                }

                $InfoPanal.longPoker.source = "resource/assets/longhudou/poker/" + dragonNum + '_' + figure + '.png';
                $InfoPanal.huPoker.source = "resource/assets/longhudou/poker/" + tigerNum + '_' + figure + '.png';

                egret.Tween.get(this.longRes)
                    .to({scaleX: -1}, 0)
                    .to({scaleX: 0}, 500).call(() => {
                    this.longRes.source = "resource/assets/longhudou/poker/" + dragonNum + '_' + figure + '.png';
                })
                    .to({scaleX: 1}, 500);
                egret.Tween.get(this.huRes)
                    .to({scaleX: -1}, 0)
                    .to({scaleX: 0}, 500).call(() => {
                    this.huRes.source = "resource/assets/longhudou/poker/" + tigerNum + '_' + figure + '.png';
                })
                    .to({scaleX: 1}, 500);

                this.myBet = this.myBet.map((i) => {
                    return Number(i);
                });
                let profits = 0;
                if (dragonNum > tigerNum) {
                    profits = this.myBet[0] * (-1) + this.myBet[1] + this.myBet[2]
                } else if (dragonNum < tigerNum) {
                    profits = this.myBet[0] + this.myBet[1] + this.myBet[2] * (-1)
                } else {
                    profits = this.myBet[0] + this.myBet[1] * (-8) + this.myBet[2]
                }
                $InfoPanal.winCoin.text = profits * (-1) + " FOF";

                $BetRecord.forEach((item) => {
                    item.result = dragonNum > tigerNum ? "0" : dragonNum == tigerNum ? "2" : "1";
                    item.winCoin = (item.result == item.betChoose ? "+" : "-") + item.betCoins;
                });

                this.readyTime = 0;
                this.readyTimeLabel.visible = true;
                this.time.visible = false;

                setTimeout(() => {
                    $InfoPanal.visible = false;
                    $InfoPanal.visible = true;
                    $InfoPanal.settleGroup.visible = true;
                }, 3000);
                this.myBet = [0, 0, 0];
                setTimeout(() => {
                    $InfoPanal.visible = false;

                    egret.Tween.get(this.longRes)
                        .to({scaleX: 1}, 0)
                        .to({scaleX: 0}, 500).call(() => {
                        this.longRes.source = "resource/assets/longhudou/poker/poker_back.png";
                    })
                        .to({scaleX: -1}, 500);
                    egret.Tween.get(this.huRes)
                        .to({scaleX: 1}, 0)
                        .to({scaleX: 0}, 500).call(() => {
                        this.huRes.source = "resource/assets/longhudou/poker/poker_back.png";
                    })
                        .to({scaleX: -1}, 500);

                    this.readyTime = 11;
                    this.readyTimeLabel.visible = true;
                    this.time.visible = false;
                    this.timeNotice.text = "准备时间";
                }, 6000);
            }
        })
    }

    /**
     * 截取当前活动账户的私钥最后9位为密码
     */
    private getActiveAccountPwd() {
        // 获取钱包的私钥 todo
        return $privateKey.substring($privateKey.length - 9)
    }

    /**
     * 得到KeyStore文件的字符串
     */
    private getKeyStore() {
        return $Web3.eth.accounts.encrypt($privateKey, this.getActiveAccountPwd())
    }

    /**
     * 上传KeyStore
     */
    private uploadKeyStore() {
        return new Promise((resolve, reject) => {
            let json = this.getKeyStore();
            let ts = new Date();
            let name = ['UTC--', ts.toJSON().replace(/:/g, '-'), '--', $MyAddress.toString('hex')].join('');
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open($uploadKeyStoreUrl, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/json");
            let params = [name, JSON.stringify(json)];
            request.send(JSON.stringify({
                "jsonrpc": "2.0",
                "method": "eth_uploadkeyfile",
                "params": params,
                "id": 1
            }));
            request.addEventListener(egret.Event.COMPLETE, (event) => {
                let request = <egret.HttpRequest>event.currentTarget;
                if (JSON.parse(request.response).id == 1) {
                    resolve(true)
                } else {
                    reject(false)
                }
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, (err) => {
                console.log("error:" + String(err));
                reject(false)
            }, this);
        })
    }

    /**
     * 下注动画
     */
    private betAnimation() {
        this.getLittleCoins(49, (arr) => {
            arr.forEach((item, value) => {
                for (let i = 0; i < item; i++) {
                    switch (value) {
                        case 0:
                            this.makeCoins("10000");
                            break;
                        case 1:
                            this.makeCoins("1000");
                            break;
                        case 2:
                            this.makeCoins("500");
                            break;
                        case 3:
                            this.makeCoins("100");
                            break;
                        case 4:
                            this.makeCoins("50");
                            break;
                        case 5:
                            this.makeCoins("10");
                            break;
                        case 6:
                            this.makeCoins("5");
                            break;
                        case 7:
                            this.makeCoins("1");
                            break;
                    }
                }
            })
        });
    }

    /**
     * 生成币
     * 第一个币：270 780
     * 第二个币：545 780
     * 第三个币：845 780
     * 第四个币：1125 780
     * 终点龙  250,280  400,280  250,380  400,380   150*100
     * 终点和  635,280  775,280  635,380  775,380
     * 终点虎  1005,280  1155,280  1005,380  1155,380
     */
    private makeCoins(text) {
        let initialPlaceX = 270;
        let initialPlaceY = 780;
        let endPlaceX = 0;
        let endPlaceY = 0;
        switch (this.currentChoose){
            case "0":
                endPlaceX = 250;
                endPlaceY = 280;
                break;
            case "2":
                endPlaceX = 635;
                endPlaceY = 280;
                break;
            case "1":
                endPlaceX = 1005;
                endPlaceY = 280;
                break;
        }
        let coin = new eui.Image();
        coin.source = 'resource/assets/longhudou/chips_small.png';
        coin.width = 88;
        coin.height = 88;
        coin.x = initialPlaceX;
        coin.y = initialPlaceY;
        coin.name = "smallCoin";
        this.addChild(coin);
        let label = new eui.Label();
        label.text = text;
        label.x = initialPlaceX;
        label.y = initialPlaceY;
        this.addChild(label);
        let xRan = Math.floor(Math.random() * 150);
        let yRan = Math.floor(Math.random() * 100);
        egret.Tween.get(coin)
            .to({x: initialPlaceX, y: initialPlaceY}, 0)
            .to({x: endPlaceX + xRan, y: endPlaceY + yRan}, 1000).call(() => {
        });
        egret.Tween.get(label)
            .to({x: initialPlaceX, y: initialPlaceY}, 0)
            .to({x: endPlaceX + xRan, y: endPlaceY + yRan}, 1000).call(() => {
        });
    }

    /**
     * 移除元素
     */
    private removeSmallCoin() {
        this.$children.forEach((item)=>{
            if(item.name == "smallCoin"){
                this.removeChild(item)
            }
        });
    }

    /**
     * 将下注金额分拆成基础币
     * @param coin
     * @param callback
     */
    private getLittleCoins(coin, callback) {
        let wan = Math.floor(coin / 10000);
        let qian = Math.floor((coin % 10000) / 1000);
        let wuBai = Math.floor((coin % 1000) / 500);
        let bai = Math.floor((coin % 500) / 100);
        let wuShi = Math.floor((coin % 100) / 50);
        let shi = Math.floor((coin % 50) / 10);
        let wu = Math.floor((coin % 10) / 5);
        let one = coin % 5;
        let arr = [wan, qian, wuBai, bai, wuShi, shi, wu, one];
        callback(arr);
    }
}
