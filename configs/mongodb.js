const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const mongoURI = 'mongodb://0.0.0.0:27017/ChitChatGame';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

module.exports = connectDB;
