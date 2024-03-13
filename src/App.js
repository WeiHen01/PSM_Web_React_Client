import Login from "./Login";
import HomePage from "./View/Home Page";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <HomePage />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
    </div>
    
  );
}

export default App;
