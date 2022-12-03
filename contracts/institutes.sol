pragma solidity >=0.8.0;

contract Institute {
    // Add owner constructor
    struct Institute {
        string name;
        string description;
    }
    uint256 institute_count;
    address private owner;

    mapping(uint256 => Institute) private institutes;

    constructor() {
        owner = msg.sender;
    }

    modifier() {
    require(
      owner == msg.sender,
      'No sufficient right'
    )
  }

    function addInstitute ownerOnly external(string name, string description) {
        Institute memory _institute = Institute(name, description);
        institutes[institute_count] = _institute;
        institute_count++;
    }
}
