import React, { useState, useEffect } from "react";
import { List, Button, message, Layout, Typography } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

const PaymentPage = () => {
  const { state } = useLocation();
  const { reservations } = state;

  const [updatedReservations, setUpdatedReservations] = useState(reservations);

  const handlePayment = (reservationId, amount) => {
    axios
      .post("http://localhost:8089/api/parking/pay", {
        reservationId,
        amount,
      })
      .then(() => {
        message.success("Payment successful!");
        setUpdatedReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === reservationId
              ? { ...reservation, paid: true }
              : reservation
          )
        );
      })
      .catch((error) => {
        message.error("Payment failed.");
        console.error("Error during payment", error);
      });
  };

  return (
    <Layout style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
      <Content style={{ maxWidth: "1200px", margin: "auto" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Reservations
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={updatedReservations}
          renderItem={(reservation) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => handlePayment(reservation.id, reservation.cost)}
                  disabled={reservation.paid} 
                  style={{
                    backgroundColor: "#4CAF50",
                    borderColor: "#4CAF50",
                    width: "100%",
                  }}
                >
                  {reservation.paid ? "Paid" : `Pay ₹${reservation.cost}`}
                </Button>,
              ]}
              style={{
                backgroundColor: "#ffffff",
                marginBottom: "10px",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <List.Item.Meta
                title={`Spot #${reservation.parkingSpot.spotNumber}`}
                description={`Cost: ₹${reservation.cost}`}
              />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default PaymentPage;
