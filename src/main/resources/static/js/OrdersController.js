/* global axios */

var orders =[];
var order1= {
    "order_id": 1,
	"table_id": 1,
	"products": [{
			"product": "PIZZA",
			"quantity": 3,
			"price": "$15.000"
		},
		{
			"product": "HAMBURGER",
			"quantity": 1,
			"price": "$12.300"
		}
	]

};

orders = undefined;

function addOrder(){
	var datos = {10:{"orderAmountsMap":{"ARROZ CHINO":9,"RUGULA":6,"PIZZA":100},"tableNumber":10}};
        console.log(datos);
	axios.post('/orders', datos)
		.then(function(){                			
                        $("#change").append("<p id='tag"+10+"'>Order 10</p>");                                             
			$("#change").append("<table id='Order"+10+"' class='table table-dark'> <thead> <tr> <th scope='col'>Product</th> <th scope='col'>Quantity</th> </tr> </thead>");
			for(i in datos[10].orderAmountsMap){				
				$("#Order"+10).append("<tbody> <tr> <td>"+i+"</td> <td>"+datos[10].orderAmountsMap[i]+"</td> </tr> </tbody>");
			}
			
		})
		.catch(function(error){
			console.log(error);
			errorMessage();
		});
}

function removeOrderById(id){
	axios.delete('/orders/'+id)
		.then(function(){                        
                        document.getElementById("tag"+id).remove();
			document.getElementById("Order"+id).remove();
		})
		.catch(function(error){
			console.log(error);
			errorMessage();
		});
}

 function loadOrdersList(){
	orders = [];
	axios.get('/orders')
		.then(function(result){
			orders = result.data;
			$("#change").empty();
			for(i in orders){				
                                $("#change").append("<p id='tag"+i+"'>Order "+i+ "</p>");                                
				$("#change").append("<table id='Order"+i+"' class='table table-dark'> <thead> <tr> <th scope='col'>Product</th> <th scope='col'>Quantity</th> </tr> </thead>");
				for(j in orders[i].orderAmountsMap){					
					$("#change"+i).append("<tbody> <tr> <td>"+j+"</td> <td>"+orders[i].orderAmountsMap[j]+"</td> </tr> </tbody>");
				}
			}						
		})
		.catch(function(error){
                    console.log(orders);
			console.log(error);
			errorMessage();
		});
}


function errorMessage(){
	alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
}
