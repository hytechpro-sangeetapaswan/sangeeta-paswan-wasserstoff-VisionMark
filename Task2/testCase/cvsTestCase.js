const fs = require('fs');
const csvParser = require('csv-parser');
const { readCSVfile } = require('../services/csvService');

// Mocking the read stream for testing
jest.mock('fs');

describe('CSV Parsing', () => {
  let mockReadStream;

  /**
   * Setup before each test:
   * - Reset modules and clear all mocks.
   * - Create a mock read stream and mock its 'pipe' and 'on' methods.
   */
  beforeEach(() => {
    jest.resetModules(); // Reset modules before each test
    jest.clearAllMocks(); // Clear all mocks

    mockReadStream = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn()
    };

    fs.createReadStream.mockReturnValue(mockReadStream);
  });

  /**
   * Test case: Parse a standard CSV file correctly.
   * - Simulate data and end events.
   * - Verify the parsed data matches the expected result.
   * - Ensure the correct file is read and the stream is piped correctly.
   */
  it('should parse a standard CSV file correctly', async () => {
    const mockData = [
      { id: '1', name: 'Harsh', email: 'harsh@gmail.com', age: '30' },
      { id: '2', name: 'Veer', email: 'veer@gmail.com', age: '25' },
    ];

    mockReadStream.on.mockImplementation((event, callback) => {
      if (event === 'data') {
        mockData.forEach(row => callback(row));
      }
      if (event === 'end') {
        callback(); // Simulate end event
      }
    });

    const result = await readCSVfile();
    expect(result).toEqual(mockData);
    expect(fs.createReadStream).toHaveBeenCalledWith('data.csv');
    expect(mockReadStream.pipe).toHaveBeenCalledWith(expect.any(Function));
  });

  /**
   * Test case: Handle a CSV file with additional columns gracefully.
   * - Simulate data and end events with additional columns in the data.
   * - Verify the parsed data matches the expected result.
   * - Ensure the correct file is read and the stream is piped correctly.
   */
  it('should handle a CSV file with additional columns gracefully', async () => {
    const mockData = [
      { id: '1', name: 'Harsh', email: 'harsh@gmail.com', age: '30', extra: 'Extra Data' },
      { id: '2', name: 'Veer', email: 'veer@gmail.com', age: '25', extra: 'More Data' },
    ];

    mockReadStream.on.mockImplementation((event, callback) => {
      if (event === 'data') {
        mockData.forEach(row => callback(row));
      }
      if (event === 'end') {
        callback(); // Simulate end event
      }
    });

    const result = await readCSVfile();
    expect(result).toEqual(mockData);
    expect(fs.createReadStream).toHaveBeenCalledWith('data.csv');
    expect(mockReadStream.pipe).toHaveBeenCalledWith(expect.any(Function));
  });

  /**
   * Test case: Handle errors during CSV parsing.
   * - Simulate an error event.
   * - Verify that the error is correctly thrown and handled.
   * - Ensure the correct file is read and the stream is piped correctly.
   */
  it('should handle errors during CSV parsing', async () => {
    const mockError = new Error('CSV Parsing Error');

    mockReadStream.on.mockImplementation((event, callback) => {
      if (event === 'error') {
        callback(mockError); // Simulate error event
      }
    });

    await expect(readCSVfile()).rejects.toThrow('CSV Parsing Error');
    expect(fs.createReadStream).toHaveBeenCalledWith('data.csv');
    expect(mockReadStream.pipe).toHaveBeenCalledWith(expect.any(Function));
  });
});



/**
 * How to run the tests:
 * To run the tests, use the following command in your terminal:
 *    npm test
 * 
 * This will execute all test cases in your project, including the tests defined in this file.
 */