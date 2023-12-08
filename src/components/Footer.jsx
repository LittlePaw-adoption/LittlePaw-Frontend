import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
      <footer className="bottom-0 left-0 z-20 w-full p-4 border-t shadow md:flex md:items-center md:justify-between md:p-6
      border-gray-400">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <a className="hover:underline cursor-pointer">Little Paw™</a>. All
          Rights Reserved.
          <div className="flex justify-start md:w-[100%] space-x-3 text-gray-500 pt-2">
            <FaFacebookSquare className="cursor-pointer"/>
            <FaInstagram className="cursor-pointer" />
            <FaTwitter className="cursor-pointer" />
          </div>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a className="hover:underline me-4 md:me-6 cursor-pointer">
              Terms & Conditions
            </a>
          </li>
          <li>
            <a className="hover:underline me-4 md:me-6 cursor-pointer">
              Privacy Policy
            </a>
          </li>
        </ul>
      </footer>
  );
}

export default Footer;
