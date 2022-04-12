export const priceParser = (number) => {
  let floatPart = (number - Math.trunc(number)).toFixed(2).toString().replace(".", ",").replace("0", "");
  let parsedNumber = Math.trunc(number).toString().split("").reverse().join("");
  let newNumber = "";
  let count = 0;
  for (var i = 0; i < parsedNumber.length; i++) {
    if (count === 3) {
      count = 0;
      newNumber = `${newNumber}.`;
    }
    newNumber = newNumber + parsedNumber[i];
    count++;
  }
  return newNumber.toString().split("").reverse().join("") + floatPart;
};
