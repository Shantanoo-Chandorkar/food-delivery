import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const navigate = useNavigate();

  // localhostURI: http://localhost:5000/api/user/createuser
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://easy-seal-culottes.cyclic.app/api/user/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      }
    );
    const json = await response.json();
    // console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      // console.log(localStorage.getItem("authToken"));
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ padding: "1rem" }}>Register</h1>
        <div
          className="container d-flex justify-content-center align-items-center mt-2"
          style={{
            padding: "2rem",
            backgroundColor: "rgba(0,0,0,0.2)",
            maxWidth: "max-content",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credentials.name}
                aria-describedby="textHelp"
                onChange={handleChange}
              />
              <div id="textHelp" className="form-text">
                Name should be at least 5 characters long.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                id="exampleInputPassword1"
                aria-describedby="textHelp"
                onChange={handleChange}
              />
              <div id="textHelp" className="form-text">
                Password must be at least 8 characters long.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="geolocation"
                value={credentials.geolocation}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn mt-3">
              Submit
            </button>
            <p className="mt-3">
              Already have an account?{" "}
              <Link to="/login" className="link" style={{ color: "#f7e0d2" }}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
