import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import FileUpload from './Pages/FileUpload';
import Error404 from './Pages/Error404';
import Login from './Pages/Login';
import Login2 from './Pages/Login2';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={ <Login2 /> } />
          <Route path="/" element={ <FileUpload /> } />
          <Route path="*" element={ <Error404 /> } />
        </Routes>
      </Router>
  );
}

export default App;
