import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./Password.css";
import { toast } from "react-toastify"; 

const ChangePassword = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState({
    password: "",
    newpassword: "",
    rewritepassword: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const sendRequest = async (event) => {
    event.preventDefault(); 
    if (data.newpassword !== data.rewritepassword && data.password.length < 8) {
        toast.error("New password and rewrite password do not match!");
        return;
      }
    
    try{
        let contactData = {
            password: data.password,
            newpassword: data.newpassword,
          };
          let response = await axios.post(url + "/api/user/edit", contactData, {
            headers: { token },
          });
          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
    }catch(err){
        toast.error("Error . Try again!!!")
    }

  };

  return (
    <div>
        <h2 id="h2-password">Account Setting</h2>
      <div className="changePassword">
        <form action="" onSubmit={sendRequest}>
          <div className="input-field">
            <div className="header-email">
              <span htmlFor="password">Your Password</span>
            </div>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="Your Password"
              required
            />
            <div className="header-phone">
              <span htmlFor="newpassword">New Password</span>
            </div>
            <input
              type="password"
              name="newpassword"
              value={data.newpassword}
              onChange={onChangeHandler}
              placeholder="New Password"
              required
            />
            <div className="header-context">
              <span htmlFor="rewritepassword">Rewrite Password</span>
            </div>{" "}
            <input
              type="password"
              name="rewritepassword"
              value={data.rewritepassword}
              onChange={onChangeHandler}
              placeholder="Rewrite Password"
              required
            />
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
