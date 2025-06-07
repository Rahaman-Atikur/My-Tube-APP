const loadData= async()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res)=>res.json())
    .then((data)=>displayCategory(data.categories));
}
const  loadVideos= async ()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((response)=>response.json())
    .then((data)=>console.log(data));
}



function displayCategory(categories){
    console.log(categories);
    for(let cat of categories){
        console.log(cat);
        const categoryContainer = document.getElementById('category-container');
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML=`
         <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.appendChild(categoryDiv);
    }
}

loadData();
loadVideos();