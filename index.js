import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './src/routes/index.js';
import mongoose from 'mongoose';

const app = express();

async function main() {
  try {
    // Connect to the database
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to the database');

    // Middleware
    app.use(express.json());
    app.use('/uploads', express.static('uploads'));
    app.use('/api', routes);

    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

main();