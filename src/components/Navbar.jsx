import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import LightAndDarkToggle from "./LightAndDarkToggle";
// import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineFastfood } from "react-icons/md";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../pages/Cart";
import { useCart } from "./ContextReducer";

const NavBar = () => {
  let data = useCart();

  const [cartView, setCartView] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container className="d-flex flex-row">
        <Navbar.Toggle className="toggle" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <div className="left">
              <Link to="/" className="link">
                <h1 className="logo">Sweetery</h1>
              </Link>
              <Link to="/" className="link">
                <button className="btn">Home</button>
              </Link>
              {localStorage.getItem("authToken") ? (
                <Link to="/myorder" className="link">
                  <button className="btn">My Orders</button>
                </Link>
              ) : (
                ""
              )}
            </div>
            {!localStorage.getItem("authToken") ? (
              <div className="right">
                <Link to="/register" className="link">
                  <button className="btn">Register</button>
                </Link>
                <Link to="/login" className="link">
                  <button className="btn">Login</button>
                </Link>
                <LightAndDarkToggle />
              </div>
            ) : (
              <div className="right">
                <button
                  className="btn"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  <Link className="link">
                    <MdOutlineFastfood />{" "}
                    <Badge pill bg="danger" className="btn">
                      {data.length !== 0 ? data.length : null}
                    </Badge>
                  </Link>
                </button>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <button className="btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
