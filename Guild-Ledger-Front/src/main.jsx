import ReactDom from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDom.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

