import crypto from "node:crypto";
import wordlist from "../words/index.mjs";

const FACTOR_BYTES_PER_ENTROPY_LENGTH = 32;
const BIT_PER_HEX_CHAR = 4;

const normalizeEntropy = (rawEntropy) => {
  if (rawEntropy.length < 128) {
    return rawEntropy.padStart(128, "0");
  }

  if (rawEntropy.length >= 256) {
    return rawEntropy.slice(0, 256);
  }

  return rawEntropy.slice(0, 128);
}

const hashHex = (hex) => crypto.createHash("sha256").update(Buffer.from(hex, 'hex')).digest("hex")

const hashBinaryEntropy = (entropy) => {
  const maxLengthHexEntropy = Math.ceil(entropy.length / BIT_PER_HEX_CHAR);
  const hexEntropy = BigInt(`0b${entropy}`).toString(16).padStart(maxLengthHexEntropy, "0")
  return hashHex(hexEntropy)
}

const transformHexToBin = (hex) => parseInt(hex, 16).toString(2)

const createChecksum = (entropy) => {
  const size = entropy.length / FACTOR_BYTES_PER_ENTROPY_LENGTH;
  const hash = hashBinaryEntropy(entropy);
  const checksum = [...Array(size/BIT_PER_HEX_CHAR)]
    .map((_, i) => {
      const bits = transformHexToBin(hash.slice(i, i+1)).padStart(BIT_PER_HEX_CHAR, "0")
      return bits
    })
    .join("")
  
  return checksum;
}

const main = (rawEntropy) => {
  const entropy = normalizeEntropy(rawEntropy);
  const checksum = createChecksum(entropy);
  const key = entropy + checksum
  const chunks = key.match(/\d{1,11}/g) || [];
  const mnemonic = chunks
    .map(chunk => parseInt(chunk, 2))
    .map(chunk => wordlist[chunk])
    .join(" ")

  return mnemonic
}

export default main