import React from "react";
import { Button, Card, ProgressBar, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BaseUrl } from "../utils/urls";

function Prize({ prize }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let now = 0;

  if (userInfo) {
    now =
      (Number(userInfo.points) / Number(prize.required_points)).toFixed(2) *
      100;
    if (now >= 100) now = 100;
  } else {
    now = 0;
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img
        className="profile_image_theme"
        src={`${BaseUrl}` + prize.image}
      />

      <Card.Body>
        <Card.Title as="div" className="text-center">
          <strong>{prize.name}</strong>
        </Card.Title>

        <Card.Text as="div">
          <div className="my-3 text-center">
            <ProgressBar variant="success" now={now} label={`${now}%`} />
            {Number(prize.required_points)} required points
          </div>
        </Card.Text>

        <Card.Text className="text-center" as="h3">
          <Row>
            {now >= 100 ? (
              <Col>
                <Button variant="danger">Redeem now</Button>{" "}
              </Col>
            ) : (
              ""
            )}

            <Col> ${prize.price}</Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Prize;
