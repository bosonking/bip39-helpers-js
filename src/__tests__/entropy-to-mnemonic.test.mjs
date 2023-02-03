import assert from "node:assert";
import { describe, it } from "node:test";

import entropyToMnemonic from "../entropy-to-mnemonic/index.mjs";

describe("entropy to mnemonic", () => {

  it("should tranform the binary entropy lower than 128 bits to mnemonic", () => {
    // Arrange
    const entropy = "0";

    // Act
    const mnemonic = entropyToMnemonic(entropy);

    // Assert
    assert.equal(mnemonic, 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', 'Wrong mnemonic to entropy conversion');
  });

  it("should tranform the binary entropy (128 bits) to mnemonic", () => {
    // Arrange
    const entropy = "00010010111111011110110111000101011101001000011110000000010000100000011110110111111111101011001101100011000000010001111110000110";

    // Act
    const mnemonic = entropyToMnemonic(entropy);

    // Assert
    assert.equal(mnemonic, 'base urge image trouble job canal burst zone recall blossom elevator assault', 'Wrong mnemonic to entropy conversion');
  });

  it("should tranform the binary entropy (129 bits) to mnemonic", () => {
    // Arrange
    const entropy = "000100101111110111101101110001010111010010000111100000000100001000000111101101111111111010110011011000110000000100011111100001100";

    // Act
    const mnemonic = entropyToMnemonic(entropy);

    // Assert
    assert.equal(mnemonic, 'base urge image trouble job canal burst zone recall blossom elevator assault', 'Wrong mnemonic to entropy conversion');
  });

  it("should tranform the binary entropy (256 bit) to mnemonic", () => {
    // Arrange
    const entropy = "0101101111101001100011010111001000011110111001001001110110110101100100101010011110011100111100111101111011110101010110110101111010000000110001100100100111001001001011110110110100100110010101001011011111101100001101110000110010000100000010010110100000001111";

    // Act
    const mnemonic = entropyToMnemonic(entropy);

    // Assert
    assert.equal(mnemonic, 'fossil erase frame differ endorse suspect enhance vicious video waste fine rug arrest ceiling caution unit chaos pizza wild host sign again parent thunder', 'Wrong mnemonic to entropy conversion');
  });

  it("should tranform the binary entropy greater than 256 bits to mnemonic", () => {
    // Arrange
    const entropy = "0101101111101001100011010111001000011110111001001001110110110101100100101010011110011100111100111101111011110101010110110101111010000000110001100100100111001001001011110110110100100110010101001011011111101100001101110000110010000100000010010110100000001111000";

    // Act
    const mnemonic = entropyToMnemonic(entropy);

    // Assert
    assert.equal(mnemonic, 'fossil erase frame differ endorse suspect enhance vicious video waste fine rug arrest ceiling caution unit chaos pizza wild host sign again parent thunder', 'Wrong mnemonic to entropy conversion');
  });
})
