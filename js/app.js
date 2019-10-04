const drinkBtn = document.querySelector('.drink-btn');
const container = document.querySelector('#drink');

drinkBtn.addEventListener('click', () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(response => createDrink(response.drinks[0]))
    .catch(err => {
      alert(err);
    });
});

function createDrink(drink) {
  //console.log(drink);
  let ingredients = [];

  //get all ingredients from object
  for (let i = 1; i <= 20; i++) {
    if (drink[`strIngredient${i}`]) {
      ingredients.push(
        `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`
      );
    } else {
      // if no more ingredients, stop.
      break;
    }
  }
  //console.log(ingredients);

  //Clear old html
  container.innerHTML = '';

  const output = `
  
    <div class="drink-container">
        <img
            src="${drink.strDrinkThumb}"
            alt="drink-img"
            class="drink-img"
        />
        <p class="drink-name"><strong>Cocktail Name:</strong> ${
          drink.strDrink
        }</p>
        <div class="drink-types">
            <p class="drink-category">
            <strong>Category:</strong
            ><span class="drink-span">${drink.strCategory}</span>
            </p>
            <p class="drink-alcoholic">
            <strong>Alcoholic:</strong>
            <span class="drink-span">${drink.strAlcoholic}</span>
            </p>
            <p class="drink-glass">
            <strong>Glass:</strong
            ><span class="drink-span">${drink.strGlass}</span>
            </p>
        </div>
        <div class="drink-instruction">
            <h4>Instructions</h4>
            <p>${drink.strInstructions}</p>
        </div>
        <h4 class="ingredient-heading">Ingredients</h4>
        <ul class="ingredients-collection">
            ${ingredients
              .map(
                ingredient => `<li class="ingredient-item">${ingredient}</li>`
              )
              .join('')}
            <li class="ingredient-item"></li>
        </ul>
    </div>
  `;

  container.innerHTML = output;
}
