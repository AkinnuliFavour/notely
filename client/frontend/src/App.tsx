import { BrowserRouter, Routes, Route } from "react-router-dom"
import SharedLayout from "./Layouts/SharedLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SharedLayout />}>

        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
