import { ChipPositions } from "./types"

const lineCompute = (first : number, second : number, chipPositions : ChipPositions, vertically : boolean) => {

    for(let i = 0; i < first; i++){
        let repCountStat = { playerChip : "", count: 0 }
        for(let j = 0; j < second; j++){
            
            const chip = (vertically)?chipPositions[`${i}:${j}`]:chipPositions[`${j}:${i}`]
                if(chip && chip === repCountStat.playerChip){
                    repCountStat.count++
                }
                else{
                    repCountStat = {playerChip : chip , count : 1}
                }

                if(repCountStat.count === 4){
                    
                    return `${repCountStat.playerChip} won!`
                }
        }
    }
}


const diagonalCompute = (rows : number, columns : number, chipPositions : ChipPositions, rtl : boolean) => {
    
    for(let row=3; row<rows;row++){
        let repCountStat = { playerChip : "", count: 0 }
        for(let column=(rtl)?0:columns-1, newRow=row; ((rtl)?column < columns:column>=0) && newRow>=0; newRow--,((rtl)?column++:column--)){
            const chip = chipPositions[`${newRow}:${column}`]
            if(chip && chip === repCountStat.playerChip){
                repCountStat.count++
            }
            else{
                repCountStat = {playerChip : chip , count : 1}
            }

            if(repCountStat.count === 4){
                
                return `${repCountStat.playerChip} won!`
            }
        }
    
        for(let column=(rtl)?1:columns-2; (rtl)?column<columns-3:column>2;(rtl)?column++:column--){
            let repCountStat = { playerChip : "", count: 0 }
            for(let newColumn=column, row=rows-1; ((rtl)?newColumn < columns:newColumn>=0) && row>=0; row--,(rtl)?newColumn++:newColumn--){
                const chip = chipPositions[`${row}:${newColumn}`]
                if(chip && chip === repCountStat.playerChip){
                    repCountStat.count++
                }
                else{
                    repCountStat = {playerChip : chip , count : 1}
                }
    
                if(repCountStat.count === 4){
                    
                    return `${repCountStat.playerChip} won!`
                }
            }
        }    
    }    
    
}

export   { lineCompute , diagonalCompute }