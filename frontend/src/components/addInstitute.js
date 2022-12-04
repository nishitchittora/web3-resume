import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ABIJson from "../abi/Institute.json";
const ethers = require("ethers");

function AddInstitute() {
    useEffect(() => {
        console.log(process.env, "%%%");
        // onSubmit();
    });
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
        const { name, description, ens } = formData;
        console.log(name, description, ens);
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

            const addInstitute = await SBT.addInstitute(
                name,
                description,
                address
            );
            addInstitute.then((data) => console.log(data));
        })();
    };
    console.log(formData);
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Institute Name</Form.Label>
                <Form.Control
                    onChange={onInput}
                    type="text"
                    name="name"
                    placeholder="Enter Institute Name"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    name="description"
                    onChange={onInput}
                    placeholder="Enter Institute Description"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ENSAddress">
                <Form.Label>ENS Address</Form.Label>
                <Form.Control
                    type="text"
                    name="ens"
                    onChange={onInput}
                    placeholder="Enter Institute ENS Address"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Add
            </Button>
        </Form>
    );
}

export default AddInstitute;
