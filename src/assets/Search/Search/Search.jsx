import React, { useState, useEffect } from 'react';
import './Search.css';

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{product.price} ₽</p>
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}

export default function Search() {
  const [data, setData] = useState([]); // Все данные с сервера
  const [filteredData, setFilteredData] = useState([]); // Отфильтрованные данные
  const [searchQuery, setSearchQuery] = useState(''); // Строка поиска
  const [cart, setCart] = useState([]); // Корзина товаров

  async function getData() {
    try {
      const response = await fetch('https://tynybekfood.pythonanywhere.com/api/v1/food/');
      const result = await response.json();
      setData(result);
      setFilteredData(result); // Изначально отображаем все данные
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Обновляем фильтр при изменении строки поиска
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredData(
      data.filter(item => item.name.toLowerCase().includes(lowercasedQuery))
    );
  }, [searchQuery, data]);

  // Добавление товара в корзину
  function addToCart(product) {
    setCart(prevCart => [...prevCart, product]);
    localStorage.setItem(product.id, product)
  }

  return (
    <div className="search-container">
      <div className="group">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          type="search"
          className="input"
          placeholder="Search"
          aria-label="Search input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Обновляем строку поиска
        />
      </div>
      <div className="results">
        {filteredData.length > 0 ? (
          <div className="product-grid">
            {filteredData.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        ) : (
          <p>Нет совпадений.</p>
        )}
      </div>
    </div>
  );
}
