import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductsList from "./pages/Products/List";
import CreateProduct from "./pages/Products/Create";
import ShowProduct from "./pages/Products/Show";
import UpdateProduct from "./pages/Products/Update";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter >
          <Switch>
            <Route exact path="/" component={Register}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/products" component={ProductsList} />
            <Route exact path="/products/create" component={CreateProduct} />
            <Route exact path="/products/show/:id" component={ShowProduct} />
            <Route exact path="/products/update/:id" component={UpdateProduct} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
