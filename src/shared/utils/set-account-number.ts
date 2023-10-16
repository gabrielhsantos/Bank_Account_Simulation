export const setAccountNumber = (): string => {
  const code = Math.floor(Math.random() * 90000) + 10000;
  const digit = Math.floor(Math.random() * 9) + 1;

  return `${code}-${digit}`;
};
