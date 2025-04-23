import { useEffect, useState } from 'react';
import { characterList } from '../components/utils';
import WatchlistViewer from '../components/WatchlistViewer';
import { NewtonsCradle } from 'ldrs/react'
import 'ldrs/react/NewtonsCradle.css'


export default function watchlist() {
    const [loading, setLoading] = useState(true)
    const [characters, setCharacters] = useState([])
    const [error, setError] = useState(null)

    const refreshCharacters = async () => {
        const response = await characterList()
        setCharacters(response.data)
    }

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await characterList()
                console.log(response)
                if (response.data) {
                    if (Array.isArray(response.data)) {
                        setCharacters(response.data)
                    } else {
                        setError('Invalid data format')
                    }
                    
                } else {
                    setError('No characters found')
                }
            
            } catch (err) {
                setError(err.message || "Failed to load characters")
            } finally {
                setLoading(false)
            }
        }; fetchCharacters()
    }, [])

    if (loading) {
        return <div>
        <NewtonsCradle
          size="78"
          speed="1.4"
          color="black" 
        /></div>
    }
        
    
    if (error) {
        return <div>Error {error}</div>
    }

    return (
        <>
        {characters.map((character) => (
            <div key={character.id}>
                <WatchlistViewer
                    key = {character.id}
                    character={character}
                    refreshCharacters={refreshCharacters} />
            </div>
            ))}
        </>
            )

}