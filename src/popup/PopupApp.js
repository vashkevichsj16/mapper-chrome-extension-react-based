import '../App.css';
import {Button, FormControlLabel, Switch} from "@material-ui/core";

function PopupApp() {

  return (
    <div className="App" style={{width: "300px", height: "300px"}}>
        <h1>Контроли плагина</h1>
        <div>
            <FormControlLabel
                control={
                    <Switch
                        // checked={state.checkedB}
                        // onChange={handleChange}
                        // color="primary"
                        name="openMap"
                        inputProps={{ 'aria-label': 'Open map window' }}
                    />
                }
                label="open Map"
            />
            <FormControlLabel
                control={
                    <Switch
                        // checked={state.checkedB}
                        // onChange={handleChange}
                        // color="primary"
                        name="autoMoving"
                        inputProps={{ 'aria-label': 'autoMoving' }}
                    />
                }
                label="autoMoving"
            />
            <Button onClick={() => {
                chrome.runtime.sendMessage(
                    {
                        action: {
                            type: "CLEAR_THE_MAP",
                            payload: {
                                x: 100,
                                y: 100
                            }
                        }},
                    function (response) {
                        console.log("Send to request to clear the map")
                    });
            }}>Click me</Button>
        </div>
    </div>
  );
}

export default PopupApp;
