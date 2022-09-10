import { useRouter } from 'next/router';
import React,
{
  useEffect,
  useState
} from 'react';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis';
import Web3 from 'web3';
import {
  contractABI,
  contractAddress
} from '../../contract';
import styles from '../../styles/Minter.module.css';
import classnames from 'classnames/bind';
import {
  inputSubmit,
  inputText,
  inputFiles,
  inputName,
  inputDescription
} from '../../utils/input'
import { logo } from '../../utils/logos'
import HooverSpringer from '../../components/HooverSpringer';
import { v4 as uuidv4 } from 'uuid';
import Head from 'next/head';

// global variables
const cx = classnames.bind(styles);

// initialize web3 package with Metamask
const web3 = new Web3(Web3.givenProvider);

// minter function
const GameAssets: React.FC = (): JSX.Element => {

  // variables to check if user is authenticated
  const {
    isAuthenticated,
    logout,
    user
  } = useMoralis();
  const router = useRouter();

  // variables to set state for the form to submit
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<any>(null);

  // authentication to check if user is authenticated or not
  useEffect(() => {
    if (!isAuthenticated)
      router.push('/');
  }, [isAuthenticated]);

  // on submit function
  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {

      // save image to IPFS
      const filename = uuidv4().replaceAll('-','')+"."+file.name.split(".").pop();
      console.log("filename",filename);
      const fileToIpfs = new Moralis.File(
        filename,
        file)
        ;
      await fileToIpfs.saveIPFS();
      const fileToIpfsurl = fileToIpfs.ipfs();

      // generate metadata and save to ipfs
      const metadata = {
        name,
        description,
        image: fileToIpfsurl,
      };
      const fileToUpload = new Moralis.File(`${name}metadata.json`, {
        base64: Buffer.from(JSON.stringify(metadata)).toString('base64'),
      });
      await fileToUpload.saveIPFS();
      const metadataurl = fileToUpload.ipfs();
console.log("metadataurl",metadataurl)
      // interact with smart contract
      const contract = new web3.eth.Contract(
        contractABI as any, 
        contractAddress
      );
      const response = await contract.methods
        .mint(metadataurl)
        .send({ from: user?.get('ethAddress') });
      const tokenId = response.events.Transfer.returnValues.tokenId;
      alert(
        `New NFT minted under contract ${contractAddress}`
      );
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <>
    
    <div className={styles.container}>
      <HooverSpringer />
      <form
        className={styles.form}
        onSubmit={onSubmit}>
        <img
          src={logo}
          className={styles.logo} />
        <div className={cx(
          styles.inputContainer,
          styles.mt1
        )}>
          <input
            type={inputText}
            className={styles.input}
            placeholder={inputName}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={cx(
          styles.inputContainer,
          styles.mt1
        )}>
          <input
            type={inputText}
            className={styles.input}
            placeholder={inputDescription}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={cx(
          styles.inputContainer,
          styles.mt1
        )}>
          <input
            type={inputFiles}
            className={styles.input}
            onChange={(e: any) => setFile(e.target.files[0])}
          />
        </div>
        <button
          type={inputSubmit}
          className="btn btn-primary btn-lg w-100 mt-3"
        >
          Mint
        </button>
        <button className='btn btn-light btn-lg w-100 mt-3' onClick={()=>{router.push('/')}}>Back to Menu</button>
        <button
          onClick={logout}
          className={cx(
            styles.actionBtnSecondary,
            styles.mt1
          )}
        >
          Logout
        </button>
        
      </form>
    </div>
    </>
  );
}

export default GameAssets;
