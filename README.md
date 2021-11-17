###  web application API in index.js at the route of the project  ###

In the mobile game Fire Emblem Heroes(FEH) players can summon and use different 
characters called heroes, each has its personnal characteristics(name, title,
statistics,...) and that's what I wanted to recreate (see feh_heroes_class.js).
An heroes in this Api has 6 variables :
- name: String
- title: String
- ultAtk: Number
- stats: 
    - hp: Number
    - atk: Number
    - spd: Number
    - def: Number
    - res: Number
- isLegend: Boolean
- isMythic: Boolean

This API is connected to the database mongodb with the use of a CRUD that allow 
the user to past request with Postman :
- get all the heroes from database
- get one the hero from database depending on the id
- get all the heroes with the same name past as an parameter from database
- add a new hero in the database
- delete an hero from the database depending on the id
- edit the variables of one hero(keep the old value if there's nothing) 


