const DummyToken = artifacts.require("DummyToken");
const DummySale = artifacts.require("DummySale");

contract("Dummy test", async (accounts) => {
  it("Should get the balance", async () => {
    const tokenInstance = await DummyToken.deployed();

    const balance = await tokenInstance.balanceOf(accounts[0]);

    assert.equal(balance.gt(0), true);
  });

  it("Should increase allowance", async () => {
    const tokenInstance = await DummyToken.deployed();
    const saleInstance = await DummySale.deployed();

    const balance = await tokenInstance.balanceOf(accounts[0]);

    await tokenInstance.increaseAllowance(
      saleInstance.address,
      balance.toString()
    );

    const allowance = await tokenInstance.allowance(
      accounts[0],
      saleInstance.address
    );

    assert.equal(allowance.gt(0), true);
  });

  it("Should buy an nft", async () => {
    const tokenInstance = await DummyToken.deployed();
    const saleInstance = await DummySale.deployed();

    const balance = await tokenInstance.balanceOf(accounts[0]);

    await tokenInstance.increaseAllowance(
      saleInstance.address,
      balance.toString()
    );

    await saleInstance.buy();

    const nftBalance = await saleInstance.balanceOf(accounts[0]);

    assert.equal(nftBalance.gt(0), true);

    const nftUri = await saleInstance.tokenURI(0);

    assert.equal(nftUri.length > 0, true);
  });
});
