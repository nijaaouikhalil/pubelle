import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Navbar,
  NavNavbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const goHome = () => {
    navigate("/");
  };

  const logoutHandler = () => {
    dispatch(logout());
    goHome();
  };
  return (
    <Navbar bg="primary" collapseOnSelect variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>PuBelle</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <LinkContainer className="m-3" to="/">
            <i className="fas fa-home clickable"> Home </i>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="username">
              <LinkContainer to={`/mypoints`}>
                <NavDropdown.Item>MY POINTS</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />

              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>
                <i className="fas fa-user"></i>Login
              </Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
