import './App.css';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/route';
import { useEffect, useState } from 'react';
import LoadingAnimate from './animation/loading';
import cookie from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { language } from './redux/reducer'

function App() {
  const [loading, setLoading] = useState(true);
  const zenithReducer = useSelector(state => state);
  const dispath = useDispatch();

  console.log("zenith: ", zenithReducer)

  useEffect(() => {
    setTimeout(() => {
      const fetchLanguageSetting = async () => {
        const langSetting = cookie.get('i18next');
        if (langSetting) {
          document.body.dir = langSetting === 'ar' ? 'rtl' : 'ltr';
          dispath(language({language:  langSetting}));
        }
        setLoading(false);
      };
      fetchLanguageSetting();
    }, 4000)
  }, [])

  return (
    !loading ? <RouterProvider router={router} /> : <LoadingAnimate />
  );
}

export default App;