// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Loan.sol";

contract LoanRequest is Ownable {
    address public borrower;
    IERC20 public token;
    uint256 public collateralAmount;
    uint256 public loanAmount;
    uint256 public payoffAmount;
    uint256 public loanDuration;

    constructor(
        IERC20 _token,
        uint256 _collateralAmount,
        uint256 _loanAmount,
        uint256 _payoffAmount,
        uint256 _loanDuration
    ) {
        borrower = msg.sender;
        token = _token;
        collateralAmount = _collateralAmount;
        loanAmount = _loanAmount;
        payoffAmount = _payoffAmount;
        loanDuration = _loanDuration;
    }

    Loan public loan;

    event LoanRequestAccepted(address indexed loan);

    function lendAurora() external payable {
        require(msg.value == loanAmount, "Incorrect loan amount");
        loan = new Loan(
            payable(msg.sender),
            borrower,
            token,
            collateralAmount,
            payoffAmount,
            loanDuration
        );
        require(token.transferFrom(borrower, address(loan), collateralAmount), "Transfer failed");
        payable(borrower).transfer(loanAmount);
        emit LoanRequestAccepted(address(loan));
    }
}
