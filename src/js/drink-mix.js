
  
  /*-- Form Button Listener to order a drink--*/
  
  const mix = document.querySelector(".submitBtn");
  if (mix) {
  mix.addEventListener("click", createMix);}
  
  function createMix() {
    
     
    let mixCard = document.createElement("div");
  
    let title = document.createElement("h4");
    let name = document.createElement("p");
    let email = document.createElement("p");
    let phone = document.createElement("p");
  
    nameInput = document.querySelector("#name").value;
    emailInput = document.querySelector("#email").value;
    phoneInput = document.querySelector("#phone").value;
    
    
    title.textContent = "Here is your masterpiece:";
    name.textContent = `Name: ${nameInput}`;
    email.textContent = `Email: ${emailInput}`;
    phone.textContent = `Phone: ${phoneInput}`;
  

  
    
  
    document.querySelector(".displayMix").appendChild(mixCard);
    
    fruitCard();
    numberofDrinks();
  };
  
  function fruitCard() {
    
    let Carbs = 0;
    let Protein = 0;
    let Fat = 0;
    let Sugar = 0;
    let Calories = 0;
    
    
      for (let i = 1; i < 4; i++) {
      console.log(document.querySelector(`#fruit${i}`).value);
  
      let fruitKey = parseInt(document.querySelector(`#fruit${i}`).value);
      let array = data[fruitKey];
  
      console.log(array);
      
      arrayCarbs = array.nutritions.carbohydrates;
      Carbs += arrayCarbs;
      arrayProtein = array.nutritions.protein;
      Protein += arrayProtein;
      arrayFat = array.nutritions.fat;
      Fat += arrayFat;
      arraySugar = array.nutritions.sugar;
      Sugar += arraySugar;
      arrayCalories = array.nutritions.calories;
      Calories += arrayCalories;
      
      // let arrayNames = [];
      // arrayNames = appendChild(array.name);
      
      // console.log(`test ${arrayNames}`);
    }
  
      /* get the names of each fruit selected */
      let fruitNameKey1 = parseInt(document.querySelector(`#fruit1`).value);
      let fruitNameKey2 = parseInt(document.querySelector(`#fruit2`).value);
      let fruitNameKey3 = parseInt(document.querySelector(`#fruit3`).value);
      let fruitName1 = data[fruitNameKey1].name;
      let fruitName2 = data[fruitNameKey2].name;
      let fruitName3 = data[fruitNameKey3].name;
  
      // let test2 = arrayNames[1];
      // console.log(test2);
  
      /* create fruit card with nutrition info */
      let mixInfo = document.createElement('section');
      let fruitsNames = document.createElement("h4");
      let fruitsCarbs = document.createElement("p");
      let fruitsProtein = document.createElement("p");
      let fruitsFat = document.createElement("p");
      let fruitsSugar = document.createElement("p");
      let fruitsCalories = document.createElement("p");
  
      fruitsNames.innerHTML = `Your choice of fruits:<br /> <em>${fruitName1},  ${fruitName2},  ${fruitName3}<em>`;
      fruitsCarbs.textContent = `Carbs: ${Carbs.toFixed(2)}`;
      fruitsProtein.textContent = `Protein: ${Protein.toFixed(2)}`;
      fruitsFat.textContent = `Fat: ${Fat.toFixed(2)}`;
      fruitsSugar.textContent = `Sugar: ${Sugar.toFixed(2)}`;
      fruitsCalories.textContent = `Calories: ${Calories.toFixed(0)}`;
  
      mixInfo.appendChild(fruitsNames)
      mixInfo.appendChild(fruitsCarbs);
      mixInfo.appendChild(fruitsProtein);
      mixInfo.appendChild(fruitsFat);
      mixInfo.appendChild(fruitsSugar);
      mixInfo.appendChild(fruitsCalories);
  
      document.querySelector(".mixNutInfo").appendChild(mixInfo);
      
      
      /*JS for date */
  
      document.querySelector(".date").textContent = new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(new Date());
  };
  
  
  function numberofDrinks() {
    let numberDrinks = parseInt(localStorage.getItem('numberOrders')) + 1;
    if (!numberDrinks) {
      numberDrinks = 1; 
      } else {
      numberDrinks = 0;}
    localStorage.setItem('numberOrders', numberDrinks);
  
    console.log (numberDrinks);
   
    document.getElementById('numberSpecDrinks').textContent = numberDrinks;
  
  };
  
  
  const drinks = document.querySelector('#numberSpecDrinks');
    if (drinks) {
     drinks.textContent = localStorage.getItem('numberOrders');
    };
  