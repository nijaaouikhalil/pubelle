import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listPrizes } from "../actions/prizeActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Prize from "../components/Prize";

function HomeScreen() {
  const dispatch = useDispatch();
  const prizeList = useSelector((state) => state.prizeList);
  const { error, loading, prizes } = prizeList;

  useEffect(() => {
    dispatch(listPrizes());
  }, [dispatch]);
  return (
    <div>
      <h1 className="text-center">Available Prizes</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container mx-auto">
          <Row className="row-eq-height">
            {prizes.map((prize) => (
              <Col
                className="Col_profile"
                key={prize._id}
                sm={12}
                md={6}
                lg={4}
                xl={4}
              >
                <Prize prize={prize} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
