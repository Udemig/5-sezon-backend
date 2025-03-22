import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="text-center text-sm md:text-base text-grey-50 py-2 md:py-3 border-t-[0.5px] border-zinc-700">
      <p>&copy; {new Date().getFullYear()} Tüm hakları saklıdır.</p>
    </div>
  );
};

export default Footer;
