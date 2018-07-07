/** 游戏数据 */
var $getTimerTimeUrl = "http://39.104.81.103:8089"; // 服务器定时器的地址
var $uploadKeyStoreUrl = 'http://39.104.81.103:8551'; // 上传keystore
var $uploadTxUrl = "http://39.104.81.103/api/addTx.php"; // 上传交易记录
var $MyAddress = "0xA5B725E03Ad76Ad9be88CBb3207D5a306C58600f"; //账户地址
var $privateKey = "0x873f8691f035c7217f2082ed999bbd9ef1b124b7c9be2dfe239a95c3eb1a6be0";
var $ContractAddress = "0x17287737509341a83C7B889256E7f53e1416f1c5"; //合约地址
var $ContractInfo; //合约信息
var $ContractInstance; //合约实例
var $balance; //右上角的合约余额和账户余额 组件对象
var $Alert; //alert弹窗组件对象
var $InfoPanal; //信息弹窗组件对象
var $BetCoinChoose = "0"; //下注选中的金额
var $loading; // 加载中模态框
var $BetRecord = []; //下注记录对象
