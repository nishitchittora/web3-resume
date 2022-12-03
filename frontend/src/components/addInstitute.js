import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const ethers = require("ethers");

function AddInstitute() {
    useEffect(() => {
        console.log(process.env, "%%%");
        onSubmit();
    });
    const onSubmit = () => {
        (async () => {
            // const provider = new ethers.providers.JsonRpcProvider(
            //     process.env.REACT_APP_INFURA_URL
            // );
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const address = await provider.resolveName("nishitchittora.eth");

            const balance = await provider.getBalance("nishitchittora.eth");

            console.log(
                `Balance of ${address} is:`,
                ethers.utils.formatEther(balance)
            );
        })();
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Institute Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Institute Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Institute Description"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ENSAddress">
                <Form.Label>ENS Address</Form.Label>
                <Form.Control
                    type="text"
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
