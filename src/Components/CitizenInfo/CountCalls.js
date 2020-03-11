function CountCalls(arr) {
  let inboundCalls = arr.inboundCallAssociates;
  let outboundCalls = arr.outboundCallAssociates;
  let citizenArray = [];
  let citizenSet = new Set();
  let numOfCalls = new Set();

  for (let i = 0; i < inboundCalls.length; i++) {
    citizenArray.push(inboundCalls[i]);
    citizenSet.add(inboundCalls[i]);
  }
  for (let i = 0; i < outboundCalls.length; i++) {
    citizenArray.push(inboundCalls[i]);
    citizenSet.add(inboundCalls[i]);
  }

  for (let i = 0; i < citizenSet.length; i++){
    numOfCalls.add(0);
  }

  for (let i = 0; i < citizenSet.length; i++) {
    for (let n of citizenArray) {
      if (n == citizenSet[i]) {
        numOfCalls[i]++;
      }
    }
  }
}

export default CountCalls;
