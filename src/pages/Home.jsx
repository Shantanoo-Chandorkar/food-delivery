import React, { useState } from "react";
import { Carousel, Form } from "react-bootstrap";
import NavBar from "../components/Navbar";
import Tagline from "../components/Tagline";
import Mithai from "../components/Mithai";
import Footer from "../components/Footer";
import Specials from "../components/Specials";
import Chocolate from "../components/Chocolate";
import Other from "../components/Other";
import Oven from "../components/Oven";

function Home() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div>
        <div className="carousel">
          <Carousel fade interval={5000}>
            <Carousel.Item>
              <img
                className="car-img d-block w-100"
                src="https://source.unsplash.com/random/900×700/?cake"
                style={{ filter: "brightness(30%" }}
                alt="First slide"
              />
              <Carousel.Caption style={{ zIndex: "100" }}>
                <Tagline />
                <div className="d-flex justify-content-center">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className=" car-img d-block w-100"
                src="https://source.unsplash.com/random/900×700/?chocolate"
                style={{ filter: "brightness(30%" }}
                alt="Second slide"
              />
              <Carousel.Caption style={{ zIndex: "100" }}>
                <Tagline />
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </Form>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="car-img d-block w-100"
                src="https://source.unsplash.com/random/900×700/?sweet"
                style={{ filter: "brightness(30%" }}
                alt="Third slide"
              />
              <Carousel.Caption style={{ zIndex: "100" }}>
                <Tagline />
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </Form>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <NavBar />
        </div>
      </div>
      <div className="container mt-3">
        <Specials search={search} />
        <Mithai search={search} />
        <Oven search={search} />
        <Chocolate search={search} />
        <Other search={search} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
