import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import walletRoutes from './routes/walletRoutes';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/wallet', walletRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully.');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('Error starting server:', err);
    }
})();
