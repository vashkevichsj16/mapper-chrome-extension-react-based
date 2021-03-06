import '../App.css';
import * as React from 'react';
import {Container} from "@material-ui/core";
import {useState} from "react";

const Map = ({mapModel}) => {

    console.log("Setting states in mapDiv")
    const [playerPosition, setPlayerPosition] = useState(mapModel.playerPosition);

    const [offset, setOffset] = useState({
        xOffset: calculateScrollX(mapModel, playerPosition),
        yOffset: calculateScrollY(mapModel, playerPosition)
    });

    React.useEffect(() => {
        chrome.storage.onChanged.addListener(function(changes, namespace) {
            if (changes['playerPosition']
                && (
                    changes['playerPosition'].newValue.x !== playerPosition.x
                    || changes['playerPosition'].newValue.y !== playerPosition.y)
            ) {
                setPlayerPosition(changes['playerPosition'].newValue);
                setOffset({
                    xOffset: calculateScrollX(mapModel, changes['playerPosition'].newValue),
                    yOffset: calculateScrollY(mapModel, changes['playerPosition'].newValue)
                });
            }
        });
    }, []);

    function getWidth(mapModel) {
        return (mapModel.labSize.x * (mapModel.cellSize + 2));
    }

    function getHeight(mapModel) {
        return (mapModel.labSize.y * (mapModel.cellSize + 2));
    }

    function calculateScrollX(mapModel, playerPosition) {
        let elementWidth = getWidth(mapModel);
        let windowWidth = window.innerWidth;
        console.log("================");
        console.log("Inned Width " + windowWidth);
        console.log("Position X " + playerPosition.x);
        console.log("elementWidth X " + elementWidth);
        let aprOffsetX = playerPosition.x * (mapModel.cellSize + 2) - windowWidth / 2;
        console.log("aprOffsetX " + aprOffsetX);
        if ((aprOffsetX + mapModel.cellSize + 2) >= elementWidth - windowWidth) {
            return elementWidth - windowWidth;
        }
        if (aprOffsetX < 0) {
            console.log("return 0");
            return 0;
        }
        console.log("return " + aprOffsetX);
        return aprOffsetX;
    }

    function calculateScrollY(mapModel, playerPosition) {
        let elementHeight = getHeight(mapModel);
        let windowHeight = window.innerHeight;
        let aprOffsetY = playerPosition.y * (mapModel.cellSize + 2) - windowHeight / 2;
        console.log("================");
        console.log("Inned Height  " + windowHeight);
        console.log("Position Y " + playerPosition.y);
        console.log("aprOffsetY " + aprOffsetY);
        if ((aprOffsetY + mapModel.cellSize + 2) >= elementHeight - windowHeight) {
            return elementHeight - windowHeight;
        }
        if (aprOffsetY < 0) {
            console.log("return " + elementHeight - windowHeight / 2 - mapModel.cellSize - 2);
            return 0;
        }
        return aprOffsetY;
    }

    return (
        <div className="Map" style={{
            width: "600px",
            height: "350px",
            overflow: "hidden",
        }}
        >
            <Container className="MapContainer" style={{
                width: getWidth(mapModel) + "px",
                height: getHeight(mapModel) + "px",
                padding: "0",
                margin: "0",
                backgroundColor: "#606060",
                marginTop: -offset.yOffset + "px",
                marginLeft: -offset.xOffset + "px"
            }}>
                {mapModel.cells.map((row) =>
                    <div key={"row_" + row[0].y} id={"row_" + row[0].y} className="mapRow">
                        {
                            row.map((col) =>
                                <div
                                    className={
                                        "mapCol " + (
                                            (col.x === playerPosition.x && col.y === playerPosition.y) ?
                                                "cellSelected" : ""
                                        )
                                    }
                                    key={col.x + "_" + col.y} id={col.x + "_" + col.y} style={{
                                    borderLeftColor: col.borders.left,
                                    borderRightColor: col.borders.right,
                                    borderTopColor: col.borders.top,
                                    borderBottomColor: col.borders.bottom,
                                }}>
                                    {col.x}, {col.y}
                                </div>
                            )
                        }
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Map;