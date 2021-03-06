var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var tr = egret.sys.tr;
var TableUI = (function (_super) {
    __extends(TableUI, _super);
    function TableUI() {
        var _this = _super.call(this) || this;
        _this.readyTime = 0; // 准备时间
        _this.myBet = [0, 0, 0]; // 本局投注金额 龙 和 虎
        _this.currentChoose = ""; // 当前次下注的选中
        /**加载皮肤 */
        _this.skinName = "resource/eui_skins/diySkin/BetTable.exml";
        return _this;
    }
    TableUI.prototype.childrenCreated = function () {
        var timer = new egret.Timer(1000, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.getTotalNumber, this);
        timer.start();
        var timer1 = new egret.Timer(2000, 0);
        timer1.addEventListener(egret.TimerEvent.TIMER, this.otherPlayerCoinsUpdate, this);
        timer1.start();
        this.total1.visible = false;
        this.total2.visible = false;
        this.total3.visible = false;
        this.myCoin1 = 0;
        this.myCoin2 = 0;
        this.myCoin3 = 0;
        _super.prototype.childrenCreated.call(this);
        this.operation();
        egret.localStorage.setItem("chipCoinsAll", "0");
        egret.localStorage.setItem("balanceCoisaAll", "0");
    };
    /**
     * 操作入口函数
     */
    TableUI.prototype.operation = function () {
        var _this = this;
        this.notice1Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.betFun.bind(this, this.notice1Group), this);
        this.notice2Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.betFun.bind(this, this.notice2Group), this);
        this.notice3Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.betFun.bind(this, this.notice3Group), this);
        $ContractInstance.methods.getBlockTime().call().then(function (arr) {
            _this.settleTime = arr[0];
        });
        this.getTime();
        this.watchBet();
        this.betTips.play();
        this.timer = setInterval(this.timerBegin.bind(this), 1000);
        this.number1 = this.totalNumber1;
        this.number2 = this.totalNumber2;
        this.number3 = this.totalNumber3;
    };
    /**
     * 下注函数
     * $BetCoinChoose 下注金额
     * obj.name 下注对象
     */
    TableUI.prototype.betFun = function (obj, e) {
        if (!ifWalletExist()) {
            $Alert.visible = true;
            $Alert.label.text = '请创建钱包并登录';
            $Alert.url = 'location.origin';
            return;
        }
        else {
            $Alert.url = '';
        }
        var account = getActiveAccount(); //判断是否解锁钱包        
        if (account.message) {
            $Password.visible = true;
            return;
        }
        var address = account.address;
        var balancePool = Number($balance.balancePool.text);
        var myBalance = Number($balance.myBalance.text);
        if (this.serverTime < 5) {
            $Alert.label.text = "下注失败！剩余时间小于5s不能下注！";
            $Alert.visible = true;
            return;
        }
        if (myBalance < 1) {
            $Alert.label.text = "余额不足，不能下注！";
            $Alert.visible = true;
            return;
        }
        if ($BetCoinChoose == "0") {
            $Alert.label.text = "请先选择下注金额！";
            $Alert.visible = true;
            return;
        }
        var choose = -1;
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
        var weiCoin = $Web3.utils.toWei($BetCoinChoose, 'ether');
        $loading.visible = true;
        $loading.label.text = "正在下注···";
        $ContractInstance.methods.sendBetInfo(address, choose, Math.floor(Math.random() * (Math.pow(10, 12))), weiCoin)
            .send({
            from: address,
            value: weiCoin,
            gas: 1000000,
            txType: 0,
        })
            .on('error', function (err) {
            $loading.visible = false;
            $Alert.label.text = String(err);
            $Alert.visible = true;
        })
            .on('receipt', function (receipt) {
            console.log(receipt);
        });
    };
    /**
     * 监听是否下注失败
     */
    TableUI.prototype.watchBet = function () {
        var _this = this;
        $ContractInstance.events
            .returnBetResult()
            .on('data', function (event) {
            if (event.returnValues) {
                if (event.returnValues._addr == getActiveAccount().address) {
                    $loading.visible = false;
                    if (event.returnValues._bool) {
                        // $Alert.visible = true;
                        // $Alert.label.text = '下注成功！请等待出牌结果！';
                        _this.betAnimation();
                        $BetRecord.push({
                            betChoose: _this.currentChoose,
                            betCoins: $BetCoinChoose + ' FOF',
                            winCoin: '',
                            result: ''
                        });
                    }
                    else {
                        $Alert.visible = true;
                        $Alert.label.text = '下注失败！本局已封盘（奖池金额不够）';
                    }
                }
            }
        })
            .on('error', function (err) {
            if (err) {
                if (event.returnValues._addr == getActiveAccount().address) {
                    $loading.visible = false;
                    $Alert.visible = true;
                    $Alert.label.text = '下注失败！';
                }
            }
        });
    };
    /**
     * 获取服务器time
     */
    TableUI.prototype.getTime = function () {
        var _this = this;
        try {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open($getTimerTimeUrl, egret.HttpMethod.GET);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        }
        catch (e) {
            $loading.visible = false;
            setTimeout(function () {
                $Alert.visible = true;
                $Alert.label.text = "节点异常，请联系管理员！";
                clearInterval(_this.timer);
            }, 300);
        }
    };
    /**
     * 成功
     */
    TableUI.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        var time = Number(request.response);
        this.serverTime = time < 0 ? 0 : time;
        this.time.text = this.serverTime + "S";
    };
    /**
     * 失败
     */
    TableUI.prototype.onGetIOError = function (event) {
        var _this = this;
        $loading.visible = false;
        setTimeout(function () {
            $Alert.visible = true;
            $Alert.label.text = "网络连接错误，请检查网络！";
            clearInterval(_this.timer);
        }, 300);
    };
    /**
     * 定时器函数
     */
    TableUI.prototype.timerBegin = function () {
        //倒计时
        if (this.serverTime <= 5) {
            this.settlement();
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
    };
    /**
     * 开始结算的函数
     */
    TableUI.prototype.settlement = function () {
        var _this = this;
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
        $ContractInstance.methods.getBlockTime().call().then(function (arr) {
            var nowTime = arr[0].toString(10);
            if (_this.settleTime != nowTime) {
                _this.settleTime = nowTime;
                var originalD = Number(arr[4][0].toString(10));
                var originalT = Number(arr[4][1].toString(10));
                /**
                 * 防止出现同花色同数字的情况
                 * @type {number}
                 */
                if (originalD == originalT) {
                    originalT += 13;
                }
                var dragonNum_1 = originalD % 13 + 1;
                var tigerNum_1 = originalT % 13 + 1;
                $loading.visible = false;
                $InfoPanal.tipsGroup.visible = false;
                $InfoPanal.recordGroup.visible = false;
                $InfoPanal.historyGroup.visible = false;
                $InfoPanal.settleGroup.visible = false;
                $InfoPanal.gameInfo.visible = false;
                $InfoPanal.sourceCodeG.visible = false;
                $Alert.visible = false;
                $InfoPanal.longWin.visible = dragonNum_1 > tigerNum_1;
                $InfoPanal.huWin.visible = dragonNum_1 < tigerNum_1;
                $InfoPanal.he.visible = dragonNum_1 == tigerNum_1;
                $InfoPanal.longCoin.text = _this.myBet[0] + " FOF";
                $InfoPanal.huCoin.text = _this.myBet[2] + " FOF";
                $InfoPanal.heCoin.text = _this.myBet[1] + " FOF";
                var figure_1 = "";
                if (originalD < 13) {
                    figure_1 = "fangkuai";
                }
                else if (originalD < 26) {
                    figure_1 = "heitao";
                }
                else if (originalD < 39) {
                    figure_1 = "hongtao";
                }
                else {
                    figure_1 = "meihua";
                }
                $InfoPanal.longPoker.source = "resource/assets/longhudou/poker/" + dragonNum_1 + '_' + figure_1 + '.png';
                $InfoPanal.huPoker.source = "resource/assets/longhudou/poker/" + tigerNum_1 + '_' + figure_1 + '.png';
                egret.Tween.get(_this.longRes)
                    .to({ scaleX: -1 }, 0)
                    .to({ scaleX: 0 }, 500).call(function () {
                    _this.longRes.source = "resource/assets/longhudou/poker/" + dragonNum_1 + '_' + figure_1 + '.png';
                })
                    .to({ scaleX: 1 }, 500);
                egret.Tween.get(_this.huRes)
                    .to({ scaleX: -1 }, 0)
                    .to({ scaleX: 0 }, 500).call(function () {
                    _this.huRes.source = "resource/assets/longhudou/poker/" + tigerNum_1 + '_' + figure_1 + '.png';
                })
                    .to({ scaleX: 1 }, 500);
                _this.myBet = _this.myBet.map(function (i) {
                    return Number(i);
                });
                var profits = 0;
                var numberLong = 0;
                var numberHe = 0;
                var numberHu = 0;
                if (dragonNum_1 > tigerNum_1) {
                    profits = _this.myBet[0] * (-1) + _this.myBet[1] + _this.myBet[2];
                    numberLong = _this.myBet[0];
                    numberHe = _this.myBet[1] * (-1);
                    numberHu = _this.myBet[2] * (-1);
                }
                else if (dragonNum_1 < tigerNum_1) {
                    profits = _this.myBet[0] + _this.myBet[1] + _this.myBet[2] * (-1);
                    numberLong = _this.myBet[0] * (-1);
                    numberHe = _this.myBet[1] * (-1);
                    numberHu = _this.myBet[2];
                }
                else {
                    profits = _this.myBet[0] + _this.myBet[1] * (-8) + _this.myBet[2];
                    numberLong = _this.myBet[0] * (-1) / 2;
                    numberHe = _this.myBet[1] * 8;
                    numberHu = _this.myBet[2] * (-1) / 2;
                }
                if (numberLong >= 0) {
                    //textColor
                    $InfoPanal.longCoinWin.text = "+" + numberLong + " FOF";
                    $InfoPanal.longCoinWin.textColor = 0x008000;
                }
                else {
                    $InfoPanal.longCoinWin.text = numberLong + " FOF";
                    $InfoPanal.longCoinWin.textColor = 0xFF0000;
                }
                if (numberHu >= 0) {
                    $InfoPanal.huCoinWin.text = "+" + numberHu + " FOF";
                    $InfoPanal.huCoinWin.textColor = 0x008000;
                }
                else {
                    $InfoPanal.huCoinWin.text = numberHu + " FOF";
                    $InfoPanal.huCoinWin.textColor = 0xFF0000;
                }
                if (numberHe >= 0) {
                    $InfoPanal.heCoinWin.text = "+" + numberHe + " FOF";
                    $InfoPanal.heCoinWin.textColor = 0x008000;
                }
                else {
                    $InfoPanal.heCoinWin.text = numberHe + " FOF";
                    $InfoPanal.heCoinWin.textColor = 0xFF0000;
                }
                if (profits * (-1) >= 0) {
                    $InfoPanal.winCoin.text = "+" + profits * (-1) + " FOF";
                    $InfoPanal.winCoin.textColor = 0x008000;
                }
                else {
                    $InfoPanal.winCoin.text = "-" + profits + " FOF";
                    $InfoPanal.winCoin.textColor = 0xFF0000;
                }
                egret.localStorage.setItem("balanceCoisaAll", (Number(egret.localStorage.getItem("balanceCoisaAll")) + profits * (-1)).toString());
                $BetRecord.forEach(function (item) {
                    item.result = dragonNum_1 > tigerNum_1 ? "0" : dragonNum_1 == tigerNum_1 ? "2" : "1";
                    item.winCoin = (item.result == item.betChoose ? "+" : "-") + item.betCoins;
                });
                _this.removeSmallCoin();
                _this.readyTime = 0;
                _this.readyTimeLabel.visible = true;
                _this.time.visible = false;
                setTimeout(function () {
                    $InfoPanal.visible = false;
                    $InfoPanal.visible = true;
                    $InfoPanal.settleGroup.visible = true;
                    _this.readyTime = 10;
                    _this.readyTimeLabel.visible = true;
                    _this.time.visible = false;
                    _this.timeNotice.text = "准备时间";
                }, 3000);
                _this.myBet = [0, 0, 0];
                setTimeout(function () {
                    _this.removeSmallCoin();
                    $InfoPanal.visible = false;
                    egret.Tween.get(_this.longRes)
                        .to({ scaleX: 1 }, 0)
                        .to({ scaleX: 0 }, 500).call(function () {
                        _this.longRes.source = "resource/assets/longhudou/poker/poker_back.png";
                    })
                        .to({ scaleX: -1 }, 500);
                    egret.Tween.get(_this.huRes)
                        .to({ scaleX: 1 }, 0)
                        .to({ scaleX: 0 }, 500).call(function () {
                        _this.huRes.source = "resource/assets/longhudou/poker/poker_back.png";
                    })
                        .to({ scaleX: -1 }, 500);
                }, 9000);
            }
        });
    };
    /**
     * 下注动画
     */
    TableUI.prototype.betAnimation = function () {
        var _this = this;
        this.totalCoinsUpdate();
        this.getTotalNumber();
        this.getLittleCoins(Number($BetCoinChoose), function (arr) {
            arr.forEach(function (item, value) {
                for (var i = 0; i < item; i++) {
                    switch (value) {
                        case 0:
                            _this.makeCoins("10000");
                            break;
                        case 1:
                            _this.makeCoins("1000");
                            break;
                        case 2:
                            _this.makeCoins("500");
                            break;
                        case 3:
                            _this.makeCoins("100");
                            break;
                        case 4:
                            _this.makeCoins("50");
                            break;
                        case 5:
                            _this.makeCoins("10");
                            break;
                        case 6:
                            _this.makeCoins("5");
                            break;
                        case 7:
                            _this.makeCoins("1");
                            break;
                    }
                }
            });
        });
    };
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
    TableUI.prototype.makeCoins = function (text) {
        var initialPlaceX = 270;
        var initialPlaceY = 780;
        var endPlaceX = 0;
        var endPlaceY = 0;
        switch ($BetCoinIcon) {
            case "1":
                switch (this.currentChoose) {
                    case "0":
                        initialPlaceX = 0; //250;
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
                        initialPlaceX = 240; //250;
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
                        initialPlaceX = 480; //250;
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
                        initialPlaceX = 720; //250;
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
        var coin = new eui.Image();
        coin.width = 88;
        coin.height = 88;
        coin.x = initialPlaceX;
        coin.y = initialPlaceY;
        coin.name = "smallCoin";
        switch (this.currentChoose) {
            case "0":
                this.notice1Group.addChild(coin);
                endPlaceX = 20; //this.notice1Group.x;
                endPlaceY = 50; //this.notice1Group.y;
                break;
            case "2":
                this.notice2Group.addChild(coin);
                endPlaceX = 20; //this.notice2Group.x;
                endPlaceY = 50; //this.notice2Group.y;
                break;
            case "1":
                this.notice3Group.addChild(coin);
                endPlaceX = 20; //this.notice3Group.x;
                endPlaceY = 50; //this.notice3Group.y;
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
        var xRan = Math.floor(Math.random() * 150);
        var yRan = Math.floor(Math.random() * 150);
        egret.Tween.get(coin)
            .to({ x: initialPlaceX, y: initialPlaceY }, 0)
            .to({ x: endPlaceX + xRan, y: endPlaceY + yRan }, 500).call(function () {
        });
    };
    /**
     * 移除元素
     */
    TableUI.prototype.removeSmallCoin = function () {
        var _this = this;
        this.notice1Group.$children.forEach(function (item) {
            if (item.name == "smallCoin") {
                _this.notice1Group.removeChild(item);
            }
        });
        this.notice2Group.$children.forEach(function (item) {
            if (item.name == "smallCoin") {
                _this.notice2Group.removeChild(item);
            }
        });
        this.notice3Group.$children.forEach(function (item) {
            if (item.name == "smallCoin") {
                _this.notice3Group.removeChild(item);
            }
        });
        this.total1.text = null;
        this.total2.text = null;
        this.total3.text = null;
        this.myCoin1 = 0;
        this.myCoin2 = 0;
        this.myCoin3 = 0;
    };
    /**
     * 将下注金额分拆成基础币
     * @param coin
     * @param callback
     */
    TableUI.prototype.getLittleCoins = function (coin, callback) {
        var wan = Math.floor(coin / 10000);
        var qian = Math.floor((coin % 10000) / 1000);
        var wuBai = Math.floor((coin % 1000) / 500);
        var bai = Math.floor((coin % 500) / 100);
        var wuShi = Math.floor((coin % 100) / 50);
        var shi = Math.floor((coin % 50) / 10);
        var wu = Math.floor((coin % 10) / 5);
        var one = coin % 5;
        var arr = [wan, qian, wuBai, bai, wuShi, shi, wu, one];
        callback(arr);
    };
    /*
    展示总下注数量
    */
    TableUI.prototype.totalCoinsUpdate = function () {
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
    };
    TableUI.prototype.getTotalNumber = function () {
        var _this = this;
        $ContractInstance.methods.getTotalCoins().call().then(function (data) {
            _this.totalNumber1 = Number($Web3.utils.fromWei(data[1], 'ether'));
            _this.totalNumber2 = Number($Web3.utils.fromWei(data[3], 'ether'));
            _this.totalNumber3 = Number($Web3.utils.fromWei(data[2], 'ether'));
            _this.dataShowUpdate();
        });
    };
    TableUI.prototype.dataShowUpdate = function () {
        if (this.totalNumber1 == 0) {
            this.total1.visible = false;
        }
        else {
            this.total1.visible = true;
            this.total1.text = this.myCoin1 + "/" + this.totalNumber1;
        }
        if (this.totalNumber2 == 0) {
            this.total2.visible = false;
        }
        else {
            this.total2.visible = true;
            this.total2.text = this.myCoin2 + "/" + this.totalNumber2;
        }
        if (this.totalNumber3 == 0) {
            this.total3.visible = false;
        }
        else {
            this.total3.visible = true;
            this.total3.text = this.myCoin3 + "/" + this.totalNumber3;
        }
    };
    /*
        判断总筹码，并执行动画播放
    */
    TableUI.prototype.otherPlayerCoinsUpdate = function () {
        if (this.totalNumber1 > this.number1) {
            this.animaitonOtherPlayer(this.totalNumber1 - this.number1, 1); //执行动画播放函数
            this.number1 = this.totalNumber1;
        }
        if (this.totalNumber2 > this.number2) {
            this.animaitonOtherPlayer(this.totalNumber2 - this.number2, 2); //执行动画播放函数
            this.number2 = this.totalNumber2;
        }
        if (this.totalNumber3 > this.number3) {
            this.animaitonOtherPlayer(this.totalNumber3 - this.number3, 3); //执行动画播放函数
            this.number3 = this.totalNumber3;
        }
    };
    TableUI.prototype.animaitonOtherPlayer = function (number, obj) {
        var initialPlaceX = -500;
        var initialPlaceY = 0;
        var endPlaceX = 20;
        var endPlaceY = 50;
        var coin = new eui.Image();
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
        var xRan = Math.floor(Math.random() * 150);
        var yRan = Math.floor(Math.random() * 150);
        egret.Tween.get(coin)
            .to({ x: initialPlaceX, y: initialPlaceY }, 0)
            .to({ x: endPlaceX + xRan, y: endPlaceY + yRan }, 500).call(function () {
        });
    };
    return TableUI;
}(eui.Component));
__reflect(TableUI.prototype, "TableUI");
