import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Typed from "react-typed";
import bgImage from "../assets/bgHero.jpg";
import adoptPet from "../assets/adoptPet.png";
import abandonedPet from "../assets/abandonedPet.png";

function Homepage() {
  const navigate = useNavigate();
  const [showInfoAlertFeed, setShowInfoAlertFeed] = useState(false);
  const [showInfoAlertPets, setShowInfoAlertPets] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

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

  const handleClickFeed = () => {
    if (!isLoggedIn) {
      setShowInfoAlertFeed(true);
      setTimeout(() => setShowInfoAlertFeed(false), 4000);
      return;
    }
    navigate("/feed");
  };

  const handleClickPets = () => {
    if (!isLoggedIn) {
      setShowInfoAlertPets(true);
      setTimeout(() => setShowInfoAlertPets(false), 4000);
      return;
    }
    navigate("/pets");
  };

  return (
    <div>
      <div
        style={containerStyle}
        className="text-white relative overflow-hidden"
      >
        <div style={backgroundStyle}></div>
        <div className="max-w-[1000px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center pt-60">
          <p className="text-[#5bc0be] font-bold p-2">
            FIND YOUR FOREVER FRIEND
          </p>
          <h1 className="md:text-6xl sm:text-6xl text-4xl font-bold md:py-6">
            Adopt a Paw Companion
          </h1>
          <div className="flex justify-center items-center">
            <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
              Lovable, amazing,
            </p>
            <Typed
              className="md:text-5xl sm:text-4xl text-xl font-bold pl-2 text-[#5bc0be]"
              strings={["pawesome", "purrfect", "meowvellous", "fur-ever"]}
              typeSpeed={120}
              backSpeed={80}
              loop
            />
            <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
              pets!
            </p>
          </div>
          <p className="md:text-2xl text-xl font-bold text-gray-300">
            Find a loyal pet eager to share their love with you!
          </p>
          <button
            onClick={handleClickFeed}
            className="bg-[#5bc0be] w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-white"
          >
            CHECK FEED
          </button>
          <div className="flex justify-center">
          {showInfoAlertFeed && (
            <div
              class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Info alert!</span> Cannot access our
                feed. <b>Login and try again.</b>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      <div className="w-full py-16 px-4">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <img className="w-[350px] mx-auto my-4" src={adoptPet} alt="/" />
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
              commitment, and we're here to support you every step of the way.
              Our goal is to match you with a furry friend that complements your
              lifestyle, ensuring a harmonious and loving relationship.
            </p>
            <button
              onClick={handleClickPets}
              className="bg-black text-[#5bc0be] w-[200px] rounded-md font-bold my-6 mx-auto md:mx-0 py-3"
            >
              LOOK FOR A FRIEND
            </button>
            {showInfoAlertPets && (
              <div
                class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                role="alert"
              >
                <svg
                  class="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium">Info alert!</span> Cannot access our
                  pets list. <b>Login and try again.</b>
                </div>
              </div>
            )}
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
              collectively to ensure a safer, kinder world for our furry
              friends. Through education, empathy, and collective action, we can
              create a world where every tail wags with joy. Click below to
              check more about animal abuse and how to fight it!
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
