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
const UploadIPFS: React.FC = (): JSX.Element => {

    const [ipfsUrls,setIpfsUrls] = useState<Array<any>>([]);
    // variables to check if user is authenticated
    const {
        isAuthenticated,
        logout,
        user
    } = useMoralis();
    const router = useRouter();

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
            let ipfsArray: { path: string; content: unknown; }[] = [];
            let promises = [];
            for (let index = 0; index < files.length; index++) {
                let paddedHex = (`0000000000000000000000000000000000000000000000000000000000000000${index.toString()}`).substring(-64)
                const element: File = files[index];


                promises.push(new Promise<void>((res, rej) => {
                    toBase64(element).then((result) => {
                        //filename
                        //console.log(paddedHex+"."+element.name.split(".").pop());
                        const postfix = element.name.split(".").pop();
                        let name = `${paddedHex}.${postfix}`;
                        ipfsArray.push({
                            path: `images/${name}`,
                            content: result
                        })
                        res()
                    })

                }))
                
            }
            Promise.all(promises).then(() => {
                //console.log(ipfsArray);
                axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
                    headers: {
                        'X-API-KEY': process.env.NEXT_PUBLIC_MORALIS_API_KEY!,
                        'Content-Type': 'application/json',
                        accept: 'application/json'
                    },
                    maxBodyLength: Infinity
                }).then((res) => {
                    console.log(res)
                    
                    for (let index = 0; index < res.data.length; index++) {
                        const el = res.data[index];
                        if(!ipfsUrls.includes(el.path)){
                            
                            setIpfsUrls(prev => [...prev,el.path])
                            console.log(el.path)
                        }
                        
                    }
                })
                    .catch((error) => {
                        console.error(error)
                    })
            })
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
           
            <table className='table'>
                <tbody>
                <tr>
                    <td className='text-light'>Files uploaded to IPFS</td>
                </tr>
                {ipfsUrls && ipfsUrls.map((element,idx)=>{
                    return (<tr key={idx}>
                        <td className='text-light' >{element}</td>
                    </tr>)
                })}
                </tbody>
            </table>
            
        </>
    );
}

export default UploadIPFS;
