package com.pms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pms.model.ParkingSpot;

@Repository
public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Long> {
    List<ParkingSpot> findByParkingLotId(Long lotId);
    
    
    List<ParkingSpot> findByParkingLotIdAndStatus(Long lotId, String status);
    List<ParkingSpot> findByParkingLotIdAndStatusAndVehicleType(Long lotId, String status, String vehicleType);

}