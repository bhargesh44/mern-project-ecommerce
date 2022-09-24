import React from "react";
import { Avatar } from "@mui/material";

import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const About = () => {
  return (
    <div className="flex min-h-[calc(100vh-237px)] justify-center flex-col pb-5">
      <h3 className="font-semibold text-xl sm:text-2xl text-[tomato] flex justify-center">
        About Us !!!
      </h3>

      <div className="mt-8 border bg-colorPale rounded-2xl p-5 sm:p-10 ">
        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
            <Avatar
              className="text-center"
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <p className="font-semibold text-colorBlack mb-2">
              Bhargesh Gediya
            </p>
            <button className="text-[tomato] uppercase mb-5">
              <a href="https://instagram.com/bhargesh_patel_44" target="blank">
                Visit Instagram
              </a>
            </button>
            <span className="text-colorBlack text-base text-center">
              This is a sample wesbite made by{" "}
              <strong>@bhargeshgediya44</strong>. Only with the purpose to teach
              MERN Stack on the channel 6 Pack Programmer
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center gap-5">
            <h3 className="font-semibold text-lg sm:text-xl text-colorBlack flex justify-center">
              Our Brands
            </h3>
            <a href="https://www.youtube.com" target="blank">
              <YouTubeIcon className="text-[tomato]" />
            </a>

            <a href="https://instagram.com/bhargesh_patel_44" target="blank">
              <InstagramIcon className="text-[tomato]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
