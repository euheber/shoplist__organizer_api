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
    endsAt: {
        isISO8601: { errorMessage: "endsAt must be a valid ISO 8601 date" },
        custom: {
            options: (value) => {
                const today = new Date();
                const inputDate = new Date(value);

             
                return inputDate >= today;
            },
            errorMessage: "endsAt cannot be a date in the past"
        },
        notEmpty: { errorMessage: "The field 'endsAt' cannot be empty" },
        toDate: true 
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
        toInt: true 
    }
}