
async function mmConnect(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    // await window.ethereum.enable()

    const web3 = new Web3(window.ethereum);
    // get all accounts
    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts)

    // const web3Instance = new Web3(window['ethereum']);

    
    var isConnected = ethereum.isConnected();
    console.log(isConnected);
    console.log(apiTest(signer));

};


async function apiTest(provider){

    address = "0xde336686ba638C545a46F58B3Dd46D0b9be23769";
    const params = {
        buyToken: 'DAI',
        sellToken: 'ETH',
        buyAmount: '10000000000000000', // Always denominated in wei
    }
    
    const response = await fetch(
        //`https://ropsten.api.0x.org/swap/v1/quote?${JSON.stringify(params)}`
        `https://ropsten.api.0x.org/swap/v1/quote?sellToken=ETH&buyToken=DAI&buyAmount=3000000000000000000`
        //`https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=1000000000000000000`
    );

    const web3 = new Web3(window.ethereum);
    let accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0]

    // const response = await fetch(`https://api.0x.org/swap/v0/quote?buyToken=DAI&sellToken=ETH&buyAmount=10000000000000000000`);

    

    await web3.eth.sendTransaction(await response.json());


    

}
// console.log(apiTest());




