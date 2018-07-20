/** 游戏数据 */
const $getTimerTimeUrl: string = "http://39.104.81.103:8089"; // 服务器定时器的地址
const $getContract = "http://39.104.81.103/api/requestContract.php"; // 查询合约地址
//const $MyAddress: string = "0x4790Ef786e45A48377016DC9294eef2c3DA666f5";    //账户地址
// const $ContractAddress: string = "0x48581dF1941704bA726C25D3CFa69FF4B31D4d2a";   //合约地址
const $ContractAddress: string = location.href.split('?')[1];

let $ContractInstance;//合约实例
let $balance;//右上角的合约余额和账户余额 组件对象
let $Alert;//alert弹窗组件对象
let $InfoPanal;//信息弹窗组件对象
let $BetCoinChoose: String = "0"; //下注选中的金额
let $BetCoinIcon: String = "1"; //下注选中的icon
let $loading; // 加载中模态框
let $BetRecord: any[] = []; //下注记录对象
let $Password;//密码框

/**
 * 账户相关
 */
function getActiveAccount() {
    let wallet = $Web3.eth.accounts.wallet
    let index = localStorage.getItem('active_account')
    let activeAccount = wallet[index] || new Error('Wallet Is Locked')
    return activeAccount
}

function ifWalletExist() {
    let walletJSON = localStorage.getItem('web3js_wallet')
    if (walletJSON) {
        return walletJSON
    } else {
        return false
    }
}