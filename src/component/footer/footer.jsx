import { FaInstagram, FaTelegram } from "react-icons/fa";

function Footer() {
  return (
    <div className=" flex flex-col md:flex-row max-w-screen-xl items-center justify-between mx-auto p-6 bg-gray-800 text-white">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <p className="text-2xl font-bold text-green-400">ASL BURGER</p>
      </div>

      <div className="flex flex-col md:flex-row items-center text-center md:text-left">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/shokirbek_coder"
          className="text-2xl mx-2 hover:text-yellow-400 p-2"
        >
          <FaInstagram />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://t.me/shokir06"
          className="text-2xl mx-2 hover:text-yellow-400 p-2"
        >
          <FaTelegram />
        </a>
        <p className="font-bold text-sm mt-2 md:mt-0 md:ml-4 hover:text-yellow-400">
          Murojaat uchun tel: +998936976880
        </p>
      </div>
    </div>
  );
}

export default Footer;
