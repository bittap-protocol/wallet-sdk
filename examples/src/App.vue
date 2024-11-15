
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { WalletSdk, NetworkType } from '@bittap/wallet-sdk';

const logs = ref(['Log output will appear here...']);
// const toAddr = ref('tb1qj92nj8uwyvwr8pn6exn3ry0extx5t3a46gumsc')
const log = (message:string) => {
  logs.value.push('<span class="text-red-500">'+new Date().toLocaleString()+'</span> '+message+'\n');
};
const installed = ref(WalletSdk.installed())
const isConn = ref(false);
const loading = ref(false);
const autoConnection = ref(false);
const tabActive = ref('Invoice');
const invoiceForm = ref({
  asset_id: '',
  amount: ''
});
const searchAssetForm = ref({
  asset_id: '',
  asset_name: '',
  page_num: 1,
  page_size: 10
});
const sendBtcForm = ref({
  recv_addr: 'bcrt1q4q2xuwa4t94n3hf2a7eyzl4wr3tnxs3qdsyx4q',
  // amount: 1000, //  0.00001 BTC
  amount: Math.floor(0.00001*10**8), //  0.00001 BTC
});
const sendTaprootForm = ref({
  receive_addr: 'taprt1qqqsqqspqqzzp66ymvm55ec7vews66rr896xgd2xuvtn964np4yd2neg4g9ly4e7qcssy5rrjl9cxu9xnpvxywty5ukdvadxqmx90svu83vn6ghvtyq8egfvpqss8vcht6kjwcwe9esw3xxm9nx95329la439srgsv0lmy9la2k0e6h0pgqszrp0dpshx6rdv95kcw309akkz6tvvfhhstn5v4ex66twv9kzumrfva58gmnfdenjuar0v3shjw35xsesgnd2sh',
});

const walletSdk = new WalletSdk({ network: NetworkType.regtest, autoConnection: autoConnection.value });

watch(autoConnection, function (newValue, oldValue) {
  if(isConn.value){
    return log(`Please disconnect wallet first!`);
  }
  log('autoConnection change : oldValue: '+oldValue+' => newValue: '+newValue)
  walletSdk.setAutoConnection(autoConnection.value)
})
const connectWallet = async () => {
  try {
    await walletSdk.connection().then(res => {
      isConn.value = true;
      log(`Connected successfully. <br><b>Account:</b> ${res.account.name}<br> <b>Address:</b> ${res.account.btcAddress}<br><b>Network:</b> ${res.network.name}`);
      walletSdk.setOnAccountChangeHandler(({account, network}) => {
        log('Account change: '+JSON.stringify(account)+' netowrk:'+JSON.stringify(network))
      })
      walletSdk.setOnListenTransactionStatusHandler((txInfo) => {
        console.log('tx status change: ', txInfo)
      })
    });
  } catch (error) {
    // @ts-ignore
    log(`Connection failed: ${error.message}`);
    console.trace(error)
  }
};
const checkConnection = () => {
  if(isConn.value !== true){
    throw new Error('Please connect wallet first!')
  }
}
const switchNetWork = async (networkType:string) => {
  try {
    checkConnection()
    loading.value = true;
    await walletSdk.switchNetwork(networkType as NetworkType).then(res => {
      log(`Switch network successfully. Network:`+networkType)
      log(`Connected Info. <br><b>Account:</b> ${res.account.name}<br> <b>Address:</b> ${res.account.btcAddress}<br><b>Network:</b> ${res.network.name}`);
    });
  } catch (error) {
    // @ts-ignore
    log(`Switch network failed: ${error.message}`);
    console.trace(error)
  } finally {
    loading.value = false;
  }
}
const getCurrentAssets = async () => {
  try {
    checkConnection()
    loading.value = true;
    const result = await walletSdk.getCurrentAssets();
    const okAssets = result.find(o => o.amount >0 && o.decimal === 0);
    if(okAssets){
      invoiceForm.value.asset_id = okAssets.asset_id;
      invoiceForm.value.amount = '1';
    }
    log(`getCurrentAssets successfully :`+JSON.stringify(result));
  } catch (error) {
    // @ts-ignore
    log(`getCurrentAssets failed: ${error.message}`);
  }finally {
    loading.value = false;
  }
}
const getCurrentInvoices = async () => {
  try {
    checkConnection()
    loading.value = true;
    const result = await walletSdk.getInvoices();
    log(`getInvoices successfully :`+JSON.stringify(result));
  } catch (error) {
    // @ts-ignore
    log(`getInvoices failed: ${error.message}`);
  }finally {
    loading.value = false;
  }
}
const createInvoice = async ()=>{
  try {
    checkConnection()
    loading.value = true;
    const result = await walletSdk.createInvoice({
      asset_id: invoiceForm.value.asset_id,
      // @ts-ignore
      amount: Math.floor(invoiceForm.value.amount)
    });
    log(`createInvoice successfully :`+JSON.stringify(result));
  } catch (error) {
    // @ts-ignore
    log(`createInvoice failed: ${error.message}`);
  }finally {
    loading.value = false;
  }
}

const searchAssets = async () => {
  try {
    checkConnection()
    loading.value = true;
    const result = await walletSdk.searchAssets({
      asset_id: searchAssetForm.value.asset_id,
      asset_name: searchAssetForm.value.asset_name,
      page_num: Math.max(Math.floor(searchAssetForm.value.page_num), 1),
      page_size: Math.max(Math.floor(searchAssetForm.value.page_size), 10)
    });
    log(`searchAssets successfully :`+JSON.stringify(result));
  } catch (error) {
    // @ts-ignore
    log(`searchAssets failed: ${error.message}`);
  }finally {
    loading.value = false;
  }
}
const transferBtc = async() => {
  try {
    checkConnection()
    loading.value = true;
    const result = await walletSdk.transferBtc({
      recv_addr: sendBtcForm.value.recv_addr,
      amount: sendBtcForm.value.amount,
    });
    log(`transferBtc successfully :`+JSON.stringify(result));
  } catch (error) {
    // @ts-ignore
    log(`transferBtc failed: ${error.message}`);
  }finally {
    loading.value = false;
  }
}

const transferTaprootAsset = async() => {
  try {
    checkConnection()
    loading.value = true;
    const result = await walletSdk.sendTaprootAssets({
      receive_addr: sendTaprootForm.value.receive_addr,
    });
    log(`transferTaprootAsset successfully :`+JSON.stringify(result));
  } catch (error) {
    // @ts-ignore
    log(`transferTaprootAsset failed: ${error.message}`);
  }finally {
    loading.value = false;
  }
}
const signMessage = async() => {
  try {
    checkConnection()
    loading.value = true;
    const msgText = 'hello world'
    log(`signMessage msgText: `+JSON.stringify(msgText));
    const result = await walletSdk.signMessage(msgText);
    log(`signMessage successfully :`+JSON.stringify(result));
  } catch (error) {
    // @ts-ignore
    log(`signMessage failed: ${error.message}`);
  }finally {
    loading.value = false;
  }
}

const DisConnection = async () => {
  try {
    checkConnection()
    loading.value = true;
    walletSdk.DisConnection();
    log(`DisConnection successfully`);
  } catch (error) {
    // @ts-ignore
    log(`transferTaprootAsset failed: ${error.message}`);
  }finally {
    loading.value = false;
  }
}

const clearLogs = () => {
  logs.value = [];
}
</script>
<template>
  <div v-if="installed" class="not-install">
    <h3 class="text-2xl font-bold mb-4">
      Wallet SDK Demo
    </h3>
    <p class="text-lg">
      Please install the wallet extension first
    </p>
  </div>
  <div v-else class="mx-auto p-0 flex flex-row  justify-between items-stretch">
    <div class="w-1/2 min-h-dvh  p-4 border-r-gray border-r-1 border-solid flex flex-col justify-start items-center gap-y-4 actions">
    <div class="loading fixed z-10 flex flex-row justify-end items-center top-[20px] left-[20px]" v-if="loading">
      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" class="size-8">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3c4.97 0 9 4.03 9 9">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0" />
              <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
            </path>
            <path stroke-dasharray="64" stroke-dashoffset="64" stroke-opacity="0.3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0" />
            </path>
          </g>
        </svg>
    </div>
      <h3 class="text-2xl font-bold mb-4">
        Wallet SDK Demo<span v-if="isConn" class=" text-blue ">(connected)</span>
      </h3>
      <div class="item">
        <button @click="connectWallet" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Connect Wallet
        </button>
        <label><input type="checkbox" v-model="autoConnection" class="checkbox"> Auto Connection</label>
      </div>
      <button @click="switchNetWork('mainnet')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Switch NetWork('mainnet')
      </button>
      <button @click="switchNetWork('testnet')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Switch NetWork('testnet')
      </button>
      <button @click="switchNetWork('regtest')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Switch NetWork('regtest')
      </button>
      <button @click="getCurrentAssets" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        getCurrentAssets
      </button>
      <button @click="getCurrentInvoices" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        getInvoices
      </button>
      <button @click="signMessage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        signMessage
      </button>
      <button @click="DisConnection" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        DisConnection
      </button>

      <div class="tools w-full p-4">
        <div class="tabs flex flex-row justify-center items-center mb-0">
          <button :class="['tab', tabActive === 'BTC' ? 'active':'']" @click="tabActive = 'BTC'">BTC</button>
          <button :class="['tab', tabActive === 'Taproot' ? 'active':'']" @click="tabActive = 'Taproot'">Taproot</button>
          <button :class="['tab', tabActive === 'Invoice' ? 'active':'']" @click="tabActive = 'Invoice'">Invoice</button>
          <button :class="['tab', tabActive === 'Search' ? 'active':'']" @click="tabActive = 'Search'">Search</button>
        </div>
        <div class="tab-contents p-2">
          <div class="content" v-if="tabActive === 'BTC'">
            <h3>Send Btc </h3>
            <div class="from-item">
              <label for="sendBtcForm.recv_addr" class="form-label">Receive address: </label>
              <input v-model="sendBtcForm.recv_addr" id="sendBtcForm.recv_addr" class="input w-[92%]" placeholder="receive address">
            </div>
            <div class="from-item">
              <label for="sendBtcForm.amount" class="form-label">Btc amount: </label>
              <input v-model="sendBtcForm.amount" id="sendBtcForm.amount" class="input" placeholder="Btc amount">
            </div>
            
            <button @click="transferBtc" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              transferBtc
            </button>
            
          </div>

          <div class="content" v-if="tabActive === 'Invoice'">
            <div class="from-item">
              <label for="invoiceForm.asset_id" class="form-label">Asset id: </label>
              <input v-model="invoiceForm.asset_id" id="invoiceForm.asset_id" class="input w-[92%]" placeholder="Asset id">
            </div>
            <div class="from-item">
              <label for="invoiceForm.amount" class="form-label">Asset amount: </label>
              <input v-model="invoiceForm.amount" id="invoiceForm.amount" type="number" min="1" step="1" class="input" placeholder="Asset amount">
            </div>
            
            
            <button @click="createInvoice" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              createInvoice
            </button>
          </div>
          
          <div class="content" v-if="tabActive === 'Taproot'">
            <h3>Send Taproot asset </h3>
            <div class="from-item">
              <label for="sendTaprootForm.receive_addr" class="form-label">Invoice address: </label>
              <input v-model="sendTaprootForm.receive_addr" id="sendTaprootForm.receive_addr" class="input w-[92%]" placeholder="Invoice address">
            </div>
            
            <button @click="transferTaprootAsset" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              transferTaprootAsset
            </button>
          </div>
          <div class="content" v-if="tabActive === 'Search'">

            <div class="search">
              <h3>Search assets</h3>
              <div class="from-item">
              <label for="searchAssetForm.asset_id" class="form-label">Asset id: </label>
              <input v-model="searchAssetForm.asset_id" id="searchAssetForm.asset_id" class="input w-[92%]" placeholder="Asset id">
            </div>
            <div class="from-item">
              <label for="searchAssetForm.asset_name" class="form-label">Asset amount: </label>
              <input v-model="searchAssetForm.asset_name" id="searchAssetForm.asset_name" class="input" placeholder="Asset name">
            </div>
            <div class="from-item">
              <label for="searchAssetForm.page_num" class="form-label">Page number: </label>
              <input v-model="searchAssetForm.page_num" id="searchAssetForm.page_num" type="number" min="1" step="1" class="input" placeholder="Page number">
            </div>
            <div class="from-item">
              <label for="searchAssetForm.page_size" class="form-label">Page size: </label>
              <input v-model="searchAssetForm.page_size" id="searchAssetForm.page_size" type="number" min="10" step="1" class="input" placeholder="Page size">
            </div>
            
            <button @click="searchAssets" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              searchAssets
            </button>
            </div>
          </div>
        </div>
      </div>

     
    </div>
    <div class="w-1/2 min-h-dvh m-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="clearLogs">Clear</button>
      <div class="bg-white p-4 rounded shadow-md h-[100%] overflow-y-auto break-all">
        <p v-for="(log, index) in logs" :key="index" class="text-gray-500" v-html="log"></p>
      </div>
    </div>
  </div>
</template>


<style lang="css">
html,body,#app{
  height: 100vh;
  width: 100vw;
  color: #fff;
}
*{
  margin: 0px;
  padding: 0px;
  box-sizing: content-box;
}
.actions{
  background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
}
.input{
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 5px 0px;
  appearance: none;
  outline: none;
  color:#022037;
  box-shadow: 1px 1px 1px 1px #cbcaca;
}
.input:hover,.input:focus, .input:active{
  border: 1px solid #1885d8;
  color: #082b45;
}
.from-item{
  margin-bottom: 10px;
  display: block;
}
.form-label{
  display: block;
  margin-bottom: 5px;
  color: #082b45;
}
.tabs{
  
}
.tab{
  /* border: 1px solid #fff; */
  border-left: 1px solid #ccc;
  background: #fff;
  border-bottom: 0px;
  padding: 5px 10px;
  cursor: pointer;
  min-width: 60px;
  color: #082b45;
  border-radius: 7px 7px 0px 0px;
  margin-left: -8px;
  margin-bottom: -1px;
  transition: all 0.3s ease-in;
}
.active{
  background: #1885d8;
  border-left: 1px solid #1885d8;
  color:white;
  font-weight: 600;
  transition: all 0.3s ease-out;
}
.tab-contents {
  border-radius: 7px 7px 0px 0px;
  border: 1px solid #fff;
  min-height: 300px;
  transition: all 0.3s ease-in;
}
</style>