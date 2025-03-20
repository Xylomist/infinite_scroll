let apikey="PZwwo6riB-GBXQpzWe7RHAxKFuOLgfhU8Kj91l1KYyU"
let count=15;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
let images=[];
let imagecontainer=document.querySelector(".imgcontainer")
let loaderdiv=document.querySelector(".loading")
let loader=false
async function getphotos(){
try{
loaderdiv.style.display="none";
let result=await fetch(apiUrl);
let response=await result.json();
images=response;
loader=true;
displayonscreen(images);
    }
    catch(error){
    console.log(error.message)
    }
}
function displayonscreen(arr){
    let fragment=document.createDocumentFragment();
    arr.forEach((image) => {
    let img=document.createElement("img");
    let a=document.createElement("a");
    img.src=image.urls.regular;
    img.alt=image.urls.small;
    img.title=image.alt_description;    
    a.href=image.links.html;
    a.append(img);
    fragment.append(a);
       });
imagecontainer.append(fragment);
}
getphotos();
window.addEventListener("scroll",()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight && loader){
        getphotos();
    }
})