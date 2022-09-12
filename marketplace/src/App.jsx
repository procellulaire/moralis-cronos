import { useEffect, useState} from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
import NFTBalance from "components/NFTBalance";
import NFTTokenIds from "components/NFTTokenIds";
import { Menu, Layout} from "antd";
import SearchCollections from "components/SearchCollections";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import NFTMarketTransactions from "components/NFTMarketTransactions";
import { Content } from "antd/lib/layout/layout";
import aquaLogo from './logo.png';

const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
    background : "#111827",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
    background : "#111827",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
  
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();



  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ background: "#111827", height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <SearchCollections setInputValue={setInputValue}/>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              marginLeft: "50px",
              width: "100%",
              background: "#111827",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >
            <Menu.Item key="nftMarket" onClick={() => setInputValue("explore")} >
              <NavLink to="/NFTMarketPlace">🛒 Explore Market</NavLink>
            </Menu.Item>
            <Menu.Item key="nft">
              <NavLink to="/nftBalance">🖼 Your Collection</NavLink>
            </Menu.Item>
            <Menu.Item key="transactions">
              <NavLink to="/Transactions">📑 Your Transactions</NavLink>
            </Menu.Item>
          </Menu>
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/NFTMarketPlace">
              <NFTTokenIds inputValue={inputValue} setInputValue={setInputValue}/>
            </Route>
            <Route path="/Transactions">
              <NFTMarketTransactions />
            </Route>
          </Switch>
          <Redirect to="/NFTMarketPlace" />
        </div>
      </Router>
      <Content style={{ background: "#111827" }}>
      </Content>
    </Layout>

  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <img src={aquaLogo} width="60" height="38" viewBox="0 0 50 50"/>

  </div>
);

export default App;
