import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import styles from '../../styles/Minter.module.css';

const ConnectWallet: React.FC = (): JSX.Element => {
    // variables
    const { authenticate, isAuthenticated, isAuthenticating, user } = useMoralis();
    const router = useRouter();

    // authentication
    // useEffect(() => {
    //     if (isAuthenticated) router.push('/minter');
    // }, [isAuthenticated]);

    if (isAuthenticated ) {
        return (
            <button

                className='btn btn-dark mx-2 my-2 w-100'
            >
                {user?.get("ethAddress").substring(0, 4)} ... {user?.get("ethAddress").substring(user?.get("ethAddress").length - 4)}
            </button>
        )
    }
    return (
        <button
            onClick={() => authenticate()}
            className='btn btn-dark mx-2 my-2 w-100 btn-lg'
            disabled={isAuthenticating}
        >
            {(isAuthenticating) ? (<div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>) : "Connect Wallet"}
        </button>
    )
}

export default ConnectWallet;