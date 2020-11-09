import { ChipPositions } from "../App/types"

export interface Props {
    column : number;
    rows : number;
    chipPosition : ChipPositions;
    onTileClick : (id : string) => any;
}