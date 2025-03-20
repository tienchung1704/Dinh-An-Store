import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [productDetail, setProductDetail] = useState([]);


  const getItemDetail = async (itemId) => {
    try{
      const response = await axios.get(`${url}/api/food/${itemId}`);
      setProductDetail(response.data.data)

    }catch(err){
      console.error("Lỗi khi lấy thông tin sản phẩm:", err);
    }
  }

  const addToCart = async (itemId) => {
    if (token) {
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }else{
      toast.warn("For the best experience, we suggest that you log in first.");
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };



  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      console.log("Cart data loaded:", response.data.cartData);
      setCartItems(response.data.cartData || []);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // Lưu trữ các ID sản phẩm không hợp lệ
    const invalidItems = [];

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product.id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.warn(
            `Product with ID ${item} not found in food_list. Marking it for removal.`
          );
          invalidItems.push(item); 
          if (invalidItems.length > 0) {
            invalidItems.forEach((itemId) => removeFromCart(itemId));
          }
        }
      }
    }

    return totalAmount;
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    getItemDetail,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
