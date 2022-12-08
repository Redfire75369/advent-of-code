import {sample, full} from "./inputs";
import {sum} from "../../utils/reducer";
import * as async_hooks from "async_hooks";

const inputs = full;

interface Ingredients {
	[key: string]: Set<string>,
}

interface Allergens {
	[key: string]: string[],
}

function getIngredients(): Ingredients {
	const ingredients: Ingredients = {};
	const allergens: Allergens = {};

	inputs.forEach(food => {
		food.allergies.forEach(allergy => {
			if (!allergens[allergy]) {
				allergens[allergy] = [...food.ingredients];
			} else {
				allergens[allergy] = allergens[allergy].filter(a => food.ingredients.includes(a));
			}
		});
	});

	inputs.forEach(food => {
		food.ingredients.forEach(ingredient => {
			if (!ingredients[ingredient]) {
				ingredients[ingredient] = new Set();
			}
			for (const allergy in allergens) {
				if (allergens[allergy].includes(ingredient)) {
					ingredients[ingredient] = new Set([...ingredients[ingredient], allergy]);
				}
			}
		});
	});

	return ingredients;
}

/* Part 1 */
function part1() {
	const ingredients = getIngredients();
	const nonAllergic = Object.keys(ingredients).filter(i => ingredients[i].size === 0);
	return nonAllergic.reduce(sum(ingredient => inputs.filter(food => food.ingredients.includes(ingredient)).length), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const ingredients = getIngredients();
	const nonAllergic = Object.keys(ingredients).filter(i => ingredients[i].size === 0);

	const allergicIngredients = Object.fromEntries([...Object.entries(ingredients)].filter(i => !nonAllergic.includes(i[0]))
		.map(([i, a]) => [i, [...a]]));

	const allergies = {};
	while (Object.values(allergicIngredients).filter(a => a !== null).length > 0) {
		const keys = Object.keys(allergicIngredients);
		for (let i = 0; i < keys.length; i++) {
			const ingredient = keys[i];
			const allergens = allergicIngredients[ingredient];
			if (allergens !== null) {
				if (allergens.length === 1) {
					const allergy = allergens[0];
					allergies[allergy] = ingredient;

					for (const key in allergicIngredients) {
						if (allergicIngredients[key] !== null) {
							const index = allergicIngredients[key].indexOf(allergy);
							if (key !== ingredient && index !== -1) {
								allergicIngredients[key].splice(index, 1);
							}
						}
					}
					allergicIngredients[ingredient] = null;
					break;
				} else if (allergens.length === 0) {
					allergicIngredients[ingredient] = null;
					break;
				}
			}

		}
	}
	return Object.keys(allergies).sort().map(allergy => allergies[allergy]).join(",");
}

console.log("Part 2:", part2());
