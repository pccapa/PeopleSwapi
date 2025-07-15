 create PROCEDURE  usp_insertAppointment(IN personId int,IN scheduled_date datetime,IN total_amount decimal(14,2),IN comment varchar(500))
 BEGIN
 	insert into appointment  (personId,scheduled_date,total_amount,comment) 
 	values (  personId,scheduled_date,total_amount,comment );
 END;