import resLogo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="xl:px-[300px] px-[20px] bg-[var(--surface-alt)] md:pt-20 py-[20px] ">
      <div
        className=" border-b-2 border-[var(--border)] py-8 grid grid-cols-1 
    md:grid-cols-3 md:gap-[300px] gap-[50px] "
      >
        <div className="mb-[30px]">
          <div className="mb-3 flex  items-center  md:justify-start  gap-[30px]  w-full md:w-[20%] ">
            <img
              src={resLogo}
              alt="resturant logo"
              className="w-[40px]  inline "
            />
            <h2 className="text-[34px] font-[600] text-[var(--text)]">
              Balcon{" "}
            </h2>
          </div>
          <p className="  text-[var(--text-muted)] font-[300] font-fraunces text-[14px] md:text-[18px]">
            From traditional Egyptian recipes to freshly grilled favorites,
            every dish tells a story. Come for the food, stay for the warm
            hospitality.
          </p>
        </div>
        <div>
          <p className=" text-[22px] w-full text-[var(--text-muted)] font-[300] font-fraunces mb-[20px]">
            Visit us
          </p>
          <p className="text-[18px] font-[400] text-[var(--text)] mb-[10px]">
            23 June Street
          </p>
          <p className="text-[18px] font-[400] text-[var(--text)] mb-[10px]">
            Edfu
          </p>
          <p className="text-[18px] font-[400] text-[var(--text)] mb-[10px]">
            +201148272793
          </p>
        </div>
        <div>
          <p className=" text-[22px] w-full text-[var(--text-muted)] font-[300] font-fraunces mb-[20px]">
            Opining Hours
          </p>
          <p className="text-[18px] font-[400] text-[var(--text)]">
            8:00 AM to 11:59 PM
          </p>
        </div>
      </div>
      <p className="md:w-[25%] text-[22px] w-full text-[var(--text-muted)] font-[300] font-fraunces my-[20px]">
        © Balcon. A fictional restaurant brand for design purposes.
      </p>
    </footer>
  );
}
