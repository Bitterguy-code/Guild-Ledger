import { PureComponent, useState } from "react";
import { Accordion, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import {Currency} from './utils'


function itemTooltip(item, orders) {
    const vendorValue = Currency(item.vendor_value);
    let sellAmount = 0
    let buyAmount = 0
    let orderPrice = 0
    
    for (let order in orders) {
        if (item.name === orders[order].name) {
            buyAmount = orders[order].buy
            sellAmount = orders[order].sell
            orderPrice = Currency(orders[order].price)
        }       
    }
        
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
    const orders = character.orders
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
                                    overlay={itemTooltip(item, orders)}
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