const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connected ...');
  } catch (err) {
    console.log(err.message);
    //exit process if failure
    process.exit(1);
  }
};

module.exports = connectDB;
