import React from "react"
import Tile from "../Tile/Tile"
import styles from "./Column.module.css"
import { Props } from "./types"

class Column extends React.PureComponent <Props> {
    render(){

        const { column, rows, chipPosition, onTileClick = () => {} } = this.props
        const numbers = Array.from(Array(rows).keys())
        const tiles = numbers.map(number => {
            const tileId = `${number}:${column}`
            const chipType = chipPosition[tileId]
            return(
                <Tile key={tileId} id={tileId} chipType={chipType} onClick={onTileClick}/>
            )
        })

        return(
            <div className={styles.column}>
                {tiles}
            </div>
        )
    }
}


export default Column