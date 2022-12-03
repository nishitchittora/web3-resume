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
        string exp_type; //can be enum
        string title;
        uint256 start_date;
        uint256 end_date;
        bool has_expiry;
        uint256 expiry_date;
        string description;
    }

    function SBT_to_string(SBT memory exp) private returns (string memory) {
        string memory delimeter = ";";
        return
            string(
                abi.encodePacked(
                    exp.exp_type,
                    exp.title,
                    exp.start_date,
                    exp.end_date,
                    exp.has_expiry,
                    exp.expiry_date,
                    exp.description
                )
            );
    }

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
        SBT memory experience_sbt = SBT(
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
