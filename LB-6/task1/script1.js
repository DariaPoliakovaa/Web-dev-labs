let products = []
let editId = null


const calculateTotal = products =>
products.reduce((sum,p)=>sum + Number(p.price),0)

const filterProducts = (products,category)=>
category === "all"
? products
: products.filter(p=>p.category===category)

const sortByPrice = products =>
[...products].sort((a,b)=>a.price-b.price)

const sortByCreated = products =>
[...products].sort((a,b)=>a.createdAt-b.createdAt)

const sortByUpdated = products =>
[...products].sort((a,b)=>a.updatedAt-b.updatedAt)



const container = document.getElementById("productsContainer")
const emptyMessage = document.getElementById("emptyMessage")

const renderProducts = list => {

container.innerHTML=""

if(list.length===0){
emptyMessage.style.display="block"
}else{
emptyMessage.style.display="none"
}

list.forEach(product => {

const card = document.createElement("div")
card.className="card"

card.innerHTML = `
<img src="${product.image}" alt="${product.name}">

<div class="card-content">

<h3>${product.name}</h3>

<p>ID: ${product.id}</p>

<p>Категорія: ${product.category}</p>

<p class="price">${product.price} ₴</p>

<div class="card-buttons">

<button class="edit-btn" onclick="editProduct(${product.id})">
Редагувати
</button>

<button class="delete-btn" onclick="deleteProduct(${product.id})">
Видалити
</button>

</div>

</div>
`
container.appendChild(card)

})

updateTotal()
}



const updateTotal = () => {

const total = calculateTotal(products)

document.getElementById("totalPrice")
.innerText = "Загальна вартість: " + total + " ₴"
}



const showToast = message =>{

const toast = document.getElementById("toast")

toast.innerText = message
toast.classList.add("show")

setTimeout(()=>{
toast.classList.remove("show")
},3000)

}



document.getElementById("productForm")
.addEventListener("submit", e=>{

e.preventDefault()

const name = document.getElementById("name").value
const price = document.getElementById("price").value
const category = document.getElementById("category").value
const image = document.getElementById("image").value

if(editId){

products = products.map(p =>
p.id===editId
? {...p,name,price,category,image,updatedAt:Date.now()}
: p
)

showToast(`Оновлено товар ${editId} ${name}`)

editId=null

}else{

const product={
id:Date.now(),
name,
price,
category,
image,
createdAt:Date.now(),
updatedAt:Date.now()
}

products=[...products,product]

}

renderProducts(products)

closeModal()

})



const deleteProduct = id =>{

products = products.filter(p=>p.id!==id)

renderProducts(products)

showToast("Товар видалено")

}




const editProduct = id =>{

const product = products.find(p=>p.id===id)

editId=id

document.getElementById("name").value=product.name
document.getElementById("price").value=product.price
document.getElementById("category").value=product.category
document.getElementById("image").value=product.image

openModal()

}




const modal = document.getElementById("modal")

const openModal = ()=> modal.style.display="block"

const closeModal = ()=> modal.style.display="none"

document.getElementById("addProductBtn")
.addEventListener("click",openModal)

document.getElementById("closeModal")
.addEventListener("click",closeModal)




document.querySelectorAll("#filters button")
.forEach(btn =>{

btn.addEventListener("click",()=>{

const category = btn.dataset.category

renderProducts(filterProducts(products,category))

})

})




document.getElementById("sortPrice")
.onclick = ()=> renderProducts(sortByPrice(products))

document.getElementById("sortCreated")
.onclick = ()=> renderProducts(sortByCreated(products))

document.getElementById("sortUpdated")
.onclick = ()=> renderProducts(sortByUpdated(products))

document.getElementById("resetSort")
.onclick = ()=> renderProducts(products)


