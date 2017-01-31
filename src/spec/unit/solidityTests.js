/*
  @name spec/solidityTests.js
*/
import pipeline from '../../index'
import { expect , assert } from 'chai'
import path from 'path'
describe('#Core Tests', function () {
  describe('#compileContract', function () {
    it('should compile the contract and give us the byte code and ABI.', function(done) {
      let fixturePath = path.join(__dirname, '../fixtures/one.sol')
      pipeline.compileContract({ path: fixturePath }).then(function(res) {
        let expected = {
          swap: {
            code: '6060604052346000575b60358060166000396000f30060606040525b60005600a165627a7a72305820518d776ef43db6c47c3533fac371af0fefc8629c06c7ebd5cb8e76d6465f276f0029',
            info: {
              abiDefinition: []
            }
          } 
        }
        assert(res.swap.code,expected.swap.code)
        done()
      })
    })
  })
  describe('#deployContract', function () {
    it('should deploy the contract and give us the hash and address', function(done) {
      let fixturePath = path.join(__dirname, '../fixtures/one.sol')
      pipeline.deployContract({ name: 'swap', path: fixturePath }).then(function(res) {
        console.log(res)
        done()
      })
    })
  })
})
