const { readCSVfile } = require('../services/csv.services');

/**
 * Controller to handle the request for fetching CSV data.
 * Reads the CSV file and sends the data as a JSON response.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getCSVData = async (req, res) => {
    try {
        const data = await readCSVfile();
        res.status(200).json({
            status: 200,
            message: 'Data retrieved successfully.',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving data.',
            error: error.message
        });
    }
};

module.exports = {
    getCSVData
};
