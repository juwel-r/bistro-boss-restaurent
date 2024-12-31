import React from "react";
import "./profile.css";
import photo from '../../assets/home/chef-service.jpg'
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

function Profile() {
  return (
    <div className="photo-container">
      {/* Rotating circle with social icons */}
      <div className="rotating-circle">
        <FaFacebook className="social-icon"></FaFacebook>
        <FaInstagram className="social-icon"></FaInstagram>
        <FaGithub className="social-icon"></FaGithub>
        <FaYoutube className="social-icon"></FaYoutube>
        
      </div>
      {/* Center photo */}
      <img
        src={photo}
        alt="Your Photo"
        className="center-photo"
      />
    </div>
  );
}

export default Profile;
