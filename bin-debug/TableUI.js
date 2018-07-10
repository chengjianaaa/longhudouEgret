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
        _super.prototype.childrenCreated.call(this);
        this.operation();
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
        // this.timer = setInterval(this.timerBegin.bind(this), 1000);
    };
    /**
     * 解锁
     * @returns {Promise<any>}
     */
    TableUI.prototype.unlockAccount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            $Web3.eth.personal.unlockAccount($MyAddress, _this.getActiveAccountPwd(), function (error, res) {
                if (error) {
                    // 没有keystore
                    if (error.message.indexOf('file') !== -1) {
                        _this.uploadKeyStore().then(function (flag) {
                            if (flag) {
                                $Web3.eth.personal.unlockAccount($MyAddress, _this.getActiveAccountPwd(), function (error, res) {
                                    resolve(res);
                                    reject(error);
                                });
                            }
                        });
                    }
                    else {
                        // 密码错误
                        reject(error.message);
                    }
                    reject(error);
                }
                if (res) {
                    resolve(res);
                }
            });
        });
    };
    /**
     * 下注函数
     * $BetCoinChoose 下注金额
     * obj.name 下注对象
     */
    TableUI.prototype.betFun = function (obj, e) {
        var _this = this;
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
        var weiCoin = $Web3.utils.toWei($BetCoinChoose, 'ether');
        $loading.visible = true;
        $loading.label.text = "正在下注···";
        this.betAnimation();
        this.unlockAccount().then(function (bool) {
            if (bool) {
                $ContractInstance.methods.sendBetInfo($MyAddress, choose, Math.floor(Math.random() * (Math.pow(10, 12))), weiCoin)
                    .send({
                    from: $MyAddress,
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
                    try {
                        var request = new egret.HttpRequest();
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
                        request.addEventListener(egret.Event.COMPLETE, function (event) {
                            var request = event.currentTarget;
                        }, _this);
                        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                            $Alert.visible = true;
                            $Alert.label.text = '上传交易记录失败！';
                            $loading.visible = false;
                        }, _this);
                    }
                    catch (error) {
                        $loading.visible = false;
                        $Alert.visible = true;
                        $Alert.label.text = String(error);
                    }
                });
            }
            else {
                $loading.visible = false;
                $Alert.visible = true;
                $Alert.label.text = "下注失败，keystore not found";
            }
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
                if (event.returnValues._addr == $MyAddress) {
                    $loading.visible = false;
                    if (event.returnValues._bool) {
                        $Alert.visible = true;
                        $Alert.label.text = '下注成功！请等待出牌结果！';
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
                if (event.returnValues._addr == $MyAddress) {
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
                if (dragonNum_1 > tigerNum_1) {
                    profits = _this.myBet[0] * (-1) + _this.myBet[1] + _this.myBet[2];
                }
                else if (dragonNum_1 < tigerNum_1) {
                    profits = _this.myBet[0] + _this.myBet[1] + _this.myBet[2] * (-1);
                }
                else {
                    profits = _this.myBet[0] + _this.myBet[1] * (-8) + _this.myBet[2];
                }
                $InfoPanal.winCoin.text = profits * (-1) + " FOF";
                $BetRecord.forEach(function (item) {
                    item.result = dragonNum_1 > tigerNum_1 ? "0" : dragonNum_1 == tigerNum_1 ? "2" : "1";
                    item.winCoin = (item.result == item.betChoose ? "+" : "-") + item.betCoins;
                });
                _this.readyTime = 0;
                _this.readyTimeLabel.visible = true;
                _this.time.visible = false;
                setTimeout(function () {
                    $InfoPanal.visible = false;
                    $InfoPanal.visible = true;
                    $InfoPanal.settleGroup.visible = true;
                }, 3000);
                _this.myBet = [0, 0, 0];
                setTimeout(function () {
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
                    _this.readyTime = 11;
                    _this.readyTimeLabel.visible = true;
                    _this.time.visible = false;
                    _this.timeNotice.text = "准备时间";
                }, 6000);
            }
        });
    };
    /**
     * 截取当前活动账户的私钥最后9位为密码
     */
    TableUI.prototype.getActiveAccountPwd = function () {
        // 获取钱包的私钥 todo
        return $privateKey.substring($privateKey.length - 9);
    };
    /**
     * 得到KeyStore文件的字符串
     */
    TableUI.prototype.getKeyStore = function () {
        return $Web3.eth.accounts.encrypt($privateKey, this.getActiveAccountPwd());
    };
    /**
     * 上传KeyStore
     */
    TableUI.prototype.uploadKeyStore = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var json = _this.getKeyStore();
            var ts = new Date();
            var name = ['UTC--', ts.toJSON().replace(/:/g, '-'), '--', $MyAddress.toString('hex')].join('');
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open($uploadKeyStoreUrl, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/json");
            var params = [name, JSON.stringify(json)];
            request.send(JSON.stringify({
                "jsonrpc": "2.0",
                "method": "eth_uploadkeyfile",
                "params": params,
                "id": 1
            }));
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                if (JSON.parse(request.response).id == 1) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }, _this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (err) {
                console.log("error:" + String(err));
                reject(false);
            }, _this);
        });
    };
    /**
     * 下注动画
     */
    TableUI.prototype.betAnimation = function () {
        var _this = this;
        this.getLittleCoins(49, function (arr) {
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
        switch (this.currentChoose) {
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
        var coin = new eui.Image();
        coin.source = 'resource/assets/longhudou/chips_small.png';
        coin.width = 88;
        coin.height = 88;
        coin.x = initialPlaceX;
        coin.y = initialPlaceY;
        coin.name = "smallCoin";
        this.addChild(coin);
        var label = new eui.Label();
        label.text = text;
        label.x = initialPlaceX;
        label.y = initialPlaceY;
        this.addChild(label);
        var xRan = Math.floor(Math.random() * 150);
        var yRan = Math.floor(Math.random() * 100);
        egret.Tween.get(coin)
            .to({ x: initialPlaceX, y: initialPlaceY }, 0)
            .to({ x: endPlaceX + xRan, y: endPlaceY + yRan }, 1000).call(function () {
        });
        egret.Tween.get(label)
            .to({ x: initialPlaceX, y: initialPlaceY }, 0)
            .to({ x: endPlaceX + xRan, y: endPlaceY + yRan }, 1000).call(function () {
        });
    };
    /**
     * 移除元素
     */
    TableUI.prototype.removeSmallCoin = function () {
        var _this = this;
        this.$children.forEach(function (item) {
            if (item.name == "smallCoin") {
                _this.removeChild(item);
            }
        });
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
    return TableUI;
}(eui.Component));
__reflect(TableUI.prototype, "TableUI");
