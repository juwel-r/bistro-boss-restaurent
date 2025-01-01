import React from 'react';

const FoodCart = ({item}) => {
    console.log(item);
    const { name, recipe, price, image } = item;
    console.log(item);
    return (
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={image}
            alt="Caesar Salad"
            className="w-full h-48 object-cover"
          />
          <span className="absolute top-2 right-2 bg-black text-white text-sm font-semibold py-1 px-2 rounded">
            {price}
          </span>
        </div>
        <div className="p-4 text-center">
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600 mt-2">
           {recipe}
          </p>
          <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded shadow">
            ADD TO CART
          </button>
        </div>
      </div>
    );
  };
export default FoodCart;