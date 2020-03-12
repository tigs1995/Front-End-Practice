function CountCalls(arr) {
  let inboundCalls = arr.inboundCallAssociates;
  let outboundCalls = arr.outboundCallAssociates;
  let citizenArray = [];
  let citizenSet = new Set();
  let numOfCalls = [];
  let output = [];

  for (let i = 0; i < inboundCalls.length; i++) {
    let citizen = inboundCalls[i].citizenID;
    citizenArray.push(inboundCalls[i].citizenID);
    citizenSet.add(inboundCalls[i].citizenID);
  }

  for (let i = 0; i < outboundCalls.length; i++) {
    citizenArray.push(inboundCalls[i].citizenID);
    citizenSet.add(inboundCalls[i].citizenID);
  }

  for (let i = 0; i < citizenSet.size; i++){
    numOfCalls.push(0);
  }

  let citizenArrayNew = Array.from(citizenSet);

  for (let n = 0; n < citizenArrayNew.length; n++) {
    for (let n = 0; n < citizenArray.length; n++) {
      if (citizenArray[n] === citizenArrayNew[n]) {
        numOfCalls[n]++;
      }
    }
  }

  for(let i = 0; i < citizenArrayNew.length; i++){
    output.push({"Citizen ID": citizenArrayNew[i], "Number Of Calls": numOfCalls[i]})
  }
  return output;
}

export default CountCalls;
