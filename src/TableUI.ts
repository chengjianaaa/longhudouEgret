import tr = egret.sys.tr;

class TableUI extends eui.Component {

    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/diySkin/BetTable.exml";
    }

    protected childrenCreated(): void {
        var timer: egret.Timer = new egret.Timer(1000, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.getTotalNumber, this);
        timer.start();

        var timer1: egret.Timer = new egret.Timer(2000, 0);
        timer1.addEventListener(egret.TimerEvent.TIMER, this.otherPlayerCoinsUpdate, this);
        timer1.start();

        this.total1.visible = false;
        this.total2.visible = false;
        this.total3.visible = false;
        this.myCoin1 = 0;
        this.myCoin2 = 0;
        this.myCoin3 = 0;
        super.childrenCreated();
        this.operation();
        egret.localStorage.setItem("chipCoinsAll", "0");
        egret.localStorage.setItem("balanceCoisaAll", "0");
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

    public total1: eui.BitmapLabel;//下注金额展示控件
    public total2: eui.BitmapLabel;//下注金额展示控件
    public total3: eui.BitmapLabel;//下注金额展示控件

    public totalNumber1: number;//每局下注的龙金额
    public totalNumber2: number;//每局下注的和金额
    public totalNumber3: number;//每句下注的虎金额

    public myCoin1: number;//我每局下注的龙金额
    public myCoin2: number;//我每局下注的和金额
    public myCoin3: number;//我每句下注的虎金额

    public number1: number;//临时保存的比较总金额-龙
    public number2: number;//临时保存的比较总金额-和
    public number3: number;//临时保存的比较总金额-虎
    private backSound: egret.Sound;


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
        this.timer = setInterval(this.timerBegin.bind(this), 1000);
        this.number1 = this.totalNumber1;
        this.number2 = this.totalNumber2;
        this.number3 = this.totalNumber3;


    }

    /**
     * 下注函数
     * $BetCoinChoose 下注金额
     * obj.name 下注对象
     */
    private betFun(obj, e) {

        if (!ifWalletExist()) {     //判断是否有账户
            $Alert.visible = true;
            $Alert.label.text = '请创建钱包并登录';
            $Alert.url = 'location.origin';
            return;
        } else {
            $Alert.url = ''
        }

        let account = getActiveAccount()   //判断是否解锁钱包        
        if (account.message) {
            $Password.visible = true;
            return;
        }
        let address = account.address

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
                this.myBet[0] = this.myCoin1;
                break;
            case "betHu":
                choose = 1;
                this.myBet[2] = this.myCoin3;
                break;
            case "betHe":
                choose = 2;
                this.myBet[1] = this.myCoin2;
                break;
        }
        this.currentChoose = choose + "";
        let weiCoin = $Web3.utils.toWei($BetCoinChoose, 'ether');
        $loading.visible = true;
        $loading.label.text = "正在下注···";
        $ContractInstance.methods.sendBetInfo(address, choose, Math.floor(Math.random() * (10 ** 12)), weiCoin)
            .send({
                from: address,
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
                console.log(receipt);
            })
    }

    /**
     * 监听是否下注失败
     */
    private watchBet(): void {
        $ContractInstance.events
            .returnBetResult()
            .on('data', (event) => {
                if (event.returnValues) {
                    if (event.returnValues._addr == getActiveAccount().address) {
                        $loading.visible = false;
                        if (event.returnValues._bool) {
                            // $Alert.visible = true;
                            // $Alert.label.text = '下注成功！请等待出牌结果！';
                            this.betAnimation();
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
                    if (event.returnValues._addr == getActiveAccount().address) {
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
        this.myBet[0] = this.myCoin1;
        this.myBet[2] = this.myCoin3;
        this.myBet[1] = this.myCoin2;
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
                $InfoPanal.settleGroup.visible = false;
                $InfoPanal.gameInfo.visible = false;
                $InfoPanal.sourceCodeG.visible = false;
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
                let numberLong = 0;
                let numberHe = 0;
                let numberHu = 0;
                if (dragonNum > tigerNum) {
                    profits = this.myBet[0] * (-1) + this.myBet[1] + this.myBet[2]
                    numberLong = this.myBet[0];
                    numberHe = this.myBet[1] * (-1);
                    numberHu = this.myBet[2] * (-1);
                } else if (dragonNum < tigerNum) {
                    profits = this.myBet[0] + this.myBet[1] + this.myBet[2] * (-1)
                    numberLong = this.myBet[0] * (-1);
                    numberHe = this.myBet[1] * (-1);
                    numberHu = this.myBet[2];
                } else {
                    profits = this.myBet[0] + this.myBet[1] * (-8) + this.myBet[2]
                    numberLong = this.myBet[0] * (-1) / 2;
                    numberHe = this.myBet[1] * 8;
                    numberHu = this.myBet[2] * (-1) / 2;
                }


                if (numberLong >= 0) {
                    //textColor
                    $InfoPanal.longCoinWin.text = "+" + numberLong + " FOF";
                    $InfoPanal.longCoinWin.textColor = 0x008000;

                } else {
                    $InfoPanal.longCoinWin.text = numberLong + " FOF";
                    $InfoPanal.longCoinWin.textColor = 0xFF0000;
                }

                if (numberHu >= 0) {
                    $InfoPanal.huCoinWin.text = "+" + numberHu + " FOF";
                    $InfoPanal.huCoinWin.textColor = 0x008000;
                } else {
                    $InfoPanal.huCoinWin.text = numberHu + " FOF";
                    $InfoPanal.huCoinWin.textColor = 0xFF0000;

                }

                if (numberHe >= 0) {
                    $InfoPanal.heCoinWin.text = "+" + numberHe + " FOF";
                    $InfoPanal.heCoinWin.textColor = 0x008000;
                } else {

                    $InfoPanal.heCoinWin.text = numberHe + " FOF";
                    $InfoPanal.heCoinWin.textColor = 0xFF0000;
                }

                if (profits * (-1) >= 0) {
                    $InfoPanal.winCoin.text = "+" + profits * (-1) + " FOF";
                    $InfoPanal.winCoin.textColor = 0x008000;
                } else {
                    $InfoPanal.winCoin.text = "-" + profits + " FOF";
                    $InfoPanal.winCoin.textColor = 0xFF0000;
                }

                egret.localStorage.setItem("balanceCoisaAll", (Number(egret.localStorage.getItem("balanceCoisaAll")) + profits * (-1)).toString());
                $BetRecord.forEach((item) => {
                        item.result = dragonNum > tigerNum ? "0" : dragonNum == tigerNum ? "2" : "1";
                        item.winCoin = (item.result == item.betChoose ? "+" : "-") + item.betCoins;
                    }
                );

                this.removeSmallCoin();
                this.readyTime = 0;
                this.readyTimeLabel.visible = true;
                this.time.visible = false;

                setTimeout(() => {
                    $InfoPanal.visible = false;
                    $InfoPanal.visible = true;
                    $InfoPanal.settleGroup.visible = true;
                    this.readyTime = 10;
                    this.readyTimeLabel.visible = true;
                    this.time.visible = false;
                    this.timeNotice.text = "准备时间";
                }, 3000);
                this.myBet = [0, 0, 0];
                setTimeout(() => {
                    this.removeSmallCoin();
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


                }, 9000);
            }
        })
    }

    /**
     * 下注动画
     */
    private betAnimation() {
        this.totalCoinsUpdate();
        this.getTotalNumber();
        this.getLittleCoins(Number($BetCoinChoose), (arr) => {
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
        switch ($BetCoinIcon) {
            case "1":
                switch (this.currentChoose) {
                    case "0":
                        initialPlaceX = 0;//250;
                        break;
                    case "2":
                        initialPlaceX = -350;
                        break;
                    case "1":
                        initialPlaceX = -700;
                        break;
                }
                break;
            case "2":
                switch (this.currentChoose) {
                    case "0":
                        initialPlaceX = 240;//250;
                        break;
                    case "2":
                        initialPlaceX = -110;
                        break;
                    case "1":
                        initialPlaceX = -460;
                        break;
                }
                break;
            case "3":
                switch (this.currentChoose) {
                    case "0":
                        initialPlaceX = 480;//250;
                        break;
                    case "2":
                        initialPlaceX = 130;
                        break;
                    case "1":
                        initialPlaceX = -220;
                        break;
                }
                break;
            case "4":
                switch (this.currentChoose) {
                    case "0":
                        initialPlaceX = 720;//250;
                        break;
                    case "2":
                        initialPlaceX = 370;
                        break;
                    case "1":
                        initialPlaceX = 30;
                        break;
                }
                break;
        }
        let coin = new eui.Image();
        coin.width = 88;
        coin.height = 88;
        coin.x = initialPlaceX;
        coin.y = initialPlaceY;
        coin.name = "smallCoin";
        switch (this.currentChoose) {
            case "0":
                this.notice1Group.addChild(coin);
                endPlaceX = 20;//this.notice1Group.x;
                endPlaceY = 50;//this.notice1Group.y;
                break;
            case "2":
                this.notice2Group.addChild(coin);
                endPlaceX = 20;//this.notice2Group.x;
                endPlaceY = 50;//this.notice2Group.y;
                break;
            case "1":
                this.notice3Group.addChild(coin);
                endPlaceX = 20;//this.notice3Group.x;
                endPlaceY = 50;//this.notice3Group.y;
                break;
        }
        switch (text) {
            case "1":
                coin.source = 'resource/assets/longhudou/chip_s1.png';
                break;
            case "5":
                coin.source = 'resource/assets/longhudou/chip_s2.png';
                break;
            case "10":
                coin.source = 'resource/assets/longhudou/chip_s3.png';
                break;
            case "50":
                coin.source = 'resource/assets/longhudou/chip_s4.png';
                break;
            case "100":
                coin.source = 'resource/assets/longhudou/chip_s5.png';
                break;
            case "500":
                coin.source = 'resource/assets/longhudou/chip_s6.png';
                break;
            case "1000":
                coin.source = 'resource/assets/longhudou/chip_s7.png';
                break;
            case "10000":
                coin.source = 'resource/assets/longhudou/chip_s8.png';
                break;
        }
        let xRan = Math.floor(Math.random() * 150);
        let yRan = Math.floor(Math.random() * 150);
        egret.Tween.get(coin)
            .to({x: initialPlaceX, y: initialPlaceY}, 0)
            .to({x: endPlaceX + xRan, y: endPlaceY + yRan}, 500).call(() => {
        });
    }

    /**
     * 移除元素
     */
    private removeSmallCoin() {
        this.notice1Group.$children.forEach((item) => {
            if (item.name == "smallCoin") {
                this.notice1Group.removeChild(item)
            }
        });
        this.notice2Group.$children.forEach((item) => {
            if (item.name == "smallCoin") {
                this.notice2Group.removeChild(item)
            }
        });
        this.notice3Group.$children.forEach((item) => {
            if (item.name == "smallCoin") {
                this.notice3Group.removeChild(item)
            }
        });
        this.total1.text = null;
        this.total2.text = null;
        this.total3.text = null;
        this.myCoin1 = 0;
        this.myCoin2 = 0;
        this.myCoin3 = 0;
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

    /*
    展示总下注数量
    */
    private totalCoinsUpdate() {
        switch (this.currentChoose) {
            case "0":
                this.myCoin1 = this.myCoin1 + Number($BetCoinChoose);
                break;
            case "2":
                this.myCoin2 = this.myCoin2 + Number($BetCoinChoose);
                break;
            case "1":
                this.myCoin3 = this.myCoin3 + Number($BetCoinChoose);
                break;

        }

        this.dataShowUpdate();
        egret.localStorage.setItem("chipCoinsAll", (Number(egret.localStorage.getItem("chipCoinsAll")) + Number($BetCoinChoose)).toString());
    }

    private getTotalNumber() {
        $ContractInstance.methods.getTotalCoins().call().then((data) => {
            this.totalNumber1 = Number($Web3.utils.fromWei(data[1], 'ether'));
            this.totalNumber2 = Number($Web3.utils.fromWei(data[3], 'ether'));
            this.totalNumber3 = Number($Web3.utils.fromWei(data[2], 'ether'));
            this.dataShowUpdate();
        });

    }

    private dataShowUpdate() {

        if (this.totalNumber1 == 0) {
            this.total1.visible = false;
        } else {
            this.total1.visible = true;
            this.total1.text = this.myCoin1 + "/" + this.totalNumber1;
        }


        if (this.totalNumber2 == 0) {
            this.total2.visible = false;
        } else {
            this.total2.visible = true;
            this.total2.text = this.myCoin2 + "/" + this.totalNumber2;
        }


        if (this.totalNumber3 == 0) {
            this.total3.visible = false;
        } else {
            this.total3.visible = true;
            this.total3.text = this.myCoin3 + "/" + this.totalNumber3;
        }

    }

    /*
        判断总筹码，并执行动画播放
    */
    private otherPlayerCoinsUpdate() {

        if (this.totalNumber1 > this.number1) {
            this.animaitonOtherPlayer(this.totalNumber1 - this.number1, 1)//执行动画播放函数
            this.number1 = this.totalNumber1;
        }
        if (this.totalNumber2 > this.number2) {
            this.animaitonOtherPlayer(this.totalNumber2 - this.number2, 2)//执行动画播放函数
            this.number2 = this.totalNumber2;
        }
        if (this.totalNumber3 > this.number3) {
            this.animaitonOtherPlayer(this.totalNumber3 - this.number3, 3)//执行动画播放函数
            this.number3 = this.totalNumber3;
        }
    }

    private animaitonOtherPlayer(number: Number, obj: any) {
        let initialPlaceX = -500;
        let initialPlaceY = 0;
        let endPlaceX = 20;
        let endPlaceY = 50;
        let coin = new eui.Image();
        coin.source = 'resource/assets/longhudou/chip_s3.png';
        coin.width = 88;
        coin.height = 88;
        coin.x = initialPlaceX;
        coin.y = initialPlaceY;
        coin.name = "smallCoin";
        switch (obj) {
            case "1":
                this.notice1Group.addChild(coin);
                break;
            case "2":
                this.notice2Group.addChild(coin);
                break;
            case "3":
                this.notice3Group.addChild(coin);
                break;
        }
        let xRan = Math.floor(Math.random() * 150);
        let yRan = Math.floor(Math.random() * 150);
        egret.Tween.get(coin)
            .to({x: initialPlaceX, y: initialPlaceY}, 0)
            .to({x: endPlaceX + xRan, y: endPlaceY + yRan}, 500).call(() => {
        });
    }
}
