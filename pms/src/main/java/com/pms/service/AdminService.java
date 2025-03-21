package com.pms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.model.ParkingLot;
import com.pms.model.ParkingSpot;
import com.pms.model.Payment;
import com.pms.model.Rate;
import com.pms.model.Reservation;
import com.pms.model.User;
import com.pms.repository.ParkingLotRepository;
import com.pms.repository.ParkingSpotRepository;
import com.pms.repository.PaymentRepository;
import com.pms.repository.ReservationRepository;
import com.pms.repository.UserRepository;
import com.pms.repository.RateRepository;
@Service
public class AdminService {
    @Autowired
    private ParkingLotRepository parkingLotRepository;
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

    public List<ParkingSpot> addParkingSpots(Long parkingLotId, int numSpots) {
        ParkingLot parkingLot = parkingLotRepository.findById(parkingLotId)
                .orElseThrow(() -> new RuntimeException("Parking lot not found"));

        List<ParkingSpot> newSpots = new ArrayList<>();

        String[] types = { "CAR", "BIKE" };
        Random random = new Random();

        for (int i = 1; i <= numSpots; i++) {
            ParkingSpot spot = new ParkingSpot();
            spot.setSpotNumber(i);
            spot.setStatus("AVAILABLE");
            spot.setParkingLot(parkingLot);
            spot.setVehicleType(types[random.nextInt(types.length)]);
            parkingSpotRepository.save(spot);
            newSpots.add(spot);
        }

        return newSpots;
    }

    public ParkingLot addParkingLot(String name, String location, int totalSpots) {
        ParkingLot parkingLot = new ParkingLot();
        parkingLot.setName(name);
        parkingLot.setLocation(location);
        parkingLot.setTotalSpots(totalSpots);
        parkingLot.setAvailableSpots(totalSpots);
        return parkingLotRepository.save(parkingLot);
    }

    // public List<ParkingSpot> addParkingSpots(Long parkingLotId, int numSpots) {

    //     ParkingLot parkingLot = parkingLotRepository.findById(parkingLotId)
    //             .orElseThrow(() -> new RuntimeException("Parking lot not found"));

    //     List<ParkingSpot> newSpots = new ArrayList<>();

    //     for (int i = 1; i <= numSpots; i++) {
    //         ParkingSpot spot = new ParkingSpot();
    //         spot.setSpotNumber(i);
    //         spot.setStatus("AVAILABLE");
    //         spot.setParkingLot(parkingLot);

    //         parkingSpotRepository.save(spot);
    //         newSpots.add(spot);
    //     }

    //     return newSpots;
    // }
  
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Payment getPaymentDetails(Long reservationId) {
        return paymentRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    public void vacateSpot(Long spotId) {
        ParkingSpot spot = parkingSpotRepository.findById(spotId)
                .orElseThrow(() -> new RuntimeException("Spot not found"));

        if ("occupied".equals(spot.getStatus())) {
            spot.setStatus("available");
            parkingSpotRepository.save(spot);
        } else {
            throw new RuntimeException("Spot is already available.");
        }
    }
    public void deleteParkingSpot(Long spotId) {
        ParkingSpot spot = parkingSpotRepository.findById(spotId)
                .orElseThrow(() -> new RuntimeException("Spot not found"));

        parkingSpotRepository.delete(spot);
    }
    
}
