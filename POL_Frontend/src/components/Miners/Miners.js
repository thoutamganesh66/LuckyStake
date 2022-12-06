import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./miners.css";

const Miners = () => {
  const [miners, setMiners] = useState([]);
  useEffect(() => {
    const url = "http://localhost:4000/miner/getminers";
    axios.get(url).then((response) => {
      setMiners(response.data.data);
      console.log("miners:" + miners);
      console.log(response.data.data);
      // console.log(miners[0].n)
    });
  }, []);

  return (
    <>
      <Navbar />
      {miners.map((miner) => {
        return (
          <div className="container mt-4">
            <div key={miner._id} className="miner-details">
              <h3 className="miner-name">{miner.name}</h3>
              <span className="stake-title">Stake: </span>
              <span className="stake-amount">{miner.stake}</span>
              <br />
              <span className="reward-title">Reward: </span>
              <span className="reward-amount">{miner.reward}</span>
              <br />
              <span className="reward-title">Balance: </span>
              <span className="reward-amount">{miner.balance}</span>
              <br />
              <div>
                <span className="blocks-title">
                  Blocks:
                  {miner.BlocksMined.map((block) => {
                    return (
                      <>
                        {block ? (
                          <span className="blocks-no">{block},</span>
                        ) : (
                          <span className="blocks-no">none</span>
                        )}
                      </>
                    );
                  })}
                </span>
              </div>

              {/* {miner.BlocksMined.map(block=>{
                                return(
                                    <div className="">
                                        <span className="blocks-title">Blocks: </span>{block?<span className="blocks-no">{block}</span>:0}         
                                    </div>
                                );
                            })} */}

              <hr />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Miners;
