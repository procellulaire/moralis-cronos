

import Link from "next/link";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import { logo } from '../../utils/logos'
import styles from '../../styles/Minter.module.css';
const Menu: React.FC = (): JSX.Element => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Aqua Metaverse
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <img
          src={logo}
          className="ms-auto" style={{width:"250px"}} />
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item me-1">
              <Link href="/minter" className="nav-link text-light">
                <a href="/minter" className="nav-link">Mint NFT</a>
              </Link>
              {/* <a href="/minter" className="nav-link">Mint NFT</a> */}
            </li>
            <li className="nav-item">
              <ConnectWallet/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
}

export default Menu;