import { useEffect, useState } from "react";
import { Categories, GetMealByCat } from "../Api/foodApi";

export default function Menu() {
  function random(min, max) {
    let result;
    result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
  }
  const [active, setActive] = useState("Beef");
  const [category, setCategory] = useState([]);
  const [mealsByCat, setMealsByCat] = useState([]);
  function catHandler(categoryName) {
    setActive(categoryName);
    GetMealByCat(categoryName)
      .then((data) => {
        const mealByPrice = data.map((meal) => ({
          ...meal,
          price: random(2, 30),
        }));
        setMealsByCat(mealByPrice);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    Categories()
      .then((data) => setCategory(data))
      .catch((err) => console.log(err));
    catHandler("Beef");
  }, []);

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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[20px] mt-10 ">
          {mealsByCat.map((meal) => (
            <div
              key={meal.idMeal}
              className="flex flex-col gap-[20px] border-2 border-[var(--border)] 
              w-[170px]  md:w-[250px] rounded-[30px] overflow-hidden pb-[20px] duration-[300ms] hover:translate-y-[-30px] h-max "
            >
              {/* /**--------------------------------------------
               **               Meal Image
               *---------------------------------------------**/}
              <div className="relative">
                <img
                  src={meal.strMealThumb}
                  className="object-cover "
                  alt={meal.strMeal}
                />
              </div>
              {/* /**--------------------------------------------
               **               Meal Info
               *---------------------------------------------**/}
              <div className="px-[20px] flex flex-col justify-between  ">
                <h2 className="md:text-[16px] text-[12px] font-[600] font-fraunces text-[var(--text)] line-clamp-1">
                  {meal.strMeal}
                </h2>

                <p className="text-[22px] font-[600] font-fraunces text-[var(--text)]">{`$ ${random(2, 30)} `}</p>
                <button className="mt-2 w-[100%] text-[16px] md:text-[22px] font-[600] font-fraunces bg-[var(--primary-ember)] text-[var(--surface)] px-[10px] rounded-[99px]">
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
