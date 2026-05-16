export const buildOrderItemsSnapshot = (cartItems) =>
  cartItems.map(({ id, name, imageUrl, price, quantity }) => ({
    id,
    name,
    imageUrl,
    price,
    quantity,
  }));
