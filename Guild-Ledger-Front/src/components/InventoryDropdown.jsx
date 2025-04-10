import { PureComponent } from "react";
import { Accordion, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import Currency from './utils'


function itemTooltip(item) {
    const value = Currency(item.price)
    const renderTooltip = (item) => {
        <Tooltip id="item-tooltip" {...item}>
            {item.name}
            <br />
            Vendor: {value.gold}g {value.silver}s {value.copper}c
            {item.buy ? buyValue = Currency(item.buy.price) & <br /> & <p>Buy: {item.buy.amount} @ {buyValue.gold}g {buyValue.silver}s {buyValue.copper}c</p> : pass}
            {item.sell ? sellValue = Currency(item.sell.price) & <br /> & <p>Buy: {item.sell.amount} @ {sellValue.gold}g {sellValue.silver}s {sellValue.copper}c</p>: pass}
        </Tooltip>
    }

    return(renderTooltip)
}

export default function Inventory (character) {
    return() => {
        <Accordion>
            <Container fluid>
                <Row>
                    {character.inventoy.map((item, index) => {
                        {const itemTooltip = itemTooltip(item)}
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={itemTooltip}
                        >
                            <Col>
                                <img
                                    src={item.icon}
                                    width="100"
                                    height="100"
                                />
                            </Col>
                        </OverlayTrigger>
                    })}
                </Row>
            </Container>
        </Accordion>
    }
}