import { useMemo } from "react";
import Button from "./ui/Button";

export default function ShoppingCart({
  isOpen,
  onToggleCart,
  items,
  updateQty,
  removeItem,
}) {
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  );

  const toggleCart = onToggleCart;

  return (
    <div className="shopping-cart-shell">
      {!isOpen && (
        <button
          type="button"
          className="shopping-cart-open-top"
          onClick={toggleCart}
          aria-label="Open cart"
        >
          <span className="shopping-cart-open-icon" aria-hidden="true">
            🛒
          </span>
          <strong>{itemCount}</strong>
        </button>
      )}
      <div className={`shopping-cart-panel ${isOpen ? "open" : ""}`}>
        <div className="shopping-cart-header">
          <div>
            <p className="shopping-cart-label">Your Cart</p>
            <p className="shopping-cart-count">{itemCount} items</p>
          </div>
          <button
            type="button"
            className="shopping-cart-close"
            onClick={toggleCart}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>
        <div className="shopping-cart-body">
          {items.length ? (
            items.map((item) => (
              <div className="shopping-cart-item" key={item.id}>
                <div>
                  <p className="shopping-cart-item-name">{item.name}</p>
                  <p className="shopping-cart-item-price">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="shopping-cart-item-controls">
                  <button
                    type="button"
                    className="shopping-cart-qty"
                    onClick={() => updateQty(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    type="button"
                    className="shopping-cart-qty"
                    onClick={() => updateQty(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="shopping-cart-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="shopping-cart-empty">Your cart is empty.</p>
          )}
        </div>

        <div className="shopping-cart-footer">
          <div>
            <p className="shopping-cart-total-label">Total</p>
            <p className="shopping-cart-total-value">${total.toFixed(2)}</p>
          </div>
          <Button variant="accent" size="md" className="w-full">
            Checkout
          </Button>
        </div>
      </div>

      <button
        type="button"
        className="shopping-cart-toggle"
        onClick={toggleCart}
      >
        <span>Cart</span>
        <strong>{itemCount}</strong>
      </button>
    </div>
  );
}
