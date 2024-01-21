const mongoose = require('mongoose');



const Database = async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/Demo')
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  };
  
  module.exports =  Database ;