document.addEventListener("DOMContentLoaded", () => {
    const recipeForm = document.getElementById("addRecipeForm");
    const recipesList = document.getElementById("recipes");
    const recipeIdField = document.getElementById("recipeId");

    // Fetch and display all recipes
    const fetchRecipes = async () => {
        const response = await fetch('/api/recipes');
        const data = await response.json();

        if (data.success) {
            recipesList.innerHTML = "";
            data.recipes.forEach(recipe => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <img src="${recipe.image || 'https://via.placeholder.com/150'}" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <p>Category: ${recipe.category}</p>
                    <p>Ratings: ${recipe.ratings}</p>
                    <div class="buttons">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;
                recipesList.appendChild(card);

                // Attach event listeners to the buttons
                card.querySelector('.edit-btn').addEventListener('click', () => editRecipe(recipe));
                card.querySelector('.delete-btn').addEventListener('click', () => deleteRecipe(recipe._id));
            });
        }
    };

    // Add or update a recipe
    recipeForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = recipeIdField.value;
        const title = document.getElementById("title").value;
        const category = document.getElementById("category").value;
        const ratings = document.getElementById("ratings").value;
        const image = document.getElementById("image").value;
        const quantity = document.getElementById("quantity").value;
        const direction = document.getElementById("direction").value;
        const ingridients = document.getElementById("ingridients").value;
        const time = document.getElementById("time").value;
        const shortinfo = document.getElementById("shortinfo").value;

        const recipeData = { title, category, ratings, image, quantity, direction, ingridients, time, shortinfo };

        if (id) {
            // Update existing recipe
            const response = await fetch(`/api/recipes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recipeData)
            });

            const data = await response.json();

            if (data.success) {
                fetchRecipes();
                recipeIdField.value = ""; // Clear the ID field for new entries
            }
        } else {
            // Add new recipe
            const response = await fetch("/api/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recipeData)
            });

            const data = await response.json();

            if (data.success) {
                fetchRecipes();
            }
        }

        recipeForm.reset(); // Clear the form after submission
    });

    // Delete a recipe
    const deleteRecipe = async (id) => {
        const response = await fetch(`/api/recipes/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (data.success) {
            fetchRecipes();
        }
    };

    // Edit a recipe
    const editRecipe = (recipe) => {
        document.getElementById("title").value = recipe.title;
        document.getElementById("category").value = recipe.category;
        document.getElementById("ratings").value = recipe.ratings;
        document.getElementById("image").value = recipe.image;
        document.getElementById("quantity").value = recipe.quantity;
        document.getElementById("direction").value = recipe.direction;
        document.getElementById("ingridients").value = recipe.ingridients;
        document.getElementById("time").value = recipe.time;
        document.getElementById("shortinfo").value = recipe.shortinfo;
        recipeIdField.value = recipe._id;
    };

    fetchRecipes();
});
