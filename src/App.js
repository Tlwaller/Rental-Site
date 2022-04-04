import "./styles/Main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerPage from "./pages/Customer";
import HomePage from "./pages/Home";
import LeasorPage from "./pages/Leasor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/leasor" element={<LeasorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
