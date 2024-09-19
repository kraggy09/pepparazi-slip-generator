import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import OrderPage from "./components/OrderPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<OrderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
