import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./layouts/SharedLayout";
import All from "./pages/All";
import Business from "./pages/business/Business";
import Personal from "./pages/personal/Personal";
import Home from "./pages/home/Home";
import CompletedNote from "./pages/completed/CompletedNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SharedLayout />}>
          <Route path="/" element={<All />} />
          <Route path="/business" element={<Business />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/home" element={<Home />} />
          <Route path="/completed" element={<CompletedNote />} />
          {/* <Route path="contact" element={<h1>Contact</h1>} /> */}
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
