import React, { useEffect, useState } from "react";
import { Tabs, Table, Form, Input, Button, message, Card, Row, Col, Space } from "antd";
import axios from "../api/api";
import RatesList from "./RatesList"; 

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchReservations();
    fetchParkingSpots();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      message.error("Failed to fetch users.");
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get("/admin/reservations");
      setReservations(response.data);
    } catch (error) {
      message.error("Failed to fetch reservations.");
    }
  };

  const fetchParkingSpots = async () => {
    try {
      const response = await axios.post("/parking/allspots", {
        parkingLotId: 1
      });
      setSpots(response.data);
    } catch (error) {
      message.error("Failed to fetch parking spots.");
    }
  };

  const addRate = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("/admin/rate", values);
      if (response.status === 200) {
        message.success("Rate added successfully!");
      }
    } catch (error) {
      message.error("Failed to add rate.");
    } finally {
      setLoading(false);
    }
  };

  const userColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
  ];

  const reservationColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    { title: "User", dataIndex: "user", render: (user) => user.username },
    { title: "Spot", dataIndex: "parkingSpot", render: (spot) => `${spot.vehicleType} - ${spot.spotNumber}` },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "End Time", dataIndex: "endTime", key: "endTime" },
    { title: "Payment Status", dataIndex: "paymentStatus", key: "paymentStatus" },
  ];

  const spotColumns = [
    { title: "Spot Number", dataIndex: "spotNumber", key: "spotNumber" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Vehicle Type", dataIndex: "vehicleType", key: "vehicleType" },
  ];

  const tabsItems = [
    { 
      label: "Users", 
      key: "1", 
      children: (
        <Card title="User Management" bordered={false}>
          <Table dataSource={users} columns={userColumns} rowKey="id" />
        </Card>
      ),
    },
    { 
      label: "Reservations", 
      key: "2", 
      children: (
        <Card title="Reservation Management" bordered={false}>
          <Table dataSource={reservations} columns={reservationColumns} rowKey="id" />
        </Card>
      ),
    },
    { 
      label: "Parking Spots", 
      key: "3", 
      children: (
        <Card title="Parking Spot Management" bordered={false}>
          <Table dataSource={spots} columns={spotColumns} rowKey="id" />
        </Card>
      ),
    },
    { 
      label: "Add Rates", 
      key: "4", 
      children: (
        <Card title="Add New Rate" bordered={false}>
          <Form layout="vertical" onFinish={addRate}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="vehicleType" label="Vehicle Type" rules={[{ required: true }]}>
                  <Input placeholder="Enter vehicle type" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="durationInHours" label="Duration (hours)" rules={[{ required: true }]}>
                  <Input type="number" placeholder="Enter duration in hours" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                  <Input type="number" placeholder="Enter price" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} block>
                    Add Rate
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      ),
    },
    {
      label: "Rate List", 
      key: "5", 
      children: (
        <Card title="View Rates" bordered={false}>
          <RatesList />
        </Card>
      ),
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Tabs defaultActiveKey="1" items={tabsItems} tabPosition="top" />
    </div>
  );
};

export default AdminPage;
