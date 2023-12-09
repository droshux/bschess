import { HomePage } from "./pages/home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./pages/layout"
import { LearnPage } from "./pages/learn"
import { RulesPage } from "./pages/rules"
import { BrowsePage } from "./pages/browse"
import { PageNotFound } from "./pages/404"
import { CreatePage } from "./pages/create"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="learn" element={<LearnPage/>}/>
            <Route path="rules" element={<RulesPage/>}/>
            <Route path="browse" element={<BrowsePage/>}/>
            <Route path="create" element={<CreatePage/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
