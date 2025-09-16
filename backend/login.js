// login.js
import {users} from './data.js'
import { db } from './firebase.js';
//import { collection, query, where, getDocs } from 'firebase-admin/firestore';
// export const handleLogin = (req, res) => {
//   const { email, password } = req.body;

//   // Simulate MySQL-like query (you’ll replace this with a real DB query later)
//   const user = users.filter(u => u.email === email && u.password === password)[0];

//   if (user) {
//     res.json({
//       success: true,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         profileImage: user.profileImage,
//         balance : user.balance,
//         cardNumber: user.cardNumber,
//         lastTopUp: user.lastTopUp
//       }
//     });
//   } else {
//     res.status(401).json({
//       success: false,
//       message: "Invalid credentials"
//     });
//   }
// };

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usersRef = db.collection('1');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();
    console.log('User data from Firestore:', user);
    // Check password
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Success
    res.json({
      success: true,
      user: {
        id: userDoc.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        balance: user.balance,
        cardNumber: user.cardNumber,
        lastTopUp: {
          amount: user.lastTopUp.amount,
          date: user.lastTopUp.date // convert Firestore Timestamp to JS Date
        },
        favoriteRoutes: user.favoriteRoutes,
        address: user.address,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
