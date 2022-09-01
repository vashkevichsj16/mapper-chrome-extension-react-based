import '../App.css';
import {Button, Container, FormControlLabel, Switch} from "@material-ui/core";
import {useState} from "react";
import * as React from "react";
import UnitsSelectModal from "./UnitsSelectModal";
import {Row} from "react-bootstrap";

function PopupApp({data}) {
    const [pickLoot, setPickLoot] = useState("pickLoot" in data ? data.pickLoot : false);
    const [autoMove, setAutoMove] = useState("autoMove" in data ? data.autoMove : false);
    const [openMap, setOpenMap] = useState("openMap" in data ? data.openMap : false);
    const [availableUnits, setAvailableUnits] = useState(data.availableUnits)
    const [state, setState] = useState(1);
    const handleChange = () => {
        setState(state + 1);
    };
    const handlePickChange = (event) => {
        chrome.storage.local.set(
            {
                pickLoot: event.target.checked
            }, function () {
                setPickLoot(event.target.checked);
            }
        );
    };
    const handleAutoMoveChange = (event) => {
        chrome.storage.local.set(
            {
                autoMove: event.target.checked
            }, function () {
                setAutoMove(event.target.checked);
            }
        );
    };
    const handleOpenMap = (event) => {
        chrome.storage.local.set(
            {
                openMap: event.target.checked
            }, function () {
                setOpenMap(event.target.checked);
            }
        );
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
            }
            if ("autoMove" in changes) {
                setAutoMove(changes['autoMove'].newValue);
            }
            if ("openMap" in changes) {
                setOpenMap(changes['openMap'].newValue);
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
                                checked={openMap}
                                onChange={handleOpenMap}
                                color="primary"
                                name="openMap"
                                inputProps={{'aria-label': 'Open map window'}}
                            />
                        }
                        label="open Map"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={autoMove}
                                onChange={handleAutoMoveChange}
                                color="primary"
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
                                onChange={handlePickChange}
                                color="primary"
                                name="autoPick"
                                inputProps={{'aria-label': 'autoPick'}}
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
