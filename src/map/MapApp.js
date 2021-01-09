import '../App.css';
import Map from "./Map";

const MapApp = ({mapModel}) => {
    console.log("Setting states in map")
    return (
        <div className="App" style={{width: "600px", height: "350px", overflow: "hidden"}}>
            <Map mapModelIn={mapModel}/>
        </div>
    );
}

export default MapApp;
