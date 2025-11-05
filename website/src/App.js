import Root from "./components/root";
import Authentication from "./pages/Authentication";
import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route index element={<Authentication/>} />
  </Route>
));

function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
