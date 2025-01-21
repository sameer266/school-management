import React from 'react'
import '../style/comp_css/footer.css'; // Import your CSS file
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer>
      <p>&copy; 2023 Sacred Heart Academy. All rights reserved.</p>
      <p>
        Follow us on 
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook /> Facebook
        </a>, 
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter /> Twitter
        </a>, and 
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">

          <FaInstagram /> Instagram
        </a>.
      </p>
    </footer>
  )
}
