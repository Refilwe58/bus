import express from 'express';
import cors  from 'cors';
const app = express();
import dotenv from 'dotenv';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
dotenv.config({ path: './backend/.env' });
const port = 5000;

console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY); 
const stripe =new Stripe(process.env.STRIPE_SECRET_KEY);

import { handleLogin } from './login.js';
import {users} from './data.js'
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const server = createServer(app); // <-- Important
const io = new Server(server, {
  cors: {
    origin: '*', // frontend URL in prod
    methods: ['GET', 'POST'],
  },
});
// Route
app.post('/api/login', handleLogin);

// In-memory data storage

// Real Pretoria bus routes
const routes = [{
  id: "A1",
  name: "Pretoria Central to Hatfield",
  status: "operational",
  color: "#3B82F6",
  eta: "5 min",
  stops: [{
    name: "Pretoria Station",
    coordinates: [-25.756634659663046, 28.189067881448995]
  }, {
    name: "Church Square",
    coordinates: [-25.745731275701058, 28.188025252612846]
  }, {
    name: "Pretoria Art Museum",
    coordinates: [-25.748035251095878, 28.21304245500855]
  }, {
    name: "University of Pretoria",
    coordinates: [-25.769177811054412, 28.209512810285197]
  }, {
    name: "Hatfield Gautrain",
    coordinates: [-25.746654358782983, 28.239278966105807]
  }],
  path: [[-25.756634659663046, 28.189067881448995], [-25.745731275701058, 28.188025252612846], [-25.748035251095878, 28.21304245500855], [-25.769177811054412, 28.209512810285197], [-25.746654358782983, 28.239278966105807]],
  frequency: "15 min"
}, {
  id: "A3",
  name: "Pretoria CBD to Menlyn",
  status: "delayed",
  color: "#EF4444",
  eta: "15 min",
  delay: "10 min",
  stops: [{
    name: "Pretoria Station",
    coordinates: [-25.7544, 28.1917]
  }, {
    name: "Arcadia",
    coordinates: [-25.7456, 28.2106]
  }, {
    name: "Loftus Versfeld",
    coordinates: [-25.7554, 28.2211]
  }, {
    name: "Menlyn Park",
    coordinates: [-25.7827, 28.2755]
  }],
  path: [[-25.7544, 28.1917], [-25.7456, 28.2106], [-25.7554, 28.2211], [-25.7827, 28.2755]],
  frequency: "20 min"
}, {
  id: "B2",
  name: "Centurion to University of Pretoria",
  status: "operational",
  color: "#10B981",
  eta: "2 min",
  stops: [{
    name: "Centurion Gautrain",
    coordinates: [-25.8515, 28.1772]
  }, {
    name: "Centurion Mall",
    coordinates: [-25.8608, 28.1892]
  }, {
    name: "Groenkloof",
    coordinates: [-25.7778, 28.2119]
  }, {
    name: "UNISA",
    coordinates: [-25.7669, 28.1998]
  }, {
    name: "Brooklyn",
    coordinates: [-25.7710, 28.2295]
  }, {
    name: "University of Pretoria",
    coordinates: [-25.7545, 28.2314]
  }],
  path: [[-25.8515, 28.1772], [-25.8608, 28.1892], [-25.7778, 28.2119], [-25.7669, 28.1998], [-25.7710, 28.2295], [-25.7545, 28.2314]],
  frequency: "30 min"
}, {
  id: "B7",
  name: "Pretoria West to Mamelodi",
  status: "modified",
  color: "#F59E0B",
  eta: "8 min",
  modification: "Detour via Sunnyside due to construction",
  stops: [{
    name: "Pretoria West Hospital",
    coordinates: [-25.7438, 28.1533]
  }, {
    name: "Pretoria CBD",
    coordinates: [-25.7478, 28.1871]
  }, {
    name: "Sunnyside (Detour)",
    coordinates: [-25.7541, 28.2106]
  }, {
    name: "Silverton",
    coordinates: [-25.7307, 28.2975]
  }, {
    name: "Mamelodi",
    coordinates: [-25.7022, 28.3602]
  }],
  path: [[-25.7438, 28.1533], [-25.7478, 28.1871], [-25.7541, 28.2106], [-25.7307, 28.2975], [-25.7022, 28.3602]],
  frequency: "25 min"
}, {
  id: "C2",
  name: "Soshanguve to Pretoria CBD",
  status: "operational",
  color: "#8B5CF6",
  eta: "12 min",
  stops: [{
    name: "Soshanguve",
    coordinates: [-25.5318, 28.0956]
  }, {
    name: "Mabopane",
    coordinates: [-25.5025, 28.1062]
  }, {
    name: "Rosslyn",
    coordinates: [-25.6271, 28.0864]
  }, {
    name: "Wonderboom",
    coordinates: [-25.6775, 28.1857]
  }, {
    name: "Pretoria North",
    coordinates: [-25.6747, 28.1881]
  }, {
    name: "Pretoria CBD",
    coordinates: [-25.7478, 28.1871]
  }],
  path: [[-25.5318, 28.0956], [-25.5025, 28.1062], [-25.6271, 28.0864], [-25.6775, 28.1857], [-25.6747, 28.1881], [-25.7478, 28.1871]],
  frequency: "20 min"
}, {
  id: "D4",
  name: "Pretoria to OR Tambo Airport",
  status: "operational",
  color: "#EC4899",
  eta: "20 min",
  stops: [{
    name: "Pretoria Station",
    coordinates: [-25.7544, 28.1917]
  }, {
    name: "Centurion",
    coordinates: [-25.8515, 28.1772]
  }, {
    name: "Midrand",
    coordinates: [-25.9705, 28.1275]
  }, {
    name: "Kempton Park",
    coordinates: [-26.1109, 28.2336]
  }, {
    name: "OR Tambo Airport",
    coordinates: [-26.1367, 28.2425]
  }],
  path: [[-25.7544, 28.1917], [-25.8515, 28.1772], [-25.9705, 28.1275], [-26.1109, 28.2336], [-26.1367, 28.2425]],
  frequency: "60 min"
}];
// Trip history
const tripHistory = [{
  userId: 1,
  routeId: "A1",
  timestamp: "2023-09-20T08:15:00",
  amount: 8.50
}, {
  userId: 1,
  routeId: "C2",
  timestamp: "2023-09-19T17:30:00",
  amount: 8.50
}, {
  userId: 1,
  routeId: "A1",
  timestamp: "2023-09-19T08:20:00",
  amount: 8.50
}];
// Notifications
const notifications = [{
  id: 1,
  type: "delay",
  routeId: "A3",
  title: "Route A3 Delay",
  message: "Route A3 is experiencing a 15-minute delay due to traffic congestion on Main Road.",
  timestamp: "2023-09-20T07:45:00",
  icon: "clock"
}, {
  id: 2,
  type: "schedule",
  title: "Schedule Change",
  message: "Weekend schedule changes will be in effect from September 1st. Check the updated timetable.",
  timestamp: "2023-09-19T14:30:00",
  icon: "calendar"
}, {
  id: 3,
  type: "service",
  routeId: "B7",
  title: "Route Modification",
  message: "Route B7 will be temporarily diverted via Sunnyside due to construction work on the main road.",
  timestamp: "2023-09-18T09:15:00",
  icon: "alert-triangle"
}];
// Forum messages
const forumMessages = {
  // "general": [{
  //   id: 1,
  //   userId: 2,
  //   text: "Hi everyone! How's the bus service today?",
  //   time: "10:30 AM",
  //   timestamp: "2023-09-20T10:30:00"
  // }, {
  //   id: 2,
  //   userId: 4,
  //   text: "Pretty good so far! No delays on Route C2.",
  //   time: "10:32 AM",
  //   timestamp: "2023-09-20T10:32:00"
  // }, {
  //   id: 3,
  //   userId: 1,
  //   text: "I noticed the new app update is much faster.",
  //   time: "10:35 AM",
  //   timestamp: "2023-09-20T10:35:00"
  // }, {
  //   id: 4,
  //   userId: 3,
  //   text: "Has anyone tried the new express route to the airport?",
  //   time: "10:40 AM",
  //   timestamp: "2023-09-20T10:40:00"
  // }, {
  //   id: 5,
  //   userId: 5,
  //   text: "Yes, it's great! Saved me about 20 minutes this morning.",
  //   time: "10:42 AM",
  //   timestamp: "2023-09-20T10:42:00"
  // }],
  // "route-a1": [{
  //   id: 1,
  //   userId: 3,
  //   text: "Heads up! There's some traffic near Central Station.",
  //   time: "09:15 AM",
  //   timestamp: "2023-09-20T09:15:00"
  // }, {
  //   id: 2,
  //   userId: 1,
  //   text: "Thanks for the info. How long is the delay?",
  //   time: "09:17 AM",
  //   timestamp: "2023-09-20T09:17:00"
  // }, {
  //   id: 3,
  //   userId: 3,
  //   text: "About 10-15 minutes. The driver is taking an alternate route.",
  //   time: "09:18 AM",
  //   timestamp: "2023-09-20T09:18:00"
  // }],
  // "route-b3": [{
  //   id: 1,
  //   userId: 4,
  //   text: "Does anyone know if the B3 route will be affected by the road works on Main Street?",
  //   time: "Yesterday",
  //   timestamp: "2023-09-19T15:20:00"
  // }, {
  //   id: 2,
  //   userId: 2,
  //   text: "I heard it will be diverted via Park Avenue for the next two weeks.",
  //   time: "Yesterday",
  //   timestamp: "2023-09-19T15:45:00"
  // }],
  // "announcements": [{
  //   id: 1,
  //   userId: 5,
  //   text: "ANNOUNCEMENT: System maintenance scheduled for tonight from 2-4 AM. The app may be unavailable during this time.",
  //   time: "Yesterday",
  //   timestamp: "2023-09-19T10:00:00"
  // }],
  // "help": []
};
// Forum users
const forumUsers = [{
  id: 1,
  name: "John Doe",
  status: "online",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80"
}, {
  id: 2,
  name: "Jane Smith",
  status: "online",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80"
}, {
  id: 3,
  name: "Mike Johnson",
  status: "offline",
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80"
}, {
  id: 4,
  name: "Sarah Williams",
  status: "online",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80"
}, {
  id: 5,
  name: "David Brown",
  status: "offline",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80"
}];
// Payment methods
const paymentMethods = [{
  id: 1,
  userId: 1,
  type: "Visa",
  last4: "4242",
  expiry: "04/25"
}, {
  id: 2,
  userId: 1,
  type: "Mastercard",
  last4: "5555",
  expiry: "09/24"
}];
// API Routes
// Auth endpoints
// app.post('/api/login', (req, res) => {
//   const {
//     email,
//     password
//   } = req.body;
//   const user = users.find(u => u.email === email && u.password === password);
//   if (user) {
//     // In a real app, you would use JWT or sessions
//     res.json({
//       success: true,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         profileImage: user.profileImage
//       }
//     });
//   } else {
//     res.status(401).json({
//       success: false,
//       message: "Invalid credentials"
//     });
//   }
// });
// User endpoints
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    // Don't send password in response
    const {
      password,
      ...userWithoutPassword
    } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
});
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    // Update user info but don't allow password update through this endpoint
    const {
      password,
      ...updateData
    } = req.body;
    users[userIndex] = {
      ...users[userIndex],
      ...updateData
    };
    const {
      password: _,
      ...userWithoutPassword
    } = users[userIndex];
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
});
// Routes endpoints
app.get('/api/routes', (req, res) => {
  res.json(routes);
});
app.get('/api/routes/:id', (req, res) => {
  const route = routes.find(r => r.id === req.params.id);
  if (route) {
    res.json(route);
  } else {
    res.status(404).json({
      message: "Route not found"
    });
  }
});
// Trip history endpoints
app.get('/api/users/:id/trips', (req, res) => {
  const userId = parseInt(req.params.id);
  const userTrips = tripHistory.filter(t => t.userId === userId);
  // Enhance trip data with route information
  const enhancedTrips = userTrips.map(trip => {
    const route = routes.find(r => r.id === trip.routeId);
    return {
      ...trip,
      routeName: route ? route.name : "Unknown Route"
    };
  });
  res.json(enhancedTrips);
});
// Notifications endpoints
app.get('/api/users/:id/notifications', (req, res) => {
  // In a real app, you would filter notifications relevant to the user
  res.json(notifications);
});
// Forum endpoints
app.get('/api/forum/channels', (req, res) => {
  const channels = Object.keys(forumMessages).map(id => {
    return {
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' '),
      unread: id === 'route-a1' ? 3 : id === 'route-b3' ? 1 : 0
    };
  });
  res.json(channels);
});
app.get('/api/forum/channels/:channelId/messages', (req, res) => {
  const {
    channelId
  } = req.params;
  const messages = forumMessages[channelId] || [];
  // Enhance message data with user information
  const enhancedMessages = messages.map(message => {
    const user = forumUsers.find(u => u.id === message.userId);
    return {
      ...message,
      user: user ? {
        name: user.name,
        avatar: user.avatar,
        status: user.status
      } : null
    };
  });
  res.json(enhancedMessages);
});
app.post('/api/forum/channels/:channelId/messages', (req, res) => {
  const { channelId } = req.params;
  const { userId, text } = req.body;

  // Initialize channel array if it doesn't exist
  if (!forumMessages[channelId]) forumMessages[channelId] = [];

  const newMessage = {
    id: forumMessages[channelId].length + 1,
    userId,
    text,
    time: "Just now",
    timestamp: new Date().toISOString()
  };

  // Store in the array
  forumMessages[channelId].push(newMessage);

  const user = forumUsers.find(u => u.id === userId);
  const enhancedMessage = {
    ...newMessage,
    user: user ? { name: user.name, avatar: user.avatar, status: user.status } : null
  };

  // Emit to clients
  io.to(channelId).emit('newMessage', enhancedMessage);

  res.status(201).json(enhancedMessage);
});


// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinChannel', (channelId) => {
    socket.join(channelId);
    console.log(`${socket.id} joined ${channelId}`);
  });

  socket.on('leaveChannel', (channelId) => {
    socket.leave(channelId);
    console.log(`${socket.id} left ${channelId}`);
  });

  socket.on('sendMessage', ({ channelId, message }) => {
    // Broadcast to everyone in the channel
    io.to(channelId).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
app.get('/api/forum/users', (req, res) => {
  res.json(forumUsers);
});
// Payment methods endpoints
app.get('/api/users/:id/payment-methods', (req, res) => {
  const userId = parseInt(req.params.id);
  const methods = paymentMethods.filter(m => m.userId === userId);
  res.json(methods);
});
app.post('/api/users/:id/payment-methods', (req, res) => {
  const userId = parseInt(req.params.id);
  const {
    type,
    last4,
    expiry
  } = req.body;
  const newMethod = {
    id: paymentMethods.length + 1,
    userId,
    type,
    last4,
    expiry
  };
  paymentMethods.push(newMethod);
  res.status(201).json(newMethod);
});
// Top-up endpoint
// app.post('/api/users/:id/topup',async (req, res) => {
//   const userId = parseInt(req.params.id);
//   const {
//     amount
//   } = req.body;
//   const userIndex = users.findIndex(u => u.id === userId);
//   if (userIndex !== -1) {
//     const user = users[userIndex];
//     const newBalance = user.balance + parseFloat(amount);

//     //stripe usage 
//    const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price_data: {
//           currency: 'zar',
//           product_data: {
//             name: 'Account Top-Up',
//           },
//           unit_amount: Math.round(amount * 100), // convert to cents
//         },
//         quantity: 1,
//       }],
//       mode: 'payment',
//       success_url: `http://localhost:5173/topup/success?session_id={CHECKOUT_SESSION_ID}`,  // Adjust URL as needed
//       cancel_url: `http://localhost:5173/topup/cancel`
//     });
//     // Update user balance
//     users[userIndex] = {
//       ...user,
//       balance: newBalance,
//       lastTopUp: {
//         amount: parseFloat(amount),
//         date: new Date().toISOString().split('T')[0]
//       }
//     };
//     console.log("new balance :",newBalance);
//     res.json({
//       sessionId: session.id,
//      // url: session.url,
//       success: true,
//       balance: newBalance,
//       lastTopUp: users[userIndex].lastTopUp
//     });
//   } else {
//     res.status(404).json({
//       success: false,
//       message: "User not found"
//     });
//   }
// });

app.post('/api/users/:id/topup', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { amount } = req.body;
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'zar',
          product_data: { name: 'Account Top-Up' },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata: {
        amount: amount.toString(),
      },
      // success_url: `http://localhost:5173/topup/success?session_id={{CHECKOUT_SESSION_ID}}`,
 success_url: `http://localhost:5173/topup?success=true&step=4&session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `http://localhost:5173/topup?success=false&step=0`,

    });

    res.json({
      success: true,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Stripe session creation failed:', error);
    res.status(500).json({ success: false, message: 'Stripe session creation failed' });
  }
});



// 2. Check payment status and update balance
app.get('/api/users/:id/topup/status', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { sessionId } = req.query;

  if (!sessionId) return res.status(400).json({ success: false, message: 'Missing sessionId' });

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) return res.status(404).json({ success: false, message: "User not found" });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const amount = parseFloat(session.metadata.amount);

      // Optional: avoid double update if sessionId was already used
      if (!users[userIndex].lastTopUp || users[userIndex].lastTopUp.sessionId !== sessionId) {
        users[userIndex].balance += amount;
        users[userIndex].lastTopUp = {
          amount,
          date: new Date().toISOString().split('T')[0],
          sessionId
        };
      }

      return res.json({
        success: true,
        balance: users[userIndex].balance,
        lastTopUp: users[userIndex].lastTopUp,
      });
    } else {
      return res.json({ success: false, message: 'Payment not completed yet' });
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({ success: false, message: 'Failed to check payment status' });
  }
});

// Start server
server.listen(port, () => {
  console.log(`Tshwane Bus API server running at http://localhost:${port}`);
});
