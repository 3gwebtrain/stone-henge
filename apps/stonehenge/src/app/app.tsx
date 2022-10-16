import { ModuleProps } from '@stonehenge-props/api-interfaces';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import appStore from './modules/app-store/app-store';
import allModules from './modules/Moduls';

export const App: FC = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {allModules.map((m: ModuleProps) => {
            return <Route {...m.routeProps} key={m.name} />;
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
