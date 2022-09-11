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
import { useMoralisWeb3Api } from "react-moralis";
import axios from 'axios'

// global variables
const cx = classnames.bind(styles);

// initialize web3 package with Metamask
const web3 = new Web3(Web3.givenProvider);

// minter function
const UploadMetadata: React.FC = (images): JSX.Element => {
    const router = useRouter();
//const {images} = router.query;
useEffect(() => {
  console.log(images)
}, [images])

//    const [ipfsUrls,setIpfsUrls] = useState<Array<any>>([]);
    // variables to check if user is authenticated
    const {
        isAuthenticated,
        logout,
        user
    } = useMoralis();
    

    // variables to set state for the form to submit
    const [files, setFiles] = useState<any>(null);

    const Web3Api = useMoralisWeb3Api();
    // authentication to check if user is authenticated or not
    //   useEffect(() => {
    //     if (!isAuthenticated)
    //       router.push('/');
    //   }, [isAuthenticated]);

    const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString().replace(/^data:(.*,)?/, ''));
        reader.onerror = error => reject(error);
    });

    // on submit function
    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            //setupfiles to upload
            
            
        } catch (err) {
            console.error(err);
            alert('Something went wrong!');
        }
    };

    return (
        <>
            <div className={styles.container}>
                <form className={styles.form}
                    onSubmit={onSubmit}>
                    <img
                        src={logo}
                        className={styles.logo} />
                    <p className='text-light mt-5'>You can choose multiple files</p>
                    <div className={cx(
                        styles.inputContainer,
                        styles.mt1
                    )}>

                        <input
                            type={inputFiles}
                            multiple
                            className={styles.input}
                            onChange={(e: any) => setFiles(e.target.files)}
                        />
                    </div>
                    <button
                        type={inputSubmit}
                        className="btn btn-primary btn-lg w-100 mt-3"
                    >
                        Upload to IPFS
                    </button>
                </form>
                
            </div>
         
            
            
        </>
    );
}

export default UploadMetadata;
