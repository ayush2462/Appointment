import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="container mx-auto p-4 pt-10">
      <div className="text-center mb-4">
        <p className="text-2xl text-gray-500">
          Contact <span className="text-gray-700 font-semibold">Us</span>
        </p>
      </div>
      <div className="flex flex-wrap justify-center">
        <img
          src={assets.contact_image}
          alt=""
          className="w-1/2 md:w-1/3 lg:w-1/4 mb-4"
        />
        <div className="w-1/2 md:w-2/3 lg:w-3/4 pl-4">
          <p className="text-lg font-bold mb-2">OUR OFFICE</p>
          <p className="text-gray-600">address</p>
          <p className="text-gray-600">
            telephone <br /> email
          </p>
          <p className="text-gray-600">carrer at hospital</p>
          <p className="text-gray-600">
            Learn more about our teams and job opening
          </p>
          <button className="bg-gray-800 hover:bg-primary text-white font-bold py-2 px-4 rounded">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
