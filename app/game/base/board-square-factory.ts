import { SquareItem } from "../../utils/game-engine-service";

abstract class SquareFactory {
  abstract createSquare(data: Partial<SquareItem>): SquareItem;
}
export class SquareItemFactory implements SquareFactory {
  createSquare(data: Partial<SquareItem>): SquareItem {
    return {
      name: data.name || '',
      id: data.id || '',
      checked: data.checked || false,
      pending: data.pending || false,
      disabled: data.disabled || false,
      color: data.color || '#3b5998',
      whoWon: '',
    };
  }
}
