import { useLayoutEffect, useState } from "react";
import { Button, Text } from "@mantine/core";
import CustomInput from "./layouts/CustomInput";

import { data } from "./wheelData";
import TableData from "./layouts/TableData";

function App() {
  const [time, setTime] = useState(0);
  const [initialMoney, setInitialMoney] = useState(1000);
  const [blackBet, setBlackBet] = useState(100);
  const [greenBet, setGreenBet] = useState(10);
  const [timePerRound, setTimePerRound] = useState(1);
  const [monteCarloData, setMonteCarloData] = useState([]);
  const [isDataProcessed, setIsDataProcessed] = useState(false);
  const [finalResults, setFinalResults] = useState([]);
  const probability = 1 / 37;

  const startSimulation = () => {
    setupCDF();

    if (isDataProcessed) {
      let finalResultsData = [];
      let cash = initialMoney;
      let counter = 0;

      while (cash > 0) {
        let round = matchInRange();
        let bet100 = false;
        let bet10 = false;
        let outCome = 0;
        let balance = cash;

        cash = cash - (blackBet + greenBet);
        if (round?.color === "black") {
          outCome += blackBet;
          outCome -= greenBet;
          bet100 = true;
        }
        if (round?.color === "green") {
          outCome += greenBet;
          outCome -= blackBet;
          bet10 = true;
        }

        cash -= outCome;

        counter++;

        finalResultsData.push({
          round: counter,
          spin: round?.name,
          bet100: bet100,
          bet10: bet10,
          outCome: -outCome,
          balance: balance,
          final: cash,
        });
      }

      setFinalResults(finalResultsData);
      setTime(counter * timePerRound);
    }

    setIsDataProcessed(true);
  };

  useLayoutEffect(() => {
    sortData();
  }, []);

  const sortData = () => {
    let newData = [];

    data.forEach((items) => {
      items.values.forEach((item) => {
        newData.push({
          name: item,
          color: items.color,
          probability: probability,
        });
      });
    });

    newData.sort((a, b) => {
      return a.name - b.name;
    });

    setMonteCarloData(newData);
  };

  const setupCDF = () => {
    let cdfData = [];
    let previousCDF = 0;

    monteCarloData.forEach((item) => {
      const currentCDF = probability + previousCDF;
      previousCDF = currentCDF;

      cdfData.push({
        name: item.name,
        color: item.color,
        probability: item.probability,
        cdf: currentCDF,
      });
    });

    setMonteCarloData(cdfData);
  };

  const matchInRange = () => {
    const randomNumber = Math.random();
    // console.log(randomNumber);
    let nextCDF = monteCarloData[monteCarloData.length - 1].cdf;
    for (let i = monteCarloData.length; i >= 0; i--) {
      if (randomNumber >= monteCarloData[i]?.cdf && randomNumber <= nextCDF) {
        // matchedData = monteCarloData[i];
        return monteCarloData[i];
        // console.log(monteCarloData[i]);
      }
      nextCDF = monteCarloData[i]?.cdf;
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div style={{ margin: "auto" }}>
          <Text ta="center" fz="xl" fw="bold">
            Monte Carlo Simulation
          </Text>
          <CustomInput
            label={"Money"}
            defaultValue={initialMoney}
            placeHolder={"Enter amount"}
            valueChange={setInitialMoney}
          />
          <CustomInput
            label={"Bet for Black"}
            defaultValue={blackBet}
            placeHolder={"Enter amount"}
            valueChange={setBlackBet}
          />
          <CustomInput
            label={"Bet for Green"}
            defaultValue={greenBet}
            placeHolder={"Enter amount"}
            valueChange={setGreenBet}
          />
          <CustomInput
            label={"Minutes per Round"}
            defaultValue={timePerRound}
            placeHolder={"Enter value in minutes"}
            valueChange={setTimePerRound}
          />
          <Button onClick={startSimulation} style={{ marginTop: "0.500rem" }}>
            {isDataProcessed ? "Simulate!" : "Click to process data"}
          </Button>

          <Text style={{ marginTop: "2rem" }} fw="bold">
            Total Playing Time: {time} minutes
          </Text>

          <TableData data={finalResults} />
        </div>
      </div>
    </>
  );
}

export default App;
