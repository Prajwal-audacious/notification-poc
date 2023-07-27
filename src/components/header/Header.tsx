import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import BellIcon from "../bellIcon/BellIcon";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { getNotification } from "../../services/services";

export const getUserDetails = () => {
  const token: string = localStorage.getItem("authToken") || "";
  const decoded: any = jwt_decode(token);
  return decoded.user;
};

function Header() {
  const navigate = useNavigate();
  const activeUser = getUserDetails();
  const [count, setCount] = useState(0);
  const { data } = useQuery(["getNotification"], getNotification, {
    onSuccess: (data: any) => setCount(data.data.count),
  });

  const handleBellClick = () => {
    navigate("/notification");
  };

  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("authToken");
      window.location.reload();
    }, 500);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate("/")}>
          <h2>
            <b>DEMO</b>
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", marginLeft: "50px" }}
            navbarScroll
          >
            {activeUser.admin && (
              <>
                <Nav.Link>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontWeight: "bolder",
                    }}
                    to="/admin"
                  >
                    Admin
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontWeight: "bolder",
                    }}
                    to="/"
                  >
                    Home
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>

          <div
            style={{
              width: "4rem",
              height: "4rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {!activeUser.admin && (
              <BellIcon handleBellClick={handleBellClick} count={count} />
            )}
          </div>
          <Navbar.Text>
            Signed in as:{" "}
            <a
              style={{
                color: "red",
                textDecoration: "none",
                fontWeight: "bolder",
              }}
              href="#login"
            >
              {`${activeUser.name.toUpperCase()}  (${
                activeUser.admin ? "Admin" : "User"
              })` || ""}
            </a>
          </Navbar.Text>
          <Button style={{ marginLeft: "55px" }} onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
