import { BrowserRouter, Routes, Route } from "react-router-dom"
import SharedLayout from "./Layouts/SharedLayout"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SharedLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="about" element={<h1>About</h1>} />
          <Route path="notes" element={<h1>Notes</h1>} />
          <Route path="notes/:id" element={<h1>Note</h1>} />
          <Route path="contact" element={<h1>Contact</h1>} /> */}
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
