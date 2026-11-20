import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Categories, GetRandomMeal, GetMulRandMeals } from "../Api/foodApi";

export default function Home() {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const [category, setCategories] = useState([]);
  const [randomMeal, setRandomMeal] = useState([]);
  const [randomMeals, setRandomMeals] = useState([]);
  useEffect(() => {
    Categories()
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);
  /* useEffect(() => {
    GetRandomMeal()
      .then((data) => setRandomMeal([data]))
      .catch((err) => console.log(err));
  }, []); */
  useEffect(() => {
    GetRandomMeal(3)
      .then((data) => {
        const mealWithPrice = [data].map((meal) => ({
          ...meal,
          price: random(5, 20),
        }));
        setRandomMeal(mealWithPrice);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    GetMulRandMeals(3)
      .then((data) => {
        const mealWithPrice = data.map((meal) => ({
          ...meal,
          price: random(5, 20),
        }));
        setRandomMeals(mealWithPrice);
      })
      .catch((err) => console.log(err));
  }, []);
  /*   useEffect(() => {
    GetMulRandMeals(3)
      .then((data) => setRandomMeals(data))
      .catch((err) => console.log(err));
  }, []); */

  const navigate = useNavigate();
  const { en } = useContext(LanguageContext);
  return (
    <main className="xl:px-[300px] px-[20px] bg-[var(--background)] md:pt-20 pt-[20px]">
      <section className="flex flex-col md:flex-row md:gap-[100px] gap-[30px]">
        <div className="flex flex-col gap-[30px]">
          <p className="text-[var(--text-muted)] font-[300] md:text-[20px] text-[14px] ">
            {en
              ? "FRESHLY MADE, ALWAYS DELICIOUS"
              : "مُحَضَّرٌ طَازَجاً، وَلَذِيذٌ دَائِماً"}
          </p>
          <h1 className="md:text-[72px] text-[22px] font-[600] font-fraunces text-[var(--text)]">
            {en ? "Authentic flavors," : "نكهات أصيلة،"}
            <span className=" text-[var(--primary-ember)] italic">
              {" "}
              {en ? "made with love." : "مُعدّة بكل حب"}
            </span>
          </h1>
          <p className=" text-[var(--text)] font-[300] font-fraunces">
            {en
              ? " From traditional Egyptian recipes to freshly grilled favorites, every dish tells a story. Come for the food, stay for the warm hospitality."
              : "بدءاً من الوصفات المصرية التقليدية ووصولاً إلى الأطباق المشوية الطازجة، يروي كل طبقٍ حكايةً. تعال لتستمتع بالطعام، وابقَ لتنعم بحفاوة الضيافة."}
          </p>
          <div className="w-full flex justify-center  md:justify-start">
            <button
              className="bg-[var(--primary-ember)] rounded-[99px] px-[10px] py-[8px] text-[var(--surface)] md:w-[200px] w-[150px] md:text-[22px] text-[16px] "
              onClick={() => navigate("/menu")}
            >
              Explore menu
            </button>
          </div>
        </div>
        <div>
          {randomMeal.map((meal) => (
            <div key={meal.idMeal} className="relative">
              <img
                src={meal.strMealThumb}
                className="rounded-[30px] md:min-w-[800px] "
              />
              <p
                className="absolute bg-[var(--accent-saffron)] h-[80px] w-[80px] md:w-[100px] md:h-[100px] rounded-[50%]
               text-center flex items-center justify-center rotate-[30deg] text-[14px] md:text-[18px] p-[10px] font-[600]
               top-[20px] right-[30px] "
              >
                Chef's pick
              </p>
              <div className="absolute bottom-[10px] left-[10px] bg-[var(--surface)] rounded-[15px] md:p-[20px] p-[10px] ">
                <p className="text-[var(--text-muted)]">Tonight's special</p>
                <p className="font-[600] md:text-[20px] text-[16px] text-[var(--text)]">
                  {meal.strMeal}
                </p>
                <p className="flex items-center gap-[5px] font-[600] text-[var(--text-muted)]">
                  4.8{" "}
                  <span className="text-[var(--accent-saffron)] md:text-[18px] text-[14px]">
                    ★
                  </span>
                  <span>
                    {random(15, 30)} min. {random(5, 30)} $
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-[200px] w-full ">
        <div className="mb-[20px]">
          <p className="text-[var(--text-muted)] font-[300] md:text-[20px] text-[14px] ">
            {en ? "Browse" : "تصفح"}
          </p>
          <h2 className="md:text-[60px] text-[22px] font-[600] font-fraunces text-[var(--text)]">
            {en ? "Popular categories" : "فئات شائعة"}
          </h2>
        </div>

        <div className=" flex items-center justify-start  flex-wrap gap-[30px] md:gap-[60px]">
          {category.map((cat) => (
            <button
              key={cat.idCategory}
              className="bg-[var(--surface)] border-[2px] rounded-[30px] border-[var(--border)] 
              p-[20px] w-[150px] md:w-[200px] duration-[300ms] hover:translate-y-[-10px]"
            >
              <img
                src={cat.strCategoryThumb}
                alt="category pic"
                className="md:w-[150px] w-[100px] rounded-[10px]"
              />
              <p className="mt-[10px] md:mt-[20px] text-[var(--text)] text-[18px] md:text-[22px] font-[500] ">
                {cat.strCategory}
              </p>
            </button>
          ))}
        </div>
      </section>
      {/*  /**------------------------------------------------------------------------
       **                           text-[28px] font-[600] font-fraunces
       *------------------------------------------------------------------------**/}
      <section className="mt-[200px] w-full ">
        {/**--------------------------------------------
         *               SECTION HEADER
         *---------------------------------------------**/}
        <div className="mb-[40px]">
          <p className="text-[var(--text-muted)] font-[300] md:text-[20px] text-[14px] ">
            {en ? "From the fire" : "على اللهب"}
          </p>
          <h2 className="md:text-[60px] text-[22px] font-[600] font-fraunces text-[var(--text)]">
            {en ? "Chef's specials" : "إبداعات الشيف"}
          </h2>
        </div>
        {/* /**--------------------------------------------
         **               Meal Card
         *---------------------------------------------**/}
        <div className=" flex flex-col md:flex-row gap-[30px] items-center  ">
          {randomMeals.map((meal) => (
            <div
              key={meal.idMeal}
              className="flex flex-col gap-[20px] border-2 border-[var(--border)] 
              w-full md:w-[500px] rounded-[30px] overflow-hidden pb-[20px] duration-[300ms] hover:translate-y-[-30px]"
            >
              {/* /**--------------------------------------------
               **               Meal Image
               *---------------------------------------------**/}
              <div className="relative">
                <span className="absolute  rounded-[99px] py-[5px] px-[10px] top-[20px] left-[20px] text-center text-[14px] font-[700] bg-[var(--accent-saffron)] ">
                  {meal.strCategory}
                </span>
                <img src={meal.strMealThumb} className="object-cover " />
              </div>
              {/* /**--------------------------------------------
               **               Meal Info
               *---------------------------------------------**/}
              <div className="px-[20px] flex justify-between items-center ">
                <h2 className="md:text-[32px] text-[22px] font-[600] font-fraunces text-[var(--text)]">
                  {meal.strMeal}
                </h2>
                <h3 className="min-w-max rounded-[99px] py-[5px] px-[10px] top-[20px] left-[20px]  text-[14px] font-[700] bg-[var(--accent-saffron)]">
                  {meal.strCountry}
                </h3>
              </div>
              {/* /**--------------------------------------------
               **               Meal Price
               *---------------------------------------------**/}
              <div className="flex  justify-between px-[20px] mt-5 ">
                <p className="text-[28px] font-[600] font-fraunces text-[var(--text)]">{`$ ${meal.price} `}</p>
                <button className=" text-[16px] md:text-[22px] font-[600] font-fraunces bg-[var(--primary-ember)] text-[var(--surface)] px-[10px] rounded-[99px]">
                  {en ? "Add to cart" : "أضف للسلة"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
