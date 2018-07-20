/** 游戏数据 */
var $getTimerTimeUrl = "http://39.104.81.103:8089"; // 服务器定时器的地址
var $getContract = "http://39.104.81.103/api/requestContract.php"; // 查询合约地址
//const $MyAddress: string = "0x4790Ef786e45A48377016DC9294eef2c3DA666f5";    //账户地址
// const $ContractAddress: string = "0x48581dF1941704bA726C25D3CFa69FF4B31D4d2a";   //合约地址
var $ContractAddress = location.href.split('?')[1];
var $ContractInstance; //合约实例
var $balance; //右上角的合约余额和账户余额 组件对象
var $Alert; //alert弹窗组件对象
var $InfoPanal; //信息弹窗组件对象
var $BetCoinChoose = "0"; //下注选中的金额
var $BetCoinIcon = "1"; //下注选中的icon
var $loading; // 加载中模态框
var $BetRecord = []; //下注记录对象
var $Password; //密码框
/**
 * 账户相关
 */
function getActiveAccount() {
    var wallet = $Web3.eth.accounts.wallet;
    var index = localStorage.getItem('active_account');
    var activeAccount = wallet[index] || new Error('Wallet Is Locked');
    return activeAccount;
}
function ifWalletExist() {
    var walletJSON = localStorage.getItem('web3js_wallet');
    if (walletJSON) {
        return walletJSON;
    }
    else {
        return false;
    }
}
