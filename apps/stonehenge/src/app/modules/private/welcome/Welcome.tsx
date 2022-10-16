import axios from 'axios';
import { FC, useEffect, useState } from 'react';

const Welcome: FC = () => {
  const [user, setUser] = useState<{ name: string }>();
  const getUser = async () => {
    const res = await axios
      .get<{ name: string }>('http://localhost:3333/api/user')
      .catch((error) => console.log(error));
    return res?.data;
  };
  useEffect(() => {
    getUser().then((data) => {
      console.log('user data', data);
      setUser(data);
    });
  }, []);
  return <div>Welcome {user && user?.name}</div>;
};
export default {
  name: 'Welcome',
  routeProps: { path: '/welcome', element: <Welcome /> },
};
