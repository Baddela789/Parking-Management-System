package com.pms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pms.model.ParkingLot;
import com.pms.model.ParkingSpot;
import com.pms.model.Payment;
import com.pms.model.Rate;
import com.pms.model.Reservation;
import com.pms.model.User;
import com.pms.service.AdminService;
import com.pms.service.ParkingService;
import com.pms.service.RateService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private RateService rateService;

    @Autowired
    private ParkingService parkingService;

    @PostMapping("/rate")
    public Rate configureRate(@RequestBody Rate rate) {
        return rateService.saveRate(rate.getVehicleType(), rate.getDurationInHours(), rate.getPrice());
    }
    // public Rate configureRate(@RequestParam String vehicleType,
    //         @RequestParam int durationInHours,
    //         @RequestParam double price) {
    //     Rate rate = new Rate();
    //     rate.setVehicleType(vehicleType);
    //     rate.setDurationInHours(durationInHours);
    //     rate.setPrice(price);
    //     return rateService.saveRate(rate);
    // }

    @GetMapping("/get-parking-spots")
    public List<ParkingSpot> getAllParkingSpots(@RequestParam Long parkingLotId) {
        return parkingService.getAllParkingSpots(parkingLotId);
    }

    @GetMapping("/rates")
    public List<Rate> getRates(@RequestParam String vehicleType) {
        return rateService.getRatesForVehicleType(vehicleType);
    }

    @PostMapping("/addlot")
    public ResponseEntity<ParkingLot> addParkingLot(@RequestBody ParkingLot parkingLot) {
        ParkingLot createdLot = adminService.addParkingLot(parkingLot.getName(), parkingLot.getLocation(),
                parkingLot.getTotalSpots());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLot);
    }

    // @PostMapping("/addspots")
    // public ResponseEntity<List<ParkingSpot>> addParkingSpots(@RequestBody ParkingSpot parkingSpotRequest) {
    //     Long parkingLotId = parkingSpotRequest.getParkingLot().getId();
    //     int numSpots = parkingSpotRequest.getSpotNumber();

    //     List<ParkingSpot> newSpots = adminService.addParkingSpots(parkingLotId, numSpots);
    //     return ResponseEntity.status(HttpStatus.CREATED).body(newSpots);
    // }
    @PostMapping("/addspots")
public ResponseEntity<List<ParkingSpot>> addParkingSpots(@RequestBody AddSpotsRequest request) {
    List<ParkingSpot> newSpots = adminService.addParkingSpots(request.getParkingLotId(), request.getNumSpots());
    return ResponseEntity.status(HttpStatus.CREATED).body(newSpots);
}

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/reservations")
    public List<Reservation> getAllReservations() {
        return adminService.getAllReservations();
    }

    @PostMapping("/vacatespot")
    public ResponseEntity<String> vacateSpot(@RequestBody ParkingSpot parkingSpot) {
        adminService.vacateSpot(parkingSpot.getId());
        return ResponseEntity.ok("Spot vacated successfully.");
    }

    @GetMapping("/payments")
    public Payment getPaymentDetails(@RequestBody Reservation reservation) {
        return adminService.getPaymentDetails(reservation.getId());
    }

     @DeleteMapping("/parkingSpot/{spotId}")
    public ResponseEntity<String> deleteParkingSpot(@PathVariable Long spotId) {
        try {
            adminService.deleteParkingSpot(spotId);
            return ResponseEntity.ok("Parking spot deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Parking spot not found");
        }
    }
     public static class AddSpotsRequest {
        private Long parkingLotId;
        private int numSpots;

        public Long getParkingLotId() {
            return parkingLotId;
        }

        public void setParkingLotId(Long parkingLotId) {
            this.parkingLotId = parkingLotId;
        }

        public int getNumSpots() {
            return numSpots;
        }

        public void setNumSpots(int numSpots) {
            this.numSpots = numSpots;
        }
    }
}
