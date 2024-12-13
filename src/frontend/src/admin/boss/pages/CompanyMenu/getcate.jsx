import sushiworld from './sushiworld.json' assert { type: 'json' };
import fs from 'fs';

// Function to get unique values for each key
function getUniqueValues(jsonArray) {
  const uniqueValues = {};

  jsonArray.forEach((obj) => {
    for (const key in obj) {
      if (!uniqueValues[key]) {
        uniqueValues[key] = new Set();
      }
      uniqueValues[key].add(obj[key]);
    }
  });

  // Convert sets to arrays for better readability
  for (const key in uniqueValues) {
    uniqueValues[key] = Array.from(uniqueValues[key]);
  }

  return uniqueValues;
}

// Function to write unique values to a file
function exportToFile(fileName, data) {
  fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log(`Unique values exported to ${fileName}`);
    }
  });
}

// Example usage:
const jsonArray = [
  { name: "Alice", age: 25, city: "New York" },
  { name: "Bob", age: 30, city: "Los Angeles" },
  { name: "Alice", age: 25, city: "Chicago" },
  { name: "Charlie", age: 35, city: "New York" },
];

const uniqueValues = getUniqueValues(sushiworld);
exportToFile("uniqueValues.json", uniqueValues);