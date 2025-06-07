function loadData() {
  // Fetch Data from API
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // Convert Response to json
    .then((res) => res.json())
    // Send data to display category
    .then((data) => displayCategory(data.categories));
}

// {
//     "category_id": "1001",
//     "category": "Music"
// }
function displayCategory(categories) {
  // Get the Container
  const categoryContainer = document.getElementById("category-container");
  // As We got array of Object then we Operate Loop
  for (let cat of categories) {
    console.log(cat);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.append(categoryDiv);

  }
  
}
loadData();
