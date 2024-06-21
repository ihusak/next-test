'use client';
import { useEffect, useState } from "react";
import { SquareItemFactory } from "../game/base/board-square-factory";

export interface SquareItem {
  name: string;
  id: string;
  checked: boolean;
  whoWon: string;
  pending: boolean;
  disabled: boolean;
  color?: string;
}

export enum whoWon {
  computer = 'computer',
  user = 'user'
}

const useGameEngine = () => {
  const [data, setData] = useState<SquareItem[]>([]);
  let [scoreComputer, setScoreComputer] = useState<number>(0);
  let [scoreUser, setScoreUser] = useState<number>(0);
  const [gameSpeed, setGameSpeed] = useState<number>(800);
  const [boardSize, setBoardSize] = useState<number>(100);
  const [restartGameCond, setRestartGameCond] = useState<boolean>(false);
  const [pendingGame, setPendingGame] = useState<boolean>(false);
  // const [filteredData, setFilteredData] = useState<SquareItem[]>();
  const [currentSquare, setCurrentSquare] = useState<SquareItem>();
  const [timeOut, _setTimeOut] = useState<any>();

  useEffect(() => {
    generateData(boardSize)
  }, [boardSize])

  // Generate random data for game
  const generateData = (size: number) => {
    const arr = [];
    const squareItemFactory = new SquareItemFactory();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < size; i++) {
      let uniqueId = '';
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueId += characters.charAt(randomIndex);
      }
      const newSquare = squareItemFactory.createSquare({
        name: `square${i + 1}`,
        id: uniqueId,
        checked: false,
        whoWon: '',
        pending: false,
        disabled: true
      });
      arr.push(newSquare);
    }
    setData(arr);
    // setFilteredData(arr);
    return arr;
  }
  const playRound = () => {
    setPendingGame(true);
    const filteredData = data.filter(item => item.checked !== true);
    console.log('scoreComputer', scoreComputer);
    if (filteredData.length === 0 || scoreComputer === 10 || scoreUser === 10) {
      if(currentSquare) {
        currentSquare.pending = false;
        currentSquare.disabled = true;
        setCurrentSquare(currentSquare);
      }
      endGame();
      clearTimeout(timeOut);
      return;
    }
    const randomSquare: SquareItem = filteredData![Math.floor(Math.random() * filteredData!.length)];
    randomSquare.pending = true;
    randomSquare.disabled = false;
    setCurrentSquare(randomSquare);
    _setTimeOut(setTimeout(() => {
      _defineWinner(randomSquare, whoWon.computer);
      if (scoreComputer < 10) {
        setScoreComputer(scoreComputer += 1);
        playRound();
      }
    }, gameSpeed))
  }
  const userHandler = (square: SquareItem) => {
    console.log(square);
    if (square.disabled) return;
    _defineWinner(square, whoWon.user);
    setScoreUser(scoreUser += 1);
    clearTimeout(timeOut);
    playRound();
  }
  const _defineWinner = (square: SquareItem, winner: whoWon) => {
    square.checked = true;
    square.pending = false;
    square.disabled = true;
    square.whoWon = winner;
  }
  const restartGame = () => {
    if (restartGameCond) {
      generateData(boardSize);
      setRestartGameCond(false);
      setScoreUser(0);
      setScoreComputer(0);
    }
    playRound();
  }
  const endGame = () => {
    setRestartGameCond(true);
    // const dialogRef = this.dialog.open(EndGamePopupComponent, {
    //   width: '350px',
    //   panelClass: 'end-game-popup',
    //   data: {scoreComputer: this.scoreComputer, scoreUser: this.scoreUser}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.restartGameCond = true;
    // });
    console.log('end game');
  }
  return {
    data, 
    setBoardSize, 
    userHandler, 
    playRound, 
    scoreUser, 
    scoreComputer, 
    gameSpeed, 
    restartGame, 
    restartGameCond,
    setRestartGameCond
  };
}

export default useGameEngine;