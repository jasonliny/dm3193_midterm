import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from Home.js

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: `/book/:id`,
    element: <BookListing />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
