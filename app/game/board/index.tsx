import { SquareItem } from '@/app/utils/game-engine-service';
import '../../styles/scss/board.scss';
export default function Board({boardData, userHandler}: {boardData: SquareItem[], userHandler: any}) {
  return (
    <>
    <div className="main-template">
      <div className="game-field">
        {boardData.map((item: SquareItem) => {
          return (
            <div onClick={() => userHandler(item)} key={item.id} style={{backgroundColor: item.color}} className={`item ${item.checked ? item.whoWon : item.pending ? 'pending' : ''}`}>
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}