import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Layout/Loader";
import MetaData from "../../Layout/MetaData";

const UserProfile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="grid grid-cols-4 gap-4 pb-5">
            <div className="col-span-4 sm:col-span-2 items-center flex flex-col gap-8">
              <h1
                className="font-semibold text-xl"
                style={{ color: "rgba(0, 0, 0, 0.555)" }}
              >
                My Profile
              </h1>
              <img
                src={user.avatar.url}
                alt={user.name}
                className="w-[20vmax] rounded-full hover:scale-105"
                style={{ transition: "all 0.5s" }}
              />

              <button
                className="bg-[tomato] border-none font-normal w-1/2 text-lg text-white py-3 px-8 m-4 rounded-xl text-center hover:scale-105"
                style={{ transition: "all 0.5s" }}
                onClick={() => navigate("/me/update")}
              >
                Edit Profile
              </button>
            </div>
            <div className="col-span-4 sm:col-span-2 flex flex-col gap-4 sm:gap-12 ">
              <div className="flex flex-col items-center sm:items-start gap-2">
                <h4 className="text-lg font-semibold">Full Name</h4>
                <p
                  className="text-base font-normal"
                  style={{ color: "rgba(0, 0, 0, 0.555)" }}
                >
                  {user.name}
                </p>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-2">
                <h4 className="text-lg font-semibold">Email</h4>
                <p
                  className="text-base font-normal"
                  style={{ color: "rgba(0, 0, 0, 0.555)" }}
                >
                  {user.email}
                </p>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-2">
                <h4 className="text-lg font-semibold">Joined On</h4>
                <p
                  className="text-base font-normal"
                  style={{ color: "rgba(0, 0, 0, 0.555)" }}
                >
                  {String(user.createdAt).substr(0, 10)}
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-start gap-8">
                <button
                  className="bg-black border-none w-full sm:w-3/4 lg:w-1/2 font-normal text-lg text-white py-3 px-8 rounded-xl text-center hover:scale-105"
                  style={{ transition: "all 0.5s" }}
                  onClick={() => navigate("/orders")}
                >
                  My Orders
                </button>

                <button
                  className="bg-black border-none w-full sm:w-3/4 lg:w-1/2 font-normal text-lg text-white py-3 px-8 rounded-xl text-center hover:scale-105"
                  style={{ transition: "all 0.5s" }}
                  onClick={() => navigate("/password/update")}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
