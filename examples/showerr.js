import * as StellarBase from "../src"
var util = require('util');

let buf = new Buffer(process.argv[2], "base64")
console.log(buf)
let err = StellarBase.xdr.TransactionResult.fromXDR(buf)
console.log(util.inspect(err, false, null))
