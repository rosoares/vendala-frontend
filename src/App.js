import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductsList from "./pages/Products/List";
import CreateProduct from "./pages/Products/Create";
import ShowProduct from "./pages/Products/Show";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter >
          <Switch>
            <Route exact path="/" component={Register}/>
            <Route exact path="/login" component={Login} />
            <Route path="/products" component={ProductsList} />
            <Route path="/prodcuts/create" component={CreateProduct} />
            <Route path="/prodcuts/show/:id" component={ShowProduct} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
