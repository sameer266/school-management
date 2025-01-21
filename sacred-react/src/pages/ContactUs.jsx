import React, { useState } from 'react';
import '../style/pages_css/contact.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to an API or email)
    alert('Message sent successfully!');
  };

  return (
    <div className="contact-container">
      <h1 className="contact-header">Contact Us</h1>
      <p className="contact-description">We are here to assist you with any questions or feedback regarding our school management system.</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Your message"
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      <div className="contact-info">
        <p>Or contact us directly at:</p>
        <p>Phone: +123 456 789</p>
        <p>Email: support@schoolmanagement.com</p>
        <p>Address: 123 School Road, City, Country</p>
      </div>
    </div>
  );
}

export default ContactUs;
