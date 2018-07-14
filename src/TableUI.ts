import tr = egret.sys.tr;

class TableUI extends eui.Component {

    public constructor() {
        super();

        /**加载皮肤 */
        this.skinName = "resource/eui_skins/diySkin/BetTable.exml";
    }

    protected childrenCreated(): void {
        var timer:egret.Timer=new egret.Timer(1000,0);
        timer.addEventListener(egret.TimerEvent.TIMER,this.totalCoinsUpdate,this);

        var timer1:egret.Timer=new egret.Timer(2000,0);
        timer1.addEventListener(egret.TimerEvent.TIMER,this.otherPlayerCoinsUpdate,this);

        this.total1.text=null;
        this.total2.text=null;
        this.total3.text=null;
        this.myCoin1=0;
        this.myCoin2=0;
        this.myCoin3=0;
        super.childrenCreated();
        this.operation();
        egret.localStorage.setItem("chipCoinsAll","0");
        egret.localStorage.setItem("balanceCoisaAll","0");
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

    public total1:eui.BitmapLabel;//下注金额展示控件
    public total2:eui.BitmapLabel;//下注金额展示控件
    public total3:eui.BitmapLabel;//下注金额展示控件

    public totalNumber1:number;//每局下注的龙金额
    public totalNumber2:number;//每局下注的和金额
    public totalNumber3:number;//每句下注的虎金额

    public myCoin1:number;//我每局下注的龙金额
    public myCoin2:number;//我每局下注的和金额
    public myCoin3:number;//我每句下注的虎金额



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
                        console.log(receipt);
                    })
            } else {
                $loading.visible = false;
                $Alert.visible = true;
                $Alert.label.text = "下注失败，keystore not found";
            }
        }).catch(function (reason) {
            $loading.visible = false;
            $Alert.visible = true;
            $Alert.label.text = reason.message;
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
                egret.localStorage.setItem("balanceCoisaAll",(Number(egret.localStorage.getItem("balanceCoisaAll"))+profits * (-1) ).toString());
                $BetRecord.forEach((item) => {
                    item.result = dragonNum > tigerNum ? "0" : dragonNum == tigerNum ? "2" : "1";
                    item.winCoin = (item.result == item.betChoose ? "+" : "-") + item.betCoins;
                }
                );
                

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
        let myWallet = new $Wallet("0x" + $privateKey);
        return myWallet.encrypt(this.getActiveAccountPwd());
        // return $Web3.eth.accounts.encrypt($privateKey, this.getActiveAccountPwd())
    }

    /**
     * 上传KeyStore
     */
    private uploadKeyStore() {
        return new Promise((resolve, reject) => {
            this.getKeyStore().then((json)=>{
                let ts = new Date();
                let name = ['UTC--', ts.toJSON().replace(/:/g, '-'), '--', $MyAddress.toString('hex')].join('');
                let request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.open($uploadKeyStoreUrl, egret.HttpMethod.POST);
                request.setRequestHeader("Content-Type", "application/json");
                let params = [name, json];
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
        })
    }

    /**
     * 下注动画
     */
    private betAnimation() {
        this.totalCoinsUpdate();
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
        let number1;
        let number2;
        let number3;

                switch(this.currentChoose){
                    case "0":
                        this.myCoin1=this.myCoin1+Number($BetCoinChoose);
                        egret.localStorage.setItem("chipCoinsAll", (Number(egret.localStorage.getItem("chipCoinsAll"))+this.myCoin1).toString());
                        break;
                    case "2":
                        this.myCoin2=this.myCoin2+Number($BetCoinChoose);
                        egret.localStorage.setItem("chipCoinsAll", (Number(egret.localStorage.getItem("chipCoinsAll"))+this.myCoin2).toString());
                        break;
                    case "1":
                        this.myCoin3=this.myCoin3+Number($BetCoinChoose);
                        egret.localStorage.setItem("chipCoinsAll", (Number(egret.localStorage.getItem("chipCoinsAll"))+this.myCoin3).toString());
                        break;

        }

        $ContractInstance.methods.getTotalCoins().call().then((data) => {
            number1 = Number($Web3.utils.fromWei(data[1], 'ether')).toFixed(0);
            this.total1.text = this.myCoin1 + "/" + number1;
            if (number1 == 0) {
                this.total1.visible = false;
            } else {
                this.total1.visible = true;
            }
            number2 = Number($Web3.utils.fromWei(data[3], 'ether')).toFixed(0);
            this.total2.text = this.myCoin2 + "/" + number2;
            if (number2 == 0) {
                this.total2.visible = false;
            } else {
                this.total2.visible = true;
            }
            number3 = Number($Web3.utils.fromWei(data[2], 'ether')).toFixed(0);
            this.total3.text = this.myCoin3 + "/" + number3;
            if (number3 == 0) {
                this.total3.visible = false;
            } else {
                this.total3.visible = true;
            }
        });

    }

    /*
        判断总筹码，并执行动画播放
    */
    private otherPlayerCoinsUpdate() {

        let number1 = Number(this.total1.text);
        let number2 = Number(this.total2.text);
        let number3 = Number(this.total3.text);

        if (this.totalNumber1 < number1) {

            this.animaitonOtherPlayer(number1 - this.totalNumber1)//执行动画播放函数
        }

        if (this.totalNumber2 < number2) {

            this.animaitonOtherPlayer(number2 - this.totalNumber2)//执行动画播放函数
        }

        if (this.totalNumber3 < number3) {

            this.animaitonOtherPlayer(number3 - this.totalNumber3)//执行动画播放函数
        }

        this.totalNumber1 = number1;
        this.totalNumber2 = number2;
        this.totalNumber3 = number3;

    }

    private animaitonOtherPlayer(number: Number) {


    }
}
