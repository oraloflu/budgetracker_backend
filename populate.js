// Mockaroo https://www.mockaroo.com/
import { readFile } from 'fs/promises';

import dotenv from 'dotenv';

dotenv.config();

import connectDB from './db/connection.js';
import Transaction from './models/TransactionModel.js';

const random = (length) => Math.floor(Math.random() * length);

const rationalizeData = (data) => {
    const income_mapping = {
        payment_mode: 'cash',
        description: [
            'Income from sale',
            'Income from apartment rent',
            'Income from stock market investment',
            'Extra income from a game of bet'
        ],
        category: ['salary', 'rent', 'stock', 'extra income']
    };

    const expense_mapping = {
        description: [
            'Cars and trucks used',
            'Palmetto cheese and Mint julep',
            'Peanuts in coke',
            'Laundry and cleaning supplies',
            'Expense for education',
            'Muffulatte sandwich Mint julep',
            'Pair of running shoes',
            'Other vehicle expenses',
            'Beauty care things'
        ],
        category: [
            'food',
            'transportation',
            'housing',
            'clothing',
            'education',
            'shopping',
            'trip'
        ]
    };

    const types = {
        expense: 'expense',
        income: 'income'
    };

    if (data !== undefined && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].type === types['expense']) {
                data[i].description =
                    expense_mapping.description[
                        random(expense_mapping.description.length)
                    ];
                data[i].category =
                    expense_mapping.category[random(expense_mapping.category.length)];
            }

            if (data[i].type === types['income']) {
                data[i].description =
                    income_mapping.description[random(income_mapping.description.length)];
                data[i].category =
                    income_mapping.category[random(income_mapping.category.length)];
                data[i].payment_mode = income_mapping.payment_mode;
            }
        }
        return data;
    } else return null;
};

const run = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Transaction.deleteMany();

        const jsonProducts = JSON.parse(
            await readFile(new URL('./mock-data.json', import.meta.url))
        );
        await Transaction.create(rationalizeData(jsonProducts));
        console.log('Success!!!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

run();
