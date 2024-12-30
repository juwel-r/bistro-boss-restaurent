import React from 'react';

const MenuItem = ({menu}) => {
    return (
        <div className='flex gap-4'>
            <div>
            <img className='w-[120px] h-full rounded-r-full rounded-bl-full' src={menu.image} alt="" />
            </div>
            <div>
                <h1 className='uppercase text-xl'>{menu.name} ----------</h1>
                <p>{menu.recipe}</p>
            </div>
            <p className='text-yellow-500'>${menu.price}</p>
        </div>
    );
};

export default MenuItem;


/**
 * "_id": "642c155b2c4774f05c36eead",
        "name": "Roast Duck Breast",
        "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
        "image": "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-4-370x247.jpg",
        "category": "soup",
        "price": 14.5
 */