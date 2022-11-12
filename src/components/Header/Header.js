import Logo from "../Logo/Logo";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

export default function Header({ loggedIn }) {
  return (
    <header className="header">
      <Logo />
      {loggedIn ? <Navigation /> : <AuthNavigation />}
    </header>
  )
}