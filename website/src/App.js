import Root from "./components/root";
import Authentication from "./pages/Authentication";
import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDisplay from "./components/productdisplay";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails.js";

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route index element={<Authentication/>} />
    <Route path="/home" element={<HomePage/>}>
      <Route path="/home/products" element={<ProductDisplay/>} />
    </Route>
    <Route path="/product/:sku/:id" element={<ProductDetails/>}/>      
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/orders" element={<OrderHistory/>}/>
    <Route path="/orders/:orderId" element={<OrderDetails/>}/>
  </Route>
));

function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
