import React from "react";
import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";

import { useAppDispatch as useDispatch } from "./hooks";
import HomePage from "./pages/HomePage/HomePage";
import NewsPage from "./pages/NewsPage";
import { fetchNews } from "./store/slices";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
    const intervalId = setInterval(() => {
      dispatch(fetchNews());
    }, 60000);

    return () => {
      clearInterval(intervalId);
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
