import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface TransactionAttributes {
    id: number;
    user_id: string;
    amount: number;
    transaction_type: 'TOPUP' | 'DEDUCT';
    created_at?: Date;
    updated_at?: Date;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    public id!: number;
    public user_id!: string;
    public amount!: number;
    public transaction_type!: 'TOPUP' | 'DEDUCT';

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

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
        timestamps: true,
    }
);

export default Transaction;
