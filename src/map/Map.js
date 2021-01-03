import '../App.css';
import * as React from 'react';
import {Container} from "@material-ui/core";

const Map = ({mapModel}) => {

    function getWidth(mapModel) {
        return (mapModel.labSize.x * (mapModel.cellSize + 2));
    }

    function getHeight(mapModel) {
        return (mapModel.labSize.y * (mapModel.cellSize + 2));
    }

    function calculateScrollX(mapModel) {
        let elementHeight = getWidth(mapModel);
        let windowWidth = window.innerWidth;
        let aprOffsetX = mapModel.playerPosition.x * (mapModel.cellSize + 2) - windowWidth / 2;
        if ((aprOffsetX + windowWidth / 2 + mapModel.cellSize - 2) > elementHeight) {
            return elementHeight - windowWidth / 2 - mapModel.cellSize - 2;
        }
        return aprOffsetX;
    }

    function calculateScrollY(mapModel) {
        let elementHeight = getHeight(mapModel);
        let windowHeight = window.innerHeight;
        let aprOffsetY = mapModel.playerPosition.y * (mapModel.cellSize + 2) - windowHeight / 2;
        if ((aprOffsetY + windowHeight / 2 + mapModel.cellSize - 2) > elementHeight) {
            return elementHeight - windowHeight / 2 - mapModel.cellSize - 2;
        }
        return aprOffsetY;
    }

    return (
        <div className="Map" style={{
            width: "600px",
            height: "350px",
            overflow: "hidden",
            scroll: "1000, 1000"
        }}
             scrollTop={"500px"}
        >
            <Container className="MapContainer" style={{
                width: getWidth(mapModel) + "px",
                height: getHeight(mapModel) + "px",
                padding: "0",
                margin: "0",
                backgroundColor: "#606060",
                marginTop: -calculateScrollY(mapModel) + "px",
                marginLeft: -calculateScrollX(mapModel) + "px"
            }}>
                {mapModel.cells.map((row) =>
                    <div className="mapRow">
                        {
                            row.map((col) =>
                                <div className="mapCol" id={col.x + "_" + col.y} style={{
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
