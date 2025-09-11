import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { StoreContext } from '../../context/StoreContext'
import "./Contact.css";
const ContactForm = () => {
    const {token,url} = useContext(StoreContext)
  
  const [data, setData] = useState({
    firstnameContact: "",
    lastnameContact: "",
    emailContact: "",
    phoneContact: "",
    detailContact: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const sendContact = async (event) => {
    event.preventDefault(); 
    let contactData = {
      firstnameContact: data.firstnameContact,
      lastnameContact: data.lastnameContact,
      emailContact: data.emailContact,
      phoneContact: data.phoneContact,
      detailContact: data.detailContact,

    };
    let response = await axios.post(url + "/api/contact/add", contactData, {
      headers: { token },
    });
    if (response.data.success) {
      toast.success(response.data.message);
      setData({
        firstnameContact: "",
        lastnameContact: "",
        emailContact: "",
        phoneContact: "",
        detailContact: "",
    })
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="contact" id="contact">
      <h1>Contact Us</h1>
      <div className="contact-form">
        <form action="" onSubmit={sendContact}>
          <div className="header-name">
            <span htmlFor="firstname">First Name</span>
            <span htmlFor="lastname">Last Name</span>
          </div>
          <div className="name-field">
            <input
              type="text"
              name="firstnameContact"
              value={data.firstnameContact}
              onChange={onChangeHandler}
              placeholder="First name"
              required
            ></input>
            <input
              type="text"
              name="lastnameContact"
              value={data.lastnameContact}
              onChange={onChangeHandler}
              placeholder="Last name"
              required
            />
          </div>
          <div className="input-field">
            <div className="header-email">
              <span htmlFor="email">Email Adress</span>
            </div>
            <input
              type="email"
              name="emailContact"
              value={data.emailContact}
              onChange={onChangeHandler}
              placeholder="Your email"
              required
            />
            <div className="header-phone">
              <span htmlFor="phone">Phone</span>
            </div>
            <input
              type="text"
              name="phoneContact"
              value={data.phoneContact}
              onChange={onChangeHandler}
              placeholder="Your Phone Number"
              required
            />
            <div className="header-context">
              <span htmlFor="context">Reason for Context</span>
            </div>{" "}
            <textarea
              type="text"
              name="detailContact"
              value={data.detailContact}
              onChange={onChangeHandler}
              placeholder="Tell me your reason why you want to contact with us"
              required
            />
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
