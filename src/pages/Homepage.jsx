import { Link, useNavigate } from "react-router-dom";
// import Typed from "react-typed"
import bgImage from "../assets/bgHero.jpg";
import adoptPet from "../assets/adoptPet.png"
import abandonedPet from "../assets/abandonedPet.png"

function Homepage() {
  const navigate = useNavigate();

  const containerStyle = {
    position: "relative",
    height: "51vw",
  };

  const backgroundStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    zIndex: -1,
  };

  return (
    <div>
      <div
        style={containerStyle}
        className="text-white relative overflow-hidden"
      >
        <div style={backgroundStyle}></div>
        <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center pt-60">
          <p className="text-[#5bc0be] font-bold p-2">
            FIND YOUR FOREVER FRIEND
          </p>
          <h1 className="md:text-6xl sm:text-6xl text-4xl font-bold md:py-6">
            Adopt a Paw Companion!
          </h1>
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Lovable, cute, amazing
          </p>
          <p className="md:text-2xl text-xl font-bold text-gray-300">
            Find a loyal pet eager to share their love with you!
          </p>
          <button
            onClick={() => navigate("/feed")}
            className="bg-[#5bc0be] w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-white"
          >
            CHECK FEED
          </button>
        </div>
      </div>
      <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[300px] mx-auto my-4" src={adoptPet} alt="/" />
        <div className="flex flex-col justify-center">
          <p className="text-[#5bc0be] font-bold">
            ABOUT US AND OUR LITTLE PAW FRIENDS
          </p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Why Choose Little Paw?{" "}
          </h1>
          <p className="">
            At Little Paw, we believe that every paw has a story, and every
            story deserves a loving home. Adopting a pet is a lifelong
            commitment, and we're here to support you every step of the way. Our
            goal is to match you with a furry friend that complements your
            lifestyle, ensuring a harmonious and loving relationship.
          </p>
          <button onClick={() => navigate("/pets")} className="bg-black text-[#5bc0be] w-[200px] rounded-md font-bold my-6 mx-auto md:mx-0 py-3">
            LOOK FOR A FRIEND
          </button>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="text-[#5bc0be] font-bold">ANIMAL ABUSE AWARENESS</p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            A Call to Compassion
          </h1>
          <p className="">
            Animal abuse is a harsh reality, causing pain to innocent beings.
            It's time to open our hearts, recognize this cruelty, and work
            collectively to ensure a safer, kinder world for our furry friends.
            Through education, empathy, and collective action, we can create a
            world where every tail wags with joy. Click below to check more
            about animal abuse and how to fight it!
          </p>
          <div>
            <Link to="https://care4paws.org/abuse/" target="_blank">
              <button className="bg-black text-[#5bc0be] w-[300px] rounded-md font-bold my-6 mx-auto md:mx-0 py-3">
                STOP ANIMAL ABUSE
              </button>
            </Link>
          </div>
        </div>
        <img className="w-[300px] mx-auto my-4" src={abandonedPet} alt="/" />
      </div>
    </div>
    </div>
  );
}

export default Homepage;
