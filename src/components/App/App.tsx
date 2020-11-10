import React from "react"
import styles from "./App.module.css"
import { Props, ChipPositions, State } from "./types"
import Board from "../Board/Board"
import { lineCompute, diagonalCompute} from "./Compute"

class App extends React.PureComponent <Props, State>{

    state: State = {
        chipPositions : {},
        playerTurn: "red",
        gameStatus: "It's red's turn",
        finish : false
    }

    calculateGameStatus = (playerTurn: string, chipPositions: ChipPositions):string => {

        const { columns , rows } = this.props
        
        //vertically
        let res = lineCompute(rows,columns,chipPositions, true)
        if(res){
            return res
        }
        //horizontally
        res = lineCompute(columns,rows,chipPositions, false)
        if(res){
            return res
        }
        //diagonally, right to left
        res = diagonalCompute(rows,columns,chipPositions,true)
        if(res){
            return res
        }
        //diagonally,left to right
        res = diagonalCompute(rows,columns,chipPositions,false)
        if(res){
            return res
        }
 
        return `It's ${playerTurn}'s turn`
    }

    handleTileClick = (tileId: string) => {

        const { chipPositions, playerTurn } = this.state
        console.log(tileId)
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