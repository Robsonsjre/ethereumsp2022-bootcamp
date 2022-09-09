const path = require('path')

require('dotenv').config({
  path: path.resolve(__dirname, '.env')
})

require("@nomicfoundation/hardhat-toolbox");
require('./tasks/deploy')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    local: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      loggingEnabled: true,
      chainId: 31337.,
      url: 'http://127.0.0.1:8545'
    },
    mainnet: {
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC
      },
      url: 'https://mainnet.infura.io/v3/' + process.env.INFURA_PROJECT_ID,
      network_id: 1
    },
    kovan: {
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC
      },
      url: 'https://kovan.infura.io/v3/' + process.env.INFURA_PROJECT_ID,
      network_id: 42
    }
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_APIKEY,
      kovan: process.env.ETHERSCAN_APIKEY
    }
  }
};
