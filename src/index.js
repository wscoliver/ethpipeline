/*
  @name index.js
  @desc Ethereuem Pipeline Tool
*/
import Web3 from 'web3'
import dotenv from 'dotenv'
import co from 'co'
import fs from 'fs'
import Rx from 'rx'
dotenv.config({ path: '../.env' })
let web3 = new Web3()
let provider = new web3.providers.HttpProvider(process.env.DEV_RPC)
web3.setProvider(provider)
//
let promiseFs = function(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if(err) { reject(err) }
      resolve(data)
    })
  })
}
let genDeploy = function({ byteCode, ABI }, cb) {
  let target = web3.eth.contract(ABI)
  let deployed = target.new(['Proposal A','Proposal B'],{
    data: byteCode,
    from: web3.eth.accounts[0],
    gas: 100000
  }, cb)
}

let promiseDeploy = function({ byteCode, ABI }) {
  return new Promise((resolve, reject) => {
    let source = Rx.Observable.create((observer) => {
      let target = web3.eth.contract(ABI)
      let deployed = target.new({
	data: byteCode,
	from: web3.eth.accounts[0],
	gas: 1000000
      }, (err, data) => {
	if(!err) {
	  if(!data.address) {
	    observer.onNext(data.transactionHash)
	  } else {
	    observer.onNext(data.address)
	    observer.onCompleted()
	  }
	} else {
          console.log(err)
        }
      })
    })
    let output = []
    let sub = source.subscribe(
      (data) => {
	output.push(data)
      },
      (e) => console.log(e),
      () => {
        resolve(output)
      }
    )
  })
}
// Use our designated RPC server.
let compileContract = co.wrap(function* ({ path }) {
  let contractBuffer = yield promiseFs(path)
  let contractString = contractBuffer.toString('utf-8')
  // Compile the Contract
  let compiled = yield web3.eth.compile.solidity(contractString)
  return compiled
})
let deployContract = co.wrap(function* ({ name, path }) {
  let compiled = yield compileContract({ path })
  // We now have the compiled version.
  let byteCode = compiled[name].code
  let ABI = compiled[name].info.abiDefinition
  let contractInfo = yield promiseDeploy({ byteCode, ABI })
  // Lets include the ABI for reference.
  contractInfo.push(ABI)
  return contractInfo
})
let mockContract = co.wrap(function* ({ name, path}) {
  let contractInfo = yield deployContract({ name, path })
  // Load the contract.
  let contractInstance = web3.eth.contract(contractInfo[2]).at(contractInfo[1])
  return contractInstance 
})
export default {
  compileContract,
  deployContract,
  mockContract
}
