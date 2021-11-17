###  web application API in index.js at the route of the project

In the mobile game Fire Emblem Heroes(FEH) players can summon and use different 
characters called heroes, each has its personnal characteristics(name, title,
statistics,...) and that's what I wanted to recreate (see feh_heroes_class.js).
An heroes in this Api has 6 variables :
- name: String,
- title: String,
- ultAtk: Number,
- stats: {
    - hp: Number,
    - atk: Number,
    - spd: Number,
    - def: Number,
    - res: Number
},
- isLegend: Boolean,
- isMythic: Boolean,


