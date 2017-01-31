/*
  @name spec/swap.js
*/
import pipeline from '../../index'
import { expect , assert } from 'chai'
import path from 'path'
import Web3 from 'web3'
import dotenv from 'dotenv'
dotenv.config({ path: '../../../.env' })
let web3 = new Web3()
let provider = new web3.providers.HttpProvider(process.env.DEV_RPC)
web3.setProvider(provider)

describe('#Core Tests', function () {
  describe('#swapContract', function () {
    let mockContract = {}
    before(function(done) {
      let contractPath = path.join(__dirname, '../../../contracts/swap.sol')
      pipeline.mockContract({ name: 'DredgrSwapOld', path: contractPath}).then(function(contract) {
        mockContract = contract
        done()
      })
    })
    it('should create a swap', function(done) {
      mockContract.addSwap(
      'BTC','ETH',
      '39RwB8D6fg8mA1m7VGAGobKRtZM1vHV99F','1FKKRW68mK1PVuqrgEBKdUZwqVtQzhFfeu',
      '000.01000000','0x20f78496f14056ca85880ee362270da4ad81a675','0x373c55c277b866a69dc047cad488154ab9759466','000.010000000'
      ,{ from: web3.eth.accounts[0], 
         //gas: 300000 
      }
        , function(err, result) {
        if(err) { console.log(err) }
        console.log(result)
      })
      mockContract.swapCreated().watch(function(err, result) {
        console.log('swapCreated !')
        console.log(result)
        console.log(mockContract.getSwapOutgoing(result.args.swapID))
	done()
      })
    })
  })
})
