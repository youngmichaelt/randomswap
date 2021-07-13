window.addEventListener("load", async function() {
    const web3 = new Web3(window.ethereum);
    let accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    document.getElementById('currAccount').innerHTML = accounts[0];

})

// console.log(<%= docs %>)







async function mmConnect() {
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


async function swap(token1, token2, amount, tokens) {

    // console.log(getTokens());

    address = "0xde336686ba638C545a46F58B3Dd46D0b9be23769";
    const params = {
        buyToken: token1,
        sellToken: token2,
        buyAmount: '1000000000000000000', // Always denominated in wei
    }
    const amountInWei = amount * 1000000000000000000

    // const response = await fetch(
    //     //`https://ropsten.api.0x.org/swap/v1/quote?${JSON.stringify(params)}`
    //     `https://ropsten.api.0x.org/swap/v1/quote?sellToken=`+token1+`&buyToken=`+token2+`&buyAmount=3000000000000000000`
    //     //`https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=1000000000000000000`
    // );
    url = `https://ropsten.api.0x.org/swap/v1/quote?sellToken=` +
        token1 + `&buyToken=` +
        token2 + `&sellAmount=` +
        amountInWei + `&feeRecipient=` +
        `0xfC2782122A7870811bd5864Ea9C5c67F1d48e863` + `&buyTokenPercentageFee=` +
        `0.5`

    // url = `https://bsc.api.0x.org/swap/v1/quote?sellToken=BNB&buyToken=1INCH&buyAmount=10000000000000000`

    const web3 = new Web3(window.ethereum);
    let accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0]
    console.log(web3.eth.defaultAccount)

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
            web3.eth.sendTransaction(responseJson, function(error, txhash) {
                if (error) {
                    // error handling
                    console.log("error")
                    console.log(token2)

                    document.getElementById('output').innerHTML = "Error: " + error.message;

                    document.getElementById('tokenAddress').innerHTML = tokens.address;
                    document.getElementById('tokenSymbol').innerHTML = tokens.symbol;
                    document.getElementById('tokenDecimals').innerHTML = tokens.decimals;

                    console.log(amount)
                    console.log('towlr')

                    postTxn(web3.eth.defaultAccount, token1, token2, amount, "false");

                    // console.log(tokens.address, tokens.symbol, tokens.decimals)
                } else {
                    // handling of successful transaction
                    console.log("success")
                    document.getElementById('output').innerHTML = "You received: " + token2;
                    document.getElementById('tokenAddress').innerHTML = tokens.address;
                    document.getElementById('tokenSymbol').innerHTML = tokens.symbol;
                    document.getElementById('tokenDecimals').innerHTML = tokens.decimals;

                    //function to insert data in mongodb 
                    postTxn(web3.eth.defaultAccount, token1, token2, amount, "true");


                    // addToken();

                }
            })
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
async function getTokens() {

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
    // console.log(tokenResponse.records[0].symbol)

    const tokens = []

    for (let i = 0; i < tokenResponse.records.length; i++) {
        // tokens[i] = tokenResponse.records[i].symbol
        tokens[i] = tokenResponse.records[i]
    }
    console.log(tokens);


    var token1 = document.getElementById('token1').value;
    var coinIdx2 = Math.floor(Math.random() * tokens.length);

    while (tokens[coinIdx2].symbol == token1) {
        coinIdx2 = Math.floor(Math.random() * tokens.length);
    }

    //console.log("Swap token: ", tokens[coinIdx1])
    console.log("Swap from token: ", token1)
    console.log("Swap to token: ", tokens[coinIdx2].symbol)

    const amount = document.getElementById('amountId').value

    swap(token1, tokens[coinIdx2].symbol, amount, tokens[coinIdx2])


}

async function addToken() {
    const tokenAddress = document.getElementById('tokenAddress').innerHTML;
    const tokenSymbol = document.getElementById('tokenSymbol').innerHTML;
    const tokenDecimals = document.getElementById('tokenDecimals').innerHTML;
    const tokenImage = 'http://placekitten.com/200/300';

    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: tokenAddress, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    // image: tokenImage, // A string url of the token logo
                },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
    } catch (error) {
        console.log(error);
    }
}

function postTxn(address, token1, token2, amount, success) {
    let data = {
        address: address,
        token1: token1,
        token2: token2,
        amount: amount,
        success: success
    };

    fetch("/txn", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    }).then(res => {
        console.log("Request complete! response:", res);
    });
}