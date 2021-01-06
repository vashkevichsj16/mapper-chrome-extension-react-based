import '../App.css';
import Map from "./Map";
import {useEffect, useState} from "react";

const MapApp = (props) => {
    let cells = []
    for (let i = 0; i < 100; i++) {
        cells.push([]);
        for (let j = 0; j < 100; j++) {
            cells[i].push({
                key: i + 1 + " " + (j + 1),
                x: j + 1,
                y: i + 1,
                borders: {
                    left: "red",
                    right: "red"
                }
            });
        }
    }

    console.log("Setting states in map")
    const [mapModel, setMapModel] = useState({
        cells: cells,
        cellSize: 28,
        labSize: {
            x: 100,
            y: 100
        },
        playerPosition: props.playerPosition
    });
    return (
        <div className="App" style={{width: "600px", height: "350px", overflow: "hidden"}}>
            <Map mapModel={mapModel}/>
        </div>
    );
}

export default MapApp;
