import { PureComponent, useState } from "react";
import { Accordion, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import {Currency} from './utils'


function itemTooltip(item) {
    const value = Currency(item.vendor_value);
    const buyValue = item.buy ? Currency(item.buy.price) : null;
    const sellValue = item.sell ? Currency(item.sell.price) : null;

    return(
        <Tooltip id="item-tooltip">
            {item.name}
            <br />
            Vendor: {value.gold}g {value.silver}s {value.copper}c
            {item.buy.amount && (
                <>
                    <br />
                    Buy: {item.buy.amount} @ {buyValue.gold}g {buyValue.silver}s {buyValue.copper}c
                </>
            )}

            {item.sell.amount && (
                <>
                    <br />
                    Sell: {item.sell.amount} @ {sellValue.gold}g {sellValue.silver}s {sellValue.copper}c
                </>
            )}
            
        </Tooltip>
    )

}

export default function Inventory({ character }) {
    const [activeKey, setActiveKey] = useState(null)
    return(
        <Accordion
            activeKey={ activeKey }
            onSelect={(key) => (setActiveKey(key))}
        >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Inventory</Accordion.Header>
                <Accordion.Body>
                    <Container fluid>
                        <Row className="g-2 flex-nowrap overflow-auto">
                            {character.inventory.map((item, index) => (
                            
                                <OverlayTrigger key={index}
                                    placement="right"
                                    delay={{ show: 125, hide: 200 }}
                                    overlay={itemTooltip(item)}
                                >
                                    <Col key={index} xs="auto">
                                        <img
                                            src={item.icon}
                                            width="64"
                                            height="64"
                                        />
                                    </Col>
                                </OverlayTrigger>
                            ))}
                        </Row>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
        </Accordion>
    )
}