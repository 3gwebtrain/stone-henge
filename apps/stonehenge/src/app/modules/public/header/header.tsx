import { ModuleProps } from '@stonehenge-props/api-interfaces';
import { Button, Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../app-store/app-store';
import { handleLoginModal, handleRegisterModal } from '../../login/slice';
import modules from '../../Moduls';
import './header.scss';

const HeaderPublic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const signIn = (): void => {
    dispatch(handleLoginModal(true));
  };
  const register = (): void => {
    dispatch(handleRegisterModal(true));
  };
  return (
    <nav>
      <Row>
        <Col lg={6} sm={24}>
          <div className="site-logo">
            <Link to="/login" key="login">
              <img alt="site-logo" src={'./assets/images/logo.jpg'} />
            </Link>
          </div>
        </Col>
        <Col lg={18} sm={24}>
          <Row align="middle" justify="space-between">
            <Col lg={12} sm={24} xs={24}>
              <ul>
                {modules.map((link: ModuleProps) => (
                  <Col key={link.name}>
                    <Link to={link.routeProps.path}>{link.name}</Link>
                  </Col>
                ))}
              </ul>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <Row justify="end">
                <Button type="primary" onClick={() => signIn()}>
                  Sign In
                </Button>
                <Button type="primary" onClick={() => register()}>
                  Register
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </nav>
  );
};

export default HeaderPublic;
