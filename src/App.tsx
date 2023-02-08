import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./store/context";
// Screens
import Home from "./pages/Home";
// import PrivateRoutes from './navigation/privateRoutes';
import Layout from "./components/Layout/index";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          {/* <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route> */}
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="/school/matches" element={<SchoolMatches />}></Route> */}
          </Route>
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
