import { Accordion } from "react-bootstrap";
import Inventory from "./InventoryDropdown";

export default function CharDropdown(character) {
    return (
        <Accordion defaultActiveKey='0'>
            <Accordion.Item eventKey="0">
                <Accordion.Header> Char 1 </Accordion.Header>
                <Accordion.Body>
                    Money: 123
                    Buy/Sell Orders
                    <Inventory character={character} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}