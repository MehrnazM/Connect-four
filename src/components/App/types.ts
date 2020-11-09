
export interface ChipPositions {
    [key : string] : Player;
}

export type Player = "red" | "yellow" | "";

export interface Props {
    columns : number;
    rows : number;
}

export interface State {
    chipPositions : ChipPositions;
    gameStatus : string;
    playerTurn : Player;
    finish : boolean;
}