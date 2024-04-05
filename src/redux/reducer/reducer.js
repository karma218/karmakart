const INIT_STATE = {
    carts: []
};

export const cartReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            // Check if the item is already in the cart
            const existingItemIndex = state.carts.findIndex(item => item.id === action.payload.id);

            if (existingItemIndex !== -1) {
                // If item already exists, update its quantity immutably
                const updatedCarts = state.carts.map((item, index) => {
                    if (index === existingItemIndex) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });

                return {
                    ...state,
                    carts: updatedCarts
                };
            } else {
                // If item doesn't exist, add it to the cart with quantity 1
                return {
                    ...state,
                    carts: [...state.carts, { ...action.payload, quantity: 1 }]
                };
            }

        case "REMOVE_FROM_CART":
            // Filter out the item to be removed from the cart
            const updatedCarts = state.carts.filter(item => item.id !== action.payload);

            return {
                ...state,
                carts: updatedCarts
            };

        case "UPDATE_QUANTITY":
            const { id, quantity } = action.payload;
            // Update the quantity of the specified item in the cart
            const updatedCartItems = state.carts.map(item =>
                item.id === id ? { ...item, quantity } : item
            );

            return {
                ...state,
                carts: updatedCartItems
            };

        default:
            return state;
    }
};
