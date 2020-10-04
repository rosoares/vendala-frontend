import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductsList from "./pages/Products/List";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter >
          <Switch>
            <Route exact path="/" component={Register}/>
            <Route exact path="/login" component={Login} />
            <Route path="/products" component={ProductsList} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
