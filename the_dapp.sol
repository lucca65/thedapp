pragma solidity ^0.4.17;

contract TheDapp {

  string public message;
  address public owner;
  uint256 public fee;

  // TODO: CHANGE THIS FOR A BETTER, MORE EVENT LIKE ONE
  event UpdateMessage();

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // Constructor
  function TheDapp(uint256 _fee) {
    this.owner = msg.sender;
    this.fee = (_fee * 1 finney);
  }

  public function setMessage(string _message) payable {
    require(msg.value == this.fee)
    this.message = _message;
    UpdateMessage(); // Emit Event
  }

  public withdraw() onlyOwner {
    msg.sender.send(this.balance);
  }

  public kill() onlyOnwer {
    selfdestruct(this.owner);
  }
}
