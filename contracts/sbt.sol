// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./institutes.sol";

contract ProfessionalValidation is ERC721URIStorage, Institute {
    address private _owner;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Professional Experience SBT", "EXPSBT") {}

    struct SBT {
        string institute_name; // address of institute
        string experience_type; //can be enum
        string title;
        string start_date;
        string end_date;
        string description;
    }

    function SBT_to_string(SBT memory exp)
        private
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "{institute_name:",
                    exp.institute_name,
                    "experience_type:",
                    exp.experience_type,
                    ", title:",
                    exp.title,
                    ", start_date:",
                    exp.start_date,
                    ", end_date:",
                    exp.end_date,
                    ", description:",
                    exp.description,
                    "}"
                )
            );
    }

    // already available in base class
    // function tokenURI(uint256 tokenId) public view virtual override returns (string memory)

    //overriding trasfer functions of ERC721 to make the token soulbound
    // this function is disabled since we don;t want to allow transfers
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public virtual override {
        revert("Transfer not supported for soul bound token.");
    }

    // this function is disabled since we don;t want to allow transfers
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes memory _data
    ) public virtual override {
        revert("Transfer not supported for soul bound token.");
    }

    // this function is disabled since we don;t want to allow transfers
    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public virtual override {
        revert("Transfer not supported for soul bound token.");
    }

    // this function is disabled since we don;t want to allow transfers
    function approve(address _to, uint256 _tokenId) public virtual override {
        revert("Transfer not supported for soul bound token.");
    }

    // this function is disabled since we don;t want to allow transfers
    function setApprovalForAll(address _operator, bool _approved)
        public
        virtual
        override
    {
        revert("Transfer not supported for soul bound token.");
    }

    // this function is disabled since we don;t want to allow transfers
    function getApproved(uint256 _tokenId)
        public
        view
        override
        returns (address)
    {
        return address(0x0);
    }

    function mint(
        address receiver,
        string memory exp_type,
        string memory title,
        string memory description,
        string memory start_date,
        string memory end_date
    ) public onlyInstitute returns (bool) {
        address inst_address = msg.sender;
        string memory inst_name = institutes[inst_address].name;
        SBT memory experience_sbt = SBT(
            inst_name,
            exp_type,
            title,
            start_date,
            end_date,
            description
        );
        _tokenIds.increment();
        uint256 newNftTokenId = _tokenIds.current();
        _mint(receiver, newNftTokenId);
        _setTokenURI(newNftTokenId, SBT_to_string(experience_sbt));
        return true;
    }
}
