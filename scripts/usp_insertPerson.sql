 CREATE PROCEDURE  usp_insertPerson(IN name varchar(100),IN hair_color varchar(100),IN skin_color varchar(100),IN eye_color varchar(100)
 ,IN birth_year varchar(100),IN gender varchar(100),IN homeworld varchar(100),IN fan_image_url varchar(100))
 BEGIN
 	insert into persons (name, hair_color, skin_color,eye_color ,birth_year,gender,homeworld ,fan_image_url ,creation_date ) 
 	values (  name, hair_color, skin_color,eye_color ,birth_year,gender,homeworld ,fan_image_url ,now() );
 END;