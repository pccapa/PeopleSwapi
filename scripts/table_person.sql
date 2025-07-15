CREATE TABLE persons (
    personId int NOT NULL AUTO_INCREMENT,
    name varchar(100),
    hair_color varchar(100),
    skin_color varchar(100),
    eye_color varchar(100),
    birth_year varchar(100),
    gender varchar(100),
    homeworld varchar(100),
    fan_image_url varchar(100),
    creation_date datetime,
    PRIMARY KEY (personId)
);