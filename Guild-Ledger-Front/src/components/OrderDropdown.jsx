import { Accordion } from "react-bootstrap";
import Inventory from "./InventoryDropdown";
import { useState } from "react";
import { Currency } from "./utils";

export default function OrderDropdown({ character }) {
    const [activeKey, setActiveKey] = useState(null)
    const orders = character.orders
    
    return(
        <>
        <Accordion activeKey={ activeKey } onSelect={(key) => (setActiveKey(key))}>
            <Accordion.Item eventKey="character">
                <Accordion.Header>Orders</Accordion.Header>
                <Accordion.Body>

                            {orders.map((order) => {
                                const name = order.name
                                const buy = order.buy
                                const sell = order.sell
                                const itemPrice = Currency(order.price)
                                return (
                                    <div key={name}>
                                        {
                                            buy > 0 && (
                                                <>
                                                    
                                                    Buy {buy}x {name} @ {itemPrice.gold}g {itemPrice.silver}s {itemPrice.copper}c
                                                </>
                                            )}

                                        {sell > 0 && (
                                            <>
                                                
                                                Sell {sell}x {name} @ {itemPrice.gold}g {itemPrice.silver}s {itemPrice.copper}c
                                            </>
                                        )}
                                    </div>  
                                        )
                            })}
                                    

                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            </>
    );
}