import { Request, Response } from 'express';
import Wallet from '../models/Wallet';
import Transaction from '../models/Transaction';
import sequelize from '../config/db';
import Joi from 'joi';

// Define validation schemas
const topupSchema = Joi.object({
    user_id: Joi.string().required(),
    amount: Joi.number().positive().required(),
});

const deductSchema = Joi.object({
    user_id: Joi.string().required(),
    amount: Joi.number().positive().required(),
});

export const topupWallet = async (req: Request, res: Response): Promise<void> => {
    const { error, value } = topupSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    const { user_id, amount } = value;

    const t = await sequelize.transaction();
    try {
        let wallet = await Wallet.findOne({ where: { user_id }, transaction: t });
        if (!wallet) {
            wallet = await Wallet.create({ user_id, balance: 0 }, { transaction: t });
        }
        wallet.balance = parseFloat(wallet.balance.toString()) + parseFloat(amount.toString());
        await wallet.save({ transaction: t });

        const transaction = await Transaction.create(
            { user_id, amount, transaction_type: 'TOPUP' },
            { transaction: t }
        );

        await t.commit();
        res.json({ status: true, new_balance: wallet.balance, transaction_id: transaction.id });
    } catch (err) {
        await t.rollback();
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deductWallet = async (req: Request, res: Response): Promise<void> => {
    const { error, value } = deductSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    const { user_id, amount } = value;

    const t = await sequelize.transaction();
    try {
        const wallet = await Wallet.findOne({ where: { user_id }, transaction: t });
        if (!wallet || wallet.balance < amount) throw new Error('Insufficient balance');

        wallet.balance = parseFloat(wallet.balance.toString()) - parseFloat(amount.toString());
        await wallet.save({ transaction: t });

        const transaction = await Transaction.create(
            { user_id, amount, transaction_type: 'DEDUCT' },
            { transaction: t }
        );

        await t.commit();
        res.json({ status: true, new_balance: wallet.balance, transaction_id: transaction.id });
    } catch (err) {
        await t.rollback();
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getBalance = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.query;
    if (!user_id || typeof user_id !== 'string') {
        res.status(400).json({ error: 'User ID is required' });
        return;
    }

    const wallet = await Wallet.findOne({ where: { user_id } });
    if (!wallet) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    res.json({ balance: parseFloat(wallet.balance.toString()).toFixed(2) });
};
