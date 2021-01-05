import '../App.css';
import {FormControlLabel, Switch} from "@material-ui/core";

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
        </div>
    </div>
  );
}

export default PopupApp;
