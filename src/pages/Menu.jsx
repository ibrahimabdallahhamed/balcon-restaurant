import { useEffect, useState } from "react";
import { Categories, GetMealByCat } from "../Api/foodApi";
import { useLocation } from "react-router-dom";
export default function Menu() {
  const location = useLocation();
  let intialCat = location.state?.selectedCat || "Beef";
  function random(min, max) {
    let result;
    result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
  }
  const [active, setActive] = useState(intialCat);
  const [category, setCategory] = useState([]);
  const [mealsByCat, setMealsByCat] = useState([]);
  function catHandler(categoryName) {
    setActive(categoryName);
  }
  useEffect(() => {
    Categories()
      .then((data) => setCategory(data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    GetMealByCat(active)
      .then((data) => {
        const mealByPrice = data.map((meal) => ({
          ...meal,
          price: random(2, 30),
        }));
        setMealsByCat(mealByPrice);
      })
      .catch((err) => console.log(err));
  }, [active]);

  {
    /**------------------------------------------------------------------------
     **                         Return
     *------------------------------------------------------------------------**/
  }

  return (
    <main className="">
      {/**--------------------------------------------
       **               Header Section
       *---------------------------------------------**/}
      <header className="  md:pt-20 pt-[20px]  flex flex-col md:flex-row items-center py-[15px] md:py-[30px]  justify-between xl:px-[300px] px-[20px] bg-[var(--surface-alt)]">
        <h1 className="italic md:text-[72px] text-[32px] font-[600] font-fraunces text-[var(--text)] md:w-[70%] pb-[15px] md:pb-[30px]">
          Everything from
          <span className="text-[var(--primary-ember)] "> the fire</span>.
        </h1>
        <p className="text-[var(--text-muted)] md:text-[24px] text-[16px] md:w-[40%] ">
          Eighteen dishes, each cooked over live flame and finished with olive
          oil. Filter by category or search by dish or ingredient.
        </p>
      </header>
      <section className="bg-[var(--background)] w-full overflow-x-auto  md:pt-20 pt-[20px]  items-center py-[15px] md:py-[30px]  justify-between xl:px-[300px] px-[20px] ">
        <div className="flex  md:flex-wrap items-center gap-[10px] md:gap-[20px] pb-[20px] overflow-x-auto  border-b-[2px] border-[var(--border)]">
          {category.map((cat) => (
            <button
              className={`${active === cat.strCategory ? "bg-[var(--primary-ember)]" : "bg-[var(--surface)]"} text-[var(--text)]
               rounded-[99px] font-[500] text-[16px] md:text-[22px] py-[7px] px-[15px] border-1 border-[var(--border)] whitespace-nowrap`}
              key={cat.idCategory}
              onClick={() => catHandler(cat.strCategory)}
            >
              {cat.strCategory}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[15px] md:gap-[25px] mt-10">
          {mealsByCat.map((meal) => (
            <div
              key={meal.idMeal}
              className="w-full flex flex-col gap-[15px] border-2 border-[var(--border)] rounded-[30px] overflow-hidden pb-[20px] duration-300 hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={meal.strMealThumb}
                  className="w-full aspect-square object-cover"
                  alt={meal.strMeal}
                />
              </div>

              <div className="px-[16px] md:px-[20px] flex flex-col justify-between">
                <h2 className="md:text-[18px] text-[14px] font-[600] font-fraunces text-[var(--text)] line-clamp-1">
                  {meal.strMeal}
                </h2>

                <p className="text-[20px] md:text-[22px] font-[600] font-fraunces text-[var(--text)] mt-1">
                  {`$ ${meal.price}`}
                </p>

                <button className="mt-3 w-full text-[15px] md:text-[18px] font-[600] font-fraunces bg-[var(--primary-ember)] text-[var(--surface)] py-[6px] px-[10px] rounded-[99px]">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
