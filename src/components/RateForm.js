import { Button, Card, Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";

const RateForm = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8089/api/admin/rate", {
        vehicleType: values.vehicleType,
        durationInHours: values.duration,
        price: values.price,
      });
      if (response.data) {
        message.success("Rate added successfully!");
      }
    } catch (error) {
      message.error("Failed to add rate.");
    }
  };

  return (
    <Card title="Add New Rate" bordered={false} style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Form onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Vehicle Type"
              name="vehicleType"
              rules={[{ required: true, message: "Please input vehicle type!" }]}
            >
              <Input value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} placeholder="Enter vehicle type" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Duration (in hours)"
              name="duration"
              rules={[{ required: true, message: "Please input duration!" }]}
            >
              <Input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration in hours"
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input price!" }]}
            >
              <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          htmlType="submit"
          style={{
            marginTop: 20,
            width: "20%",
            maxWidth: 50,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Add Rate
        </Button>
      </Form>
    </Card>
  );
};

export default RateForm;
