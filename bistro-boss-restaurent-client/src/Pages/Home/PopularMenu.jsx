import { useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader';
import MenuItem from '../../components/MenuItem';

const PopularMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
      fetch("menu.json")
        .then((res) => res.json())
        .then((data) => {
            const popularItems = data.filter(item=> item.category === "popular");
            setMenuItems(popularItems)
        });
    }, []);
    return (
        <div>
            <SectionHeader heading={"Popular Menu"} subHeading={"Check It Out"}></SectionHeader>
            <div className='grid sm:grid-cols-2 gap-6'>
                {
                    menuItems.map(menu=><MenuItem key={menu._id} menu={menu}></MenuItem>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;