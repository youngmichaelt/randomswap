function togglePopup(token) {
    document.getElementById("popup-1").classList.toggle("active");
    document.getElementById("popupTitle").innerHTML = "You got: " + token;
    document.getElementById("popupTitle").style.fontSize = "50px";
}



async function popupWarning() {

    if (typeof web3 == 'undefined') {
        popupMetaMask();
    } else {
        web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();
        // console.log(accounts.length)
        if (accounts != null) {
            if (accounts.length == 0) {

                popupConnection();
            } else {
                document.getElementById("warningPopup").classList.toggle("active");
            }
        }
    }

    // web3 = new Web3(window.ethereum);
    // let accounts = await web3.eth.getAccounts();
    // // console.log(accounts.length)
    // if (accounts != null) {
    //     if (accounts.length == 0) {

    //         popupConnection();
    //     } else {
    //         document.getElementById("warningPopup").classList.toggle("active");
    //     }
    // }


}

function popupMobile() {
    document.getElementById("mobilePopup").classList.toggle("active");

}

function popupMetaMask() {
    document.getElementById("popupMetaMask").classList.toggle("active");

}

function popupConnection() {
    document.getElementById("popupConnection").classList.toggle("active");

}






async function mmConnect() {

    if (typeof web3 == 'undefined') {
        popupMetaMask();
    } else {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("Account:", await signer.getAddress());

        const web3 = new Web3(window.ethereum);
        var isConnected = ethereum.isConnected();
        console.log(isConnected);
    }
    // provider = new ethers.providers.Web3Provider(window.ethereum);
    // // Prompt user for account connections
    // await provider.send("eth_requestAccounts", []);
    // const signer = provider.getSigner();
    // console.log("Account:", await signer.getAddress());

    // const web3 = new Web3(window.ethereum);
    // var isConnected = ethereum.isConnected();
    // console.log(isConnected);



};


async function swap(token1, token2, amount, tokens, network, decimals, tokenName, token1symbol) {

    if (network == "ETH") {

        //address = "0xde336686ba638C545a46F58B3Dd46D0b9be23769";
        feeAddress = "0xfC2782122A7870811bd5864Ea9C5c67F1d48e863";
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
        url = `https://api.0x.org/swap/v1/quote?sellToken=` +
            token1 + `&buyToken=` +
            token2 + `&sellAmount=` +
            amountInWei + `&feeRecipient=` +
            feeAddress + `&buyTokenPercentageFee=` +
            `0.015`

        const web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();
        web3.eth.defaultAccount = accounts[0]
        console.log(web3.eth.defaultAccount)

        const response = await fetch(url).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    response.text().then((text) => {
                        // document.getElementById('output').innerHTML = "Error: " + text;
                        document.getElementById('output').innerHTML = "Error: " + text + "  Please try again...";
                        popup = document.getElementById("warningPopup").classList
                        if (popup.contains("active")) {
                            popupWarning();
                        }

                        throw new Error(text)
                    });
                    throw new Error('Something went wrong');
                }
            })
            .then((responseJson) => {
                // Do something with the response
                // console.log(response.json());
                console.log(responseJson);

                web3.eth.sendTransaction(responseJson, function(error, txhash) {
                    if (error) {
                        // error handling
                        console.log("error")
                        console.log(token2)

                        document.getElementById('output').innerHTML = "Error: " + error.message + "  Please try again...";

                        document.getElementById('tokenAddress').innerHTML = tokens.address;
                        document.getElementById('tokenSymbol').innerHTML = tokens.symbol;
                        document.getElementById('tokenDecimals').innerHTML = tokens.decimals;

                        console.log(amount)
                        console.log('towlr')

                        popup = document.getElementById("warningPopup").classList
                        if (popup.contains("active")) {
                            popupWarning();
                        }

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
                        //closes popup warning
                        popup = document.getElementById("warningPopup").classList
                        if (popup.contains("active")) {
                            popupWarning();
                        }
                        togglePopup(tokenName);
                        // addToken();

                    }
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    if (network == "BSC") {
        console.log(network);
        console.log(token1)
        console.log(tokens)
        const params = {
                buyToken: token1,
                sellToken: token2,
                buyAmount: '1000000000000000000', // Always denominated in wei
            }
            // const amountInWei = amount * 1000000000000000000
        ogAmount = amount;
        amount = Number(amount).toFixed(decimals).toString();
        amount = amount.replace('.', '');
        const amountInWei = parseInt(amount)
        console.log(amountInWei)

        //testing

        // const response = await fetch(
        //     //`https://ropsten.api.0x.org/swap/v1/quote?${JSON.stringify(params)}`
        //     `https://ropsten.api.0x.org/swap/v1/quote?sellToken=`+token1+`&buyToken=`+token2+`&buyAmount=3000000000000000000`
        //     //`https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=1000000000000000000`
        // );
        // console.log(window.BinanceChain);

        //approval
        // url = 'https://api.1inch.exchange/v3.0/56/approve/calldata?amount=5000000000000000000000&tokenAddress=0xe9e7cea3dedca5984780bafc599bd69add087d56'
        // const data = await fetch(url).then((data) => {
        //         if (data.ok) {
        //             return data.json();
        //         } else {
        //             data.text().then((text) => {
        //                 // document.getElementById('output').innerHTML = "Error: " + text;
        //                 throw new Error(text)
        //             });
        //             throw new Error('Something went wrong');
        //         }
        //     })
        //     // console.log(data);
        // let temp = data;
        // delete temp.gasPrice;
        // // delete temp.gas;
        // // console.log(temp)
        // let val = parseInt(temp["value"]); //get the value from the transaction
        // val = '0x' + val.toString(16); //add a leading 0x after converting from decimal to hexadecimal
        // temp["value"] = val;
        // console.log(temp)



        const web3 = await new Web3(window.ethereum);
        // console.log(web3);

        let accounts = await web3.eth.getAccounts();
        web3.eth.defaultAccount = accounts[0]
        console.log(web3.eth.defaultAccount)
            //approve transaction
            // web3.eth.sendTransaction(temp).then((data) => {
            //     console.log(data);
            // })

        feeAddress = "0xfC2782122A7870811bd5864Ea9C5c67F1d48e863";



        url = `https://api.1inch.exchange/v3.0/56/swap?fromTokenAddress=` +
            token1 + `&toTokenAddress=` +
            tokens.address + `&amount=` +
            amountInWei + "&fee=0.95" + "&fromAddress=" + web3.eth.defaultAccount + "&slippage=1&" +
            "referrerAddress=" + feeAddress



        const data = await fetch(url).then((data) => {
            if (data.ok) {
                return data.json();
            } else {
                data.text().then((text) => {
                    document.getElementById('output').innerHTML = "Error: " + text + "  Please try again...";
                    popup = document.getElementById("warningPopup").classList
                    if (popup.contains("active")) {
                        popupWarning();
                    }

                    throw new Error(text)
                });
                throw new Error('Something went wrong');
            }
        })
        console.log(data)

        const temp = data; //we only want the data object from the api call
        delete temp.tx.gasPrice; //ethersjs will find the gasPrice needed
        delete temp.tx.gas; //ethersjs will find the gasLimit for users

        //we also need value in the form of hex
        let val = parseInt(temp.tx["value"]); //get the value from the transaction
        val = '0x' + val.toString(16); //add a leading 0x after converting from decimal to hexadecimal
        temp.tx["value"] = val;
        console.log(temp.tx)

        // await web3.eth.sendTransaction(temp.tx).then((data) => {
        //     console.log(data);

        // })

        await web3.eth.sendTransaction(temp.tx, function(error, txhash) {
            if (error) {
                // error handling
                console.log("error")
                console.log(token2)

                document.getElementById('output').innerHTML = "Error: " + error.message + "  Please try again...";

                document.getElementById('tokenAddress').innerHTML = tokens.address;
                document.getElementById('tokenSymbol').innerHTML = tokens.symbol;
                document.getElementById('tokenDecimals').innerHTML = tokens.decimals;

                console.log(amount)
                popup = document.getElementById("warningPopup").classList
                if (popup.contains("active")) {
                    popupWarning();
                }
                postTxn(web3.eth.defaultAccount, token1symbol, token2, ogAmount, "false");

                // console.log(tokens.address, tokens.symbol, tokens.decimals)
            } else {
                // handling of successful transaction
                console.log("success")
                document.getElementById('output').innerHTML = "You received: " + token2;
                document.getElementById('tokenAddress').innerHTML = tokens.address;
                document.getElementById('tokenSymbol').innerHTML = tokens.symbol;
                document.getElementById('tokenDecimals').innerHTML = tokens.decimals;



                //function to insert data in mongodb 
                postTxn(web3.eth.defaultAccount, token1symbol, token2, ogAmount, "true");
                //closes popup warning
                popup = document.getElementById("warningPopup").classList
                if (popup.contains("active")) {
                    popupWarning();
                }
                togglePopup(tokenName);
                // addToken();

            }
        })





    }
    if (network == "Ropsten") {


        //address = "0xde336686ba638C545a46F58B3Dd46D0b9be23769";
        feeAddress = "0xfC2782122A7870811bd5864Ea9C5c67F1d48e863";
        const params = {
            buyToken: token1,
            sellToken: token2,
            buyAmount: '1000000000000000000', // Always denominated in wei
        }
        const amountInWei = amount * 1000000000000000000


        url = `https://ropsten.api.0x.org/swap/v1/quote?sellToken=` +
            token1 + `&buyToken=` +
            token2 + `&sellAmount=` +
            amountInWei + `&feeRecipient=` +
            feeAddress + `&buyTokenPercentageFee=` +
            `0.0095`


        const web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();
        web3.eth.defaultAccount = accounts[0]
        console.log(web3.eth.defaultAccount)

        const response = await fetch(url).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    response.text().then((text) => {
                        // document.getElementById('output').innerHTML = "Error: " + text;
                        document.getElementById('output').innerHTML = "Error: " + text + "  Please try again...";
                        popup = document.getElementById("warningPopup").classList
                        if (popup.contains("active")) {
                            popupWarning();
                        }
                        throw new Error(text)
                    });
                    throw new Error('Something went wrong');
                }
            })
            .then((responseJson) => {
                // Do something with the response
                // console.log(response.json());
                console.log(responseJson);

                web3.eth.sendTransaction(responseJson, function(error, txhash) {
                    if (error) {
                        // error handling
                        console.log("error")
                        console.log(token2)

                        document.getElementById('output').innerHTML = "Error: " + error.message + "  Please try again...";

                        document.getElementById('tokenAddress').innerHTML = tokens.address;
                        document.getElementById('tokenSymbol').innerHTML = tokens.symbol;
                        document.getElementById('tokenDecimals').innerHTML = tokens.decimals;

                        console.log(amount)
                        console.log('towlr')

                        //close popup
                        popup = document.getElementById("warningPopup").classList
                        if (popup.contains("active")) {
                            popupWarning();
                        }
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
                        //closes popup warning
                        popup = document.getElementById("warningPopup").classList
                        if (popup.contains("active")) {
                            popupWarning();
                        }
                        console.log(tokenName)
                        togglePopup(tokenName);
                        // addToken();

                    }
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }



}
async function getTokens() {



    var network = document.getElementById('network').value;
    // console.log(network);

    if (network == "ETH") {



        const response = await fetch(
            `https://ropsten.api.0x.org/swap/v1/tokens`
            // `https://api.0x.org/swap/v1/tokens`
            // `https://polygon.api.0x.org/swap/v1/tokens`
            // `https://bsc.api.0x.org/swap/v1/tokens`
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
        // arr = []
        // for (var i = 0; i < tokens.length; i++) {
        //     arr.push(tokens[i].symbol)
        // }
        // console.log(arr)



        var token1 = document.getElementById('tokenSelect').value;
        var coinIdx2 = Math.floor(Math.random() * tokens.length);

        while (tokens[coinIdx2].symbol == token1) {
            coinIdx2 = Math.floor(Math.random() * tokens.length);
        }

        //console.log("Swap token: ", tokens[coinIdx1])
        console.log("Swap from token: ", token1)
        console.log("Swap to token: ", tokens[coinIdx2].symbol)

        const amount = document.getElementById('amountId').value

        swap(token1, tokens[coinIdx2].symbol, amount, tokens[coinIdx2], network, 0, tokens[coinIdx2].name, "")
    }
    if (network == "BSC") {
        const response = await fetch(
            `https://api.1inch.exchange/v3.0/56/tokens`
            // `https://api.0x.org/swap/v1/tokens`
            // `https://polygon.api.0x.org/swap/v1/tokens`
            // `https://bsc.api.0x.org/swap/v1/tokens`
            //`https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&buyAmount=1000000000000000000`
        );
        const tokenResponse = await response.json()
            //return tokens['symbol']
        console.log(tokenResponse.tokens);
        // console.log(tokenResponse.records[0].symbol)

        const tokens = []

        Object.keys(tokenResponse.tokens).forEach(function(key) {
            // console.log(key, tokenResponse.tokens[key]);
            tokens.push(tokenResponse.tokens[key]);
        })



        console.log(tokens);

        // arr = []
        // for (var i = 0; i < tokens.length; i++) {
        //     arr.push(tokens[i].symbol)
        // }
        // console.log(arr)


        var token1 = document.getElementById('tokenSelect').value;
        var coinIdx2 = Math.floor(Math.random() * tokens.length);

        while (tokens[coinIdx2].symbol == token1) {
            coinIdx2 = Math.floor(Math.random() * tokens.length);
        }

        for (i = 0; i < tokens.length; i++) {
            if (token1 == tokens[i].symbol) {

                token1 = tokens[i].address
                decimals = tokens[i].decimals
                tokenName = tokens[i].symbol
            }
        }

        //console.log("Swap token: ", tokens[coinIdx1])
        console.log("Swap from token: ", token1)
        console.log("Swap to token: ", tokens[coinIdx2].symbol)

        const amount = document.getElementById('amountId').value

        swap(token1, tokens[coinIdx2].symbol, amount, tokens[coinIdx2], network, decimals, tokens[coinIdx2].name, tokenName)
    }
    if (network == "Ropsten") {



        const response = await fetch(
            `https://ropsten.api.0x.org/swap/v1/tokens`
            // `https://api.0x.org/swap/v1/tokens`
            // `https://polygon.api.0x.org/swap/v1/tokens`
            // `https://bsc.api.0x.org/swap/v1/tokens`
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
        // arr = []
        // for (var i = 0; i < tokens.length; i++) {
        //     arr.push(tokens[i].symbol)
        // }
        // console.log(arr)



        var token1 = document.getElementById('tokenSelect').value;
        var coinIdx2 = Math.floor(Math.random() * tokens.length);

        while (tokens[coinIdx2].symbol == token1) {
            coinIdx2 = Math.floor(Math.random() * tokens.length);
        }

        //console.log("Swap token: ", tokens[coinIdx1])
        console.log("Swap from token: ", token1)
        console.log("Swap to token: ", tokens[coinIdx2].symbol)

        const amount = document.getElementById('amountId').value

        swap(token1, tokens[coinIdx2].symbol, amount, tokens[coinIdx2], network, 0, tokens[coinIdx2].name, "")
    }

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