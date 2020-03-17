function CountCalls(arr) {
  let inboundCalls = arr.inboundCallAssociates;
  let outboundCalls = arr.outboundCallAssociates;
  let citizenArray = [];
  let citizenSet = new Set();
  let forenamesSet = new Set();
  let surnameSet = new Set();
  let numOfCalls = [];
  let output = [];

  for (let i = 0; i < inboundCalls.length; i++) {
    citizenArray.push(inboundCalls[i].citizenID);
    citizenSet.add(inboundCalls[i].citizenID);
    forenamesSet.add(inboundCalls[i].forenames);
    surnameSet.add(inboundCalls[i].surname);
  }

  for (let i = 0; i < outboundCalls.length; i++) {
    citizenArray.push(outboundCalls[i].citizenID);
    citizenSet.add(outboundCalls[i].citizenID);
    forenamesSet.add(outboundCalls[i].forenames);
    surnameSet.add(outboundCalls[i].surname);
  }

  for (let i = 0; i < citizenSet.size; i++){
    numOfCalls.push(0);
  }

  let citizenArrayNew = Array.from(citizenSet);
  let forenamesArray = Array.from(forenamesSet);
  let surnameArray = Array.from(surnameSet);

  for (let n = 0; n < citizenArrayNew.length; n++) {
    for (let n = 0; n < citizenArray.length; n++) {
      if (citizenArray[n] === citizenArrayNew[n]) {
        numOfCalls[n]++;
      }
    }
  }

  for(let i = 0; i < citizenArrayNew.length; i++){
    output.push({"Citizen ID": citizenArrayNew[i], "Fornames": forenamesArray[i], "Surname": surnameArray[i], "Number Of Calls": numOfCalls[i]})
  }
  
  return output;
  
}

export default CountCalls;
