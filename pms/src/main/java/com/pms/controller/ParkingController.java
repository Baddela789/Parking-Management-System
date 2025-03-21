package com.pms.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pms.model.ParkingSpot;
import com.pms.model.Payment;
import com.pms.model.Reservation;
import com.pms.service.ParkingService;
import com.pms.service.UserService;

@RestController
@RequestMapping("/api/parking")
@CrossOrigin("*")
public class ParkingController {

    @Autowired
    private ParkingService parkingService;

    @Autowired
    private UserService userService;

//  @PostMapping("/book")
// public ResponseEntity<String> bookParking(@RequestBody Reservation reservationRequest) {
//     User user = userService.getUserByEmail(reservationRequest.getUser().getEmail())
//             .orElseThrow(() -> new RuntimeException("User not found"));

//     LocalDateTime start = reservationRequest.getStartTime();
//     LocalDateTime end = reservationRequest.getEndTime();

//     try {
//         Reservation reservation = parkingService.bookParkingSpot(reservationRequest.getParkingSpot().getId(), user.getId(), start, end);
//         return ResponseEntity.ok("Spot booked successfully, Payment pending.");
//     } catch (RuntimeException e) {
//         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//     }
// }

    
    // @PostMapping("/pay")
    // public ResponseEntity<String> makePayment(@RequestBody Payment paymentRequest) {
    //     Payment payment = parkingService.makePayment(paymentRequest.getReservation().getId(), paymentRequest.getAmount());
    //     return ResponseEntity.ok("Payment successful.");
    // }
   @PostMapping("/book")
public ResponseEntity<String> bookParkingSpot(@RequestBody Map<String, Object> bookingRequest) {
    Long spotId = Long.parseLong(bookingRequest.get("spotId").toString());
    Long userId = Long.parseLong(bookingRequest.get("userId").toString());
    int duration = Integer.parseInt(bookingRequest.get("duration").toString());

    String responseMessage = parkingService.bookParkingSpot(spotId, userId, duration);

    if (responseMessage.equals("Spot is already occupied.")) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMessage);
    } else {
        return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
    }
}

    @PostMapping("/pay")
    public Payment payForReservation(@RequestBody Map<String, Object> paymentRequest) {
        Long reservationId = Long.parseLong(paymentRequest.get("reservationId").toString());
        double amount = Double.parseDouble(paymentRequest.get("amount").toString());
    
        return parkingService.makePayment(reservationId, amount);
    }
    
    
    @PostMapping("/vacate")
    public ResponseEntity<String> vacateSpot(@RequestBody Map<String, Long> requestBody) {
        Long spotId = requestBody.get("id"); 
        parkingService.vacateParkingSpot(spotId); 
        return ResponseEntity.ok("Spot vacated successfully.");
    }
    

@PostMapping("/allspots")
public List<ParkingSpot> getAllParkingSpots(@RequestBody Map<String, Long> requestBody) {
    Long parkingLotId = requestBody.get("parkingLotId");
    if (parkingLotId == null) {
        throw new RuntimeException("ParkingLotId is required.");
    }
    return parkingService.getAllParkingSpots(parkingLotId);
}


  
    @GetMapping("/availablespots")
    public List<ParkingSpot> getAvailableSpots(@RequestBody Long parkingLotId) {
        return parkingService.getAvailableSpots(parkingLotId);
    }
}
