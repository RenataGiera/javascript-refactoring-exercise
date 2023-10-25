function processTransactions(transActions) {
  let txr = []; // to make it block / not global scope
  // txr = []; has been already declared

  if (!validateTransactions(transActions)) {
    throw new Error("Undefined collection of transactions");
  }

  let txCount = {}; //to make it block scope, must me let becouse we reassign it later

  //const numberOfTransactions = transActions.length; /*  we don't need this for the forEach syntax */

  /*for (let i = 0; i < numberOfTransactions; i++) { 
    const transaction = transActions[i];
    txCount[transaction]
      ? (txCount[transaction] += 1)
      : (txCount[transaction] = 1);
  }*/
  transActions.forEach((transaction) => {
    //implemented forEach to make if shorter
    txCount[transaction]
      ? (txCount[transaction] += 1)
      : (txCount[transaction] = 1);
  });

  txCount = sortByAmountThenName(txCount); // pass the object by reference

  // Place them back in array for returning
  Object.keys(txCount).forEach( (key, index) => {
    txr[index] = `${key} ${txCount[key]}`;
  });
  return txr;
}

sortByAmountThenName(txCount) => {(
  let sortedKeys = Object.keys(txCount).sort(function sortingFunction(
    itemOne,
    itemTwo
  ) {
    return (
      txCount[itemTwo] - txCount[itemOne] ||
      itemOne > itemTwo ||
      -(itemOne < itemTwo)
    );
  });

  const sortedResults = {};
//   for (let objectKey of sortedKeys) {
//     sortedResults[objectKey] = txCount[objectKey];
//   }
     sortedKeys.forEach((objectKey)=>{
    sortedResults[objectKey] = txCount[objectKey];
});


 return sortedResults;
}

function validateTransactions(transactions) {
   return (transactions !== undefined) //simplified the check
}

module.exports = processTransactions;
