import React from 'react'
import { useState, useEffect } from "react";
import { Form, InputGroup, ListGroup } from 'react-bootstrap'
import {useNavigate } from "react-router-dom"
import api from "../api";

interface SearchBarProps {
    onItemSelect?: (item: SearchItem) => void
}

interface SearchItem {
    id: string | number
    name: string
}

const SearchBar = ({onItemSelect}: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState<SearchItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const debouncedSearch = useDebounce(searchTerm, 300)

    const handleItemSelect = (item:SearchItem) => {
        onItemSelect?.(item)
        setSearchTerm(item.name)
        setResults([])
    }

    useEffect(() => {
        if (debouncedSearch) {
            performSearch(debouncedSearch)
        } else {
            setResults([])
        }
    }, [debouncedSearch])

    const performSearch = async (query: string) => {
        try {
            setIsLoading(true)
            const response = await api.get(`items/search/?q=${query}`)
            setResults(response.data)
            
        } catch (error) {
            console.error('Search error: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="gw2-searchbar">
            <InputGroup className='search-input'>
                <Form.Control
                    type='search'
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="search"/>
            </InputGroup>

            {results.length > 0 && (
                <ListGroup className="search-results mt-2">
                    {
                        results.map((item: SearchItem) => (
                            <ListGroup.Item
                                key={item.id}
                                action
                                onClick={()=>handleItemSelect(item)}
                            >
                                {item.name}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            )}

            {isLoading && <div className="mt-2">Searching ...</div>}
        </div>
    )
}

const useDebounce = (value: string, delay: number) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
        
    }, [value, delay])

    

    return debounceValue
}

export default SearchBar