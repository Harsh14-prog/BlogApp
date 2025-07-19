import { BrowserRouter , Route , Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import {Blog} from './pages/Blog'
import Blogs from './pages/Blogs'
import Publish from './component/Publish'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element = {<SignUp/>}>SignUp</Route>
         <Route path='/signin' element = {<SignIn/>}>SignIn</Route>
         <Route path='/blog/:id' element = {<Blog/>}>Blog</Route>
         <Route path='/blogs' element = {<Blogs/>}>Blog</Route>
         <Route path='/create' element = {<Publish/>}>Blog</Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
