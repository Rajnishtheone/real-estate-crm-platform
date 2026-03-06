import { nriRepo } from '../repositories/nri.repo';
import { ApiError } from '../utils/ApiError';

export const NriService = {
  async getAccount(userId: string) {
    const account = await nriRepo.findAccountByUser(userId);
    if (!account) throw new ApiError(404, 'NRI account not found');
    return account;
  },
  async createRentPayment(userId: string, data: any) {
    const account = await nriRepo.findAccountByUser(userId);
    if (!account) throw new ApiError(404, 'NRI account not found');
    return nriRepo.createRentPayment({ ...data, nriAccountId: account.id });
  },
};
