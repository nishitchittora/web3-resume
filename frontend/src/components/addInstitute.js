import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const ethers = require("ethers");
import ABIJson from "./abi/Institute.json";

function AddInstitute() {
    useEffect(() => {
        console.log(process.env, "%%%");
        // onSubmit();
    });
    const [value, setValue] = useState();
    const onInput = ({ t: { v } }) =>
        setValue({
            ...value,
            t: v,
        });
    const onSubmit = (e) => {
        console.log(e, e.target.values);
        e.preventDefault();

        (async () => {
            // const provider = new ethers.providers.JsonRpcProvider(
            //     process.env.REACT_APP_INFURA_URL
            // );
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const address = await provider.resolveName("nishitchittora.eth");
            const signer = provider.getSigner();
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
    console.log(value);
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Institute Name</Form.Label>
                <Form.Control
                    onChange={onInput}
                    value={value}
                    type="text"
                    placeholder="Enter Institute Name"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    onChange={onInput}
                    value={value}
                    placeholder="Enter Institute Description"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ENSAddress">
                <Form.Label>ENS Address</Form.Label>
                <Form.Control
                    type="text"
                    onChange={onInput}
                    value={value}
                    placeholder="Enter Institute ENS Address"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default AddInstitute;
