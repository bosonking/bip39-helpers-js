import wordlist from '../words/index.mjs';

const main = (mnemonic) => {
  const words = mnemonic.split(" ")
  
  return words
     .map(word => wordlist.findIndex((wl) => wl === word))
     .map(word => word.toString(2).padStart(11, "0"))
     .join("")
}

export default main;