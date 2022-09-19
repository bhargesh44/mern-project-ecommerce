import React from "react";

const Contact = () => {
  return (
    <div className="py-20 px-4  flex flex-col items-center gap-20 min-h-[calc(100vh-237px)] justify-center bg-colorPale">
      <h2 className="font-semibold text-center text-xl md:text-2xl max-w-lg">
        Don&apos;t miss our weekly updates about Ecommerce Products information
      </h2>

      <form className="flex items-center gap-2 md:gap-20 border-b-2 text-sm md:text-base py-3 w-full max-w-lg">
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          className="bg-transparent placeholder:text-black border-none outline-none grow w-full !font-semibold"
        />
        <button className="uppercase font-semibold hover:opacity-50 text-[tomato]">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Contact;
