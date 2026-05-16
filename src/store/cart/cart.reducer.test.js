import {
  cartReducer,
  addItemToCart,
  clearCart,
} from './cart.reducer';

const mockProduct = {
  id: 1,
  name: 'Brown Brim',
  imageUrl: 'https://example.com/hat.png',
  price: 25,
};

describe('cart reducer', () => {
  const emptyState = { isCartOpen: false, cartItems: [] };

  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('addItemToCart adds a new item with quantity 1', () => {
    const state = cartReducer(emptyState, addItemToCart(mockProduct));

    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0]).toEqual({ ...mockProduct, quantity: 1 });
  });

  test('addItemToCart increments quantity for existing item', () => {
    const withItem = {
      isCartOpen: false,
      cartItems: [{ ...mockProduct, quantity: 1 }],
    };

    const state = cartReducer(withItem, addItemToCart(mockProduct));

    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].quantity).toBe(2);
  });

  test('clearCart removes all items', () => {
    const withItems = {
      isCartOpen: false,
      cartItems: [{ ...mockProduct, quantity: 2 }],
    };

    const state = cartReducer(withItems, clearCart());

    expect(state.cartItems).toEqual([]);
  });
});
