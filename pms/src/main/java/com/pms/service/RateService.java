
package com.pms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.model.Rate;
import com.pms.repository.RateRepository;

@Service
public class RateService {
    @Autowired
    private RateRepository rateRepository;

    public Rate saveRate(String vehicleType, int durationInHours, double price) {
        Rate rate = new Rate();
        rate.setVehicleType(vehicleType);
        rate.setDurationInHours(durationInHours);
        rate.setPrice(price);

        return rateRepository.save(rate);
    }
    public List<Rate> getRatesForVehicleType(String vehicleType) {
        return rateRepository.findByVehicleType(vehicleType);
    }
}
