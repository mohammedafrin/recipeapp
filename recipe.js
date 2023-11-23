const searchBox=document.getElementById('searchbox')
const searchButton=document.getElementById('searchbutton')
const recipeContainer=document.getElementById('recipe-container')
const recipeDetailsContent=document.getElementById('recipe-details-content')
const repiceclosebutton=document.getElementById('closebutton')
const fetchrecipes=async (query)=>{
    recipeContainer.innerHTML="<h2>fetching recipes</h2>";
const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
const response= await data.json();
recipeContainer.innerHTML="";
response.meals.forEach(meal=> {
    const recipediv=document.createElement('div');
    recipediv.classList.add("recipe");
    recipediv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> dish</p>
    <p>belongs to <span>${meal.strCategory}</span></p>
    `
    const button=document.createElement("button");
    button.textContent="view recipe";
    recipediv.appendChild(button);
    button.addEventListener('click',(e)=>{
        openrecipepopup(meal);
    })
    recipeContainer.appendChild(recipediv);
});
}
 searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchinput=searchBox.value.trim();
    fetchrecipes(searchinput);
 });
 const fetchin=(meal)=>{
    let Ingredientlist="";
    for(let i=1;i<=20;i++){
        const Ingredient=meal[`strIngredient${i}`];
        if(Ingredient){
            const measure=meal[`strMeasure${i}`];
            Ingredientlist+=`<li>${measure} ${Ingredient}</li>`
        }
        else{
            break;
        }
    }
    return Ingredientlist;
 }
 repiceclosebutton.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
 })
 const openrecipepopup=(meal)=>{
     recipeDetailsContent.innerHTML=`<h2 class="recipename">${meal.strMeal}</h2>
     <h3>Ingredients</h3>
     <u1 class="ingredientslist">${fetchin(meal)}</ul>
     <div>
     <h3>Instructions</h3>
     <p class="instructions">${meal.strInstructions}</p>
     </div>
     `

     
     recipeDetailsContent.parentElement.style.display="block";
 }
