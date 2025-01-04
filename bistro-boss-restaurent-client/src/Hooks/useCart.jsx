import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useCart = () => {
  const { userInfo } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", userInfo?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/carts?email=${userInfo?.email}`);
      return res.data;
    },
  });
  return [cart, refetch];
};

export default useCart;
