pragma solidity >=0.8.0;

contract Institute {
    // Add owner constructor
    struct Institute {
        string name;
        string description;
        bool active;
    }
    address private owner;
    uint256 institutes_count;

    mapping(address => Institute) internal institutes;

    constructor() {
        owner = msg.sender;
        // institutes_count = 0;
    }

    function addInstitute(
        string memory name,
        string memory description,
        address institute_adress
    ) external {
        require(owner == msg.sender, "No sufficient right");
        Institute memory _institute = Institute(name, description, true);
        institutes[institute_adress] = _institute;
        institutes_count++;
    }

    function instituteCount() public view returns (uint256) {
        return institutes_count;
    }

    modifier onlyInstitute() {
        require(
            institutes[msg.sender].active == true,
            "Needs to be valid institute"
        );
        _;
    }

    function is_admin(address _admin) public view returns (bool) {
        if (_admin == owner) return true;
        return false;
    }

    function is_institute(address _institute) public view returns (bool) {
        if (institutes[_institute].active) return true;
        return false;
    }
}
