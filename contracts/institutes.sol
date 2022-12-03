pragma solidity >=0.8.0;

contract Institute {
    // Add owner constructor
    struct Institute {
        string name;
        string description;
        bool active;
    }
    address private owner;

    mapping(address => Institute) private institutes;

    constructor() {
        owner = msg.sender;
    }

    function addInstitute(
        string memory name,
        string memory description,
        address institute_adress
    ) external {
        require(owner == msg.sender, "No sufficient right");
        Institute memory _institute = Institute(name, description, true);
        institutes[institute_adress] = _institute;
    }

    function is_valid_institute(address institute_adress)
        public
        returns (bool)
    {
        return institutes[institute_adress].active;
    }
}
