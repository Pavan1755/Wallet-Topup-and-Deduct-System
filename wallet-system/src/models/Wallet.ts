import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

// Define the attributes for the Wallet model
interface WalletAttributes {
    id: number;
    user_id: string;
    balance: number;
}

// Define a type for creating new Wallet instances
interface WalletCreationAttributes extends Optional<WalletAttributes, 'id' | 'balance'> {}

// Extend the Sequelize Model with the Wallet attributes
class Wallet extends Model<WalletAttributes, WalletCreationAttributes> implements WalletAttributes {
    public id!: number;
    public user_id!: string;
    public balance!: number; // Add balance property here
}

// Initialize the Wallet model
Wallet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        balance: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
    },
    {
        sequelize,
        modelName: 'Wallet',
        tableName: 'wallets',
    }
);

export default Wallet;
