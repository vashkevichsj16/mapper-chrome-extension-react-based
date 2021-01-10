import * as React from "react";
import {Tooltip} from "@material-ui/core";
import {useState} from "react";

const Cell = ({playerPosition, cellInfo}) => {

    const [drops, setDrops] = useState(
        (typeof cellInfo.drops !== 'undefined' &&  cellInfo.drops !== null) ?
            Object.values(cellInfo.drops).map((drop) => drop.right)
                .join(", ")
            : ""
    )

    return (
        <div
            className={
                "mapCol " + (
                    (cellInfo.x === playerPosition.x && cellInfo.y === playerPosition.y) ?
                        "cellSelected" : ""
                )
            }
            id={cellInfo.x + "_" + cellInfo.y} style={{
            borderLeftColor: cellInfo.borders.left,
            borderRightColor: cellInfo.borders.right,
            borderTopColor: cellInfo.borders.top,
            borderBottomColor: cellInfo.borders.bottom,
        }}>
            <p>{cellInfo.x < 100 ? cellInfo.x : cellInfo.x / 10},
                {cellInfo.y < 100 ? cellInfo.y : cellInfo.y / 10}</p>
            {(typeof cellInfo.drops !== 'undefined' &&  cellInfo.drops !== null && Object.values(cellInfo.drops).length > 0) ?
                    <Tooltip
                        key = {cellInfo.x + "_" + cellInfo.y + cellInfo.drops.length}
                        title={
                            drops
                        }
                    >
                        <p>*</p>
                    </Tooltip> : ""
            }
        </div>
    );
};

export default Cell;
