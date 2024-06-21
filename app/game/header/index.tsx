import { number } from 'zod';
import '../../styles/scss/header.scss';
export default function Header({scoreUser, scoreComputer, gameSpeed}: {scoreUser: number, scoreComputer: number, gameSpeed: number}) {
  return (
  <>
    <div className="header">
      <h1>Game</h1>
        <div className="score-field">
          <div className="score-title"><b>Score</b></div>
            <div className="score-wrap">
              <div className="score-item"><span>Computer:</span><span>{scoreComputer}</span></div>
              <div className="score-item"><span>User:</span><span>{scoreUser}</span></div>
            </div>
        </div>
    </div>
    <div className="speed-info">game speed: {gameSpeed}ms</div>
  </>
  );
}