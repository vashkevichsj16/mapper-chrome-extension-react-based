import '../App.css';
import * as React from 'react';
import {Container} from "@material-ui/core";
import {useState} from "react";
import Cell from "./Cell";

const Map = ({mapModelIn}) => {
    console.log("Setting states in mapDiv")
    const [playerPosition, setPlayerPosition] = useState({
        x: 1,
        y: 1
    });
    const [mapModel, setMapModel] = useState(mapModelIn);

    const [offset, setOffset] = useState({
        xOffset: calculateScrollX(mapModel, playerPosition),
        yOffset: calculateScrollY(mapModel, playerPosition)
    });

    React.useEffect(() => {
        chrome.storage.onChanged.addListener(function(changes, namespace) {
            if ("playerPosition" in changes && (
                    changes['playerPosition'].newValue.x !== playerPosition.x
                    || changes['playerPosition'].newValue.y !== playerPosition.y)
            ) {
                setPlayerPosition(changes['playerPosition'].newValue);
                setOffset({
                    xOffset: calculateScrollX(mapModel, changes['playerPosition'].newValue),
                    yOffset: calculateScrollY(mapModel, changes['playerPosition'].newValue)
                });
            }

            if ("mapModel" in changes) {
                setMapModel(changes['mapModel'].newValue);
                console.log("changing mapModel")
                console.log(mapModel)
            }
        });
    }, []);

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
                            row.map((cell) =>
                                <Cell playerPosition={playerPosition} cellInfo={cell} key={cell.x + "_" + cell.y}/>
                            )
                        }
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Map;

function getWidth(mapModel) {
    return (mapModel.labSize.x * (mapModel.cellSize + 4));
}

function getHeight(mapModel) {
    return (mapModel.labSize.y * (mapModel.cellSize + 4));
}

function calculateScrollX(mapModel, playerPosition) {
    let elementWidth = getWidth(mapModel);
    let windowWidth = window.innerWidth;
    let aprOffsetX = playerPosition.x * (mapModel.cellSize + 4) - windowWidth / 2;
    if ((aprOffsetX + mapModel.cellSize + 4) >= elementWidth - windowWidth) {
        return elementWidth - windowWidth;
    }
    if (aprOffsetX < 0) {
        return 0;
    }
    return aprOffsetX;
}

function calculateScrollY(mapModel, playerPosition) {
    let elementHeight = getHeight(mapModel);
    let windowHeight = window.innerHeight;
    let aprOffsetY = playerPosition.y * (mapModel.cellSize + 4) - windowHeight / 2;
    if ((aprOffsetY + mapModel.cellSize + 4) >= elementHeight - windowHeight) {
        return elementHeight - windowHeight;
    }
    if (aprOffsetY < 0) {
        return 0;
    }
    return aprOffsetY;
}