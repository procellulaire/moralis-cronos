import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import HooverSpringer from '../components/HooverSpringer';
import styles from '../styles/Minter.module.css';
import {Moralis} from 'moralis';
import ConnectWallet from '../components/ConnectWallet/ConnectWallet';
import { logo } from '../utils/logos'

const Home: React.FC = (): JSX.Element => {

  // variables
  const { authenticate, isAuthenticated } = useMoralis();
  const router = useRouter();

  // authentication
  // useEffect(() => {
  //   if (isAuthenticated) router.push('/minter');
  // }, [isAuthenticated]);


  // const { logout } = useMoralis();
  // const logOut = async () => {
  //   if (isAuthenticated) await logout();
    
  //   console.log("logged out");
    
  // };

  

  return (
    <div >
      {/* <HooverSpringer /> */}
      <Head>
        <title>AquaMetaverse projet - Moralis Cronos Gaming Hackathon</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div >
        
       <video autoPlay loop muted >
        <source src='/mainSlider/video1.mp4'/>
       </video>
       <div style={{position:"absolute", top:"35%",left:"40%", width:"25vw"}} className=" text-light">
          <div className='card  py-5 ps-4 pe-5 ' style={{backgroundColor:"#1118277a",border:"none"}}>
          <img
          src={logo}
          className="mx-auto img-fluid" style={{width:"250px"}} />
          <ConnectWallet/>
          <a href='/index-map1.html' target="_blank" button className='btn btn-dark mx-2 my-2 w-100 btn-lg'>Aqua Metaverse</button>
          <a href='/unity/Build/index.html' target="_blank" button className='btn btn-dark mx-2 my-2 w-100 btn-lg'>My Aqua Metaverse</button>
          <a href='/aweber.html' target="_blank" className='btn btn-dark mx-2 my-2 w-100 btn-lg'>Pre-launch</a>
          <button className='btn btn-dark mx-2 my-2 w-100 btn-lg' onClick={() =>router.push('/minter')}>Mint NFT</button>
          <button className='btn btn-danger mx-2 my-2 w-100 btn-lg'>Start Game</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
