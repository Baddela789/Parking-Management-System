
package com.pms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleType;
    private int durationInHours;
   
   public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getVehicleType() {
    return vehicleType;
}

public void setVehicleType(String vehicleType) {
    this.vehicleType = vehicleType;
}

public int getDurationInHours() {
    return durationInHours;
}

public void setDurationInHours(int durationInHours) {
    this.durationInHours = durationInHours;
}

public double getPrice() {
    return price;
}

public void setPrice(double price) {
    this.price = price;
}
    private double price;

}
