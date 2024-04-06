import React from 'react';

const ProductDetail = ({ product }) => {
  const { id, code, name, price, minimum_stock, brand, product_category } = product;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Product Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <p><strong>ID:</strong> {id}</p>
          <p><strong>Code:</strong> {code}</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Price:</strong> ${price}</p>
          {minimum_stock && <p><strong>Minimum Stock:</strong> {minimum_stock}</p>}
        </div>
        {brand && (
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-2">Brand</h4>
            <p><strong>ID:</strong> {brand.id}</p>
            <p><strong>Code:</strong> {brand.code}</p>
            <p><strong>Name:</strong> {brand.name}</p>
            {brand.company && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Company</h4>
                <p><strong>ID:</strong> {brand.company.id}</p>
                <p><strong>Code:</strong> {brand.company.code}</p>
                <p><strong>Name:</strong> {brand.company.name}</p>
                <p><strong>Address:</strong> {brand.company.address}</p>
              </div>
            )}
          </div>
        )}
      </div>
      {product_category && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Product Category</h4>
          <p><strong>ID:</strong> {product_category.id}</p>
          <p><strong>Name:</strong> {product_category.name}</p>
          {product_category.category && (
            <p><strong>Category ID:</strong> {product_category.category.id}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
