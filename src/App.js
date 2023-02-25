import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Weather from "./routes/weather";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;
