/** 游戏数据 */
const $getTimerTimeUrl: string = "http://39.104.81.103:8089"; // 服务器定时器的地址
const $uploadKeyStoreUrl: string = 'http://39.104.81.103:8551'; // 上传keystore
const $uploadTxUrl: string = "http://39.104.81.103/api/addTx.php"; // 上传交易记录
const $MyAddress: string = "0xA5B725E03Ad76Ad9be88CBb3207D5a306C58600f";    //账户地址
const $privateKey: string = "0x873f8691f035c7217f2082ed999bbd9ef1b124b7c9be2dfe239a95c3eb1a6be0";
const $ContractAddress: string = "0x71084c191e8B25D8EF6Ca922C9e8D295886CCd3D";   //合约地址

let $ContractInfo: Object;//合约信息
let $ContractInstance: Object;//合约实例
let $balance: Object;//右上角的合约余额和账户余额 组件对象
let $Alert: Object;//alert弹窗组件对象
let $InfoPanal: Object;//信息弹窗组件对象
let $BetCoinChoose: String = "0"; //下注选中的金额
let $loading: Object; // 加载中模态框
let $BetRecord: any[] = []; //下注记录对象