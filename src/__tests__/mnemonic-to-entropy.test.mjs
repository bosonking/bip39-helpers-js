import assert from "node:assert";
import { describe, it } from "node:test";

import mnemonicToEntropy from "../mnemonic-to-entropy/index.mjs";

describe("mnemonic to entropy", () => {

  it("should tranform the first bip39 word to binary entropy", () => {
    // Arrange
    const mnemonic = "abandon";

    // Act
    const entropy = mnemonicToEntropy(mnemonic);

    // Assert
    assert.equal(entropy, '00000000000', 'Wrong mnemonic to entropy conversion');
  });

  it("should tranform the last bip39 word to binary entropy", () => {
    // Arrange
    const mnemonic = "zoo";

    // Act
    const entropy = mnemonicToEntropy(mnemonic);

    // Assert
    assert.equal(entropy, '11111111111', 'Wrong mnemonic to entropy conversion');
  });
  
  it("should transform 'onion' to entropy", () => {
    // Arrange
    const mnemonic = "onion";
  
    // Act
    const entropy = mnemonicToEntropy(mnemonic);
  
    // Assert
    assert.equal(entropy, '10011010110', 'Wrong mnemonic to entropy conversion');

  });

  it("should transform multiple bip39 words to binary entropy", () => {
    // Arrange
    const mnemonic = "abandon onion zoo";
  
    // Act
    const entropy = mnemonicToEntropy(mnemonic);
  
    // Assert
    assert.equal(entropy, '000000000001001101011011111111111', 'Wrong mnemonic to entropy conversion');
  });
})
