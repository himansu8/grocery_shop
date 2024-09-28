import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserPrivateRoute from './pages/auth/UserPrivateRoute';
import PageNotFound from './pages/PageNotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Products from './pages/admin/Products';
import UpdateProducts from './pages/admin/UpdateProducts';
import AllProducts from './pages/AllProducts';
import Search from './pages/Search';
import About from './pages/About';
import Contact from './pages/Contact';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import UserCart from './pages/user/UserCart';
import UpdateProfile from './pages/user/UpdateProfile';
import AdminPrivateRoute from './pages/auth/AdminPrivateRoute';
import VendorPrivateRoute from './pages/auth/VendorPrivateRoute';
import VendorDashboard from './pages/vendor/VendorDashboard';
import UsersData from './pages/admin/UsersData';
import VendorsData from './pages/admin/VendorsData';
import CreateVendorProduct from './pages/vendor/CreateVendorProduct';
import VendorProducts from './pages/vendor/VendorProducts';
import ProductApproval from './pages/admin/ProductApproval';
import CloneproductPage from './pages/vendor/CloneproductPage';
import CloneProductDetailsPage from './pages/vendor/CloneProductDetailsPage';
//import OrderDetails from './pages/OrderDetails';
import OrderPage from './pages/OrderPage';
import Orders from './pages/user/Orders';
import AdminOrder from './pages/admin/AdminOrder';
import VendorOrders from './pages/vendor/VendorOrders';
import Address from './pages/user/Address';
import NewlyAddedProduct from './pages/NewlyAddedProduct';
import Wishlist from './pages/Wishlist';
import Vendororders from './pages/admin/Vendororders';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/new-items" element={<NewlyAddedProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/single/products/:slug" element={<SingleProduct />} />
        <Route path="*" element={<PageNotFound />} />


        <Route element={<UserPrivateRoute />}>
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/user/cart" element={<UserCart />} />
          <Route path="/user/address" element={<Address/>} />
          <Route path="/user/orders" element={<Orders />} />
          <Route path="/user/updateprofile" element={<UpdateProfile />} />
          {/* <Route path="/user/order/:id" element={<OrderDetails />} /> */}

          
        </Route>

        <Route element={<AdminPrivateRoute />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/admin/create-category" element={<CreateCategory />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/products/:slug" element={<UpdateProducts />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/users" element={<UsersData />} />
          <Route path="/admin/vendors" element={<VendorsData />} />
          <Route path="/admin/orders" element={<AdminOrder />} />
          <Route path="/admin/vendor-orders" element={<Vendororders />} />
          <Route path="/admin/approvals" element={<ProductApproval />} />


          {/* <Route path="/admin/Allproducts" element={<AllProducts />} /> */}

        </Route>

        <Route element={<VendorPrivateRoute/>}>
        <Route path="/dashboard/vendor" element={<VendorDashboard />} />
        <Route path="/dashboard/vendor/addproduct" element={<CreateVendorProduct />} />
        <Route path="/vendor/products" element={<VendorProducts />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route path="/vendor/products/:slug" element={<UpdateProducts />} />
        <Route path="/vendor/cloneProduct" element={<CloneproductPage />} />
        <Route path="/vendor/clone/products/:slug" element={<CloneProductDetailsPage />} />


        </Route>

      </Routes>
      <ToastContainer position="bottom-center" autoClose={1000}/>
    </>
  );
}

export default App;
