import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Book from "./pages/Book";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: `/book/:id`,
    element: <Book />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <header className="App-header"></header>
    </div>
  );
}

export default App;
