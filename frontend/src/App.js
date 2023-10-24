import './App.css';
import Appbar from './components/Appbar'
import Slider from './components/Slider'
import Musicplayer from './components/Musicplayer'

function App() {
  return (
    <div className="App">
      <Appbar/>
      <div className="Slider-container">
        <Slider/>
      </div>
      <div className="Musicplayer-container">
        <Musicplayer/>
      </div>
    </div>
  );
}

export default App;
