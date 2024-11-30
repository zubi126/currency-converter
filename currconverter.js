const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdowns select");

const  btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");









for(let select of dropdowns){

for(currCode in countryList){


let newOpt = document.createElement("option");

newOpt.innerText = currCode;
newOpt.value = currCode;


if(select.name === "from" && currCode === "USD"){

newOpt.selected="selected";
}else if (select.name === "to" && currCode === "INR"){

newOpt.selected="selected";
}

select.append(newOpt);



} 

select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });

}




const updateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};


    






const updateExchangeRate = async () =>{

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    
    if(amtVal === ""  || amtVal < 1 ){
    
        amtVal = 1;
        amount.value = "1";
    }
    
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch (URL)
    let data = await response.json();
    let rate = data [fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


    





window.addEventListener("load", () => {
    updateExchangeRate();
  });





  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });
