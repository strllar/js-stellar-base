import * as StellarBase from "../src"
var util = require('util');

let buf = new Buffer(process.argv[2], "base64")
console.log(buf)

try {
	let err = StellarBase.xdr.TransactionResult.fromXDR(buf)
	console.log("TransactionResult")
	console.log(util.inspect(err, false, null))
}
catch(e) {
}

try {
	let err = StellarBase.xdr.TransactionResultPair.fromXDR(buf)
		console.log("TransactionResultPair")
	console.log(util.inspect(err, false, null))
}
catch(e) {
}

