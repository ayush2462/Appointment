import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          About <span className="text-gray-700 font-medium">Us</span>
        </p>
      </div>
      <div className="flex my-10 flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            dignissimos molestias molestiae sint natus eligendi, aliquam dolorem
            quod tempore similique!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ut
            repudiandae at fugit quibusdam unde ipsam ex explicabo harum
            expedita, eligendi quisquam adipisci accusamus deleniti eveniet nam
            inventore mollitia. Illum.
          </p>
          <b className="text-gray-800">OUR VISION</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
            repellat laudantium nostrum maxime suscipit quos? Dicta iusto quas
            officia odio quis, atque alias dignissimos assumenda itaque quod
            consectetur perspiciatis modi nesciunt hic impedit sint id est rerum
            at asperiores cumque.
          </p>
        </div>
      </div>
      <div className="text-xl my-4 ">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency: </b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam,
            cum.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience: </b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam,
            cum.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam,
            cum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
