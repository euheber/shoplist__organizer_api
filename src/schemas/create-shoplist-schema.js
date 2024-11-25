export const createShoplistSchema = { 
    event_name : {
        isString : {errorMessage: "event_name must be a string"},
        notEmpty : {errorMessage: "The field 'event_name' cannot be empty"},
        trim: true, 
        escape: true 
    },
    owner: { 
        isString: {errorMessage: "owner must be a string"},
        isEmail: {errorMessage: "owner field must be an email"},
        notEmpty: {errorMessage: "The field 'owner' cannot be empty"},
        trim: true, 
        escape: true,
        normalizeEmail: true
    },
    items: {
        isArray: {
            errorMessage: "items field must be an array"
        },
        custom: {
            options: (value) => Array.isArray(value) && value.length >= 2,
            errorMessage: "items array must have at least 2 elements"
        }
    },
    'items.*.item_name': {
        isString: { errorMessage: "item name must be a string" },
        notEmpty: { errorMessage: "item_name cannot be empty" }
    },
    'items.*.quantity': {
        isInt: { errorMessage: "item quantity must be a number" },
        toInt: true // Converts the value to an integer
    }
}