import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./mineblock.css";
// import {Redirect} from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const MineBlock = () => {
  const [data, setData] = useState("");
  const [randomNumbers, setRandomNumbers] = useState();
  const [priorityqueue, setPriorityQueue] = useState([]);
  const [miner, setMiner] = useState("");
  const [count, setCount] = useState(0);
  const [displayData, setDisplayData] = useState(false);
  const handleChange = (e) => {
    setData(e.target.value);
  };

  useEffect(() => {
    if (randomNumbers != undefined) {
      randomNumbers.sort((a, b) => a.randomNumber - b.randomNumber);
      setPriorityQueue(randomNumbers.slice(0, 4));
    }
  }, [randomNumbers]);

  useEffect(() => {
    if (priorityqueue[0] != null) {
      setMiner(priorityqueue[0].nameName);
    }
  }, [priorityqueue]);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  const changePQ = () => {
    priorityqueue.shift();
    console.log(priorityqueue);
    setCount(count + 1);
    console.log("count in changepq " + count);
  };

  const changeMiner = () => {
    if (priorityqueue[0] != null) {
      setMiner(priorityqueue[0].nameName);
      console.log("Miner changed");
    }
  };

  const handleMine = (e) => {
    //hit mine api here...
    // e.preventDefault();
    const form = new FormData();
    const url = "http://localhost:4000/mining/generateRandom";
    form.append("data", data);
    console.log("formdata is " + form.get("data"));
    axios
      .post(url, {
        BlockData: form.get("data"),
      })
      .then((res) => {
        console.log(
          "server response for random num generation " + res.data.minermaps
        );
        setRandomNumbers(res.data.minermaps);
        setCount(0);
        setDisplayData(true);
        // console.log("random numbers stored: "+randomNumbers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const successMine = (e) => {
    e.preventDefault();
    const form = new FormData();
    const url = "http://localhost:4000/mining/addNewBlock";
    form.append("miner", miner);
    console.log("miner is " + form.get("miner"));
    axios
      .post(url, {
        minerName: form.get("miner"),
      })
      .then((res) => {
        console.log(res);
        window.alert("block added");
      })
      .catch((err) => {
        console.log(err);
        window.alert("error");
      });
  };

  const failMine = (e) => {
    // e.preventDefault();
    const form = new FormData();
    const url = "http://localhost:4000/mining/getresponse";
    form.append("miner", miner);
    console.log("failed miner " + miner);
    axios
      .post(url, {
        minerName: form.get("miner"),
      })
      .then((res) => {
        console.log(res);
        if (count < 3) {
          changePQ();
          changeMiner();
          console.log("count= " + count);
        } else {
          setDisplayData(false);
          setTimeout(() => {
            handleMine();
          }, 10000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="text-center ">
          <h4 className="data-title">Data</h4>
          <textarea rows={20} cols={40} onChange={handleChange} />
          <br />
          <button className="mine-button mt-5 text-center" onClick={handleMine}>
            Mine
          </button>
        </div>
        {/* display generated random numbers after clicking mine.
                    display the Selected miner.
                    display yes or no for mine.
                */}
        {displayData ? (
          <div className="randomNumberSection mt-4">
            {/* display random numbers here */}
            {/* display priority queue here */}
            {/* display miner and */}
            <h3 className="randomTitle">Random Numbers:</h3>
            <div className="randnum-section ml-2">
              {randomNumbers?.map((Miner) => {
                return (
                  <div className="randnum" key={Miner._id}>
                    {Miner.nameName} --{">"}
                    <span className="number"> {Miner.randomNumber}</span>
                  </div>
                );
              })}
            </div>
            <h3 className="randomTitle mt-2">Priority Queue</h3>
            <div className="randnum-section">
              {priorityqueue?.map((Miner) => {
                return (
                  <div className="randnum" key={Miner._id}>
                    {Miner.nameName} --{">"}
                    <span className="number"> {Miner.randomNumber}</span>
                  </div>
                );
              })}
            </div>
            <div className="Mine">
              <h4 className="randomTitle mt-2">Selected Miner</h4>
              {/* <h3 className="MinerTitle randnum-section">{priorityqueue.length!=0?priorityqueue[0].nameName:"dummy"}</h3> */}
              <h3 className="MinerTitle randnum-section">{miner}</h3>
              <button className="btn btn-success" onClick={successMine}>
                Mine
              </button>
              {/* <button className="btn btn-danger" onClick={failMine}>No</button> */}
              <div className="timer-wrapper">
                <CountdownCircleTimer
                  isPlaying
                  duration={6}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[10, 6, 3, 0]}
                  onComplete={() => {
                    // do your stuff here
                    failMine();
                    return { shouldRepeat: true, delay: 2 }; // repeat animation in 1.5 seconds
                  }}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading"></div>
        )}
        {/* {
                    available?
                    <Redirect to="/"></Redirect>
                    :
                    <>
                    </>
                } */}
      </div>
    </div>
  );
};

export default MineBlock;
