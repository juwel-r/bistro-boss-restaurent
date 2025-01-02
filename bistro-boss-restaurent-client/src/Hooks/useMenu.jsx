import React, { useEffect, useState } from "react";

const useMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        setLoadingData(false);
      });
  }, []);
  return [menuItems, loadingData];
};

export default useMenu;
