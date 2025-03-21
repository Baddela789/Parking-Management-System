
package com.pms.repository;

import com.pms.model.Rate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RateRepository extends JpaRepository<Rate, Long> {
    List<Rate> findByVehicleType(String vehicleType);
}
