import './App.scss';
import './components/MarginCalc';
import MarginCalc from "./components/MarginCalc";

const rest = require('rest');
const mime = require('rest/interceptor/mime');

function App() {
    return (
        <div className="app">
            <MarginCalc />
        </div>
    );
}

export default App;


