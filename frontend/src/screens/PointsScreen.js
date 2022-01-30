import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import FormContainer from "../components/Form/FormContainer";
import { useNavigate } from "react-router-dom";

function PointsScreen() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);
  return (
    <FormContainer>
      <h1 className="text-center">MY points</h1>

      <Card className="text-center">
        <Card.Header>MY points</Card.Header>
        <Card.Body>
          <Card.Title>
            <h1>
              Name : <div className="text-info"> {userInfo.name} </div>
            </h1>
          </Card.Title>
          <Card.Text>
            <h2>
              Accumulated points :
              <div className="text-info"> {userInfo.points} </div>
            </h2>
          </Card.Text>
        </Card.Body>
      </Card>
    </FormContainer>
  );
}

export default PointsScreen;
