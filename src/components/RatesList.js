import { Table, message, Card } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/api";

const RatesList = () => {
  const [rates, setRates] = useState({ car: [], bike: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const carRatesResponse = await axios.get("/admin/rates?vehicleType=CAR");
      const bikeRatesResponse = await axios.get("/admin/rates?vehicleType=BIKE");
      setRates({
        car: carRatesResponse.data,
        bike: bikeRatesResponse.data,
      });
    } catch (error) {
      message.error("Failed to fetch rates.");
    } finally {
      setLoading(false);
    }
  };

  const rateColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Vehicle Type", dataIndex: "vehicleType", key: "vehicleType" },
    { title: "Duration (hours)", dataIndex: "durationInHours", key: "durationInHours" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  return (
    <div>
      <Card title="Car Rates">
        <Table
          dataSource={rates.car}
          columns={rateColumns}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>
      <Card title="Bike Rates" style={{ marginTop: 20 }}>
        <Table
          dataSource={rates.bike}
          columns={rateColumns}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default RatesList;
