import * as React from "react";
import {useState} from "react";
import {Modal, Row, Button} from "react-bootstrap";
import {Container} from "@material-ui/core";
import ImagePicker from 'react-image-picker'
import "react-image-picker/dist/index.css"
import 'bootstrap/dist/css/bootstrap.css';
const UnitsSelectModal = ({availableUnitsList, selectedUnitsList}) => {

    const [show, setShow] = useState(false)
    const [selectedUnits, setSelectedUnits] = useState(
        typeof selectedUnitsList !== 'undefined' ? selectedUnitsList :
            {
                drakes: [],
                lords: [],
                dames: []
            });
    const [availableUnits, setAvailableUnits] = useState(beautifyUnits(availableUnitsList, selectedUnits))

    const handleClose = () => {
        chrome.runtime.sendMessage(
            {
                action: {
                    type: "UPDATE_PLAYER_SELECTED_UNITS",
                    payload: selectedUnits
                }
            },
            function (response) {
            });
        setShow(false)
    }
    const handleShow = () => {
        setShow(true)
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


    const onPick = (images, list) => {
        selectedUnits[list] = images.map(
            el => (el.value)
        )
        setSelectedUnits(selectedUnits)
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
                                onPick={onPickDrake}
                                images={availableUnits.drakes.map((image) => ({
                                    src: image.src,
                                    value: image.id
                                }))}
                                multiple
                            />
                        </Row>
                        <Row>
                            <ImagePicker
                                onPick={onPickLord}
                                images={availableUnits.lords.map((image) => ({src: image.src, value: image.id}))}
                                multiple
                            />
                        </Row>
                        <Row>
                            <ImagePicker
                                onPick={onPickDame}
                                images={availableUnits.dames.map((image) => ({src: image.src, value: image.id}))}
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

function beautifyUnits(availableUnitsList, selectedUnitsList) {
    if (typeof availableUnitsList !== 'undefined' && typeof selectedUnitsList !== 'undefined') {
        {
            return {
                drakes: beautifyList(availableUnitsList.drakes, selectedUnitsList.drakes),
                lords: beautifyList(availableUnitsList.lords, selectedUnitsList.lords),
                dames: beautifyList(availableUnitsList.dames, selectedUnitsList.dames)
            }
        }
    }
    return availableUnitsList;
}

function beautifyList(unitsList, selectedList) {
    return unitsList.map(
        el => ({
            ...el,
            selected: selectedList.includes(el.id)
        })
    )
}