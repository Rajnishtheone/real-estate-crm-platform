export const buildPagination = (page?: number, limit?: number) => {
  const take = Math.min(Number(limit) || 20, 100);
  const skip = Math.max(((Number(page) || 1) - 1) * take, 0);
  return { take, skip };
};
