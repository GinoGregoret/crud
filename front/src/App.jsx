import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductForm from './Components/ProductForm'
import ProductList from './Components/ProductList'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/product/:id' element={<ProductForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
