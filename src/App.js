import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { JWTProvider } from "./contexts/JWTContext";
import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';


const App = () => {
  return (
    <React.Fragment>
      <Router basename={BASENAME}>
        <JWTProvider>{renderRoutes(routes)}</JWTProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
  