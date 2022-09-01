import '../App.css';
import {Button, Container, FormControlLabel, Switch} from "@material-ui/core";
import {useState} from "react";
import * as React from "react";
import UnitsSelectModal from "./UnitsSelectModal";
import {Row} from "react-bootstrap";

function PopupApp({data}) {
    const [pickLoot, setPickLoot] = useState("pickLoot" in data ? data.pickLoot : false);
    const [availableUnits, setAvailableUnits] = useState(data.availableUnits)
    const [state, setState] = useState(1);
    const handleChange = () => {
        setState(state + 1);
    };
    const handleButtonsChange = (event) => {
        chrome.storage.local.set(
            {
                pickLoot: event.target.checked
            }, function () {
                setPickLoot(event.target.checked);
            }
        );
        console.log("handleChange", event.target.checked);
    };

    const reloadUnitsList = () => {
        chrome.storage.local.get("availableUnits", function (data) {
            setAvailableUnits(data);
            handleChange();
        });
    };

    React.useEffect(() => {
        chrome.storage.onChanged.addListener(function (changes, namespace) {

            if ("pickLoot" in changes) {
                setPickLoot(changes['pickLoot'].newValue);
                console.log("changing pickLoot to " + changes['pickLoot'].newValue);
            }
        });
    }, []);

    return (
        <div className="App" style={{width: "900px", height: "900px"}}>
            <Container>
                <h1>Контроли плагина</h1>
                <Row>
                    <FormControlLabel
                        control={
                            <Switch
                                // checked={state.checkedB}
                                // onChange={handleChange}
                                // color="primary"
                                name="openMap"
                                inputProps={{'aria-label': 'Open map window'}}
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
                                inputProps={{'aria-label': 'autoMoving'}}
                            />
                        }
                        label="autoMoving"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={pickLoot}
                                onChange={handleButtonsChange}
                                color="primary"
                                name="autoMoving"
                                inputProps={{'aria-label': 'autoMoving'}}
                            />
                        }
                        label="Pick Objects"
                    />
                </Row>

                <Row>
                    <Button variant="outlined" color="primary" onClick={() => {
                        chrome.runtime.sendMessage(
                            {
                                action: {
                                    type: "CLEAR_THE_MAP",
                                    payload: {
                                        x: 30,
                                        y: 30
                                    }
                                }
                            },
                            function (response) {
                                console.log("Send to request to clear the map")
                            });
                    }}>Restart map</Button>
                </Row>
                <Row>
                    <UnitsSelectModal reloadCall ={reloadUnitsList} availableUnitsList={availableUnits}/>
                </Row>
            </Container>
        </div>
    );
}

export default PopupApp;
