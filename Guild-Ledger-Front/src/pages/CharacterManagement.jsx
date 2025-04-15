import axios from 'axios';
import fakedata from '../fakedata.json'
import { PureComponent } from 'react';
import CharDropdown from '../components/CharDropdown';
import GLNavbar from '../components/Navbar';


export default function CharacterManagement()  {

        
    return (
        <>
        {fakedata.character.map((character, index) => (
            <div key={index}>
                <CharDropdown character={character} />
            </div>
            ))}
        </>
            )

    
}