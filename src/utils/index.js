export const tinhNguHanhNapAm = (can, chi) => {
  const result = (can + chi) % 5;

  return result === 0 ? 5 : result;
};
