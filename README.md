# backend

## Dependencies
	  * Bcryptjs
      	npm i bcryptjs
		* CORS
		  	npm i cors
    * DOTENV
		  	npm i dotenv
    * Express
		  	npm i express
    * Express-session
		  	npm i express-session
    * JSONWEBTOKEN
		  	npm i jsonwebtoken
    * JWT-DECODE
		  	npm i jwt-decode
    * Knex
				npm i knex
		* Connect-session-knex
				npm i connect-session-knex
    * Postgres
		  	brew install postgres

## Development Dependencies
		* Cross-env
				npm i cross-env
		* Nodemon
			  npm i nodemon
		* ESLint
				npm i eslint
		* Jest
				npm i jest
		* @types/jest
				npm i @types/jest
		* Morgan
				npm i morgan
		* Helmet
				npm i helmet

## Heroku CLI Commands
* heroku login 
* heroku apps:create 
* heroku addons:create 
* heroku logs --tail -a secret-recipes-4 
* heroku run --app secret-recipes-4

## Endpoints (Development)
	http://localhost:3000/api/
  	http://localhost:5500/api/auth/register
  	http://localhost:5500/api/auth/login
  	http://localhost:5500/api/auth/logout  ** pending
  	http://localhost:5500/api/recipes      ** pending

## Endpoints (Production) // Heroku
	https://secret-recipes-4.herokuapp.com/api/auth/register
	https://secret-recipes-4.herokuapp.com/api/auth/login
	https://secret-recipes-4.herokuapp.com/api/auth/logout
	https://secret-recipes-4.herokuapp.com/api/recipes/
	https://secret-recipes-4.herokuapp.com/api/recipes/{recipe_id} ** for specific recipe

## CRUD Operations

### Registration: 
* [POST] /api/auth/register

### Login: 
* [POST] /api/auth/login

### Logout: 
* [GET] /api/auth/logout      

### Recipes: 
* [GET] /api/recipes       

### Single Recipe: 
* [GET] /api/recipes/:id       

### Create Recipe: 
* [POST] /api/recipes       

### Update Recipe: 
* [PUT] /api/recipes/:id       

### Delete Recipe: 
* [DELETE] /api/recipes/:id       

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