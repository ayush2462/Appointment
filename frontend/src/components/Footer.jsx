import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Left Side */}
        <div>
          <img className="mb-4 w-32" src={assets.logo} alt="Company Logo" />
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
            voluptatem quia nesciunt distinctio laborum sapiente corrupti, id
            exercitationem voluptas repellendus, porro eos facilis error ab ea
            doloremque inventore? Voluptatibus, rem.
          </p>
        </div>

        {/* Center Side */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <nav>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-gray-400 cursor-pointer">Home</li>
              <li className="hover:text-gray-400 cursor-pointer">About Us</li>
              <li className="hover:text-gray-400 cursor-pointer">Contact Us</li>
              <li className="hover:text-gray-400 cursor-pointer">Privacy Policy</li>
            </ul>
          </nav>
        </div>

        {/* Right Side */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <ul className="text-sm space-y-2">
            <li>Phone: +12-12-3252</li>
            <li>Email: xyz@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
