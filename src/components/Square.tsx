import React from "react";

const { useState, useEffect } = React;
export default function Square(props: {
  idx: number;
  isInit: boolean;
  start: () => void;
  step1ed: boolean; // 是否已经点击了第一步
  setStep1ed: (step: boolean) => void;
  step1: number; // 第一步的位置
  setStep1: (step1: number) => void;
  step2ed: boolean; // 是否已经点击了第二步
  setStep2ed: (step: boolean) => void;
  step2: number; // 第二步的位置
  setStep2: (step2: number) => void;
  willRemove: { idx: number; exist: boolean }; // 是否将要消除
  setWillRemove: (willRemove: { idx: number; exist: boolean }) => void;
  setRemoved: (removed: boolean) => void;
}): JSX.Element {
  const {
    idx,
    isInit,
    start,
    step1ed,
    setStep1ed,
    step1,
    setStep1,
    step2ed,
    setStep2ed,
    step2,
    setStep2,
    willRemove,
    setWillRemove,
    setRemoved,
  } = props;
  const [highlight, setHighlight] = useState(true);
  const [exist, setExist] = useState(true);

  useEffect(() => {
    if (idx < 15 || idx > 35) if (idx % 7 > 5 || idx % 7 < 3) setExist(false); // 判断是否在棋盘外
    if (idx === willRemove.idx && highlight)
      setWillRemove({ ...willRemove, exist: true }); // 判断是否将要消除
    else if (idx === willRemove.idx && !highlight) setStep2ed(false); //不合理则重置第二步
  }, [idx, willRemove, highlight]);

  const judge = (step1: number): boolean => {
    if (
      step1 - 2 === idx ||
      step1 + 2 === idx ||
      step1 - 14 === idx ||
      step1 + 14 === idx
    )
      return true;
    else return false;
  }; // 判断是否可以执行第二步

  const handleClick = () => {
    if (isInit) {
      start();
      setHighlight(false); // 开始游戏后,第一颗棋子直接消失
    } else {
      if (!step1ed && highlight) {
        // 如果第一步没有被执行,且棋子可以被点击,则点击执行第一步
        setStep1(idx);
        setStep1ed(true);
      } else if (!step2ed)
        if (judge(step1) && !highlight) {
          // 如果第一步已经被点击,但是第二步没有被执行
          // 如果可以执行第二步
          setStep2(idx);
          setStep2ed(true);
        } else setStep1(idx); // 如果不可以执行第二步,则重新执行第一步
    }
  };

  useEffect(() => {
    if (willRemove.exist)
      if (willRemove.idx === idx) {
        // 如果将要消除的棋子是当前棋子
        setHighlight(false);
        setRemoved(true);
      } else if (step1 === idx) {
        setHighlight(false);
      } else if (step2 === idx) {
        setHighlight(true);
      }
  }, [willRemove, step1, step2]);

  if (exist)
    return (
      <div className="square">
        {exist && (
          <div
            className={highlight ? "pieces" : "blank"}
            onClick={handleClick}
          ></div>
        )}
      </div>
    );
  else return <div></div>;
}
