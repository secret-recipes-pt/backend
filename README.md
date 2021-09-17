# backend

## Dependencies

## Development Dependencies

## Heroku CLI Commands
* heroku login 
* heroku apps:create 
* heroku addons:create 
* heroku logs --tail -a <app_name> 
* heroku run --app <app_name>

## Endpoints (Development)
	  http://localhost:3000/api/
  	http://localhost:5500/api/auth/register
  	http://localhost:5500/api/auth/login
  	http://localhost:5500/api/auth/logout  ** pending
  	http://localhost:5500/api/recipes      ** pending

## Endpoints (Production) // Heroku
* pending 

## CRUD Operations

### Registration: 
[POST]: /api/auth/register

### Login: 
[POST]: /api/auth/login

### Logout: 
[GET]: /api/auth/logout      
* pending

### Recipes: 
[GET]: /api/recipes

### Single Recipe: 
[GET]: /api/recipes/:id
* pending

### Create Recipe: 
[POST]: /api/recipes
* pending

### Update Recipe: 
[PUT]: /api/recipes/:id
* pending

### Delete Recipe: 
[DELETE] /api/recipes/:id
* pending

## Data Table Structures

### User Object  
  `{ 
    user_id: integer, 
    username: string,  ** required, must be unique
    password: string   ** required
	}`

### Recipe Object
  `{ 
    recipe_id: integer, 
    recipe_title: string,       ** required
    recipe_source: string,      ** required
    image: string,              ** not required, can use an image url
    user_id: integer,           ** this references the id in the users table 
    category_id: integer        ** this references the id in the categories table
	}`

### Category Object Array
`Categories = [ 
	{ category_id: 1, category_name: Breakfast and Brunch Recipes},
	{ category_id: 2, category_name: Appetizer/Snack Recipes },
	{ category_id: 3, category_name: Main Dish Recipes },	
	{ category_id: 4, category_name: Salad Recipes},
	{ category_id: 5, category_name: Dessert Recipes },
	{ category_id: 6, category_name: Healthy Recipes},
	{ category_id: 7, category_name: World Cuisine }
]`