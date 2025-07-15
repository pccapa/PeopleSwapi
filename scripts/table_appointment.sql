CREATE TABLE appointment (
	appoitmentId int NOT NULL AUTO_INCREMENT,
	personId int NOT NULL,
	scheduled_date datetime,
	total_amount decimal(14,2),
	comment varchar(500),
	 PRIMARY KEY (appoitmentId )
);