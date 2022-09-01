import * as React from "react";
import {useState} from "react";
import {Modal, Row, Button} from "react-bootstrap";
import {Container} from "@material-ui/core";
import ImagePicker from 'simple-react-image-picker'
import 'bootstrap/dist/css/bootstrap.css';

const UnitsSelectModal = ({availableUnitsList, reloadCall}) => {

    const [show, setShow] = useState(false)
    const [availableUnits, setAvailableUnits] = useState(availableUnitsList)
    const [state, setState] = useState(1);
    const handleChange = () => {
        setState(state + 1);
    };
    const handleClose = () => {
        chrome.runtime.sendMessage(
            {
                action: {
                    type: "UPDATE_PLAYER_FIGHT_UNITS",
                    payload: availableUnits
                }
            },
            function (response) {
                reloadCall();
            });
        setShow(false)
    }

    const handleShow = () => {
        setShow(true)
    }

    const onPick = (images, list) => {
        const ids = mapValues(images);
        availableUnits[list] = availableUnits[list].map(
            el => {
                if (containsIdInList(el.id, ids)) {
                    el.selected = true;
                    return el;
                } else {
                    el.selected = false;
                    return el;
                }
            }
        )
        setAvailableUnits(availableUnits)
        handleChange();
    }

    const mapValues = (list) => {
        return list.map(
            el => el.value
        );
    }

    const containsIdInList = (id, list) => {
        return list.includes(id);
    }

    const onPickDrake = (images) => {
        onPick(images, "drakes")
    }
    const onPickLord = (images) => {
        onPick(images, "lords")
    }
    const onPickDame = (images) => {
        onPick(images, "dames")
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <ImagePicker
                                images={
                                availableUnits.drakes.map((image) => ({
                                    src: image.src,
                                    value: image.id,
                                    isSelected: image.selected
                                }))}
                                pickHandler={onPickDrake}
                                multiple
                            />
                        </Row>
                        <Row>
                            <ImagePicker
                                images={availableUnits.lords.map((image) => ({
                                    src: image.src,
                                    value: image.id,
                                    isSelected: image.selected
                                }))}
                                pickHandler={onPickLord}
                                multiple
                            />
                        </Row>
                        <Row>
                            <ImagePicker
                                images={availableUnits.dames.map((image) => ({
                                    src: image.src,
                                    value: image.id,
                                    isSelected: image.selected
                                }))}
                                pickHandler={onPickDame}
                                multiple
                            />
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UnitsSelectModal;