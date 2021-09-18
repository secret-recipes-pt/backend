//Esdras worked on this
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../auth/secrets/secrets")
const Recipes = require("./recipe-model")

const checkRecipeId = (req, res, next) =>{
	try{
		const recipe = Recipes.findById(req.params.recipe_id)
		if (!recipe){
			res.status(404).json({message: `recipe with id: ${req.params.recipe_id} not found`});
		}
		else{
			req.recipe = recipe
			next();
		}
	}
	catch(err){
		next(err);
	}
}

const checkPayload = (req, res, next) =>{
	const recipe = req.body
	if(typeof(recipe.recipe_title) !== "string" || typeof(recipe.recipe_title) !== "string" ){
		res.status(401).json({message: "no numbers allowed"});
	}
	else if (!recipe.recipe_title){
		res.status(400).json({message: "title required"});
	}
	else if (!recipe.recipe_source){
		res.status(400).json({message: "source required"});
	}
	else{
		next();
	}
}

const restricted = (req, res, next) =>{
	const token = req.headers.authorization
	if (!token){
		res.status(401).json({message: "Token required"})
	} 
	else{
		jwt.verify(token, JWT_SECRET, (err, decoded) =>{
			if (err){
				res.status(401).json({message: "Token invalid"})
			}
			else {
				req.decodedToken = decoded
				next()
			}
		})
	}
}

module.exports = {
    checkRecipeId,
    checkPayload,
    restricted
}