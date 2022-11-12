import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import HomePage from "./pages/HomePage/HomePage";
import NewsPage from "./pages/NewsPage";
import { fetchNews } from "./store/slices";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
    setInterval(() => {
      dispatch(fetchNews());
    }, 60000);

    return () => {
      clearInterval();
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route path="/news/:id">
          <NewsPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
