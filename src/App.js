import { Routes, Route } from 'react-router-dom';
import HomePage from "./View/Home Page";
import Login from "./View/Login";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route index path ="/" element={<HomePage />} />
      <Route index path ="/Login" element={<Login />} />
    </Routes>
        
    </div>
  );
}

export default App;
