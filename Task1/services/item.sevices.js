/**
 * Add an item to the database.
 * @param {Object} itemBodyData - The item data to be inserted into the database.
 * @returns {Promise} - Promise resolving to the inserted item.
 */
const addItems = async (itemBodyData) => {
    try {
        const item = await knex('items').insert(itemBodyData);
        return item;
    } catch (error) {
        console.error('Error adding item:', error);
        return 500; 
    }
};

/**
 * Fetch items from the database with optional filtering, sorting, and pagination.
 * @param {number} id - The ID of the item to filter by (optional).
 * @param {string} title - The title of the item to filter by (optional).
 * @param {string} sortBy - The field name to sort by (default is 'id').
 * @param {string} sortOrder - The sorting order ('asc' or 'desc', default is 'asc').
 * @param {number} page - The page number for pagination (default is 1).
 * @param {number} pageSize - The number of items per page (default is 15).
 * @returns {Promise} - Promise resolving to an array of fetched items.
 */
const getAllItems = async (id, title, sortBy = 'id', sortOrder = 'asc', page = 1, perPage = 15) => {
    try {
        const filters = {};
        if (id) {
            filters.id = id;
        }
        if (title) {
            filters.title = title;
        }

        const items = await knex('items').where((builder) => {
            if (filters.id) {
                builder.where('id', filters.id);
            }
            if (filters.title) {
                builder.where('title', 'like', `%${filters.title}%`);
            }
        })
        .orderBy(sortBy, sortOrder)
        .select("*")
        .limit(parPage)
        .offset((page - 1) * parPage);

        return items; 
    } catch (error) {
        console.error('Error fetching items:', error);
        return 500; 
    }
};

/**
 * Fetch an item from the database by its ID.
 * @param {number} id - The ID of the item to fetch.
 * @returns {Promise} - Promise resolving to the fetched item.
 */
const getItemById = async (id) => {
    try {
        const item = await knex('items').where({ id }).first();
        if (!item) {
            return 404; 
        }
        return item; 
    } catch (error) {
        console.error('Error fetching item by id:', error);
        return 500;
    }
};

/**
 * Update an item in the database by its ID.
 * @param {number} id - The ID of the item to update.
 * @param {Object} itemData - The updated data for the item.
 * @returns {Promise} - Promise resolving to the count of updated items.
 */
const updateItemById = async (id, itemData) => {
    try {
        const updatedCount = await knex('items').where({ id }).update(itemData);
        if (updatedCount === 0) {
            return 404; 
        }
        return updatedCount; 
    } catch (error) {
        console.error('Error updating item by id:', error);
        return 500; 
    }
};

/**
 * Delete an item from the database by its ID.
 * @param {number} id - The ID of the item to delete.
 * @returns {Promise} - Promise resolving to the count of deleted items.
 */
const deleteItemById = async (id) => {
    try {
        const deletedCount = await knex('items').where({ id }).del();
        if (deletedCount === 0) {
            return 404;
        }
        return deletedCount; 
    } catch (error) {
        console.error('Error deleting item by id:', error);
        return 500; 
    }
};

module.exports = {
    addItems,
    getAllItems,
    updateItemById,
    deleteItemById,
    getItemById
};
