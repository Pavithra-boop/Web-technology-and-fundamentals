async function searchRecipes() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Loading...';

  if (!query) {
    resultsDiv.innerHTML = 'Please enter a search term.';
    return;
  }

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    
    resultsDiv.innerHTML = '';

    if (!data.meals) {
      resultsDiv.innerHTML = 'No recipes found.';
      return;
    }

    data.meals.forEach(meal => {
      const recipeDiv = document.createElement('div');
      recipeDiv.className = 'recipe';
      recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <a href="${meal.strSource || meal.strYoutube}" target="_blank">View Recipe</a>
      `;
      resultsDiv.appendChild(recipeDiv);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    resultsDiv.innerHTML = 'Something went wrong.';
  }
}
