import '../App.css';
import Slider from '../components/Slider'
import Musicplayer from '../components/Musicplayer'
import Popup from '../components/Popup'

export default function Home() {
    return (
        <div className="App">
            <div className="Slider-container">
                <Slider/>
            </div>
            <div className="Musicplayer-container">
                <Musicplayer/>
            </div>
            <div className="Popup-container">
                <Popup/>
            </div>
        </div>
    );
}