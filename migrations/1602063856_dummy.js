const DummyToken = artifacts.require("DummyToken");
const DummySale = artifacts.require("DummySale");

module.exports = function (_deployer) {
  // Use deployer to state migration tasks.

  _deployer
    .deploy(
      DummyToken,
      "Dummy token",
      "DMT",
      "1000000000000000000000",
      "0xe685AEc7E85EC39cCc0189F8543D28346FC9ac45"
    )
    .then((token) => {
      return _deployer.deploy(
        DummySale,
        "Dummy nft",
        "DMNFT",
        token.address,
        "1000000000000000000000"
      );
    });
};
