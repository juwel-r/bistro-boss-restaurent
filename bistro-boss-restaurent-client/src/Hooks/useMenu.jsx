import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {

  const axiosPublic = useAxiosPublic();
  const {
    data: menuItems=[],isPending: loadingData,refetch,} = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("/menu");
      return res.data;
    },
  });
  return [menuItems, loadingData, refetch];
};

export default useMenu;
