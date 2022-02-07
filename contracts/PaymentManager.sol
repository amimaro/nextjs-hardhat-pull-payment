//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/PullPayment.sol";

contract PaymentManager is PullPayment {
    event Received(address caller, uint256 amout, string message);

    function withdrawPayments(address payable payee) public virtual override {
        require(msg.sender == payee, "Unauthorized withdraw");
        super.withdrawPayments(payee);
    }

    receive() external payable {
        _asyncTransfer(msg.sender, msg.value);
        emit Received(msg.sender, msg.value, "Receive was called");
    }

    fallback() external payable {
        _asyncTransfer(msg.sender, msg.value);
        emit Received(msg.sender, msg.value, "Fallback was called");
    }
}
