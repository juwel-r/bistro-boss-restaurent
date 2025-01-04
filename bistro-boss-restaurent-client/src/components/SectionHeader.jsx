import React from 'react';

const SectionHeader = ({heading, subHeading}) => {
    return (
        <div className='text-center max-w-sm mx-auto my-14'>
            <p className='text-yellow-400 italic mb-3'>---{subHeading}---</p>
            <h1 className='text-3xl uppercase border-y-2 border-e-gray-400 py-4'>{heading}</h1>
        </div>
    );
};

export default SectionHeader;