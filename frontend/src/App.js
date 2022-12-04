import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddInstitute from "./components/addInstitute";
import IssueSBT from "./components/issueSBT";
import ABIJson from "./abi/Institute.json";
import AddWallet from "./components/addWallet";
import Resume from "./components/Resume";

function Metamask() {
    const [account, setAccount] = useState();
    const [institute, setInstitute] = useState();
    const [admin, setAdmin] = useState();
    const connectToMetamask = () => {
        (async () => {
            // const provider = new ethers.providers.JsonRpcProvider(
            //     process.env.REACT_APP_INFURA_URL
            // );
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);
        })();
    };

    useEffect(() => {
        console.log("$$$$$", account);
        if (ABIJson && account) {
            (async () => {
                // const provider = new ethers.providers.JsonRpcProvider(
                //     process.env.REACT_APP_INFURA_URL
                // );
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const tokenContract = new ethers.Contract(
                    process.env.REACT_APP_CONTRACT_ADDRESS,
                    ABIJson,
                    provider
                );

                const is_admin_check = await tokenContract.is_admin(account);
                console.log(tokenContract);
                const is_institute_check = await tokenContract.is_institute(
                    account
                );
                const data = Promise.resolve(is_admin_check);
                data.then((value) => {
                    console.log(value, " ^^");
                    setAdmin(value);
                });
                const data1 = Promise.resolve(is_institute_check);
                data1.then((value) => {
                    console.log(value, " **");
                    setInstitute(value);
                });
            })();
        }
    }, [account]);

    const renderMetamask = () => {
        return (
            <div
                style={{
                    marginTop: "1em",
                    paddingLeft: "4em",
                    paddingRight: "4em",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                    }}
                >
                    <div>
                        <a href="/">
                            <img
                                style={{
                                    height: "60px",
                                    width: "60px",
                                }}
                                alt={"logo"}
                                src={"./logo.png"}
                            />
                        </a>
                    </div>
                    <div>
                        {" "}
                        {!account ? (
                            <Button onClick={() => connectToMetamask()}>
                                Connect to Metamask
                            </Button>
                        ) : (
                            account
                        )}
                    </div>
                </div>
                <div style={{ marginTop: "2em" }}>
                    {admin ? (
                        <AddInstitute />
                    ) : institute ? (
                        <IssueSBT />
                    ) : account ? (
                        <Resume account={account} />
                    ) : (
                        <AddWallet />
                    )}
                </div>
            </div>
        );
    };

    return <div>{renderMetamask()}</div>;
}

export default Metamask;
