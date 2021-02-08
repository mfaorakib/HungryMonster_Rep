const button = document.getElementById("searchButton");
const remove = document.getElementById("mealsfood");
const popModal = document.getElementById("modal")



// food search

button.addEventListener('click', function () {
    const foodName = document.getElementById("mealName").value;

    let link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    fetch(link)
        .then(res => res.json())
        .then(data => DisplayFoodName(data))

    const DisplayFoodName = foods => {
        const mealsfoodDiv = document.getElementById("mealsfood");
        let foodsMeal = foods.meals;

        foodsMeal.forEach(foodsMeal => {
            const foodDiv = document.createElement('div');

            foodDiv.className = "field";

            const foodInfo = `
             <div onclick="foodDetails('${foodsMeal.idMeal}')">
             <img src=${foodsMeal.strMealThumb}>
             <h3 class='foodName'>${foodsMeal.strMeal}</h3>
             `
            //<button onclick = "foodDetails('${foodsMeal}')"> ShowDetails </button> 
            foodDiv.innerHTML = foodInfo;
            const foodNameDiv = document.createElement('div');
            // foodNameDiv.innerText=foodsMeal.strMeal;
            foodDiv.appendChild(foodNameDiv);
            mealsfoodDiv.appendChild(foodDiv);
        });
    }
});


// food details


const foodDetails = list => {

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${list}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            foodIngredients(data.meals[0]);

        });

    remove.style.display = "none";
    popModal.style.display = "block";
}

const foodIngredients = (food) => {
    const ingredients = [];
    for (let i = 1; i <= 10; i++) {
        if (food[`strIngredient${i}`]) {
            ingredients.push(`${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`);
        }
        else {
            break;
        }

    }
    const mealDiv = document.getElementById('Ingredients');
    mealDiv.innerHTML = `
        <img src="${food.strMealThumb}" alt="">
        <h4>${food.strMeal}</h4>
        
        <h5 class="heading"><i class="icon-fire icons"></i>Ingredients</h5>
        <ul class="">
        ${ingredients.map((ingredient) => `<li><i class="icon-check icons"></i>${ingredient}</li>`).join('')}
        </ul>`;
}






