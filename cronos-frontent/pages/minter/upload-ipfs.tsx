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
import Link from 'next/link';

// global variables
const cx = classnames.bind(styles);

// initialize web3 package with Metamask
const web3 = new Web3(Web3.givenProvider);

// minter function
const UploadIPFS: React.FC = (): JSX.Element => {

    const [ipfsUrls, setIpfsUrls] = useState<Array<any>>([]);
    const [ipfsmetadata, setIpfsMetadata] = useState<Array<any>>([]);
    const [files, setFiles] = useState<any>(null);
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: "", description: "" });

    const handleForm = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    // variables to check if user is authenticated
    const {
        isAuthenticated,
        logout,
        user
    } = useMoralis();
    const router = useRouter();

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

    // on submit function - upload images to IPFS
    const UploadImages = async (e: { preventDefault: () => void; }) => {
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
                        if (!ipfsUrls.includes(el.path)) {

                            setIpfsUrls(prev => [...prev, el.path])
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

    const UploadMetadata = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            //setupfiles to upload
            let ipfsArray: { path: string; content: unknown; }[] = [];
            let promises = [];
            for (let index = 0; index < ipfsUrls.length; index++) {
                let paddedHex = (`0000000000000000000000000000000000000000000000000000000000000000${index.toString()}`).substring(-64)
                const element: string = ipfsUrls[index];
                promises.push(new Promise<void>((res, rej) => {
                    ipfsArray.push({
                        path: `metadata/${paddedHex}.json`,
                        content: {
                            image: `ipfs://${element.split("ipfs/").pop()}`,
                            name: `${form.name} #${index}`,
                            description: form.description
                        }
                    })
                    res()    

                }))
                
            }
            console.log("ipfsArray",ipfsArray)
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
                        if (!ipfsmetadata.includes(el.path)) {

                            setIpfsMetadata(prev => [...prev, el.path])
                            console.log("metadata",el.path)
                        }

                    }
                })
        } catch (err) {
            console.error(err);
            alert('Something went wrong!');
        }
    }
    return (
        <>
            {step === 1 && <>
                <div className={styles.container}>
                    <form className={styles.form}
                        onSubmit={UploadImages}>
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
                <button className='btn btn-outline-light' onClick={() => {
                    setStep(2)
                }}>Next</button>

                <table className='table'>
                    <tbody>
                        <tr>
                            <td className='text-light'>Files uploaded to IPFS</td>
                        </tr>
                        {ipfsUrls && ipfsUrls.map((element, idx) => {
                            return (<tr key={idx}>
                                <td className='text-light' >{element}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </>}
            {step === 2 && <>
                <div className={styles.container}>
                    <HooverSpringer />
                    <form
                        className={styles.form}
                        onSubmit={UploadMetadata}>
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
                                onChange={handleForm}
                                name="name"
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
                                onChange={handleForm}
                                name="description"
                            />
                        </div>

                        <button
                            type={inputSubmit}
                            className="btn btn-primary btn-lg w-100 mt-3"
                        >
                            Upload Metadata
                        </button>


                    </form>
                </div>
                <table className='table'>
                    <tbody>
                        <tr>
                            <td className='text-light'>metadata uploaded to IPFS</td>
                        </tr>
                        {ipfsmetadata && ipfsmetadata.map((element, idx) => {
                            return (<tr key={idx}>
                                <td><button onClick={() =>  navigator.clipboard.writeText(element)}>Copy</button></td>
                                <td className='text-light' >{element}</td>
                                
                            </tr>)
                        })}
                    </tbody>
                </table>
            </>}

        </>
    );
}

export default UploadIPFS;
