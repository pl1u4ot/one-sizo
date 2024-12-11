import React, { useState, useEffect } from 'react';
import './ProductList.css';

export default function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedProducts, setSavedProducts] = useState(new Set());
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Для отслеживания выбранной категории

  async function fetchProducts(categoryId = null) {
    setLoading(true);
    try {
      const url = categoryId
        ? `https://hadzhi2003.pythonanywhere.com/api/v1/product/?category=${categoryId}`
        : 'https://hadzhi2003.pythonanywhere.com/api/v1/product/';
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const response = await fetch('https://hadzhi2003.pythonanywhere.com/api/v1/categories/');
      const json = await response.json();
      setCategories(json.results || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    // Загружаем продукты для выбранной категории без очистки localStorage
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

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
          <button
            className="pushable"
            onClick={() => setSelectedCategory(null)} // Показать все продукты
          >
            <span className="shadow" />
            <span className="edge" />
            <span className="front">ALL</span>
          </button>

          {categories.map((category) => (
            <button
              className="pushable"
              key={category.id}
              onClick={() => setSelectedCategory(category.id)} // Устанавливаем выбранную категорию
            >
              <span className="shadow" />
              <span className="edge" />
              <span className="front">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="container-product">
        {loading ? (
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
                <img src={product.image} alt={product.name} />
              </div>
              <div className="infa-card">
                <h2>{product.name}</h2>
                <p>{product.price}<i>сом</i> </p>
              </div>
              <div className="card-button">
                <button
                  onClick={() => toggleSaveProduct(product)}
                >
                  <h3>{savedProducts.has(product.id) ? 'Убрать' : 'В корзину'}</h3>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Продукты не найдены</p>
        )}
      </div>
    </section>
  );
}
