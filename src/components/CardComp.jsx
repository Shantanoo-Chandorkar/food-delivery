import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { Button, Card, Modal } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";

function CardComp(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let opt = props.options;
  let priceOptions = Object.keys(opt);
  // console.log(props.foodItem);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      img: props.foodItem.img,
      name: props.foodItem.Name,
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
    <div>
      <Card
        className="mt-3"
        style={{
          width: "15rem",
          maxHeight: "420px",
          borderRadius: "20px",
        }}
      >
        <Card.Img
          variant="top"
          src={props.foodItem.img}
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
            {props.foodItem.Name}
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
            <hr style={{ marginBottom: "0px" }} />
            <div className="d-flex justify-content-evenly align-items-center">
              <div className="h-100 fs-6">₹{finalPrice}/-</div>
              <p
                onClick={() => setModalShow(true)}
                style={{ cursor: "pointer", marginTop: "10px" }}
              >
                <span style={{ borderBottom: "1px solid white" }}>
                  More Info
                </span>{" "}
                <MdKeyboardArrowDown />
              </p>
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
          <Modal.Title>{props.foodItem.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column flex-sm-column  flex-md-column flex-lg-row align-items-center gap-4">
            <div className="flex-shrink-0">
              <img src={props.foodItem.img} alt="cardimg" />
            </div>
            <div className="flex-grow-0 ms-3">
              {props.foodItem.desc}
              <hr />
              <>
                <b>Price</b>:{" "}
                {opt.regular ? (
                  <p>
                    Regular: ₹{opt.regular}/Kg & Event: ₹{opt.occasion}/5Kg
                  </p>
                ) : (
                  <p>
                    Single: ₹{opt.piece}/Serving & Cart: ₹{opt.cart}/Cart
                  </p>
                )}
              </>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CardComp;
