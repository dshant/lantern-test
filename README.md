Overview
This repository contains a simple React application for a calculator, integrated with Firebase for user authentication and calculation history storage.

1.To set up the project, use the following command to create a new React app:
npx create-react-app my-calculator-app

2.Firebase Setup
Create a Firebase project and obtain the Firebase configuration. Update the firebase.js file in the src directory with your Firebase configuration.

3.Firebase Authentication
Import the necessary Firebase authentication functions for email/password login, user creation, and Google sign-in. Implement these functions as per your authentication requirements.

4.Calculator Logic
Implement the logic for basic calculator operations (addition, subtraction, multiplication, division) within your React components.

5.Firebase Firestore Database
Create a Firestore database in Firebase named "history." This is where calculation history entries will be stored.

6.Save Calculation Entries
Use Firebase Firestore functions to save each calculation entry in the "history" database. Ensure to include the user's ID, calculation details, timestamp, and any additional information needed.

7.Fetch and Display Calculations
Implement a function to fetch and display all saved calculations from the "history" database. Use the getDocs function to retrieve the data and update your React component state accordingly.

8.Delete Individual Entry
Implement the functionality to delete an individual entry from the "history" database using the deleteDoc function from Firebase.
