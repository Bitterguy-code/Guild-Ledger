import axios from 'axios';
import fakedata from '../fakedata.json'
import { PureComponent } from 'react';
import { Accordion } from 'react-bootstrap';


export default class CharacterManagement extends PureComponent {
    render() {
        {
            fakedata.map((character, index) => {
                <Accordion>
                    <Accordion.Header>{character.name}</Accordion.Header>
                </Accordion>
        })}
    }
}