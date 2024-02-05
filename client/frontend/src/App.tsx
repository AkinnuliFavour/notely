import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./Layouts/SharedLayout";
import Home from "./pages/home/Home";
import Business from "./pages/business/Business";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SharedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<Business />} />
          {/* <Route path="notes" element={<h1>Notes</h1>} />
          <Route path="notes/:id" element={<h1>Note</h1>} />
          <Route path="contact" element={<h1>Contact</h1>} /> */}
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
