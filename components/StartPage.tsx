import Link from "next/link";
import React from "react";

function StartPage() {
  return (
    <>
      <section className="h-screen flex align-middle justify-center">
        <div className="flex align-middle justify-center">
          <div className="flex flex-col justify-center align-middle text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">
              Solar Tracker Systems
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold md:text-4x">
              Internet Of Things
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Environmentally friendly solutions for future agriculture. Hand made on earth by human.{" "}
            </p>
            <Link
              href={"mainside"}
              className="text-white bg-black font-medium text-sm text-center my-4 mx-auto rounded-full py-2 px-6"
            >
              Start Monitoring
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default StartPage;