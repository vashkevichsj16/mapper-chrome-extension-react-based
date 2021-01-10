import '../App.css';
import {Button, Container, FormControlLabel, Switch} from "@material-ui/core";
import {useState} from "react";
import * as React from "react";
import UnitsSelectModal from "./UnitsSelectModal";
import {Row} from "react-bootstrap";

function PopupApp({data}) {
    const [pickLoot, setPickLoot] = useState("pickLoot" in data ? data.pickLoot : false);
    const handleChange = (event) => {
        chrome.storage.local.set(
            {
                pickLoot: event.target.checked
            }, function () {
                setPickLoot(event.target.checked);
            }
        );
        console.log("handleChange", event.target.checked);
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
                                onChange={handleChange}
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
                    <UnitsSelectModal availableUnitsList={data.availableUnits}
                                      selectedUnitsList={data.selectedUnits}/>
                </Row>
            </Container>
        </div>
    );
}

export default PopupApp;
