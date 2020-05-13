import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { NavigationBar } from './components/NavigationBar'
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <NavigationBar>
        <main className="main-content">
          <Switch>
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
          </Switch>
        </main>
      </NavigationBar>

    </BrowserRouter>
  );
}

export default App;
