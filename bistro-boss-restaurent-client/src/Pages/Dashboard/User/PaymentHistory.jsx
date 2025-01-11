import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import SectionHeader from "../../../components/SectionHeader";

const PaymentHistory = () => {
  const { userInfo } = useAuth();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`/payment/${userInfo.email}`).then((res) => {
      setPaymentHistory(res.data);
    });
  }, []);

  return (
    <div>
      <div className="w-10/12 mx-auto min-h-screen  ">
        <SectionHeader
          heading={"Payment History"}
          subHeading={"Track Your History"}
        ></SectionHeader>
<div className="flex justify-between">        <p className="text-xl font-bold">
          Total Payment: {paymentHistory.length}
        </p>
        <p  className="text-xl font-bold">
          Total Paid Amount: ${paymentHistory.reduce((a, c) => a + c.amount, 0)}
        </p></div>
        {paymentHistory.length > 0 ? (
          <>
            <div className="flex justify-between items-start px-8 mt-8 pt-8 bg-white">
              {/* <h1 className="text-3xl font-bold">Total Orders: {cart.length}</h1> */}
            </div>
            <div className="overflow-x-auto px-4 pt-6 bg-white pb-8 ">
              <table className="table">
                {/* head */}
                <thead className="bg-yellow-600">
                  <tr>
                    <th>SL</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={payment._id}>
                      <th>{index + 1}</th>
                      <td>{payment.email}</td>
                      <td>{payment.status}</td>
                      <td>${payment.amount}</td>
                      <td>{payment.transactionId}</td>
                    </tr>
                  ))}
                  {/* row 1 */}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-4xl text-gray-300 font-bold text-center">
            No Items In cart
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
