export default function Menu() {
  {
    /**------------------------------------------------------------------------
     **                         Return
     *------------------------------------------------------------------------**/
  }
  return (
    <main className="xl:px-[300px] px-[20px] bg-[var(--surface-alt)] md:pt-20 pt-[20px]">
      {/**--------------------------------------------
       **               Header Section
       *---------------------------------------------**/}
      <header className="flex flex-col md:flex-row items-center py-[30px]  justify-between">
        <h1 className="italic md:text-[72px] text-[22px] font-[600] font-fraunces text-[var(--text)] md:w-[70%] py-[30px]">
          Everything from
          <span className="text-[var(--primary-ember)] "> the fire</span>.
        </h1>
        <p className="text-[var(--text-muted)] md:text-[24px] text-[16px] md:w-[40%] ">
          Eighteen dishes, each cooked over live flame and finished with olive
          oil. Filter by category or search by dish or ingredient.
        </p>
      </header>
    </main>
  );
}
