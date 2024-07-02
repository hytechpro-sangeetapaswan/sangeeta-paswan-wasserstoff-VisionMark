const { addItems, getAllItems, getItemById, deleteItemById, updateItemById } = require("../services/item.sevices");

/**
 * Controller function to create a new item.
 * @param {Object} req - Express request object containing item data in req.body.
 * @param {Object} res - Express response object to send status and data back to client.
 */
const createItem = async (req, res) => {
    const newItem = await addItems(req.body);
    if (newItem === 500) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error while adding item.'
        });
    } else {
        res.status(200).json({
            status: 200,
            message: 'Item added successfully.',
            data: newItem
        });
    }
};

/**
 * Controller function to fetch a list of items.
 * @param {Object} req - Express request object containing query parameters like id and title.
 * @param {Object} res - Express response object to send status and data back to client.
 */
const fetchItemList = async (req, res) => {
    const items = await getAllItems(req.query.id, req.query.title);
    if (items === 500) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error while fetching items.'
        });
    } else {
        res.status(200).json({
            status: 200,
            message: 'Fetched items successfully.',
            data: items
        });
    }
};

/**
 * Controller function to fetch details of a specific item by ID.
 * @param {Object} req - Express request object containing item ID in req.params.id.
 * @param {Object} res - Express response object to send status and data back to client.
 */
const fetchItemDetails = async (req, res) => {
    const item = await getItemById(req.params.id);
    if (item === 404) {
        res.status(404).json({
            status: 404,
            message: 'Item not found.'
        });
    } else if (item === 500) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error while fetching item details.'
        });
    } else {
        res.status(200).json({
            status: 200,
            message: 'Fetched item details successfully.',
            data: item
        });
    }
};

/**
 * Controller function to update an item by its ID.
 * @param {Object} req - Express request object containing item ID in req.params.id and updated item data in req.body.
 * @param {Object} res - Express response object to send status and data back to client.
 */
const updateItem = async (req, res) => {
    const item = await updateItemById(req.params.id, req.body);
    if (item === 404) {
        res.status(404).json({
            status: 404,
            message: 'Item not found.'
        });
    } else if (item === 500) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error while updating item.'
        });
    } else {
        res.status(200).json({
            status: 200,
            message: 'Item updated successfully.',
            data: item
        });
    }
};

/**
 * Controller function to delete an item by its ID.
 * @param {Object} req - Express request object containing item ID in req.params.id.
 * @param {Object} res - Express response object to send status and data back to client.
 */
const deleteItem = async (req, res) => {
    const item = await deleteItemById(req.params.id);
    if (item === 404) {
        res.status(404).json({
            status: 404,
            message: 'Item not found.'
        });
    } else if (item === 500) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error while deleting item.'
        });
    } else {
        res.status(200).json({
            status: 200,
            message: 'Item deleted successfully.',
            data: item
        });
    }
};

module.exports = {
    createItem,
    fetchItemList,
    fetchItemDetails,
    updateItem,
    deleteItem
};
