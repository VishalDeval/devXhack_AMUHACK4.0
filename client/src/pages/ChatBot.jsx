import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const ChatBot = () => {

  const navigate = useNavigate();

  const isNotMobile = useMediaQuery("(min-width: 1000px)");
 
  const [hide,setHide] = useState(false) ;
  const [text, settext] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [age,setAge]=useState("");
  const [gender,setGender]=useState("");
  const [weight,setWeight]=useState("");
  const [height,setHeight]=useState("");
  const [vegpreference,setVegpreference]=useState("");
  const [healthGoal,setHealthGoal]=useState("");
  const [allergy,setallergy]=useState("");
  const [locality,setLocality]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/openai/chatbot", { text,age,gender, weight,height, vegpreference ,healthGoal, allergy,locality});
      setResponse(data.join("\n"));
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message || "Something went wrong");
      }
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900  flex min-h-screen  pb-10">
      <Collapse in={Boolean(error)}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      <form
        onSubmit={handleSubmit}
        className="flex w-[50%] justify-center  h-svh"
      >
        <div className="w-[90%] rounded-xl mt-8 !shadow-[0_0_50px_grey] shadow-lg ">
          <div className="text-[#fd5b5b] text-4xl drop-shadow-[0_0_15px_#fd5b5b] text-center mt-8">
            Ask with HealthMate
          </div>

          <TextField
            placeholder="e.g. Create diet plan"
            type="text"
            multiline={true}
            required
            className="!flex !bg-[#ead5d3] !mx-10 !mt-6 !border-white rounded-xl  !text-black !text-xl"
            value={text}
            onChange={(e) => settext(e.target.value)}
          />
          <div className="flex gap-10 items-center justify-center">
            <div className="flex justify-center">
              <Button
                type="submit"
                className="!text-white !mt-14 !rounded-xl drop-shadow-[0_0_5px_#fd5b5b] !w-32 !text-xl !bg-[#fd5b5b] !hover:bg-[#5376bf]"
              >
                Chat
              </Button>
            </div>
            {!hide ? (
            <div className="flex justify-center ">
              <Button
                
                onClick={() => setHide(!hide)}
                className="!text-white !mt-14 !rounded-xl drop-shadow-[0_0_5px_#fd5b5b] !w-42 !text-xl !bg-[#fd5b5b] !hover:bg-[#5376bf]"
              >Food Chart
              </Button>
            </div>):("")}
          </div>

          <div className="mt-4 mb-8 text-white text-center">
            not this tool ? <Link to="/">GO BACK</Link>
          </div>
          {hide ? (
          <div className="flex flex-wrap">
            <TextField
              placeholder="add your age"
              type="text"
              multiline={true}
              required
              className="!flex !flex-shrink-0 !border-none !outline-none !ring-0 !focus:outline-none !focus:ring-0 !focus:border-transparent !shadow-none !h-12 !mx-10 !mt-6 !border-white rounded-xl !bg-[#ead5d3] !text-black !text-xl"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextField
              placeholder="add your gender"
              type="text"
              multiline={true}
              required
              className="!flex flex-shrink-0 !h-12 !mx-10 !mt-6 !border-white rounded-xl !bg-[#ead5d3] !text-black !text-xl"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <TextField
              placeholder="add your weight"
              type="text"
              multiline={true}
              required
              className="!flex flex-shrink-0 h-12 !mx-10 !mt-6 !border-white rounded-xl !bg-[#ead5d3] !text-black !text-xl"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <TextField
              placeholder="add your height"
              type="text"
              multiline={true}
              required
              className="!flex flex-shrink-0 h-12  !mx-10 !mt-6 !border-white rounded-xl !bg-[#ead5d3] !text-black !text-xl"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <TextField
              placeholder="veg or non veg"
              type="text"
              multiline={true}
              required
              className="!flex flex-shrink-0 h-12  !mx-10 !mt-6 !border-white rounded-xl !bg-[#ead5d3] !text-black !text-xl"
              value={vegpreference}
              onChange={(e) => setVegpreference(e.target.value)}
            />
            <TextField
              placeholder="add your health goal"
              type="text"
              multiline={true}
              required
              className="!flex flex-shrink-0 h-12 items-center !mx-10 !mt-6 !border-white rounded-xl !bg-[#ead5d3] !text-black !text-xl"
              value={healthGoal}
              onChange={(e) => setHealthGoal(e.target.value)}
            />
            <TextField
              placeholder="add your allergy"
              type="text"
              multiline={true}
              required
              className="!flex flex-shrink-0 h-auto items-center !mx-10 !mt-6 !border-white rounded-xl !bg-[#ead5d3] !text-black "
              value={allergy}
              onChange={(e) => setallergy(e.target.value)}
            />
            <TextField
              placeholder="add your locality"
              type="text"
              multiline={true}
              required
              className="!flex flex-shrink-0 h-auto items-center !mx-10 !mt-6 !border-white rounded-xl !bg-[#ead5d3] !text-black !text-xl"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>):("")}
        </div>
      </form>

      
      <div className="border-1 w-[50%] mt-4 flex justify-center mx-24 items-center border min-h-[400px] rounded-xl px-5 pt-5 pb-5">
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <div className="text-white text-lg">Thinking...</div>
          </div>
        ) : (
          <div className="space-y-2 whitespace-pre-wrap leading-relaxed text-white">
            {(response || "Bot Response").split("\n").map((line, idx) => {
              const trimmed = line.trim();

              if (trimmed.startsWith("###")) {
                return (
                  <h1
                    key={idx}
                    className="text-2xl font-bold text-[#fd5b5b] mb-2"
                  >
                    {trimmed.replace(/^###\s*/, "").replace(/\*\*/g, "")}
                  </h1>
                );
              } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                return (
                  <h2
                    key={idx}
                    className="text-xl font-semibold text-[#fd5b5b]"
                  >
                    {trimmed.replace(/\*\*/g, "")}
                  </h2>
                );
              } else {
                return <p key={idx}>{trimmed}</p>;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
