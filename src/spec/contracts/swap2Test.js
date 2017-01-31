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

describe('#Example Two', function () {
  let mockContract = {}
  before(function(done) {
    let contractPath = path.join(__dirname, '../../../contracts/swap2.sol')
    pipeline.mockContract({ name: 'DredgrSwap', path: contractPath}).then(function(contract) {
      mockContract = contract
      done()
    })
  })
  it('should create a swap', function(done) {
    let payload = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmNvbWluZyI6ImJ0YyIsIm91dGdvaW5nIjoiZXRoIiwiaW5jb21pbmdfZnJvbSI6IjM5UndCOEQ2Zmc4bUExbTdWR0FHb2JLUnRaTTF2SFY5OUYiLCJpbmNvbWluZ190byI6IjFGS0tSVzY4bUsxUFZ1cXJnRUJLZFVad3FWdFF6aEZmZXUiLCJpbmNvbWluZ19hbXQiOiIwMDAuMDEwMDAwMDAiLCJvdXRnb2luZ19mcm9tIjoiMHgyMGY3ODQ5NmYxNDA1NmNhODU4ODBlZTM2MjI3MGRhNGFkODFhNjc1Iiwib3V0Z29pbmdfdG8iOiIweDM3M2M1NWMyNzdiODY2YTY5ZGMwNDdjYWQ0ODgxNTRhYjk3NTk0NjYiLCJvdXRnb2luZ19hbXQiOiIwMDEuMDAwMDAwMDAifQ.5E_apdWgDcF6lP2DaYVOQeSlxMc2T0P-j6ockgkv0OY'
    mockContract.addSwap(payload
    ,{ from: web3.eth.accounts[0], 
       //gas: 300000 
    }
      , function(err, result) {
      if(err) { console.log(err) }
      // console.log(result)
    })
    mockContract.swapCreated().watch(function(err, result) {
      //console.log(mockContract.getSwap(result.args.swapID))
      done()
    })
  })
})

