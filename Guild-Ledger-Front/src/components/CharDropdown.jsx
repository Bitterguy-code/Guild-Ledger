import { Accordion } from "react-bootstrap";
import Inventory from "./InventoryDropdown";
import { useState } from "react";
import OrderDropdown from "./OrderDropdown";

export default function CharDropdown({ character }) {
    const [activeKey, setActiveKey] = useState(null)
    
    return (
        <Accordion activeKey={ activeKey } onSelect={(key) => (setActiveKey(key))} className="gw2-accordion">
            <Accordion.Item eventKey="character">
                <Accordion.Header className="accordion-header">{character.name}</Accordion.Header>
                <Accordion.Body>
                    {/* <OrderDropdown character={character} /> */}
                    <br />
                    <Inventory character={character} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}