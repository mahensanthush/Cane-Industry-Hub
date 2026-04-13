const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// පද්ධති සැකසුම් Load කිරීම
dotenv.config();

// Database එකට සම්බන්ධ වීම
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes Import කිරීම
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // 👈 අලුතින් එක් කළා

// Routes භාවිතා කිරීම
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes); // 👈 අලුතින් එක් කළා

// මූලික Route එක
app.get('/', (req, res) => {
  res.send('Cane Hub API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});