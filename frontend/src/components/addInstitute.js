import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddInstitute() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Institute Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Institue Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default AddInstitute;
