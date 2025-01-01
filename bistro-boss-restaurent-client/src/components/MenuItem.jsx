import React from 'react';

const MenuItem = ({menu}) => {
    return (
        <div className='flex gap-4'>
            <div>
            <img className='w-[120px] h-full rounded-r-full rounded-bl-full' src={menu.image} alt="" />
            </div>
            <div>
                <h1 className='uppercase text-xl'>{menu.name} ----------</h1>
                <p className='text-sm text-gray-500'>{menu.recipe}</p>
            </div>
            <p className='text-yellow-500'>${menu.price}</p>
        </div>
    );
};

export default MenuItem;