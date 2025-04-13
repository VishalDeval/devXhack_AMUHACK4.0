import React from "react";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="justify-center flex-col text-center h-screen w-full bg-gray-900">
        <div className="text-5xl text-white pt-20  ">
          Your Personal Health <br></br> Advisor AI
        </div>
        <div className="text-sm text-gray-400 text-center w-[75%]  mx-40 mt-14">
          An intelligent AI companion that answers your health-related
          questions, offers personalized wellness insights, and guides you with
          food recommendations tailored to your lifestyle. From symptoms to
          superfoods — it’s all at your fingertips.
        </div>
        <div className="flex items-center text-center  w-full justify-center mt-20 ">
          <div
            className="text-sm text-white bg-black text-center rounded-3xl w-20 h-8 p-1 mr-10 drop-shadow-[0_0_5px_#fd5b5b] cursor-pointer"
            onClick={() => navigate("/chatbot")}
          >
            Ask
          </div>
          <div className="text-sm text-white bg-[#fd5b5b] text-center rounded-3xl w-60 h-8 p-1 ml-10 drop-shadow-[0_0_5px_#fd5b5b] cursor-pointer">
            Nearby Dr. / Medical Store
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
