import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';
import MissingPage from '../MissingPage';
import AuthenticatedContext from '../AuthenticatedContext';

function RouteRender({ isPrivate, RenderComponent, isAuthenticated }) {
  return isPrivate && !isAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    <RenderComponent />
  );
}

function GenerateRoutes({ routes, rootPath }) {
  return (
    <AuthenticatedContext.Consumer>
      {({ isAuthenticated }) => (
        <Routes>
          {routes.map((route) => {
            const path = rootPath ? rootPath + route.path : route.path;

            return (
              <Route
                key={path}
                exact={route.exact}
                path={path}
                element={(
                  <RouteRender
                    isPrivate={route.isPrivate}
                    RenderComponent={route.component}
                    isAuthenticated={isAuthenticated}
                  />
            )}
              />
            );
          })}

          <Route path="*" element={<MissingPage />} />
        </Routes>
      )}
    </AuthenticatedContext.Consumer>
  );
}

RouteRender.defaultProps = {
  isPrivate: false,
};

RouteRender.propTypes = {
  isPrivate: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  RenderComponent: PropTypes.func.isRequired,
};

GenerateRoutes.defaultProps = {
  rootPath: null,
};

GenerateRoutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  rootPath: PropTypes.string,
};

export default GenerateRoutes;
