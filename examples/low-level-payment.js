import * as StellarBase from "../src"

StellarBase.Network.useDefault()

let master      = StellarBase.Keypair.master();
let destination = StellarBase.Keypair.fromAddress("NDRYJ5KQRVR3H5LSE7WXXRJ5UDXYHGO5MFC7KYFUCLQGJKKPTB6BD6CC");

let tx = new StellarBase.xdr.Transaction({
  sourceAccount: master.accountId(),
  fee:        30,
  seqNum:        StellarBase.xdr.SequenceNumber.fromString("1"),
  memo:  StellarBase.xdr.Memo.memoText("hello world"),
  ext:   new StellarBase.xdr.TransactionExt(0)
})

let payment = new StellarBase.xdr.PaymentOp({
  destination: destination.accountId(),
  asset:    StellarBase.xdr.Asset.assetTypeNative(),
	amount:      StellarBase.Hyper.fromString("99999999959999970")
})

let createacct = new StellarBase.xdr.CreateAccountOp({
	destination: destination.publicKey(),
	startingBalance: StellarBase.Hyper.fromString("20000000")
})

let op0 = new StellarBase.xdr.Operation({
	body: StellarBase.xdr.OperationBody.createAccount(createacct)
})

let op = new StellarBase.xdr.Operation({
  body: StellarBase.xdr.OperationBody.payment(payment)
})

let setop = new StellarBase.xdr.SetOptionsOp({
	masterWeight: 0	
})

let lastop = new StellarBase.xdr.Operation({
	body: StellarBase.xdr.OperationBody.setOption(setop)
})


tx.operations([op0, op, lastop]);


let tx_raw = Buffer.concat([StellarBase.Network.current().networkId(), StellarBase.xdr.EnvelopeType.envelopeTypeTx().toXDR(), tx.toXDR()])

let tx_hash    = StellarBase.hash(tx_raw);
let signatures = [master.signDecorated(tx_hash)];
let envelope = new StellarBase.xdr.TransactionEnvelope({tx, signatures});

console.log(envelope.toXDR("base64"));
