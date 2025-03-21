########## PARKING MANAGEMENT SYSTEM REACT PROJECT ###################
Parking Management System Requirements
-------------------------
Overview:
The Parking Management System (PMS) is designed to streamline the process of managing parking lots, reservations, payments, and user interactions. It caters to two main types of users: Admin and Regular Users.

Key Features:
Admin Features:
-------------------------

Dashboard & Parking Lot Management:
-----------------------------------------
Admin can view and manage all parking lots and their spots.
Admin can add, update, or delete parking lots and parking spots in each lot.
Parking Reservation Management:
----------------------------------
Admin can view all parking reservations across parking lots.
Admin can approve, update, or cancel reservations as needed.
Admin can manage the availability of parking spots in real-time (marking them as "available" or "occupied").
Rate Management:
-----------------------------

![Image](https://github.com/user-attachments/assets/da18f215-6ceb-469f-af42-45e4442fc80a)
![Image](https://github.com/user-attachments/assets/381923d2-6e8f-464b-901a-daf3eb479914)
![Image](https://github.com/user-attachments/assets/a796d2bd-0acb-4457-8356-3f416ad835b4)
![Image](https://github.com/user-attachments/assets/d9896d3a-3dec-4e8e-91a4-d6ef4552c2d3)
Admin can define parking rates for different types of vehicles (e.g., car, bike) based on the duration of stay.
Rates can be set for various durations (e.g., hourly, daily, weekly).
User Management:
----------------------------
Admin can create, update, and delete user accounts.
Admin can assign roles (admin or user) to different accounts.

User Features:
----------------------------

Parking Lot & Spot Viewing:
-------------------------------
![Image](https://github.com/user-attachments/assets/86eec40e-c718-482f-a43e-3de8ae3e5827)
![Image](https://github.com/user-attachments/assets/189eeb9b-7bb1-4ea8-b664-68372d554e42)
![Image](https://github.com/user-attachments/assets/a75791a9-3eed-4bf2-a7fc-f45a3387c9e3)
![Image](https://github.com/user-attachments/assets/b7864c2d-665e-48e6-9f4c-37c99ea7af4b)
Users can view all available parking spots in a specific parking lot.
Users can filter available spots based on vehicle type (car or bike).
Parking Spot Booking:
-----------------------------------------
Users can select and book an available parking spot.
Upon booking, the system updates the spot status to "occupied."
The user can view the booking details, including the duration of stay and the estimated cost.
Payment:
-----------------------------
After booking, users must make payment based on the parking duration, according to the rates set by the admin.
Payment can be processed through the system, and users will receive a confirmation upon successful payment.
Vacating the Spot:
------------------------------------
Once the parking duration is over, the user must vacate the parking spot.
After the spot is vacated, the system updates the status to "available" for other users.
History & Notifications:
------------------------------------
Users can view their past bookings and payments.
The system sends notifications to users about their parking spot booking status, upcoming payment due dates, and other relevant updates.
Functional Requirements:
Admin Dashboard:
---------------------------------------
Admin can view all parking lots and their spot status (available or occupied).
Admin can manage (add/edit/delete) parking lots and spots.
Admin can define parking rates for different vehicles and durations.
Admin can view a list of all users, manage their details, and assign roles.
Admin can view reports related to reservations, payments, and spot availability.
User Interface:
----------------------------------
Users should be able to view all available spots in a specific parking lot.
Users should have an option to filter available spots by vehicle type.
Users can book a spot by selecting an available space and entering necessary details (vehicle type, duration).
After booking, users can proceed to make payments based on the duration of parking.
Users should receive notifications and reminders about their booking status and payment details.
Users can vacate the spot once they’re done, and the system should mark the spot as available.
Database & Data Management:
--------------------------------------
The system should have a relational database that stores all relevant data, including:
Parking lot and spot details
User details (name, email, password, vehicle type)
Reservation records (start time, end time, vehicle type, payment status)
Payment transactions
The system must be able to perform CRUD (Create, Read, Update, Delete) operations for parking lots, spots, users, and reservations.
Payment System:
--------------------------------------
The payment system should allow users to pay for parking via integrated payment gateways (e.g., credit card, digital wallets).
Payment should be calculated based on the duration of the booking and the rates set by the admin.
Real-time Updates:
--------------------------------
The system should reflect real-time changes in parking spot availability.
Once a spot is booked, it should be immediately marked as "occupied."
When a user vacates a spot, it should be updated to "available."
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
/facebook.github.io/create-react-app/docs/deployment) for more information.

