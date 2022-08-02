import {useContext} from "react";
import {Outlet, Link} from 'react-router-dom';

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';

import './navigation.styles.scss';
import {UserContext} from "../../components/contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const {currentUser} = useContext(UserContext);

  return (
    <>
      <nav className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>Sign Out</span>
          ) : (<Link className="nav-link" to="/auth">
            Sign In
          </Link>)}
        </div>
      </nav>
      <Outlet/>
    </>
  );
};
export default Navigation;
