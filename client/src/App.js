import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "./contract/chai.json"
import Buy from "./components/Buy";
import Memos from "./components/Memos"
import chai from "./chai.png";

import './App.css';

function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const [account,setAccount] = useState("None") 
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xdCD8a754209C5be3B0027Ec37C562aE8473a6430";
      const contractAbi = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({ 
            method: "eth_requestAccounts"
           });  //metamask will open

           window.ethereum.on("chainChanged",()=>{ //when user switches netwok then page reloads
            window.location.reload();
           });

           window.ethereum.on("accountschanged",()=>{ //when user switches account then page reloads
            window.location.reload();
           })
        
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setState({provider, signer, contract});
          setAccount(account);
          }
          else
          {alert("please install metamask");}
      }catch(error){
        console.log(error);
      }
    };
    connectWallet();
    
  }, []);

  console.log(state);

  return (


<div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
