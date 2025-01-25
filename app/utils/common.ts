export const formatLastUpdate = (lastUpdate: string): string => {
  if (lastUpdate === "now") return "Şimdi";
  if (lastUpdate === "yesterday") return "Dün";

  const hoursMatch = lastUpdate.match(/^(\d+)\s+hours?\s+ago$/);
  if (hoursMatch) {
    return `${hoursMatch[1]} saat önce`;
  }

  return lastUpdate;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-DE").format(price);
};
