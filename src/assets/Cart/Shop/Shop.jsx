import React, { useEffect, useState } from 'react';
import './Shop.css';

export default function Shop() {
  const [products, setProducts] = useState([]); // Данные о продуктах
  const [sizes, setSizes] = useState([]); // Данные о размерах продуктов
  const [cartItems, setCartItems] = useState([]); // Продукты в корзине
  const [loading, setLoading] = useState(true); // Состояние загрузки

  // Загрузка данных
  async function fetchData() {
    try {
      const productResponse = await fetch('https://tynybekfood.pythonanywhere.com/api/v1/food/');
      const sizeResponse = await fetch('https://tynybekfood.pythonanywhere.com/api/v1/food-sizes/');
      if (!productResponse.ok || !sizeResponse.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      const productData = await productResponse.json();
      const sizeData = await sizeResponse.json();

      setProducts(productData);
      setSizes(sizeData);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setLoading(false);
    }
  }

  // Определение товаров в корзине
  function updateCartItems() {
    const cartIds = Object.keys(localStorage).map((key) => parseInt(key, 10)).filter(Number.isInteger);
    const itemsInCart = products.filter((product) => cartIds.includes(product.id));
    setCartItems(itemsInCart);
  }

  // Получение цены продукта по его ID
  function getProductPrice(productId) {
    const size = sizes.find((size) => size.product === productId); // Проверяем связь с продуктом
    return size ? size.price : 0;
  }

  // Итоговая цена
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = getProductPrice(item.id);
    return sum + price;
  }, 0);

  // Загрузка данных при первом рендере
  useEffect(() => {
    fetchData();
  }, []);

  // Обновление корзины после загрузки продуктов
  useEffect(() => {
    updateCartItems();
  }, [products, sizes]);

  return (
    <section className="cart-section">
      <div className="cart-container">
        <div className="cart-head">
          <h1>Корзина</h1>
          {cartItems.length > 0 ? (
            <div className="price">
              <p>В корзине {cartItems.length} товара</p>
              <p>Итоговая цена: {totalPrice} сом</p>
            </div>
          ) : (
            <p>Корзина пуста</p>
          )}
        </div>

        <div className="product-cart">
          {loading ? (
            <p>Загрузка...</p>
          ) : cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div className="product-item" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Цена: {getProductPrice(product.id)} сом</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem(product.id);
                    updateCartItems(); // Обновляем корзину
                  }}
                  className="deleteButton"
                >
                  Удалить
                </button>
              </div>
            ))
          ) : (
            <p>Нет товаров в корзине</p>
          )}
        </div>
      </div>
    </section>
  );
}
