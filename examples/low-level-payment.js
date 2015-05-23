import * as StellarBase from "../src"

let master      = StellarBase.Keypair.master();
let destination = StellarBase.Keypair.fromAddress("GCX7KKKALIPUGAKSFIXWENTN6IWAM36HYU36PZG3A4YSEJ63AY3BBAVH");

let tx = new StellarBase.xdr.Transaction({
  sourceAccount: master.accountId(),
  fee:        1000,
  seqNum:        StellarBase.xdr.SequenceNumber.fromString("1"),
  memo:  StellarBase.xdr.Memo.memoNone(),
  ext:   new StellarBase.xdr.TransactionExt(0)
})

let payment = new StellarBase.xdr.PaymentOp({
  destination: destination.accountId(),
  asset:    StellarBase.xdr.Asset.assetTypeNative(),
  amount:      StellarBase.Hyper.fromString("20000000000000000")
})

let createacct = new StellarBase.xdr.CreateAccountOp({
	destination: destination.publicKey(),
	startingBalance: StellarBase.Hyper.fromString("1000000000")
})

let op0 = new StellarBase.xdr.Operation({
	body: StellarBase.xdr.OperationBody.createAccount(createacct)
})

let op = new StellarBase.xdr.Operation({
  body: StellarBase.xdr.OperationBody.payment(payment)
})

tx.operations([op0, op]);

let tx_raw = Buffer.concat([StellarBase.xdr.EnvelopeType.envelopeTypeTx().toXDR(), tx.toXDR()])

let tx_hash    = StellarBase.hash(tx_raw);
let signatures = [master.signDecorated(tx_hash)];
let envelope = new StellarBase.xdr.TransactionEnvelope({tx, signatures});

console.log(envelope.toXDR("base64"));
