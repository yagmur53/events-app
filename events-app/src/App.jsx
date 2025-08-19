import EtkinlikListesi from "./components/EtkinlikListesi";
import Header from "./components/Header";
import EtkinlikGrafik from "./components/EtkinlikGrafik";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<EtkinlikListesi />} />
        <Route path="/grafik" element={<EtkinlikGrafik />} />
      </Routes>
    </Router>
  );
}
