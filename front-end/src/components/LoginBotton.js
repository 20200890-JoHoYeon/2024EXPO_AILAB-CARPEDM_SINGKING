import React from "react";
import PropTypes from "prop-types";

const LoginButton = ({ background, color, title, src, handleLoginPress }) => (
  <button
    style={{
      backgroundColor: background,
      color: color,
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      marginBottom: "10px",
    }}
    onClick={handleLoginPress}
  >
    <img src={src} alt={`${title} icon`} style={{ width: "20px", marginRight: "10px" }} />
    {title}
  </button>
);

LoginButton.propTypes = {
  background: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  handleLoginPress: PropTypes.func.isRequired,
};

export default LoginButton;
