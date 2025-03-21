package com.pms.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.model.ParkingSpot;
import com.pms.model.Payment;
import com.pms.model.Rate;
import com.pms.model.Reservation;
import com.pms.model.User;
import com.pms.repository.ParkingSpotRepository;
import com.pms.repository.PaymentRepository;
import com.pms.repository.ReservationRepository;
import com.pms.repository.UserRepository;

@Service
public class ParkingService {
    @Autowired
    private ParkingSpotRepository parkingSpotRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RateService rateService;

    public List<ParkingSpot> getAllParkingSpots(Long lotId) {
        return parkingSpotRepository.findByParkingLotId(lotId);
    }

    public List<ParkingSpot> getAvailableSpots(Long lotId) {
        return parkingSpotRepository.findByParkingLotIdAndStatus(lotId, "available");
    }

    
    public String bookParkingSpot(Long spotId, Long userId, int duration) {
        ParkingSpot spot = parkingSpotRepository.findById(spotId)
                .orElseThrow(() -> new RuntimeException("Spot not found"));
        
        if (spot.getStatus().equals("OCCUPIED")) {
            return "Spot is already occupied.";
        }
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        double cost = calculateCost(spot.getVehicleType(), duration);
        
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setParkingSpot(spot);
        reservation.setStartTime(LocalDateTime.now());
        reservation.setEndTime(LocalDateTime.now().plusHours(duration));
        reservation.setCost(cost);
        reservation.setPaymentStatus("PENDING"); 
        
    
        reservationRepository.save(reservation);
        
        spot.setStatus("OCCUPIED");
        spot.setReservation(reservation);
        parkingSpotRepository.save(spot);
        
        return String.format("Spot reserved successfully. Total payment amount is ₹%.2f based on your booking duration of %d hours.", cost, duration);
    }
    
    
    public double calculateCost(String vehicleType, int duration) {
        List<Rate> rates = rateService.getRatesForVehicleType(vehicleType);
        
        System.out.println("Rates for vehicle type: " + vehicleType + " -> " + rates);
        System.out.println("Requested duration: " + duration);
        
        return rates.stream()
                .filter(rate -> rate.getDurationInHours() == duration)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Rate not configured for this duration"))
                .getPrice();
    }
    
   
    public Payment makePayment(Long reservationId, double amount) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (amount < reservation.getCost()) {
            throw new RuntimeException("Insufficient payment amount.");
        }

        Payment payment = new Payment();
        payment.setReservation(reservation);
        payment.setAmount(amount);
        payment.setPaymentStatus("PAID");

        reservation.setPaymentStatus("PAID");
        reservationRepository.save(reservation);
        return paymentRepository.save(payment);
    }

    public void vacateParkingSpot(Long spotId) {
        ParkingSpot spot = parkingSpotRepository.findById(spotId)
                .orElseThrow(() -> new RuntimeException("Spot not found"));
        spot.setStatus("AVAILABLE");
        parkingSpotRepository.save(spot);
    }
}
