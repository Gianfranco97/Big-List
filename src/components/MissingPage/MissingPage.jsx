import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function MissingPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, la página que visitaste no existe."
      extra={(
        <Button type="primary">
          <Link to="/">Regresar al inicio</Link>
        </Button>
      )}
    />
  );
}

export default MissingPage;
