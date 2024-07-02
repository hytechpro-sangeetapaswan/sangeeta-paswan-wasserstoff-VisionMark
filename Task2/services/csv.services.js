const fs = require('fs');
const csvParser = require('csv-parser');

/**
 * Reads and parses a CSV file.
 * @returns {Promise<Array>} - Promise resolving to an array of parsed data.
 */
const readCSVfile = () => {
    return new Promise((resolve, reject) => {
        const results = [];
        const file = fs.createReadStream('data.csv');

        // Handle stream creation error
        file.on('error', (err) => {
            reject(err);
        });

        file.pipe(csvParser())
            .on('data', (data) => {
                console.log(data);
                results.push(data);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (err) => {
                reject(err); // Handle CSV parsing error
            });
    });
};

module.exports = {
    readCSVfile
};
