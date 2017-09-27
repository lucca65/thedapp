pragma solidity ^0.4.17;

contract TheDapp {

  string public message;
  address public owner;
  uint256 public fee;

  event UpdateMessage();

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function TheDapp(uint256 _fee) {
    this.owner = msg.sender;
    this.fee = (_fee * 1 finney);
  }

  public function setMessage(string _message) payable {
    require(msg.value == this.fee)
      this.message = _message;
    UpdateMessage();
  }

  public function getMessage() constant returns (string) {
    return message;
  }

  public withdraw() onlyOwner {
    msg.sender.send(this.balance);
  }

  public kill() onlyOnwer {
    selfdestruct(this.owner);
  }
}
