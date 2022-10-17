import axios from 'axios';
import { FC, useEffect, useState } from 'react';
axios.defaults.withCredentials = true;
export interface UserProps {
  user: {
    name: string;
    email: string;
  };
}

const Welcome: FC = () => {
  const [user, setUser] = useState<UserProps>();
  const getUser = async () => {
    const res = await axios
      .get<UserProps>('http://localhost:3333/api/user', {
        withCredentials: true,
      })
      .catch((error) => console.log(error));
    return res?.data;
  };
  useEffect(() => {
    getUser().then((data) => {
      console.log('user data', data);
      setUser(data);
    });
  }, []);
  return <h1>Welcome {user && user?.user.name}</h1>;
};
export default {
  name: 'Welcome',
  routeProps: { path: '/welcome', element: <Welcome /> },
};
