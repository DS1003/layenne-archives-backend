import express from 'express';
import { PrismaClient } from '@prisma/client'; // Assure-toi que cette ligne est présente

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
