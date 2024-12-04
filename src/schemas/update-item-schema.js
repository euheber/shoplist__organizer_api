export const updateItemSchema = { 
    isPurchased: {
        isBoolean: {
            errorMessage: "isPurchased must be a boolean value",
            options: { strict: true }
        },
        notEmpty: {
            errorMessage: "The field 'isPurchased' cannot be empty",
        }
    },
}