import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from 'containers/shared/PageNotFound/PageNotFound';
import { adminRoutes, clientRoutes } from 'routes';
import ClientLayout from 'layouts/ClientLayout/ClientLayout';
import Login from './containers/shared/Authentication/LogIn/Login';
import SignUp from 'containers/shared/Authentication/Register/SignUp';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';


function App() {
  const renderRoutes = (routes, Layout) => {
    return routes.map((routes, idx) => {
      const { path, component, exact, isPrivate } = routes;
      return (
        <Layout
          key={idx}
          path={path}
          exact={exact}
          component={component}
          isPrivate={isPrivate} />
      )
    })
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          {renderRoutes(clientRoutes, ClientLayout)}
          {renderRoutes(adminRoutes, AdminLayout)}
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
