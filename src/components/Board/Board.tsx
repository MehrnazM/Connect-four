import React from "react"
import styles from "./Board.module.css"
import { Props } from "./types"
import Column from "../Column/Column"

class Board extends React.PureComponent <Props> {
    render(){

        const { columns, rows, chipPositions, onTileClick = () => {} } = this.props
        const numbers = Array.from(Array(columns).keys())
        const columnComponents = numbers.map(number => {
            return(
                <Column key={number} column={number} rows={rows} chipPosition={chipPositions} onTileClick={onTileClick}/>
            )
        })

        return(
            <div className={styles.board}>
                {columnComponents}
            </div>
        )
    }
}

export default Board