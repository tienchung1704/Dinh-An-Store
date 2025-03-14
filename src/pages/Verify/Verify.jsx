import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import "./Verify.css";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      setTimeout(() => {
        navigate("/myorders");
      }, 3200); // Chờ 4 giây trước khi chuyển hướng
      toast.success("Đặt hàng thành công");
    } else {
      toast.error("Thanh toán thất bại");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return <div class="loader"></div>;
};

export default Verify;
