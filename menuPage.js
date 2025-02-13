document.addEventListener("DOMContentLoaded", () => {
    let allMeals =[];

    async function fetchMeals() {
        try {
            const response = await fetch('meals.json');
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            allMeals = data.meals

            // console.log(allMeals);
            console.log("Meals: ", allMeals);
            
            displayRecipe(allMeals);
            displayGallery(allMeals)
            
        }catch (error){
            console.error(error);
        }
    }
    fetchMeals();

    


document.getElementById('search-input').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredMeals = allMeals.filter(meal => meal.strMeal.toLowerCase().includes(searchTerm));
    displayMealList(filteredMeals);
});


function displayMealList(meals) {
    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = ''; 
    // Display the search list and hide the meal details
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.textContent = meal.strMeal;
        mealDiv.addEventListener('click', function() {
            displayMealDetails(meal);
        });
        mealList.appendChild(mealDiv);
    });
}

// Display the details of the selected meal
function displayMealDetails(meal) {
    document.getElementById('meal-thumb').src = meal.strMealThumb;
    document.getElementById('meal-name').textContent = meal.strMeal;
    document.getElementById('meal-category').textContent = `Category: ${meal.strCategory}`;
    document.getElementById('meal-area').textContent = `Area: ${meal.strArea}`;
    document.getElementById('meal-instructions').textContent = `Instructions: ${meal.strInstructions}`;
    document.getElementById('meal-time').textContent = `Time: ${meal.strTime}`;
    document.getElementById('meal-calories').textContent = `Calories: ${meal.strCalories}`;
    
    // Hide the search list and show the meal details
    document.getElementById('meal-list').style.display = 'none';
    document.getElementById('meal-details').style.display = 'block';
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const foundMeal = mealsData.find(meal => meal.strMeal.toLowerCase() === searchTerm);
    
    if (foundMeal) {
        displayMealDetails(foundMeal);
    } else {
        alert('Meal not found!');
    }
});


    function displayGallery(data) {
        let galleryItemsContainer = document.getElementById("gallery-items");

        data.forEach(recept => {   
            let imgGallery = document.createElement("img");

            imgGallery.src = recept.strMealThumb;
            imgGallery.alt = recept.strMeal;
            imgGallery.className = "img-gallery"

            galleryItemsContainer.appendChild(imgGallery)
        })
    }

    function displayRecipe(data) { 
        const menuItemsContainer = document.getElementById("menu-items");

        data.forEach(recept => {
            console.log(recept);
            
            const menuItemElement = document.createElement("div");
            menuItemElement.classList.add("menu-item");

            menuItemElement.innerHTML = `
                <h2> ${recept.strMeal}</h2>
                <img src="${recept.strMealThumb}" alt="${recept.strMeal}">
                <p>Time: ${recept.strTime}</p>
                <p>Calories: ${recept.strCalories}</p>
               
                <p>Tags: ${recept.strTags}</p>
                <button class="btn-read-more">Read More</button>
            `
            const Button = menuItemElement.querySelector('.btn-read-more');
            Button.addEventListener('click',() =>{
            menuItemElement.classList.toggle('show-instructions');
            const prepElement = document.createElement("p");
            prepElement.textContent = `Preparation: ${recept.strInstructions}`
            menuItemElement.appendChild(prepElement);
               
            menuItemElement.removeChild(Button);
            
            
                
            })
            
            menuItemsContainer.appendChild(menuItemElement);

        })

    }

});
document.addEventListener('DOMContentLoaded', () => {
    const addRecipeButton = document.getElementById('add-recipe');
    const recipeList = document.getElementById('recipes');

    addRecipeButton.addEventListener('click', () => {
        const recipeName = document.getElementById('recipe-name').value;
        const recipeIngredients = document.getElementById('recipe-ingredients').value.split('\n');
        const recipeInstructions = document.getElementById('recipe-instructions').value;

        if (recipeName && recipeIngredients.length > 0 && recipeInstructions) {
            const recipeItem = document.createElement('li');
            recipeItem.innerHTML = `
                <h3>${recipeName}</h3>
                <p><strong>Ingredients:</strong></p>
                <ul>
                    ${recipeIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <p><strong>Instructions:</strong> ${recipeInstructions}</p>
            `;
            recipeList.appendChild(recipeItem);

            // Clear form fields
            document.getElementById('recipe-name').value = '';
            document.getElementById('recipe-ingredients').value = '';
            document.getElementById('recipe-instructions').value = '';
        } else {
            alert('Please fill in all fields');
        }
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const addRecipeButton = document.getElementById('add-recipe');
    const recipeList = document.getElementById('recipes');

    
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    savedRecipes.forEach(recipe => {
        const recipeItem = document.createElement('li');
        recipeItem.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong></p>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
        recipeList.appendChild(recipeItem);
    });

    addRecipeButton.addEventListener('click', () => {
        const recipeName = document.getElementById('recipe-name').value;
        const recipeIngredients = document.getElementById('recipe-ingredients').value.split('\n');
        const recipeInstructions = document.getElementById('recipe-instructions').value;

        if (recipeName && recipeIngredients.length > 0 && recipeInstructions) {
            const recipeItem = document.createElement('li');
            recipeItem.innerHTML = `
                <h3>${recipeName}</h3>
                <p><strong>Ingredients:</strong></p>
                <ul>
                    ${recipeIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <p><strong>Instructions:</strong> ${recipeInstructions}</p>
            `;
            recipeList.appendChild(recipeItem);

            
            savedRecipes.push({ name: recipeName, ingredients: recipeIngredients, instructions: recipeInstructions });
            localStorage.setItem('recipes', JSON.stringify(savedRecipes));

            
            document.getElementById('recipe-name').value = '';
            document.getElementById('recipe-ingredients').value = '';
            document.getElementById('recipe-instructions').value = '';
        } else {
            alert('Please fill in all fields');
        }
    });
});

