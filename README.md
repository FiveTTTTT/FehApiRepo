#### web application API in index.js at the route of the project

 # FehAPI

In the mobile game Fire Emblem Heroes(FEH) players can summon and use different 
characters called heroes, each has its personnal characteristics(name, title,
statistics,...) and that's what I wanted to recreate (see feh_heroes_class.js).
An heroes in this Api has 6 variables :
- name: **String**
- title: **String**
- ultAtk: **Number**
- stats: 
    - hp: **Number**
    - atk: **Number**
    - spd: **Number**
    - def: **Number**
    - res: **Number**
- isLegend: **Boolean**
- isMythic: **Boolean**

This API is connected to the database mongodb with the use of a CRUD that allow 
the user to past request with Postman :
- **get** all the heroes from database  : localhost:3000/show-heroes
- **get** one the hero from database depending on the id : localhost:3000/show-heroes/:id
- **get** all the heroes with the same name past as an parameter from database : localhost:3000/show-heroes-named/:name
- **add** a new hero in the database : localhost:3000/post-heroes
- **delete** an hero from the database depending on the id : localhost:3000/delete-heroes/:id
- **edit** the variables of one hero(keep the old value if there's nothing)  : localhost:3000/edit-heroes/:id

In Postman for the Post and Put request we use Body > x-www-form-urlencoded to past the informations instead of just Params because Params correspond to the request parameters that are appended to the request URL. they are most used with GET requests, actually Body is more suited for request in general. Also there's a bit security using Body > x-www-form-urlencoded because the information used in the request aren't easely readable.


