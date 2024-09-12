import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { storeName, basicUrl } from "../../config/store.config.js";
import { webTokenManager } from "../../../utils/WebTokenManager.js";

function capitalizeFirstLetter(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function Navigation(props) {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setToken(webTokenManager.getTokenDecoded().data);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function logOut() {
    webTokenManager.clearToken();
  }

  return (
    <nav className="p-2 navbar">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarNav" className="collapse navbar-collapse">
        <ul className="navbar-nav p-3">
          <li className="nav-item dropdown">
            {webTokenManager.getToken() ? (
              <button onClick={logOut} className="btn btn-danger">
                Log out
              </button>
            ) : null}
          </li>
          {!webTokenManager.getToken() && (
            <>
              <li className="nav-item dropdown">
                <Link to={basicUrl + "/login"}>Login</Link>
              </li>
              <li className="nav-item dropdown">
                <Link to={basicUrl + "/register"}>Register</Link>
              </li>
            </>
          )}
          <li className="nav-item dropdown">
            <Link to={basicUrl + "/address/add"}>Address Add</Link>
          </li>
          <li className="nav-item dropdown">
            <Link to={basicUrl + "/product/add"}>Add product</Link>
          </li>
          <li className="nav-item dropdown">
            <Link to={basicUrl + "/delivery/methods"}>Delivery Methods</Link>
          </li>
          <li className="nav-item dropdown">
            <Link to={basicUrl}>
              {capitalizeFirstLetter(storeName.toUpperCase())}
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link to={basicUrl + "/store"}>Store</Link>
          </li>
          <li className="nav-item dropdown">
            <Link to={basicUrl + "/cart"}>Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
