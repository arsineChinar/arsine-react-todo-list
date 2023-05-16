import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Todo from './pages/todo/Todo';
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import NavBar from "./components/navBar/NavBar";
import SingleTask from "./pages/singleTask/SingleTask";
import NotFound from "./pages/notFound/NotFound";


const pages = [
  {
    path: "/",
    element: <Todo />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  // {
  //   path: "/task/:taskId",
  //   element: <SingleTask />,
  // },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
];

const router = createBrowserRouter(pages);

function App() {
  return (
    <main>
       <NavBar />
      <RouterProvider router={router} />
    </main>

  );
}

export default App;
