const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

async function fetchApi(endPoint) {
  const res = await fetch(`${BASE_URL}${endPoint}`);
  if (!res.ok) {
    throw new Error("Failed connected with API");
  }
  return res.json();
}

export async function Categories() {
  const data = await fetchApi("categories.php");
  return data.categories || [];
}
export async function GetMealByCat(cat = "SeaFood") {
  const data = await fetchApi(`filter.php?c=${encodeURIComponent(cat)}`);
  return data.meals || [];
}
export async function GetRandomMeal() {
  const data = await fetchApi("random.php");
  return data.meals ? data.meals[0] : null;
}

export async function GetMulRandMeals(noMeals = 3) {
  let requests = Array.from({ length: noMeals }, () => GetRandomMeal());
  const meals = await Promise.all(requests);
  return meals;
}
