import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./chain.css";

const Chain = () =>{

    const [chain,setChain] = useState([]);

    useEffect(()=>{
        const url = "http://localhost:4000/getchain";
        axios.get(url)
        .then(res=>{
            console.log(res);
            setChain(res.data.data);
        })
    },[]);
    return(
        <div>
            <Navbar/>
            <div className="container chain-container mt-4">
                {chain.map(chain=>{
                    return(
                        <div className="dataBlock">
                            <table>
                                <tr>
                                    <td>Block Height</td>
                                    <td>{chain.BlockNumber}</td>
                                </tr>
                                <tr>
                                    <td>Block Hash</td>
                                    <td>{chain.BlockHash}</td>
                                </tr>
                                <tr>
                                    <td>Prev Block Hash</td>
                                    <td>{chain.PreBlockHash}</td>
                                </tr>
                                <tr>
                                    <td>Data</td>
                                    <td>{chain.data}</td>
                                </tr>
                                <tr>
                                    <td>TimeStamp</td>
                                    <td>{chain.timestamp}</td>
                                </tr>
                                <tr>
                                    <td>Miner</td>
                                    <td>{chain.miner}</td>
                                </tr>
                            </table>                            
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Chain;