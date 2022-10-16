import { FC } from 'react';
import Layout from '../../layout/Layout';

const Login: FC = () => {
  return (
    <Layout>
      <div>header</div>
    </Layout>
  );
};

export default {
  name: 'Login',
  routeProps: { path: '/login', element: <Login /> },
};
