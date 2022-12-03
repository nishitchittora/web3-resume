import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ABIJson from "../abi/Institute.json";
const ethers = require("ethers");

function IssueSBT() {
    const [formData, setValue] = useState({});
    const onInput = (e) => {
        console.log(e.target.value, "$$$", e.target.name);
        let d = formData;
        d[e.target.name] = e.target.value;
        setValue(d);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const { type, description, title, start_date, end_date, ens } =
            formData;
        console.log(
            type,
            description,
            title,
            start_date,
            end_date,
            ens,
            Math.floor(new Date(start_date).getTime() / 1000),
            Math.floor(new Date(end_date).getTime() / 1000)
        );
        (async () => {
            const provider = new ethers.providers.JsonRpcProvider(
                process.env.REACT_APP_INFURA_URL
            );
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            const address = await provider.resolveName(ens);
            const wallet = new ethers.Wallet(
                process.env.REACT_APP_PRIVATE_KEY,
                provider
            );
            const signer = wallet.provider.getSigner(wallet.address);

            console.log(address, ens, " ^^^^");
            const SBT = new ethers.Contract(
                process.env.REACT_APP_CONTRACT_ADDRESS,
                ABIJson,
                signer
            );

            const addInstitute = await SBT.mint(
                address,
                type,
                title,
                description,
                Math.floor(new Date(start_date).getTime() / 1000),
                Math.floor(new Date(end_date).getTime() / 1000)
            );
            addInstitute.then((data) => console.log(data));
        })();
    };
    console.log(formData);
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="Type">
                <Form.Label>Type</Form.Label>
                <Form.Control
                    onChange={onInput}
                    type="text"
                    name="type"
                    placeholder="Enter Type"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    onChange={onInput}
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    onChange={onInput}
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="start_date">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                    onChange={onInput}
                    type="date"
                    name="start_date"
                    placeholder="Enter Start Date"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="end_date">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                    onChange={onInput}
                    type="date"
                    name="end_date"
                    placeholder="Enter Description"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ENSAddress">
                <Form.Label>ENS Address</Form.Label>
                <Form.Control
                    type="text"
                    name="ens"
                    onChange={onInput}
                    placeholder="Enter ENS Address"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Issue
            </Button>
        </Form>
    );
}

export default IssueSBT;
