import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './../styles/HomePage.css';

const HomePage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  
  useEffect(() => {
    const fetchProducts = async () => {
      console.log(`Inside fetch products`);
      try {
        const response = await fetch('http://localhost:8081/product/getAll');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          setError(false);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(true);
        setProducts(null);
      }
    };

    fetchProducts();
  }, []);

  
const convertBufferToBase64 = (bufferData) => {
    return btoa(
      new Uint8Array(bufferData).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
};

  if (products === null && !error) return <div>Loading...</div>;
  if (error) return <div>Error fetching products. Please try again later.</div>;
  if (products.length === 0) return <div>No products found.</div>;
  
  return (
    <div>
     <div className="content">
        <div className="product-grid">
          {products.map((product) => {
            let productCoverSrc = 'https://via.placeholder.com/150';
            if (product.coverImage && product.coverImage.data) {
              const base64String = convertBufferToBase64(product.coverImage.data.data);
              productCoverSrc = `data:${product.coverImage.contentType};base64,${base64String}`;
            }
            return (
              <div key={product._id} className="product-card">
                <img
                  src={productCoverSrc}
                  alt={product.title || 'product Cover'}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <h4>{product.name || 'Untitled product'}</h4>
                <p>Description: {product.description || 'Unknown description'}</p>
                <p>price: {product.price || 'Unknown price'}</p>
                <p>category: {product.category || 'Unknown category'}</p>
                <p>stock: {product.stock || 'Unknown stock'}</p>
                
                <br />

              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default HomePage
