import Navbar from "../Navbar/Navbar";
import "./home.css"
const Home = () =>{
    return(
        <div>
            <Navbar/>
            <div className="container home-container mt-4">
                <div className="objective-container">
                    <h4 className="objective-title">Objective</h4>
                    <ul className="objectives">
                        <li className="objective">Quick and deterministic confirmations. </li>
                        <li className="objective">Energy and network communication efficient protocol.</li>
                        <li className="objective">Low latency transaction validation. </li>
                        <li className="objective">Less energy consumption with moderate difficulty. </li>
                        <li className="objective">Equitably distributed mining. </li>
                    </ul>
                </div>
                <div className="algorithm-container">
                    <h4 className="alg-title">Algorithm</h4>
                    <ul className="alg">
                        <li className="alg-step">Join as a Miner by investing a fixed amount.</li>
                        <li className="alg-step">Miners generate Random Numbers using TEE.</li>
                        <li className="alg-step">Top 4 Miners will be added to Priority queue.</li>
                        <li className="alg-step">First Miner in the Priority queue gets the chance to mine the block and broadcasts it.</li>
                        <li className="alg-step">Upon successful creation and validation of block, the block will be added to the Chain.</li>
                        <li className="alg-step">If Miner is unable to generate a block or the block gets invalidated:</li>
                        <ul>
                        <li className="alg-pre-step">Next Miner from the Priority queue will be selected as miner.</li>
                        <li className="alg-pre-step">Miner's stake will be sent to unspendable address.</li>
                        <li className="alg-pre-step">If all Miner's in the Priority queue are not able to mine the block, all the Miners generate the Random Numbers again and the process repeats.</li>
                        </ul>
                    </ul>                
                </div>
            </div>
        </div>
    );
}

export default Home;