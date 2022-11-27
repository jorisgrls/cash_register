import { BrowserRouter, Routes, Route} from 'react-router-dom';

import "./styles/tailwind.css"
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Registration from './pages/Registration';
import Test from './pages/Test';
import Login from './pages/Login';
import Check from './pages/Check';
import Add from './pages/Add';
import Cards from './pages/admin/Cards/Cards';
import Payments from './pages/admin/Payments/Payments';
import Products from './pages/admin/Products/Products';
import Promotions from './pages/admin/Promotions/Promotions';
import Staff from './pages/admin/Staff/Staff';
import Tables from './pages/admin/Tables/Tables';
import Categories from './pages/admin/Categories/Categories';
import Rank from './pages/admin/Rank/Rank';

function App() {
  console.log(Home)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/home" exact element={<Home/>} />
        <Route path="/pages/registration" exact element={<Registration/>} />
        <Route path="/pages/test" exact element={<Test/>} />
        <Route path="/pages/check" exact element={<Check/>} />
        <Route path="/pages/add" exact element={<Add/>} />
        <Route path="/pages/login" exact element={<Login/>} />
        <Route path="/pages/test" exact element={<Test/>} />
        <Route path="/pages/admin/cards/cards" exact element={<Cards/>} />
        <Route path="/pages/admin/payments/payments" exact element={<Payments/>} />
        <Route path="/pages/admin/products/products" exact element={<Products/>} />
        <Route path="/pages/admin/categories/categories" exact element={<Categories/>} />
        <Route path="/pages/admin/promotions/promotions" exact element={<Promotions/>} />
        <Route path="/pages/admin/staff/staff" exact element={<Staff/>} />
        <Route path="/pages/admin/rank/rank" exact element={<Rank/>} />
        <Route path="/pages/admin/tables/tables" exact element={<Tables/>} />
        <Route path="*" component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
