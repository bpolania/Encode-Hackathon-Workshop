// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Loan {
    address payable public lender;
    address public borrower;
    IERC20 public token;
    uint256 public collateralAmount;
    uint256 public payoffAmount;
    uint256 public dueDate;
    bool public isActive = true;

    constructor(
        address payable _lender,
        address _borrower,
        IERC20 _token,
        uint256 _collateralAmount,
        uint256 _payoffAmount,
        uint256 loanDuration
    ) {
        lender = _lender;
        borrower = _borrower;
        token = _token;
        collateralAmount = _collateralAmount;
        payoffAmount = _payoffAmount;
        dueDate = block.timestamp + loanDuration;
    }

    event LoanPaid();

    function payLoan() external payable {
        require(isActive, "Loan is not active");
        require(block.timestamp <= dueDate, "Loan is overdue");
        require(msg.value == payoffAmount, "Insufficient payment amount");

        require(token.transfer(borrower, collateralAmount), "Token transfer failed");
        emit LoanPaid();
        isActive = false;
    }

    function repossess() external {
        require(isActive, "Loan is not active");
        require(block.timestamp > dueDate, "Loan is not yet overdue");

        require(token.transfer(lender, collateralAmount), "Token transfer failed");
        isActive = false;
    }
}

