import { Modal } from 'antd';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../modules/app-store/app-store';
import { handleLoginModal } from '../modules/login/slice';
import HeaderPublic from '../modules/public/header/header';
import { TempLogin } from '../modules/templates/Temp-Login';
import { TempRegister } from '../modules/templates/Temp-Register';

import './layout.scss';

const Layout: FC<{ children: ReactElement }> = (prop) => {
  const { loginPop, registerPop, title } = useSelector((state: AppState) => {
    return state.LoginStore;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsModalOpen(loginPop);
  }, [loginPop]);

  useEffect(() => {
    setIsModalOpen(registerPop);
  }, [registerPop]);

  const handleOk = (): void => {
    dispatch(handleLoginModal(false));
  };

  const handleCancel = (): void => {
    dispatch(handleLoginModal(false));
  };

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal-app"
        footer={null}
      >
        {loginPop && <TempLogin />}
        {registerPop && <TempRegister />}
      </Modal>

      <section className="wrapper">
        <section>
          <HeaderPublic />
        </section>
        <section>
          <main>{prop.children}</main>
        </section>
        <section>
          <footer>footer goes here</footer>
        </section>
      </section>
    </>
  );
};

export default Layout;
