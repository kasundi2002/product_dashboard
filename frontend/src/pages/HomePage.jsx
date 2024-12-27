import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './../styles/HomePage.css';

const HomePage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('Fetching products...');
      try {
        const response = await fetch('http://localhost:8081/product/getAll');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          setFilteredProducts(data);
          setError(false);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(true);
        setProducts([]);
        setFilteredProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Convert buffer to Base64 for images
  const convertBufferToBase64 = (bufferData) => {
    return btoa(
      new Uint8Array(bufferData).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter products based on search query and selected category
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  if (products.length === 0 && !error) return <div>Loading...</div>;
  if (error) return <div>Error fetching products. Please try again later.</div>;

  return (
    <div>
      <div className="content">
        {/* Search and Filter Options */}
        <div className="filters">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products by name"
            style={{
              padding: '8px',
              fontSize: '14px',
              marginBottom: '16px',
              marginRight:'20px',
              width: '20%',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginRight:'20px',
              marginBottom: '16px',
              width: '20%',
            }}
          >
            <option value="">All Categories</option>
            {/* Add categories dynamically or statically */}
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Beauty">Beauty/Personal Care</option>
            <option value="Health">Health/Fitness</option>
            <option value="Games">Toys/Games</option>
            <option value="Food">Food/Beverages</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => {
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
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '8px' }}>
                    Description: {product.description || 'Unknown description'}
                  </p>
                  <p style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
                    Price: {product.price || 'Unknown price'}
                  </p>
                  <p style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
                    Category: {product.category || 'Unknown category'}
                  </p>
                  <p style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
                    Stock: {product.stock || 'Unknown stock'}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
