import { PureComponent, useState } from "react";
import { Accordion, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import {Currency} from './utils'


function itemTooltip(item) {
    const vendorValue = Currency(item.vendor_value);
    let sellAmount = 0
    let buyAmount = 0
    let orderPrice = 0
    
        
    return(
        <Tooltip id="item-tooltip">
            {item.name}
            <br />
            Vendor: {vendorValue.gold}g {vendorValue.silver}s {vendorValue.copper}c
            {buyAmount > 0 && (
                <>
                    <br />
                    Buy: {buyAmount} @ {orderPrice.gold}g {orderPrice.silver}s {orderPrice.copper}c
                </>
            )}
            
            {sellAmount > 0 && (
                <>
                    <br />
                    Sell: {sellAmount} @ {orderPrice.gold}g {orderPrice.silver}s {orderPrice.copper}c
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
            className="gw2-accordion"
        >
            <Accordion.Item eventKey="0" className="border-0">
                <Accordion.Header><span className="accordion-title">Inventor</span>y</Accordion.Header>
                <Accordion.Body className="p-2">
                    <Container fluid>
                        <Row className="g-2 flex-wrap overflow-auto">
                            {character.items.map((item, index) => (
                            
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