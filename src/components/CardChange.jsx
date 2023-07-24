import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { Button, Card, Modal } from "react-bootstrap";
// import { SlArrowLeft } from "react-icons/io";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { BsCartPlus } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";

function CardChange(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let opt = props.options;
  let priceOptions = Object.keys(opt);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [isCake, setIsCake] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const handleClick = async () => {
    setIsCake(!isCake);
  };

  const handleAddToCart = async () => {
    await dispatch({
      type: "ADDCAKEORPASTRY",
      id: props.foodItem._id,
      cakeImg: props.foodItem.CakeImg,
      pastryImg: props.foodItem.PastryImg,
      cakeName: props.foodItem.CakeName,
      pastryName: props.foodItem.PastryName,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    // console.log(data);
  };

  let finalPrice = qty * parseInt(opt[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="d-flex align-items-center gap-2">
      {isCake ? (
        <div style={{ position: "relative" }}>
          <button
            onClick={handleClick}
            style={{
              position: "absolute",
              zIndex: 999,
              top: "30%",
              left: "3%",
              border: "none",
              background: "none",
              fontSize: "2rem",
              color: "white",
              fontWeight: "small",
            }}
          >
            <SlArrowLeft />
          </button>
          <Card
            className="mt-3"
            style={{ width: "15rem", maxHeight: "420px", borderRadius: "20px" }}
          >
            <Card.Img
              variant="top"
              src={props.foodItem.CakeImg}
              alt="cardimg"
              style={{
                height: "15rem",
                objectFit: "fill",
                borderRadius: "20px",
              }}
            />
            <Card.Body style={{ overflowY: "hidden" }}>
              <Card.Title
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  overflowY: "hidden",
                }}
              >
                {props.foodItem.CakeName}
              </Card.Title>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-evenly mt-2">
                  <select
                    className="m-1 rounded"
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {Array.from(Array(6), (e, i) => {
                      return (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    className="m-1 rounded"
                    ref={priceRef}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {priceOptions.map((data) => {
                      return (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      );
                    })}
                  </select>
                  <Button
                    className="btn"
                    onClick={handleAddToCart}
                    style={{ fontSize: "1rem" }}
                  >
                    <BsCartPlus />
                  </Button>
                </div>
                <hr style={{ marginBottom: "-5px" }} />
                <div className="d-flex justify-content-evenly align-items-center">
                  <div className="fs-6">₹{finalPrice}/-</div>
                  <p
                    onClick={() => setModalShow(true)}
                    style={{ cursor: "pointer", marginTop: "10px" }}
                  >
                    <span style={{ borderBottom: "1px solid white" }}>
                      More Info
                    </span>{" "}
                    <MdKeyboardArrowDown />
                  </p>
                  <hr />
                </div>
              </div>
            </Card.Body>
          </Card>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={() => setModalShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>{props.foodItem.CakeName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column flex-sm-column  flex-md-column flex-lg-row align-items-center gap-4">
                <div className="flex-shrink-0">
                  <img src={props.foodItem.CakeImg} alt="cardimg" />
                </div>
                <div className="flex-grow-0 ms-3">
                  {props.foodItem.desc}
                  <hr />
                  <>
                    <b>Price</b>: <br />
                    <p>
                      Cake: {opt.cake} & Pastry: {opt.pastry}
                    </p>
                  </>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <button
            onClick={handleClick}
            style={{
              position: "absolute",
              zIndex: 999,
              top: "30%",
              right: "2%",
              border: "none",
              background: "none",
              fontSize: "2rem",
              color: "white",
              fontWeight: "small",
            }}
          >
            <SlArrowRight />
          </button>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <button
            onClick={handleClick}
            style={{
              position: "absolute",
              zIndex: 999,
              top: "30%",
              left: "1%",
              border: "none",
              background: "none",
              fontSize: "2rem",
              color: "white",
              fontWeight: "small",
            }}
          >
            <SlArrowLeft />
          </button>
          <Card
            className="mt-3"
            style={{ width: "15rem", maxHeight: "420px", borderRadius: "20px" }}
          >
            <Card.Img
              variant="top"
              src={props.foodItem.PastryImg}
              alt="cardimg"
              style={{
                height: "15rem",
                objectFit: "fill",
                borderRadius: "20px",
              }}
            />
            <Card.Body style={{ overflowY: "hidden" }}>
              <Card.Title
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  overflowY: "hidden",
                }}
              >
                {props.foodItem.PastryName}
              </Card.Title>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-evenly mt-2">
                  <select
                    className="m-1 rounded"
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {Array.from(Array(6), (e, i) => {
                      return (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    className="m-1 rounded"
                    ref={priceRef}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {priceOptions.map((data) => {
                      return (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      );
                    })}
                  </select>
                  <Button
                    className="btn"
                    onClick={handleAddToCart}
                    style={{ fontSize: "1rem" }}
                  >
                    <BsCartPlus />
                  </Button>
                </div>
                <hr style={{ marginBlock: "0px" }} />
                <div className="d-flex justify-content-evenly align-items-center">
                  <div className="fs-6">₹{finalPrice}/-</div>
                  <p
                    onClick={() => setModalShow(true)}
                    style={{ cursor: "pointer", marginTop: "10px" }}
                  >
                    <span style={{ borderBottom: "1px solid white" }}>
                      More Info
                    </span>{" "}
                    <MdKeyboardArrowDown />
                  </p>
                  <hr />
                </div>
              </div>
            </Card.Body>
          </Card>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={() => setModalShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>{props.foodItem.PastryName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column flex-sm-column  flex-md-column flex-lg-row align-items-center gap-4">
                <div className="flex-shrink-0">
                  <img src={props.foodItem.PastryImg} alt="cardimg" />
                </div>
                <div className="flex-grow-0 ms-3">
                  {props.foodItem.desc}
                  <hr />
                  <>
                    <b>Price</b>: <br />
                    <p>
                      Cake: {opt.cake} & Pastry: {opt.pastry}
                    </p>
                  </>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <button
            onClick={handleClick}
            style={{
              position: "absolute",
              zIndex: 999,
              top: "30%",
              right: "2%",
              border: "none",
              background: "none",
              fontSize: "2rem",
              color: "white",
            }}
          >
            <SlArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default CardChange;
