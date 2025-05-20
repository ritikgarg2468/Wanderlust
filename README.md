# 🏠 Wanderlust - Rental Listing Web App

Wanderlust is a full-stack rental listing platform that helps users easily find and post properties for rent. Built with Node.js, Express, EJS, and MongoDB, it offers a seamless experience for landlords and tenants with features like real-time form validation, RESTful APIs, review system, and error handling.

---

## 🚀 Features

- 🔍 **Property Search & Filtering** – Search properties based on location, price, and type.
- 📝 **Post Listings** – Landlords can add new properties with images and descriptions.
- ✅ **Real-Time Form Validation** – Instant feedback on input fields to improve UX.
- 🧾 **Review & Rating System** – Users can leave reviews for properties.
- ⚙️ **RESTful API Integration** – Handles all CRUD operations via clean API routes.
- 🚫 **Robust Error Handling** – Manages user and server errors gracefully.
- 🔒 **User Authentication** – Secure login and registration system.

---

## 🛠️ Tech Stack

|---------------------------------------------------------------|
| Layer        | Technology                                     |
|--------------|------------------------------------------------|
| Frontend     | HTML, CSS, EJS Templates                       |
| Backend      | Node.js, Express                               |
| Database     | MongoDB (Mongoose ODM)                         |
| Deployment   | (e.g., Render, Heroku, or local)               |
| Others       | Body-Parser, Mongoose, Express-Validator, etc. |
|---------------------------------------------------------------|

---

## 📁 Project Structure

rentease/
├── public/
│ └── css/
├── views/
│ ├── partials/
│ └── pages/
├── routes/
│ └── index.js
├── models/
│ └── Property.js
├── controllers/
│ └── propertyController.js
├── app.js
└── package.json

---

## 🚦 Setup Instructions

1. **Clone the repository:**
  
2. Install dependencies:
   npm install
   
4. Create a .env file:
   PORT=3000
   MONGODB_URI=your_mongo_connection_string
   
5. Run the app:
   npm start

Open in browser: http://localhost:3000

---

## 🧪 Sample Features to Try

  Register as a user and login.
  Post a new rental property.
  Browse listings with search and filters.
  Leave a review and rating on a property.
  Try submitting an empty form to see real-time validation and error handling.

## ✨ Future Enhancements
 🌍 Map Integration (Google Maps API)
 💳 Online Rent Payments
 📱 Responsive Mobile Design
 📊 Admin Dashboard for Analytics

## 🤝 Contributing
  Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
  
---

🙋‍♂️ Author
Ritik Garg
Connect on LinkedIn
Explore more on GitHub
