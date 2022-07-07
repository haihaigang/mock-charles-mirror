// ref from https://github.com/theredhead/formatByteSize/blob/master/src/formatByteSize.ts

export const stripPointZeroZero = (
  num,
  unit
) => [num.toFixed(1).replace(/\.0$/, ""), unit].join("");


/**
 * Formats a given number of bytes in a human readable format
 */
export const formatByteSize = (
  numberOfBytes,
) => {
  const theOptions = {
    kilo: 1024,
    postProcessor: stripPointZeroZero
  }

  let theNumber = numberOfBytes;
  // just because all storage in some of these ranges doesn't exist
  // today, does not mean we cannot reason about them.
  const knownUnits = [
    "Geopbyte", // ...
    "B", // brontobyte
    "Y", // yottabyte
    "Z", // zettabyte
    "E", // exabytes
    "P", // petabytes
    "T", // terabytes
    "G", // gigabytes
    "M", // megabytes
    "K", // kilobytes
    "B", // bytes
  ].reverse();

  let index = 0;
  while (theNumber >= theOptions.kilo && index < knownUnits.length - 1) {
    theNumber = theNumber / theOptions.kilo;
    index++;
  }

  return theOptions.postProcessor(theNumber, knownUnits[index]);
};