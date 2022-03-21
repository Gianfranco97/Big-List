import React from 'react';
import { ConfigProvider } from 'antd';
import esEs from 'antd/es/locale/es_ES';
import { BrowserRouter } from 'react-router-dom';
import GenerateRoutes from 'components/GenerateRoutes';
import routesAdmin from 'containers/admin';
import routesAuth from 'containers/auth';
import { AuthenticatedProvider } from 'components/AuthenticatedContext';

function App() {
  return (
    <AuthenticatedProvider>
      <ConfigProvider locale={esEs}>
        <BrowserRouter>
          <GenerateRoutes routes={[...routesAuth, ...routesAdmin]} />
        </BrowserRouter>
      </ConfigProvider>
    </AuthenticatedProvider>
  );
}

export default App;
