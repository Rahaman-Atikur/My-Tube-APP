function removeActiveClass(){
  const buttonsWithActiveClass = document.getElementsByClassName("active");
  // console.log(buttonWithActiveClass);
  for(let btn of buttonsWithActiveClass){
    btn.classList.remove("active");
  }
}
function loadData() {
  // Fetch Data from API
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // Convert Response to json
    .then((res) => res.json())
    // Send data to display category
    .then((data) => displayCategory(data.categories));
}
function loadVideos(searchText ="") {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
       removeActiveClass();
      document.getElementById('btn-all').classList.add('active');
      displayVideos(data.videos);
    } );
}
const loadVideoDetails =(videoId)=>{
  // console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
  .then((res)=>res.json())
  .then((data)=>displayVideoDetails(data.video));
}
const displayVideoDetails=(video)=>{
  console.log(video);
  document.getElementById("video_details").showModal();
 const detailsContainer= document.getElementById('details-container');
 detailsContainer.innerHTML=`
 <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Play</button>
    </div>
  </div>
</div>
 `;
}
function loadCategoryVideos(id){
  // console.log(id);
  const url =`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  // console.log(url);
  fetch(url)
  .then((res)=>res.json())
  .then((data)=>{
    const clickedButton = document.getElementById(`${id}`);
    // console.log(clickedButton);
    removeActiveClass();
    clickedButton.classList.add("active");
    displayVideos(data.category)
  }); 
}
function displayCategory(categories) {
  // Get the Container
  const categoryContainer = document.getElementById("category-container");
  // As We got array of Object then we Operate Loop
  for (let cat of categories) {
    // console.log(cat);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.append(categoryDiv);
  }
}
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML="";
  if(videos.length==0){
    videoContainer.innerHTML=`
    <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
    <img class="w-[120px]" src="assests/Icon.png" alt="">
    <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
</div>`;
return;
  }
  videos.forEach((video) => {
    //  console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML=`
    <div class="card bg-base-100  shadow-sm">
  <figure class="relative">
    <img class="w-full h-[150px] object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      <span class="absolute bottom-2 right-2 text-sm text-white bg-black px-2 rounded">3hrs 56 min ago</span>
  </figure>
  <div class=" flex gap-3 px-0 py-5">
    <div class="profile">
        <div class="avatar">
  <div class="w-6 rounded-full">
    <img src="${video.authors[0].profile_picture}" />
  </div>
</div>
    </div>
    <div class="intro">
        <h2 class="text-sm font-semibold">${video.title}</h2>
        <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
        ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" >`:``}
            
        </p>
        <p class="text-sm text-gray-400 ">${video.others.views}</p>
    </div>
    
    </div>
     <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
  </div>
    `;
    videoContainer.append(videoCard);
  });
};
document.getElementById("search-input").addEventListener("keyup",(e)=>{
  const input=e.target.value;
  // console.log(input);
  loadVideos(input);
})


loadData();
loadVideos();

