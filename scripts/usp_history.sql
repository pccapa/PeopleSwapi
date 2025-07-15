 CREATE PROCEDURE  usp_history(IN page int, IN items_per_page int)
 BEGIN	 
	 declare var_offset int ;
     set var_offset = (items_per_page ) *  (page-1);
 	
   Select personId,name, hair_color, skin_color,eye_color ,birth_year,gender,homeworld ,fan_image_url ,creation_date 
 	from persons order by  personId limit items_per_page offset var_offset ;
 END;