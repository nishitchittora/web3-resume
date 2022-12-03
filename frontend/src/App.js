import React, { Component } from "react";
import { ethers } from "ethers";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddInstitute from "./components/addInstitute";
import IssueSBT from "./components/issueSBT";

class Metamask extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async connectToMetamask() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const balance = await provider.getBalance(accounts[0]);
        const balanceInEther = ethers.utils.formatEther(balance);
        const block = await provider.getBlockNumber();

        provider.on("block", (block) => {
            this.setState({ block });
        });

        this.setState({
            selectedAddress: accounts[0],
            balance: balanceInEther,
            block,
        });
    }

    renderMetamask() {
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
                        <a href="/">Home</a>
                    </div>
                    <div>
                        {" "}
                        {!this.state.selectedAddress ? (
                            <Button onClick={() => this.connectToMetamask()}>
                                Connect to Metamask
                            </Button>
                        ) : (
                            this.state.selectedAddress
                        )}
                    </div>
                </div>
                <div style={{ marginTop: "2em" }}>
                    <AddInstitute />
                    <IssueSBT />
                </div>
            </div>
        );
    }

    render() {
        return <div>{this.renderMetamask()}</div>;
    }
}

export default Metamask;
