import React, { useEffect, useState } from 'react';
import './Shop.css';

export default function Shop() {
  const [data, setData] = useState([]); // Исходные данные
  const [sortData, setSortData] = useState([]); // Отфильтрованные данные для корзины
  const [loading, setLoading] = useState(false); // Состояние загрузки

  // Функция загрузки всех продуктов
  async function getCartProduct() {
    setLoading(true);
    try {
      const response = await fetch('https://tynybekfood.pythonanywhere.com/api/v1/food/');
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      const json = await response.json();
      setData(json); // Устанавливаем данные из ответа API
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  // Функция фильтрации продуктов, сохраненных в localStorage
  function sortProducts() {
    const sorted = data.filter((item) => localStorage.getItem(item.id) !== null);
    setSortData(sorted);
  }

  // Загрузка всех продуктов при первом рендере
  useEffect(() => {
    getCartProduct();
  }, []);

  // Фильтрация продуктов для корзины при изменении данных
  useEffect(() => {
    sortProducts();
  }, [data]);

  // Проверка данных в консоли (для отладки)
  console.log('Отфильтрованные данные:', sortData);

  return (
    <>
      <section className="cart-section">
        <div className="cart-container">
          <div className="cart-head">
            <h1>Корзина</h1>
            {sortData.length > 0 ? (
              <div className="head-item">
                <p>В корзине {sortData.length} товара</p>
              </div>

            ) : (
              <p>Корзина пуста</p>
            )}
          </div>

          <div className="product-cart">
            {sortData.length > 0 ? (
              sortData.map((product) => (
                <div className="product-item" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>ена: {product.price} сом</p>
                  </div>
                </div>
              ))
            ) : (
              null
            )}
          </div>

        </div>
      </section>
    </>
  );
}
