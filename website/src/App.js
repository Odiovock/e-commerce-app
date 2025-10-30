import Root from "./components/root";
import HomePage from "./pages/HomePage";
import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route index element={<HomePage/>} />
  </Route>
));

function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
