import express from 'express';
import routes from './src/routes/index.js';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

async function main() {
  try {
    // Connect to the database
    await prisma.$connect();
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