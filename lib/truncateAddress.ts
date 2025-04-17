/**
 * Display helper to show a shorter version of the wallet's address.
 * @param address Full Solana address.
 * @returns {string} shortened wallet.
 */
export const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
