import axios from 'axios';
import GLNavbar from '../components/Navbar';
import HistoryGraph from '../components/HistoryGraph';


export default function HomePage() {

    return <div className='main-page-contents'>
        <GLNavbar />
        <h2>Home</h2>
        <HistoryGraph />
    </div>;
}