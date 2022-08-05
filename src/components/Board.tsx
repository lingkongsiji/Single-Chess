import React from "react";
import Square from "./Square";

const square = new Array(49).fill(null);

const { useState, useEffect } = React;
export default function Board() {
  const [isInit, setIsInit] = useState(true);
  const start = () => {
    if (isInit) {
      setIsInit(false);
      return;
    }
  }; // 初始化棋盘,开始游戏
  const [step1, setStep1] = useState(25);
  const [step2, setStep2] = useState(25);
  const [step1ed, setStep1ed] = useState(false);
  const [step2ed, setStep2ed] = useState(false);
  const [willRemove, setWillRemove] = useState({idx:0,exist:false});
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (step1ed && step2ed) setWillRemove({...willRemove,idx:(step1 + step2) / 2});
  }, [step1ed, step2ed]);// 判断是否将要消除

  useEffect(() => {
    if (removed) {
      setStep1ed(false);
      setStep2ed(false);
      setWillRemove({idx:0,exist:false});
      setRemoved(false);
    }
  }, [removed]);// 消除后重置状态

  return (
    <div id="board">
      {square.map((value, idx) => {
        return (
          <Square
            key={idx}
            idx={idx + 1}
            isInit={isInit}
            start={start}
            step1ed={step1ed}
            setStep1ed={setStep1ed}
            step1={step1}
            setStep1={setStep1}
            step2ed={step2ed}
            setStep2ed={setStep2ed}
            step2={step2}
            setStep2={setStep2}
            willRemove={willRemove}
            setWillRemove={setWillRemove}
            setRemoved={setRemoved}
          />
        );
      })}
    </div>
  );
}
