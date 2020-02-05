const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealsEl = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');

// Fetch meals
function searchMeal(e) {
  e.preventDefault();
  let term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        resultHeading.innerHTML = `<h2>Search result for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>No search results for ${term} found. Try again!</h2>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(meal => {
              return `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealId="${meal.mealId}">
            <h3>${meal.strMeal}</h3>
            </div>
            </div>`;
            })
            .join('');
        }
      });

    search.value = '';
  } else {
    alert('Please enter a keyword to proceed.');
  }
}
// Event Listeners
submit.addEventListener('submit', searchMeal);
