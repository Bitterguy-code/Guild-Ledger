import { Accordion } from "react-bootstrap";
import Inventory from "./InventoryDropdown";
import { useState } from "react";

export default function CharDropdown({ character }) {
    const [activeKey, setActiveKey] = useState(null)
    
    return (
        <Accordion activeKey={ activeKey } onSelect={(key) => (setActiveKey(key))}>
            <Accordion.Item eventKey="character">
                <Accordion.Header>{character.name}</Accordion.Header>
                <Accordion.Body>
                    Buy/Sell Orders
                    <br />
                    <Inventory character={character} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}