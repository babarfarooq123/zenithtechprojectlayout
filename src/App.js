import './App.css';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/route';
import { useEffect, useState } from 'react';
import LoadingAnimate from './animation/loading';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in or not
    setTimeout(() => {
      setLoading(false);
  }, 0)
  }, [])

  return (
    !loading ? <RouterProvider router={router} /> : <LoadingAnimate />
  );
}

export default App;