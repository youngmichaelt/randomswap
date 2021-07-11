
async function mmConnect(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    // await window.ethereum.enable()

    const web3 = new Web3(window.ethereum);
    var isConnected = ethereum.isConnected();
    console.log(isConnected);

    // console.log(getTokens());
    // getTokens();
    //console.log(apiTest(signer));

};


async function swap(token1, token2){

    // console.log(getTokens());

    address = "0xde336686ba638C545a46F58B3Dd46D0b9be23769";
    const params = {
        buyToken: token1,
        sellToken: token2,
        buyAmount: '10000000000000000', // Always denominated in wei
    }
    
    
    // const response = await fetch(
    //     //`https://ropsten.api.0x.org/swap/v1/quote?${JSON.stringify(params)}`
    //     `https://ropsten.api.0x.org/swap/v1/quote?sellToken=`+token1+`&buyToken=`+token2+`&buyAmount=3000000000000000000`
    //     //`https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=1000000000000000000`
    // );
    // url = `https://ropsten.api.0x.org/swap/v1/quote?sellToken=`+token1+`&buyToken=`+token2+`&buyAmount=3000000000000000000`
    url = `https://ropsten.api.0x.org/swap/v1/quote?sellToken=`+token1+`&buyToken=DAI&buyAmount=3000000000000000000`

    const web3 = new Web3(window.ethereum);
    let accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0]

    const response = await fetch(url).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.text().then((text) => {
              document.getElementById('output').innerHTML = "Error: " + text;
              throw new Error(text)
            });
          throw new Error('Something went wrong');
        }
      })
      .then((responseJson) => {
        // Do something with the response
        // console.log(response.json());
        console.log(responseJson);
        // const web3 = new Web3(window.ethereum);
        // let accounts = web3.eth.getAccounts();
        // web3.eth.defaultAccount = accounts[0]
        web3.eth.sendTransaction(responseJson, function (error, txhash) {
            if (error) {
                // error handling
                console.log("error")
                console.log(token2)

                document.getElementById('output').innerHTML = "Error: " + error.message;
            }
            else {
                // handling of successful transaction
                console.log("success")
                document.getElementById('output').innerHTML = "You received: " + token2;
            }})
      })
      .catch((error) => {
        console.log(error)
      });

    // if (!response.ok) {
    //     const message = `An error has occured: ${response.text}`;
    //     console.log(message)
    //     console.log(response);
    //     throw new Error(message);
    //   }

    

    // const web3 = new Web3(window.ethereum);
    // let accounts = await web3.eth.getAccounts();
    // web3.eth.defaultAccount = accounts[0]

    // const response = await fetch(`https://api.0x.org/swap/v0/quote?buyToken=DAI&sellToken=ETH&buyAmount=10000000000000000000`);

    

    // await web3.eth.sendTransaction(await response.json())

    // await web3.eth.sendTransaction(await response.json(), function (error, txhash) {
    //     if (error) {
    //         // error handling
    //         console.log("errr")
    //     }
    //     else {
    //         // handling of successful transaction
    //         console.log("succes")
    //     }})
        
}
async function getTokens(){

    const response = await fetch(
        `https://ropsten.api.0x.org/swap/v1/tokens`
        // `https://api.0x.org/swap/v1/tokens`
        // `https://polygon.api.0x.org/swap/v1/tokens`
        //`https://bsc.api.0x.org/swap/v1/tokens`
        //`https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=1000000000000000000`
    );
    const tokenResponse = await response.json()
    //return tokens['symbol']
    console.log(tokenResponse);
    console.log(tokenResponse.records[0].symbol)

    const tokens = []

    for (let i = 0; i < tokenResponse.records.length; i++) {
        tokens[i] = tokenResponse.records[i].symbol
    }
    console.log(tokens);

    
    var token1 = document.getElementById('token1').value;
    var coinIdx2 = Math.floor(Math.random() * tokens.length);

    while (tokens[coinIdx2] == token1){
        coinIdx2 = Math.floor(Math.random() * tokens.length);
    }

    //console.log("Swap token: ", tokens[coinIdx1])
    console.log("Swap from token: ", token1)
    console.log("Swap to token: ", tokens[coinIdx2])

    swap(token1,tokens[coinIdx2])







}



