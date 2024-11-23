import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Enforce SSL for connection
            rejectUnauthorized: false, // Accept self-signed certificates
        },
    },
    logging: console.log, // Enable SQL logging (optional)
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
