import express from 'express';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './src/config/dbConfig.js';
import livestatsRoutes from './src/routes/livestatsRoutes.js';
import authRoutes from './src/routes/auth.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: "json" };

const app = express();

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use('/', livestatsRoutes);
app.use('/', authRoutes);

// Swagger UI
app.use('/v3/api-docs', swaggerUi.serve);
app.get('/v3/api-docs', swaggerUi.setup(swaggerDocument));

export default app;
