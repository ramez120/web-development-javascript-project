var products;
var ind;
if(localStorage.getItem("products") ==null)
    {
       products = [];  
    }
else{
    products =JSON.parse(localStorage.getItem("products"));
    displayProducts();
}
document.getElementById("addbtn").onclick=function()
{
    addProduct();
    
    displayProducts();
    clear();
}
function addProduct()
{
   
    var pname=document.getElementById("pName").value;
    var pprice=document.getElementById("pPrice").value;
    var pcompany=document.getElementById("pCompany").value;
    var pdesc=document.getElementById("pDesc").value;
   
    var product={name:pname,price:pprice,company:pcompany,desc:pdesc};
    if(!(pname=="" && pprice=="" &&pcompany=="" &&pdesc==""))
        {
            if(document.getElementById("addbtn").innerHTML=="Add Product")
         products.push(product);
            else{
                products[ind].name=pname;
                products[ind].price=pprice;
                products[ind].companye=pcompany;
                products[ind].desc=pdesc;
                document.getElementById("addbtn").innerHTML="Add Product";
                document.getElementById("delete").classList.remove("up");
                clear();
                displayProducts();
            }
                
     localStorage.setItem("products",JSON.stringify(products));
        }
    
    
}
function clear()
{
   document.getElementById("pName").value=""; 
    document.getElementById("pPrice").value="";
    document.getElementById("pCompany").value="";
    document.getElementById("pDesc").value="";
}
function displayProducts()
{
    var tempProducts="";
    for(var i=0;i<products.length;i++)
        {
           tempProducts+='<tr><td>'+(i+1)+'</td><td>'+products[i].name+'</td><td>'+products[i].price+'</td><td>'+products[i].company+'</td>'+
               '<td>'+products[i].desc+'</td><td><button onclick="deleted('+i+')" class="btn btn-primary" >delete</button>'+'<td><button onclick="update('+i+')" class="btn btn-primary" >update</button>';
        }
    document.getElementById("grid").innerHTML=tempProducts;
}
function deleted(id)
{
    products.splice(id,1);
    localStorage.setItem("products",JSON.stringify(products));
    displayProducts();
}
document.getElementById("delete").onclick=function()
{
    products.pop();
    localStorage.setItem("products",JSON.stringify(products));
    displayProducts();
}
document.getElementById("search").onkeyup=function()
{
    search(document.getElementById("search").value);
}
function search(item)
{
    var count =0;
   if(item !=""){
    var searchResult='<table class="table text-center"><tbody class="text-center"><tr><thead class="text-primary text-center"><th>id</th><th>name</th><th>price</th><th>company</th><th>description</th></thead>"<tbody>';
    for (var i=0;i<products.length;i++)
        {
            if(products[i].name.includes(item))
                {
                    count++;
                    searchResult +='<tr><td>'+i+'</td><td>'+products[i].name+'</td><td>'+products[i].price+'</td><td>'+products[i].company+'</td><td>'+products[i].desc+'</td></tr>';
                }
        }
   if(count ==0) document.getElementById("searchItems").innerHTML="";
           else {document.getElementById("searchItems").innerHTML=searchResult+"</tbody></table>";
                }
    
         }
       else{
           document.getElementById("searchItems").innerHTML="";
       }
 
}
function update(index)
{
    document.getElementById("pName").value=products[index].name;
    document.getElementById("pPrice").value=products[index].price;
    document.getElementById("pCompany").value=products[index].company;
    document.getElementById("pDesc").value=products[index].desc;
    document.getElementById("addbtn").innerHTML="update";
    document.getElementById("delete").classList.add("up");
    ind = index;
    
}