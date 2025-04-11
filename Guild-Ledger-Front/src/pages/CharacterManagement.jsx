import axios from 'axios';
import fakedata from '../fakedata.json'
import { PureComponent } from 'react';
import CharDropdown from '../components/CharDropdown';


export default function CharacterManagement()  {

        
    return (
        <>
        {fakedata.character.map((character, index) => (
            <div key={index}>
                <p> Hewwo </p>
                <CharDropdown character={character} />
            </div>
            ))}
        </>
            )

    
}