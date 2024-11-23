import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

// Define attributes for the Transaction model
interface TransactionAttributes {
    id: number; // Add `id` property
    user_id: string;
    amount: number;
    transaction_type: 'TOPUP' | 'DEDUCT';
    created_at?: Date; // Optional, automatically managed by Sequelize
    updated_at?: Date;
}

// Define a type for creating new Transaction instances
interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> {}

// Extend Sequelize's Model class with Transaction attributes
class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    public id!: number;
    public user_id!: string;
    public amount!: number;
    public transaction_type!: 'TOPUP' | 'DEDUCT';

    // Timestamps
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

// Initialize the Transaction model
Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        transaction_type: {
            type: DataTypes.ENUM('TOPUP', 'DEDUCT'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Transaction',
        tableName: 'transactions',
        timestamps: true, // Automatically manage `created_at` and `updated_at`
    }
);

export default Transaction;
