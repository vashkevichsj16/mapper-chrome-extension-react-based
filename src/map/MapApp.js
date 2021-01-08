import '../App.css';
import Map from "./Map";

const MapApp = (props) => {
    console.log("Setting states in map")
    return (
        <div className="App" style={{width: "600px", height: "350px", overflow: "hidden"}}>
            <Map mapModelIn={props.mapModel}/>
        </div>
    );
}

export default MapApp;
