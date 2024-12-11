import React, { useEffect, useState } from 'react';
import './Shop.css';

export default function Shop() {
  const [data, setData] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [loading, setLoading] = useState(false);


  async function getCartProduct() {
    setLoading(true);
    try {
      const response = await fetch('https://hadzhi2003.pythonanywhere.com/api/v1/product/');
      const json = await response.json();
      setData(json.results || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }


  function sortProducts() {
    const sorted = data.filter(item => {

      return localStorage.getItem(item.id) !== null;
    });
    setSortData(sorted);
  }
  useEffect(() => {
    getCartProduct();
  }, []);

  useEffect(() => {
    sortProducts();
  }, [data]);
  console.log(sortData);
  
  return (
    <>
      <section className='cart-section'>
        <div className="cart-container">
          <h1>Корзина</h1>
        </div>
      </section>

    </>
  );
}
