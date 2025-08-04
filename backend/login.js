// login.js
import {users} from './data.js'
export const handleLogin = (req, res) => {
  const { email, password } = req.body;

  // Simulate MySQL-like query (you’ll replace this with a real DB query later)
  const user = users.filter(u => u.email === email && u.password === password)[0];

  if (user) {
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        balance : user.balance,
        cardNumber: user.cardNumber,
        lastTopUp: user.lastTopUp
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
};

// Simulated MySQL table data
// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "+27 12 345 6789",
//     address: "123 Main Street, Pretoria",
//     password: "password123", // In real apps, use bcrypt to hash & compare
//     profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//     balance: 125.50,
//     cardNumber: "4321123456789012",
//     lastTopUp: {
//       amount: 50.00,
//       date: "2023-08-15"
//     },
//     favoriteRoutes: ["A1", "B3", "C2"]
//   }
// ];
