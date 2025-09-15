const Base_Url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
let selects=document.querySelectorAll(".select-container select");
console.log(selects);
let fromImg=document.querySelector(".from img");
console.log(fromImg.src);
let fromValue=document.querySelector("#fromValue");
let toValue=document.querySelector("#toValue");
let btn=document.querySelector("#button");
let msg=document.querySelector(".result");

window.addEventListener("load",()=>{
    updateExchangeRate();
});
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

for(let select of selects){
    for(let currCode in countryList){
        let newOption=document.createElement("Option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        } else if (select.name==="To" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateMap(evt.target);
    })
}
const updateMap=(element)=>{
    let countryCode=countryList[element.value];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

const updateExchangeRate=async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal=amount.value;
    
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value=1;
    }
    

    const Url=`${Base_Url}/${fromValue.value.toLowerCase()}.json`;
    let response=await fetch(Url);
    let data = await response.json();
    
    let rate =data[fromValue.value.toLowerCase()][toValue.value.toLowerCase()];
    console.log(rate);
    let result=rate*amtVal;
    

    msg.innerText=`${amtVal} ${fromValue.value} = ${result} ${toValue.value}`;

}