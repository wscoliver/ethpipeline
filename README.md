# ethpipeline
Ethereum Contract Pipeline Library
## Version 1.0.0
## Building from source
Clone this repository, and then using
```bash
grunt
```
will build from source and pack it into `dist` folder.
## Description
Ethereum provides three functions for finer grain control over your Ethereum contract deployment.

### compileContract
```javascript
import pipeline

pipeline.compileContract('path/to/contract.sol').then(function(res) {
  // Do something with returned ABI here.
}).catch(function(err) {
  if(err) { console.log(err) }
})
```
#### Arguments
path String: full path to the location of your contract.
#### Returns
result Object:
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

