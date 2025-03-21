import React, { useState, useEffect } from "react";
import { Card, Button, Input, message, Row, Col, Layout, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

const UserPage = () => {
  const [parkingLotDetails, setParkingLotDetails] = useState({
    name: "Nexus Mall",
    location: "Down",
    totalSpots: 10,
  });
  const [spots, setSpots] = useState([]);
  const [duration, setDuration] = useState(1);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const parkingLotId = 1;

  useEffect(() => {
    axios
      .post("http://localhost:8089/api/parking/allspots", { parkingLotId })
      .then((response) => {
        setSpots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parking spots", error);
      });
  }, []);

  const handlePark = (spotId) => {
    axios
      .post("http://localhost:8089/api/parking/book", {
        spotId,
        userId: user.id,
        duration,
      })
      .then((response) => {
        if (response.status === 200 && response.data) {
          message.success(response.data);
          setTimeout(() => {
            setSpots((prevSpots) =>
              prevSpots.map((spot) =>
                spot.id === spotId
                  ? { ...spot, status: "OCCUPIED" }
                  : spot
              )
            );
          }, 5000);
        } else {
          message.error("Unexpected response from the server.");
        }
      })
      .catch((error) => {
        if (error.response) {
          message.error(error.response.data || "Failed to park the vehicle.");
        } else {
          message.error("Failed to park the vehicle.");
        }
        console.error("Error parking the vehicle", error);
      });
  };

  const handleVacate = (spotId) => {
    axios
      .post("http://localhost:8089/api/parking/vacate", { id: spotId })
      .then(() => {
        setSpots((prevSpots) =>
          prevSpots.map((spot) =>
            spot.id === spotId
              ? { ...spot, status: "AVAILABLE" }
              : spot
          )
        );
        message.success("Spot vacated successfully.");
      })
      .catch((error) => {
        message.error("Failed to vacate the spot.");
        console.error("Error vacating the spot", error);
      });
  };

  const handlePaymentPage = () => {
    axios
      .get("http://localhost:8089/api/admin/reservations")
      .then((response) => {
        navigate("/payment", { state: { reservations: response.data } });
      })
      .catch((error) => {
        console.error("Error fetching reservations", error);
      });
  };

  return (
    <Layout style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
      <Content style={{ maxWidth: "1200px", margin: "auto" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Parking Management System
        </Title>
        <Card title={parkingLotDetails.name} style={{ marginBottom: 20, backgroundColor: "#fafafa" }}>
          <p>Location: {parkingLotDetails.location}</p>
          <p>Total Spots: {parkingLotDetails.totalSpots}</p>
          <Button
            type="primary"
            onClick={handlePaymentPage}
            style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50", width: "20%" }}
          >
            View Reservations and Pay
          </Button>
        </Card>
        <Row gutter={16}>
          {spots.map((spot) => (
            <Col span={8} key={spot.id}>
              <Card
                title={`Parking Spot ${spot.spotNumber}`}
                style={{
                  marginBottom: 10,
                  backgroundColor: spot.status === "AVAILABLE" ? "#e8f5e9" : "#fce4ec",
                  borderRadius: "8px",
                }}
              >
                <p>Status: {spot.status}</p>
                <p>Vehicle Type: {spot.vehicleType}</p>
                {spot.status === "AVAILABLE" && (
                  <>
                    <p>Duration</p>
                    <Input
                      type="number"
                      min={1}
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      style={{ marginBottom: 10 }}
                    />
                    <Button
                      type="primary"
                      block
                      onClick={() => handlePark(spot.id)}
                      style={{ backgroundColor: "#2196F3", borderColor: "#2196F3" }}
                    >
                      Park
                    </Button>
                  </>
                )}
                {spot.status === "OCCUPIED" && (
                  <Button
                    type="default"
                    block
                    onClick={() => handleVacate(spot.id)}
                    style={{ backgroundColor: "#FF5722", borderColor: "#FF5722" }}
                  >
                    Vacate
                  </Button>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default UserPage;
