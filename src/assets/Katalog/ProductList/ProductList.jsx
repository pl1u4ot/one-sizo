import React, { useState, useEffect } from 'react';
import './ProductList.css';

export default function ProductList() {
  const [data, setData] = useState([]); // Данные о продуктах
  const [loading, setLoading] = useState(false); // Состояние загрузки продуктов
  const [loadingCategories, setLoadingCategories] = useState(false); // Состояние загрузки категорий
  const [error, setError] = useState(null); // Ошибки загрузки
  const [categories, setCategories] = useState([]); // Список категорий
  const [selectedCategory, setSelectedCategory] = useState(null); // Выбранная категория
  const [savedProducts, setSavedProducts] = useState(new Set()); // Сохраненные продукты
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [totalPages, setTotalPages] = useState(1); // Общее количество страниц

  const itemsPerPage = 10; // Количество товаров на одной странице

  async function fetchProducts(categoryId = null, page = 1) {
    setLoading(true);
    setError(null); // Сбрасываем предыдущие ошибки
    try {
      const url = categoryId
        ? `https://tynybekfood.pythonanywhere.com/api/v1/food/?category=${categoryId}&page=${page}&page_size=${itemsPerPage}`
        : `https://tynybekfood.pythonanywhere.com/api/v1/food/?page=${page}&page_size=${itemsPerPage}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);
      const json = await response.json();
      console.log('Fetched products:', json.results);
      setData(json.results);
      setTotalPages(Math.ceil(json.count / itemsPerPage)); // Вычисляем общее количество страниц
    } catch (err) {
      setError(`Ошибка загрузки продуктов: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  // Функция для получения категорий
  async function fetchCategories() {
    setLoadingCategories(true);
    setError(null); // Сбрасываем предыдущие ошибки
    try {
      const response = await fetch('https://tynybekfood.pythonanywhere.com/api/v1/categories/');
      if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);
      const json = await response.json();
      setCategories(json);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoadingCategories(false);
    }
  }

  // Инициализация сохраненных продуктов из localStorage
  useEffect(() => {
    const saved = new Set(
      Object.keys(localStorage).filter((key) => !isNaN(parseInt(key, 10)))
    );
    setSavedProducts(saved);
  }, []);

  // Загрузка категорий и всех продуктов при первом рендере
  useEffect(() => {
    fetchCategories();
    fetchProducts(selectedCategory, currentPage);
  }, [currentPage]);

  // Загрузка продуктов при изменении категории
  useEffect(() => {
    setCurrentPage(1); // Сбросить на первую страницу при изменении категории
    fetchProducts(selectedCategory, 1);
  }, [selectedCategory]);

  // Добавление или удаление продукта из "сохраненных"
  const toggleSaveProduct = (product) => {
    const newSavedProducts = new Set(savedProducts);
    if (newSavedProducts.has(product.id)) {
      newSavedProducts.delete(product.id);
      localStorage.removeItem(product.id);
    } else {
      newSavedProducts.add(product.id);
      localStorage.setItem(product.id, JSON.stringify(product));
    }
    setSavedProducts(newSavedProducts);
  };

  return (
    <section className="productList-section">
      <div className="categori-container">
        <div className="categori-item">
          {loadingCategories ? (
            <p>Загрузка категорий...</p>
          ) : (
            <>
              <button
                className={`pushable ${selectedCategory === null ? 'active' : ''}`}
                onClick={() => setSelectedCategory(null)}
              >
                <span className="shadow" />
                <span className="edge" />
                <span className="front">ALL</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`pushable ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="shadow" />
                  <span className="edge" />
                  <span className="front">{category.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="container-product">
        {error ? (
          <p className="error-message">{error}</p>
        ) : loading ? (
          [...Array(4)].map((_, index) => (
            <div className="card is-loading" key={index}>
              <div className="image"></div>
              <div className="content">
                <h2></h2>
                <p></p>
              </div>
            </div>
          ))
        ) : data.length > 0 ? (
          data.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="img-product">
                <img
                  src={product.image || '/placeholder.png'}
                  alt={product.name}
                  onError={(e) => (e.target.src = '/placeholder.png')}
                />
              </div>
              <div className="infa-card">
                <h2>{product.name}</h2>
                <p>
                  {product.price}
                  <i> сом</i>
                </p>
              </div>
              <div className="card-button">
                <button onClick={() => toggleSaveProduct(product)}>
                  <h3>{savedProducts.has(product.id) ? 'Убрать' : 'В корзину'}</h3>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Продукты не найдены</p>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Предыдущая
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Следующая
        </button>
      </div>
    </section>
  );
}
