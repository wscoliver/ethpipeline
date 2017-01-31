# ethpipeline
Ethereum Contract Pipeline Library
## Version 1.0.0
## Dependencies
Ethpipeline can work with a running Geth node or a node mocked by **testrpc**. We recommend testrpc for development purposes so you dont use any real gas to deploy your contracts. Run testrpc before you run your tests with ethpipeline.
```bash
testrpc
```
## Building from source
Clone this repository, and then using
```bash
grunt
```
will build from source and pack it into `dist` folder.
## Description
Ethpipeline provides three functions for finer grain control over your Ethereum contract deployment.
- compileContract: Compiles a contract file and returns contract and compiler information.
- deployContract: Compiles and deploys a contract on the blockchain with provider specified in .env.
- mockContract: Compiles, deploys and returns a contract instance on the blockchain with provider specified in .env.

## Usage
Please refer to unit and contract tests written under src/spec.

### compileContract
Compiles the solidity file found at `/path/to/contract.sol` and returns contract and compiler info.
```javascript
import pipeline

pipeline.compileContract('path/to/contract.sol').then(function(res) {
  // Do something with returned ABI here.
}).catch(function(err) {
  if(err) { console.log(err) }
})
```
#### Arguments
path **String**: full path to the location of your contract.
#### Returns
result **Object**:
```javascript
{
  "test": {
    "code": "0x605280600c6000396000f3006000357c010000000000000000000000000000000000000000000000000000000090048063c6888fa114602e57005b60376004356041565b8060005260206000f35b6000600782029050604d565b91905056",
    "info": {
      "source": "contract test {\n\tfunction multiply(uint a) returns(uint d) {\n\t\treturn a * 7;\n\t}\n}\n",
      "language": "Solidity",
      "languageVersion": "0",
      "compilerVersion": "0.8.2",
      "abiDefinition": [
        {
          "constant": false,
          "inputs": [
            {
              "name": "a",
              "type": "uint256"
            }
          ],
          "name": "multiply",
          "outputs": [
            {
              "name": "d",
              "type": "uint256"
            }
          ],
          "type": "function"
        }
      ],
      "userDoc": {
        "methods": {}
      },
      "developerDoc": {
        "methods": {}
      }
    }
  }
}
```
### deployContract
Compiles and deploys the solidity contract found at `/path/to/contract.sol` and deploys it on the blockchain, returning the transaction hash, contract address and contract ABI definition.
``` javascript
import pipeline

pipeline.deployContract({ name: 'swap', path: '/path/to/swap.sol'}).then(function(res) {
  // Returns the hash, address and abi information.
}).catch(function(err) {
  if(err) { console.log(err) }
})

```
#### Arguments
path **String**: full path to the location of your contract.
name **String**: name of your contract.
#### Returns
result **Array**: containing the transaction hash, contract address and contract abi definition.

### mockContract
Compiles, deploys and returns the contract instance so you can use it for testing immediately.
```javascript
import pipeline
 pipeline.mockContract({ name: 'swap', path: '/path/to/swap'}).then(function(contract) {
   mockContract = contract
 })
```
#### Arguments
path **String**: full path to the location of your contract.
name **String**: name of your contract.
#### Returns
contract **contractInstance** an instance of the Ethereum contract.


