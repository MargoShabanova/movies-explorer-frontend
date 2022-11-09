import Logo from "../Logo/Logo";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import React from "react";

export default function Header({ loggedIn }) {
  const [isOpen, setIsOpen] = React.useState(false);

  function handleOpenNav() {
    setIsOpen(true);
  }
  function handleCloseNav() {
    setIsOpen(false);
  }

  return (
    <header className="header">
      <Logo />
      {loggedIn ? <Navigation onClick={handleOpenNav} /> : <AuthNavigation />}
      {/* <Burger isOpen={isOpen} onClick={handleCloseNav} /> */}
    </header>
  )
}