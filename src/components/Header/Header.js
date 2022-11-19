import Logo from "../Logo/Logo";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

export default function Header({ loggedIn, menuActive, onClick }) {
  return (
    <header className="header">
      <Logo />
      {loggedIn ? (
        <Navigation menuActive={menuActive} onClick={onClick} />
      ) : (
        <AuthNavigation />
      )}
    </header>
  );
}
