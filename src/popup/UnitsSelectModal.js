import * as React from "react";
import {useState} from "react";
import {Modal, Row, Button} from "react-bootstrap";
import {Container} from "@material-ui/core";
import ImagePicker from 'simple-react-image-picker'
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

    //TODO
    // Доделать эту штуку, чтобы сетался isSelected в картинках, для того чтобы пики работыли
    // Нужно прокидывать флаг уже в самих картинках
    const onPick = (images, list) => {
        selectedUnits[list] = images.map(
            el => (el.value)
        )
        setSelectedUnits(selectedUnits)
    }

    const onPickDrake = (images) => {
        onPick(images, "drakes")
    }
    const onPickLord = (images) => {
        onPick(images, "lords")
    }
    const onPickDame = (images) => {
        onPick(images, "dames")
        console.log(selectedUnits);
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
                                images={availableUnits.drakes.map((image) => ({
                                    src: image.src,
                                    value: image.id
                                }))}
                                pickHandler={onPickDrake}
                                multiple
                            />
                        </Row>
                        <Row>
                            <ImagePicker
                                images={availableUnits.lords.map((image) => ({
                                    src: image.src,
                                    value: image.id
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
                                    isSelected:true
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