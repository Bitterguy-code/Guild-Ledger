import fakedata from '../fakedata.json'
import { useContext, useEffect, useState } from 'react';
import CharDropdown from '../components/CharDropdown';
import { UserContext } from '../contexts/userContext';
import { characterList } from '../components/utils';


export default function CharacterManagement() {
    const [loading, setLoading] = useState(true)
    const [characters, setCharacters] = useState([])
    const [error, setError] = useState(null)

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
        return <div>Loading</div>
    }
        
    
    if (error) {
        return <div>Error {error}</div>
    }

    return (
        <>
        {characters.map((character, index) => (
            <div key={index}>
                <CharDropdown character={character} />
            </div>
            ))}
        </>
            )

}