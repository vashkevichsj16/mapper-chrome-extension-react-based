import '../App.css';
import Map from "./Map";
import {useEffect, useState} from "react";

const MapApp = () => {

    let cells = []
    for (let i = 0; i < 100; i++) {
        cells.push([]);
        for (let j = 0; j < 100; j++) {
            cells[i].push({
                x: i + 1,
                y: j + 1,
                borders: {
                    left: "red",
                    right: "red"
                }
            });
        }
    }
    const [mapModel, setMapModel] = useState({
        cells: cells,
        playerPosition: {
            x: 55,
            y: 83
        },
        cellSize: 28,
        labSize: {
            x: 100,
            y: 100
        }
    });
    return (
        <div className="App" style={{width: "600px", height: "350px", overflow: "hidden"}}>
            <Map mapModel={mapModel}/>
        </div>
    );
}

export default MapApp;
