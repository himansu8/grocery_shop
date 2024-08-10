import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserPrivateRoute from './pages/auth/UserPrivateRoute';
import AdminPrivateRoute from './pages/auth/AdminPrivateRoute';
import PageNotFound from './pages/PageNotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Products from './pages/admin/Products';
import UpdateProducts from './pages/admin/UpdateProducts';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />


        <Route element={<UserPrivateRoute/>}>
        <Route path="/dashboard/user" element={<UserDashboard/>} />
        </Route>

        <Route element={<AdminPrivateRoute/>}>
        <Route path="/dashboard/admin" element={<AdminDashboard/>} />
        <Route path="/admin/create-category" element={<CreateCategory/>} />
        <Route path="/admin/create-product" element={<CreateProduct/>} />
        <Route path="/admin/products/:slug" element={<UpdateProducts />} />
        <Route path="/admin/products" element={<Products/>} />

        

        </Route>

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
