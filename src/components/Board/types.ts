import { ChipPositions } from "../App/types"

export interface Props {
    columns : number;
    rows : number;
    chipPositions : ChipPositions;
    onTileClick : (id : string) => any;
}