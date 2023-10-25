const processTransactions = (transActions) => {
  const txr = []; // to make it block / not global scope
  // txr = []; has been already declared

  if (!validateTransactions(transActions)) {
    throw new Error("Undefined collection of transactions");
  }

  let txCount = {}; //to make it block scope, must me let becouse we reassign it later

  //const numberOfTransactions = transActions.length; /*  we don't need this for the forEach syntax */

  transActions.forEach((transaction) => {
    //implemented forEach to make if shorter
    txCount[transaction]
      ? (txCount[transaction] += 1)
      : (txCount[transaction] = 1);
  });

  txCount = sortByAmountThenName(txCount); // pass the object by reference

  // Place them back in array for returning
  Object.keys(txCount).forEach((key, index) => {
    txr[index] = `${key} ${txCount[key]}`;
  });
  return txr;
};
//changed to arrow function And changed variable sortedKeys to const
sortByAmountThenName = (txCount) => {
  const sortedKeys = Object.keys(txCount).sort(
    (itemOne, itemTwo) =>
      txCount[itemTwo] - txCount[itemOne] ||
      itemOne > itemTwo ||
      -(itemOne < itemTwo)
  );

  const sortedResults = {};
  sortedKeys.forEach((objectKey) => {
    sortedResults[objectKey] = txCount[objectKey];
  });
  return sortedResults;
};

validateTransactions = (transactions) => transactions !== undefined; //simplified the check

module.exports = processTransactions;
