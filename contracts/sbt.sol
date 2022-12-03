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
        string exp_type; //can be enum
        string title;
        uint256 start_date;
        uint256 end_date;
        bool has_expiry;
        uint256 expiry_date;
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
                    "institute_name",
                    exp.institute_name,
                    "exp_type:",
                    exp.exp_type,
                    ", title:",
                    exp.title,
                    ", start_date:",
                    exp.start_date,
                    ", end_date:",
                    exp.end_date,
                    ", has_expiry:",
                    exp.has_expiry,
                    ", expiry_date:",
                    exp.expiry_date,
                    ", description:",
                    exp.description
                )
            );
    }

    // already available in base class
    // function tokenURI(uint256 tokenId) public view virtual override returns (string memory)

    //overriding trasfer functions of ERC721 to make the token soulbound
    // function _transfer(
    //     address from,
    //     address to,
    //     uint256 tokenId
    // ) internal virtual override {}

    function mint(
        address receiver,
        string memory exp_type,
        string memory title,
        string memory description,
        uint256 start_date,
        uint256 end_date,
        bool has_expiry,
        uint256 expiry_date
    ) public onlyInstitute returns (bool) {
        address inst_address = msg.sender;
        string memory inst_name = institutes[inst_address].name;
        SBT memory experience_sbt = SBT(
            inst_name,
            exp_type,
            title,
            start_date,
            end_date,
            has_expiry,
            expiry_date,
            description
        );
        _tokenIds.increment();
        uint256 newNftTokenId = _tokenIds.current();
        _mint(receiver, newNftTokenId);
        _setTokenURI(newNftTokenId, SBT_to_string(experience_sbt));
        return true;
    }
}
