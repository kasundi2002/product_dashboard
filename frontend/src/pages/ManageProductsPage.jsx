import React from 'react'
import './../styles/ManageProductsPage.css';
import { useState , useNavigate , useEffect } from 'react';

const ManageProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        coverImage: null,
    });
    const [selectedProduct, setsSelectedProduct] = useState(null);
    const [isEdit, setIsEdit] = useState(false); // To toggle between View/Edit modes

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // You can adjust this value 

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching products...');
                const response = await fetch('http://localhost:8081/product/getAll'); // Adjust the API URL as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    setProducts(null); 
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts(null);  // Set to null on error
            }
        };

        fetchProducts();
    }, []);

    // Handle Delete Product
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            await fetch(`http://localhost:8081/product/delete/${id}`, {
                method: 'DELETE',
            });
            setProducts(products.filter((product) => product._id !== id)); 
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Handle View (navigate to view page)
    // const handleView = (id) => {
        
    //     navigate(); // Redirect to the product details page
    // };

    // Handle Add Product Form Submission
    const handleAddProductSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('price', newProduct.price);
        formData.append('category', newProduct.category);
        formData.append('stock', newProduct.stock);
        formData.append('coverImage', newProduct.coverImage);

        if (newProduct.coverImage && newProduct.coverImage instanceof File) {
            formData.append('coverImage', newProduct.coverImage);
        }

        try {
            const response = await fetch('http://localhost:8081/product/add', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            // Ensure books is an array before setting the new state
            setProducts((prevProducts) => {
                if (Array.isArray(prevProducts)) {
                    return [...prevProducts, data];
                }
                return [data];  // If prevBooks is not an array, start a new array with the added book
            });

            setShowAddForm(false);
            setNewProduct({ name: '', description: '', price: '', category: '', stock: '', coverImage: null });
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    // Open the modal to view or edit the book
    const handleProductSelect = (product, edit = false) => {
        console.log(`product in handleSelect:${product}`);
        setsSelectedProduct(product);
        setIsEdit(edit);
        console.log(`selected product in handleSelect:${selectedProduct}`);

    };

    // Handle the form submit for editing the selected product
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        console.log(`selected product:${selectedProduct._id}`);
        console.log(`selected product:${selectedProduct.name}`);
        console.log(`selected product:${selectedProduct.description}`);
        console.log(`selected product:${selectedProduct.price}`);
        console.log(`selected product:${selectedProduct.category}`);
        console.log(`selected product:${selectedProduct.stock}`);
        console.log(`selected product:${selectedProduct.coverImage}`);
             
try {
    const response = await fetch(`http://localhost:8081/product/edit/${selectedProduct._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: selectedProduct.name,
            description: selectedProduct.description,
            price: selectedProduct.price,
            category: selectedProduct.category,
            stock: selectedProduct.stock,
        }),
    });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const updatedProduct = await response.json();
            setProducts(products.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)));
            setsSelectedProduct(null); // Close modal
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    // Pagination Logic
    const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

    const currentProducts = (products || []).slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(totalPages);
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="admin-home">
            
            <button className="btn add" onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Cancel' : 'Add Product'}
            </button>

            {showAddForm && (
                <form className="add-product-form" onSubmit={handleAddProductSubmit}>
                    <input
                        type="text"
                        placeholder="Enter the name of the product"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                    /> 
               
                    <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        required
                    >
                        <option value="">Select category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Beauty">Beauty/Personal Care</option>
                        <option value="Health">Health/Fitness</option>
                        <option value="Games">Toys/Games</option>
                        <option value="Food">Food/Beverages</option>
                    </select>
                    <input
                        type="text"
                        placeholder="stock"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        required
                    /> 
                    <input
                        type="file"
                        onChange={(e) => setNewProduct({ ...newProduct, coverImage: e.target.files[0] })}
                        accept="image/*"
                    />
                    <button type="submit" className="btn save">Save Product</button>
                </form>
            )}

            {products === null || products.length === 0 ? (
                <p>No products available</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th>price</th>
                            <th>category</th>
                            <th>stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.name}>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.stock}</td>
                                <td>
                                    {/* <button className="btn view" onClick={() => handleView(product._id)}>
                                        View
                                    </button> */}
                                    <button className="btn edit" onClick={() => handleProductSelect(product, true)}>
                                        Edit
                                    </button>
                                    <button className="btn delete" onClick={() => handleDelete(product._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination Controls */}
            <div className="pagination">
                <button className="pagination-btn first" onClick={handleFirstPage}>
                    First
                </button>
                <button className="pagination-btn prev" onClick={handlePrevPage}>
                    Previous
                </button>
                <span className="page-number">
                    Page {currentPage} of {totalPages}
                </span>
                <button className="pagination-btn next" onClick={handleNextPage}>
                    Next
                </button>
                <button className="pagination-btn last" onClick={handleLastPage}>
                    Last
                </button>
            </div>

            {/* Modal for View/Edit */}
            {selectedProduct && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{isEdit ? 'Edit Product' : 'View Product'}</h2>
                        <form onSubmit={isEdit ? handleEditSubmit : null}>
                            <input
                                type="text"
                                value={selectedProduct.name}
                                onChange={(e) => setsSelectedProduct({ ...selectedProduct, name: e.target.value })}
                                disabled={!isEdit}
                                required
                            />
                            <input
                                type="text"
                                value={selectedProduct.description}
                                onChange={(e) => setsSelectedProduct({ ...selectedProduct, description: e.target.value })}
                                disabled={!isEdit}
                                required
                            />
                            <input
                                type="text"
                                value={selectedProduct.price}
                                onChange={(e) => setsSelectedProduct({ ...selectedProduct, price: e.target.value })}
                                disabled={!isEdit}
                                required
                            />                            
                            <select
                                value={selectedProduct.category}
                                onChange={(e) => setsSelectedProduct({ ...selectedProduct, category: e.target.value })}
                                disabled={!isEdit} // Disable when not in edit mode
                                required
                            >
                                    <option value="">Select category</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Beauty">Beauty/Personal Care</option>
                                    <option value="Health">Health/Fitness</option>
                                    <option value="Games">Toys/Games</option>
                                    <option value="Food">Food/Beverages</option>
                            </select>
                            <input
                                type="text"
                                value={selectedProduct.stock}
                                onChange={(e) => setsSelectedProduct({ ...selectedProduct, stock: e.target.value })}
                                disabled={!isEdit}
                                required
                            />        
                            {isEdit && (
                                <input
                                    type="file"
                                    onChange={(e) => setsSelectedProduct({ ...selectedProduct, coverImage: e.target.files[0] })}
                                    accept="image/*"
                                />
                            )}
                            {isEdit && (
                                <button type="submit" className="btn save">Save Changes</button>
                            )}
                        </form>
                        <button className="btn close" onClick={() => setsSelectedProduct(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProductsPage;

