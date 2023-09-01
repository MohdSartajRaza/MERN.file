import {Routes,Route} from 'react-router-dom';
import Home from '../Screens/Home';
import Contacts from '../Screens/Contacts';
import Products from '../Screens/Products';
import About from '../Screens/About';
import Navbar from '../Layout/Navbar';
import ViewProduct from '../Screens/Viewproduct';
import Cart from '../Screens/Cart';


const AllRouting =({countOfCart})=>{
    return(
<>
{/*<h1><Link to='home'> Go to Home</Link></h1>
<h1><Link to='about'> Go to about</Link></h1>
<h1><Link to='contact'> Go to Contacts</Link></h1>
    <h1><Link to='product'> Go to products</Link></h1>*/}
     <Navbar countOfCart={countOfCart}/>
<Routes>
   
    <Route  path='/' element={<Home/>}/>
    <Route  path='/home' element={<Home/>}/>
    <Route  path='/about' element={<About/>}/>
    <Route  path='/contact' element={<Contacts/>}/>
    <Route  path='/product' element={<Products/>}/>
    <Route  path='/mycart' element={<Cart/>}/>
    <Route  path='/product/:id' element={<ViewProduct/>}/>
    <Route  path='*' element={<Home/>}/>
</Routes>





</>

    );
}

export default AllRouting