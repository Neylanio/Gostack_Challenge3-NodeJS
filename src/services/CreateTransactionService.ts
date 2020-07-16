import { getRepository, getCustomRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('Transaction type is not allowed', 400);
    }

    const categoryRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionRepository);

    const { total } = await transactionRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw new AppError('Transaction not allowed', 400);
    }

    let findCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!findCategory) {
      findCategory = categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(findCategory);
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: findCategory.id,
    });
    await transactionRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
