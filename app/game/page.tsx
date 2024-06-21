'use client';
import { useState } from "react";
import useGameEngine from "../utils/game-engine-service";
import Board from "./board";
import Footer from "./footer";
import Header from "./header";
import EndGameModal from "./modals/end-game-modal";

export default function Page() {
  const {
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
  } = useGameEngine();
  return (
    <>
    <Header scoreUser={scoreUser} scoreComputer={scoreComputer} gameSpeed={gameSpeed} />
    <Board boardData={data} userHandler={userHandler} />
    <Footer playRound={playRound} restartGame={restartGame}/>
    <EndGameModal show={restartGameCond} close={setRestartGameCond} />
    </>
  );
}