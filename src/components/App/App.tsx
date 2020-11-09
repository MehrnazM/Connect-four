import React from "react"
import styles from "./App.module.css"
import { Props, ChipPositions, State } from "./types"
import Board from "../Board/Board"

class App extends React.PureComponent <Props, State>{

    state: State = {
        chipPositions : {},
        playerTurn: "red",
        gameStatus: "It's red's turn",
        finish : false
    }

    calculateGameStatus = (playerTurn: string, chipPositions: ChipPositions):string => {

        const { columns , rows } = this.props
        let repCountStat = { playerChip : "", count: 0 }

        //vertically
        for(let row=0; row<rows; row++){
            
            repCountStat = { playerChip : "", count: 0 }
            for(let column=0; column<columns; column++){
                const chip = chipPositions[`${row}:${column}`]
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

        //horizontally
        for(let column=0; column<columns; column++){
            
            repCountStat = { playerChip : "", count: 0 }
            for(let row=0; row<rows; row++){
                const chip = chipPositions[`${row}:${column}`]
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
        
        repCountStat = { playerChip : "", count: 0 }
        
        //diagnoally (from right to left)
        for(let column=0, row=0; column<columns && row<rows; column++,row++){
            
            
            const chip = chipPositions[`${row}:${column}`]
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
        
        repCountStat = { playerChip : "", count: 0 }
        
        //diagnoally (from left to right)
        for(let column=0, row=rows-1; column<columns && row>=0; column++,row--){
            
            
            const chip = chipPositions[`${row}:${column}`]
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
        //TODO
        return `It's ${playerTurn}'s turn`
    }

    handleTileClick = (tileId: string) => {

        const { chipPositions, playerTurn } = this.state
        const column = parseInt(tileId.split(":")[1])
        let lastEmptyTileId = this.getLastEmptyTile(column)
        
        if(!lastEmptyTileId){
            return
        }
        const updateChipPositions = {
            ...chipPositions,
            [lastEmptyTileId] : playerTurn
        }
        
        const newPlayer = (playerTurn === "red")? "yellow":"red"
        const newGameStatus = this.calculateGameStatus(newPlayer,updateChipPositions)
        const updatedFinish = (newGameStatus.includes("won"))?true:false
        this.setState({
            chipPositions : updateChipPositions,
            playerTurn : newPlayer,
            gameStatus : newGameStatus,
            finish : updatedFinish
        })
    }

    getLastEmptyTile = (column: number) =>{

        const {rows} = this.props
        const {chipPositions} = this.state
        for(let row=rows-1; row>=0; row--){
            const tileId = `${row}:${column}`
            if(!chipPositions[tileId]){
                return tileId
            }
        }
    } 

    render(){
        const finish = this.state.finish
        const { columns, rows } = this.props
        let output
        if(!finish){
            output = <div className={styles.app}>
                        <Board columns={columns} rows={rows} chipPositions={this.state.chipPositions} onTileClick={this.handleTileClick} />
                        <div className={styles.statusMessage}>
                            {this.state.gameStatus}
                        </div>
                    </div>
        }
        else{
            output = <div className={styles.statusMessage}>
                        {this.state.gameStatus}
                     </div>
        }
        return(
            <div>
                {output}    
            </div>
        )   
    }
}

export default App