import React from "react";

// Navigation bar with an rounded box/button that links to the homepage (styled to be centered with text under icon)
function Nav() {
  return (
    <div class="nav">
      <a href="/" className="home-nav">
        <img className="home-nav-icon" src="../ring.png" />
        <span class="home-nav-text">Home</span>
      </a>
    </div>
  );
}
export default Nav;
