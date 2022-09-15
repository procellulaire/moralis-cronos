const marketDeploy = artifacts.require("marketPlaceBoilerPlate");

module.exports = function (deployer) {
  deployer.deploy(marketDeploy);
  console.log(
    "Marketplace contract address: ", deployer.address
  );
};
