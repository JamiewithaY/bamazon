
//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//setting up link to the ol database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
//run the list of items we have available
  productList();
  
});


// list of items available in our database
function productList(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		for (var i = 0; i < res.length; i++){
			console.log("\nID: " + res[i].id + "|| Product: " + res[i].product_name);
		}
		runSearch();
	});
}


function runSearch( ){
	inquirer.prompt([
	{
		type: "input",
		name: "idNum",
		message: "Which ID would you like to purchase?"
	},
	{	type: "input",
		name: "quanity",
		message: "How many would you like to buy?"
	}
	]).then(function(response){
		//query- collect all the details on the id the user selects
		var query1 = "SELECT * FROM products WHERE ?";
		connection.query(query1, {id: response.idNum}, function(err, res){

		//check for errors
			if (err) throw err;
		//make sure the shopper picks a valid ID
			if (response.idNum === 0 || response.idNum > 9){
				console.log("Please select from one of the availabel ID's listed");
				productList();
			} 
		//checking to see if you have enough of selected ID in stock
		//if we do then the following 'if' will happen and calculate the final bill	
			else{
				var productData = res[0];
				// console.log('productData = ' + JSON.stringify(productData));

					if (productData.stock_quanity >= response.quanity){
						console.log(" We have what you want instock. YAY!");
						//saving the new quanity to update the database
						var purchaseQuanity = productData.stock_quanity - response.quanity;
							//updating the database
							connection.query("UPDATE products SET ? WHERE ?",
							[
								//stock_quanity will go into the first ?
								{
									stock_quanity : purchaseQuanity
								},
								// id will go into the second ? 
								{
									id : response.idNum
								}

							], function(err, res){
							//calculating final bill 		
							var cost = productData.price * response.quanity;

								console.log("\n Order Fullfilled! Total amount due is $" + cost + "\n");

								//ask if the customer wants to shop anymore before exiting the program
								buyMore();
							}
						);
					
					//if we do not have enough in stock, customer will be notified and can try again
					} else {
						console.log( "Sorry, we currently don't have enough of " + response.idNum + ". Please select another ID."),
						productList();
					};
			}

		});	
	});

}

	//ask user if they want to get anything else, if not, end the transaction
		function buyMore(){
			inquirer.prompt({
				name: "action",
				type: "list",
				message: "Would you like to make another purchase?\n",
				choices: ["yes", "no"]
			}).then(function(answer){
				switch(answer.action){
					case "yes":
						productList();
						break;
					case "no":
						connection.end();
						break;
					default:
						text = "error... please select yes or no";
					}
				});

			};



