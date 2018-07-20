//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource();
        let promise = this.getInfo();

        //播放音乐
        

        promise.then(() => {
            this.createGameScene()
            document.getElementById('bgmMusic').play();
        });
        // this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        // await platform.login();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;

    private getInfo() {
        return new Promise((resolve, reject) => {
            try {
                let CODE: any = null;
                RES.getResByUrl("contract/playGame.json", function (code) {
                    $ContractInstance = new $Web3.eth.Contract(code.abi, $ContractAddress);
                    resolve();
                }, this, RES.ResourceItem.TYPE_JSON)
            }
            catch (e) {
                console.error(e);
            }
        })
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {

        /*this.backSound=RES.getRes("back_mp3");
        this. timer = new egret.Timer(5000, 1);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.soundPlay, this);
        this.timer.start();*/
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        /**
         * 下注的4个icon
         * @type {HistorySkinUI}
         */
        let coinBtn = new CoinBtnUI();
        this.addChild(coinBtn);
        let coinBtnH = coinBtn.height;
        let coinBtnW = coinBtn.width;
        coinBtn.x = (stageW - coinBtnW) / 2;
        coinBtn.y = 870;

        /**
         * 加载桌面
         * @type {egret.Bitmap}
         */
        let table = new TableUI();
        this.addChild(table);
        let tableW = table.width;
        let tableH = table.height;
        table.y = (stageH - tableH) / 2;
        table.x = (stageW - tableW) / 2;

        /**
         * 美女荷官
         * @type {HistorySkinUI}
         */
        let croupier = new CroupierUI();
        this.addChild(croupier);
        let croupierW = croupier.width;
        let croupierH = croupier.height;
        croupier.x = (stageW - croupierW) / 2;
        croupier.y = 10;

        /**
         * 右上角的合约余额和账户余额
         * @type {HistorySkinUI}
         */
        $balance = new BalanceUI();
        this.addChild($balance);
        let balanceW = $balance.width;
        let balanceH = $balance.height;
        $balance.x = stageW - balanceW;
        $balance.y = 10;

        /**
         * 左上角的菜单
         * @type {HistorySkinUI}
         */
        let menu = new MenuUI();
        this.addChild(menu);
        menu.x = 20;
        menu.y = 10;

        /**
         * 右下角的两个icon，历史记录
         * @type {HistorySkinUI}
         */
        let history = new HistorySkinUI();
        this.addChild(history);
        let historyW = history.width;
        let historyH = history.height;
        history.y = stageH - historyH;
        history.x = stageW - historyW;

        $InfoPanal = new InfoPanalUI();
        $InfoPanal.bgBack.width = stageW;
        $InfoPanal.bgBack.height = stageH;
        this.addChild($InfoPanal);

        const loadingView = new LoadingUI();
        this.stage.addChild(loadingView);
        RES.loadGroup("poker", 0, loadingView);
        this.stage.removeChild(loadingView);

        /**
         * 右下角的两个icon，历史记录
         * @type {HistorySkinUI}
         */
        $loading = new DIYLoadingUI();
        this.addChild($loading);     

        /**
         * password模态框
         * @type {AlertUI}
         */
        $Password = new PasswordUI();
        this.addChild($Password);
 
        /**
         * alert模态框
         * @type {AlertUI}
         */
        $Alert = new AlertUI();
        this.addChild($Alert);
        
    }
}
