import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import axios from "../api/api";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("/admin/reservations");
      setReservations(response.data);
    } catch (error) {
      message.error("Failed to fetch reservations.");
    }
  };

  const reservationColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    { title: "User", dataIndex: "user", render: (user) => user.username },
    { title: "Spot", dataIndex: "parkingSpot", render: (spot) => `${spot.vehicleType} - ${spot.spotNumber}` },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "End Time", dataIndex: "endTime", key: "endTime" },
    { title: "Payment Status", dataIndex: "paymentStatus", key: "paymentStatus" },
  ];

  return (
    <div>
      <Table dataSource={reservations} columns={reservationColumns} rowKey="id" />
    </div>
  );
};

export default ReservationList;
