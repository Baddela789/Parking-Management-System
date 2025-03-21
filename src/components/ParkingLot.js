import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Input } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ParkingLot = () => {
  const [parkingLot, setParkingLot] = useState({});
  const [spots, setSpots] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [duration, setDuration] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:8089/api/parking/allspots', {
      params: { parkingLotId: 1 }
    }).then(response => {
      setSpots(response.data);
      setParkingLot({
        name: 'Nexus Mall',
        location: 'Down',
        totalSpots: 10
      });
    });
  }, []);

  const handlePark = (spot) => {
    setSelectedSpot(spot);
    setIsModalVisible(true);
  };

  const handleBookSpot = () => {
    axios.post('http://localhost:8089/api/parking/book', {
      spotId: selectedSpot.id,
      userId: 2, 
      duration: parseInt(duration)
    }).then(response => {
      setSuccessMessage('Successfully parked!');
      setTimeout(() => {
        
        setSpots(prevSpots => prevSpots.map(spot =>
          spot.id === selectedSpot.id ? { ...spot, status: 'OCCUPIED' } : spot
        ));
      }, 5000);
    }).catch(error => {
      console.error('Error booking parking spot:', error);
    });
    setIsModalVisible(false);
  };

  const handleVacate = (spotId) => {
    axios.post('http://localhost:8089/api/parking/vacate', { id: spotId })
      .then(response => {
        setSpots(prevSpots => prevSpots.map(spot =>
          spot.id === spotId ? { ...spot, status: 'AVAILABLE' } : spot
        ));
      });
  };

  const handlePayment = (reservationId, cost) => {
    history.push('/payment', { reservationId, cost });
  };

  return (
    <div>
      <h1>Parking Management System</h1>
      <Card title={parkingLot.name}>
        <p>Location: {parkingLot.location}</p>
        <p>Total Spots: {parkingLot.totalSpots}</p>
      </Card>

      <div className="spot-cards">
        {spots.map(spot => (
          <Card
            key={spot.id}
            title={`Spot #${spot.spotNumber}`}
            style={{ width: 300, marginTop: 16 }}
            extra={
              spot.status === 'AVAILABLE' ? (
                <Button onClick={() => handlePark(spot)}>Park</Button>
              ) : (
                <Button onClick={() => handleVacate(spot.id)} danger>Vacate</Button>
              )
            }
          >
            <p>Status: {spot.status}</p>
            <p>Vehicle Type: {spot.vehicleType}</p>
          </Card>
        ))}
      </div>

      <Modal
        title="Enter Parking Duration"
        visible={isModalVisible}
        onOk={handleBookSpot}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration in hours"
        />
      </Modal>

      {successMessage && <h2>{successMessage}</h2>}
    </div>
  );
};

export default ParkingLot;
