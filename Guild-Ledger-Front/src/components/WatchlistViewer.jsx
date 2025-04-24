import { useEffect, useState } from "react";
import { Accordion, Row, Col, Form, Button } from "react-bootstrap";
import SearchBar from "./searchbar";
import api from "../api";
import { Currency } from "./utils";


export default function WatchlistViewer({ character, refreshCharacters }) {
    const [selectedItem, setSelectedItem] = useState(null)
    const [formData, setFormData] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [localWatchlist, setLocalWatchlist] = useState(character.watchlist)
    const [outerAccordionKey, setOuterAccordionKey] = useState()
    const [innerAccordionKeys, setInnerAccordionKeys] = useState([])

    const handleOuterToggle = (key) => {
        setOuterAccordionKey(key)
    }

    const handleInnerAccordionToggle = (key) => {
        console.log("Inner accordion toggle:", key)
        console.log("Current innerAccordionKeys: ", innerAccordionKeys)
        if (Array.isArray(key)) {
            console.log("setting inner accordion key directly to: ", key)
            setInnerAccordionKeys(key)
        }
        setInnerAccordionKeys(prev => {
            const newKeys = prev.includes(key) ? 
            prev.filter(k => k !== key) : 
            [...prev, key];
        console.log("New innerAccordionKeys:", newKeys);
        return newKeys;
        }
        )
    }

    const handleRefresh = async () => {
        await refreshCharacters()
        
    }

    useEffect(() => {
        setLocalWatchlist(character.watchlist)
    }, [character.watchlist])

    const getTextColor = (set, yesterday, action) => {
        if (action === 'buy') {
            if (set > yesterday) {
                return 'text-success'
            } else {
                return 'text-primary'
            }
        } else if (action === 'sell') {
            if (set < yesterday) {
                return 'text-success'
            } else {
                return 'text-primary'
            }
        }
    }

    const handleItemSelect = async (item) => {
        try {
            setSelectedItem(item)
        } catch (error) {
            console.error('Error loading history: ', error)
        }
    }

    const handleChange = (e) => {
        const value = e.target.value === '' ? 0 : Number(e.target.value)
        setFormData({...formData, [e.target.name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
   
        try {
            console.log(formData)
            const buyGold = formData.buy_gold || 0
            const buySilver = formData.buy_silver || 0
            const buyCopper = formData.buy_copper || 0
            const sellGold = formData.sell_gold || 0
            const sellSilver = formData.sell_silver || 0
            const sellCopper = formData.sell_copper || 0

            const buy_point = buyGold * 10000 + buySilver * 100 + buyCopper
            const sell_point = sellGold * 10000 + sellSilver * 100 + sellCopper
    
            console.log("buy_point", buy_point)
            console.log("sell_point",sell_point)

            const response = await api.post(`watchlist/modify/${selectedItem.id}/`,
                {
                    character_id: character.id,
                    buy_point: buy_point || null,
                    sell_point: sell_point || null
                }
            )
            if (response.status === 200) {
                await handleRefresh()
            } 
        } catch (error) {
            console.error('Update failed:', error.response?.data)
            console.log('Form data: ', formData)
        } finally {
            setIsSubmitting(false)
    }         
    }


    
    const handleDelete = async(character, watchlist_item) => {
        const response = await api.delete(`watchlist/delete/${watchlist_item.id}/`, {
            data: {character_id:character.id}
        })

        
        if (response.status === 200) {
            await handleRefresh()
            console.log(response['success'])
        } else {
            console.error(response['error'])
        }
    }

    if (!character.watchlist) {
        return <div>No watchlist found for this character</div>
    }
    
    
    return (
        <Accordion activeKey={outerAccordionKey}
            onSelect={handleOuterToggle}
            className="gw2-accordion"
            alwaysOpen>
            <Accordion.Item eventKey="character" className="border-0">
                <Accordion.Header><span className="accordion-title">{character.name}</span></Accordion.Header>
                <Accordion.Body>
                    <Accordion activeKey={innerAccordionKeys} onSelect={handleInnerAccordionToggle}  alwaysOpen flush className="gw2-accordion">
                        <Accordion.Item eventKey="view" className="border-0">
                            <Accordion.Header><span className="accordion-title">View</span></Accordion.Header>
                            <Accordion.Body className="p-2">
                                {localWatchlist.watchlist_items?.map((item) => {
                                    const name = item.item.name
                                    const icon = item.item.icon
                                    const yesterday_buy = item.item.yesterday_buy
                                    const yesterday_sell = item.item.yesterday_sell
                                    const buy = item.buy_point
                                    const sell = item.sell_point
                                    const buy_display = Currency(buy)
                                    const sell_display = Currency(sell)

                                    return (
                                        <div key={name}>
                                            <>
                                                <img src={icon} width={64} height={64} /> {name}
                                            </>
                                            <p className={getTextColor(buy, yesterday_buy, 'buy')}>
                                                Buy under: {buy_display.gold}g {buy_display.silver}s {buy_display.copper}c
                                            </p>
                                            <p className={getTextColor(sell, yesterday_sell, 'sell')}>
                                                Sell over: {sell_display.gold}g {sell_display.silver}s {sell_display.copper}c
                                            </p>
                                            <Button onClick={(e) =>{
                                                e.stopPropagation()
                                                handleDelete(character, item)}}>Delete</Button>
                                        </div>
                                    )
                                })
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="modify" className="border-0">
                            <Accordion.Header><span className="accordion-title">Add/Modify</span></Accordion.Header>
                            <Accordion.Body className="p-2">
                                <SearchBar onItemSelect={handleItemSelect} />

                                {selectedItem && (<Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="buyPrice">
                                        <Row>
                                            Buy under:
                                            <Col>
                                                <Form.Control name="buy_gold"
                                                    defaultValue={0}
                                                    value={formData.buy_gold}
                                                onChange={handleChange}/>
                                            </Col>
                                            <Col>
                                                <Form.Control name="buy_silver" 
                                                    defaultValue={0}
                                                    value={formData.buy_silver}
                                                    onChange={handleChange}/>
                                            </Col>
                                            <Col>
                                                <Form.Control name="buy_copper"
                                                    defaultValue={0}
                                                    value={formData.buy_copper}
                                                    onChange={handleChange}/>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="sellPrice">
                                        <Row>
                                            Sell over:  &nbsp;&nbsp;
                                            <Col>
                                                <Form.Control name="sell_gold"
                                                    defaultValue={0}
                                                    value={formData.sell_gold}
                                                    onChange={handleChange}/>G
                                            </Col>
                                            <Col>
                                                <Form.Control name="sell_silver"
                                                defaultValue={0}
                                                value={formData.sell_silver}
                                                onChange={handleChange}/>S
                                            </Col>
                                            <Col>
                                                <Form.Control name="sell_copper"
                                                defaultValue={0}
                                                value={formData.sell_copper}
                                                onChange={handleChange}/>C
                                            </Col>
                                        </Row>
                                        <Button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Saving...':'Submit'}</Button>
                                        </Form.Group>
                                    
                                </Form>)}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
    }
