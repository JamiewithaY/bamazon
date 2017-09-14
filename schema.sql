 CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(30),
	department_name VARCHAR(30),
	price INT(10),
	stock_quanity INT(10),
	PRIMARY KEY(id)
)

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("pants", "clothing department", 15, 50);
 ("rice", "food department", 5, 50),
 ("coffee", "food department", 5, 50),
 ("shirt", "clothing department", 15, 50),
 ("dress", "clothing department", 15, 50),
 ("pudding", "food department", 5, 50),
 ("cats", "animal department", 500, 10),
 ("zebra", "animal department", 250, 10),
 ("monkey", "animal department", 1000, 10),
 ("oranges", "food department", 5, 50),