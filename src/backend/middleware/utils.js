function formatCurrency(amount) {
  // Ensure the amount is a number
  const numAmount = Number(amount);
  if (isNaN(numAmount)) {
    return "Invalid number";
  }

  // Format the number with commas as thousand separators
  const formattedAmount = numAmount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formattedAmount;
}

function formatAsVietnameseDate(date) {
  // Ensure the date is a valid date
  if (isNaN(Date.parse(date))) {
    return "Invalid date";
  }

  // Format the date
  const formattedDate = new Date(date).toLocaleDateString("vi-VN");

  return formattedDate;
}

function formatAsSQLDatetime(date) {
  // Ensure the date is a valid date
  if (isNaN(Date.parse(date))) {
    return "Invalid date";
  }

  // Format the date as SQL datetime
  const formattedDate = new Date(date)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  return formattedDate;
}

function formatAsSQLDate(date) {
  // Ensure the date is a valid date
  if (isNaN(Date.parse(date))) {
    return "Invalid date";
  }

  // Format the date as SQL date
  const formattedDate = new Date(date).toISOString().slice(0, 10);

  return formattedDate;
}


module.exports = {
  formatCurrency,
  formatAsVietnameseDate,
  formatAsSQLDatetime,
  formatAsSQLDate,
};
