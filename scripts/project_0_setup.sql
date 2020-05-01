create user project_0_api
with password 'K400499w';

create schema project_0;
create database project_0;

grant all privileges 
on database project_0
to project_0_api;

set search_path to project_0;

create table ingredients(
	id serial,
	name varchar(25) unique not null,
	unit varchar(25) not null,
	calories_per_unit int not null,
	carb_grams_per_unit  int not null,
	protien_grams_per_unit int not null,
	fat_grams_per_unit int not null,

	
	constraint ingredients_pk primary key (id)
	
);


insert into ingredients (name, unit, calories_per_unit, carb_grams_per_unit, protien_grams_per_unit, fat_grams_per_unit) values
	('flour tortilla', 'unit', 140, 23, 3, 4),
    ('chicken', 'oz', 30, 0, 6, 1),
    ('avocado', 'unit', 160, 8, 2, 14),
    ('lime', 'unit', 11, 4, 0, 0),
    ('cilantro', 'cup', 23, 4, 2, 1),
    ('white onion', 'unit', 64, 15, 2, 1),
    ('tilapia', 'unit', 100, 0, 20, 3),
    ('couscous', 'cup', 176, 36, 6, 0), 
    ('asparagus', 'unit', 20, 4, 2, 0),
    ('butter', 'tbsp', 70, 0, 0, 11),
    ('lemon juice', 'tbsp', 10, 0, 0, 0), 
    ('thyme', 'N/A', 0, 0, 0, 0),
    ('basil', 'N/A', 0, 0, 0, 0),
    ('rice', 'cup', 206, 70, 4, 0),
    ('yogurt', 'cup', 220, 9, 22, 11),
    ('curry spices', 'N/A', 0, 0, 0, 0),
    ('white bread', 'unit', 60, 13, 2, 1),
    ('peanut butter', 'tbsp', 105, 4, 4, 8),
    ('grape jelly', 'tbsp', 50, 13, 0, 0),
    ('beef', 'oz', 40, 1, 8, 2),
    ('corn tortilla', 'unit', 50, 10, 1, 1),
    ('potato', 'unit', 110, 26, 3, 0),
    ('gravy packet', 'unit', 25, 4, 0, 1),
    ('carrot', 'unit', 41, 10, 1, 0),
    ('shrimp', 'oz', 20, 1, 4, 1), 
    ('angel-hair pasta', 'cup', 210, 41, 7, 1),
    ('garlic', 'unit', 3, 1, 0, 0),
    ('cream', 'tbsp', 45, 0, 0, 5);
?

commit;

select * from ingredients