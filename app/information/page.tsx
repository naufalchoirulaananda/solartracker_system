import Image from "next/image";
import Link from "next/link";
import React from "react";

function Information() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center p-16">
        <p className="text-2xl font-semibold tracking-widest mb-16">
          About Solar Tracker System
        </p>
        <Image
                      className="h-[200px] w-full rounded-xl object-cover mb-8"
                      src={
                        "https://res.cloudinary.com/dgnmqbglc/image/upload/v1714782924/IoT%20Monitoring/chirayu-trivedi-twOIx6I35tk-unsplash_rgj8gb.jpg"
                      }
                      alt={"coming-soon"}
                      width={300}
                      height={200}
                      priority={true}
                      sizes="(max-width: 640px) 100vw,
            (max-width: 768px) 80vw,
            (max-width: 1024px) 60vw,
            50vw
            "
                    />
        <p className="tracking-widest mb-4 text-justify">
          Solar tracker is a technology used to enhance the efficiency of solar
          panels by tracking the movement of the sun throughout the day. By
          utilizing integrated sensors and motors, solar trackers adjust the
          position of solar panels to directly face the sun, maximizing the
          capture of solar energy. This allows solar panels to receive optimal
          sunlight exposure throughout the day, resulting in higher energy
          yields compared to static or fixed solar panels.
        </p>
        <p className="tracking-widest mb-4 text-justify">
          The primary benefit of using solar trackers is the increased energy
          production from solar panel systems. By tracking the sun&apos;s movement,
          solar panels can maximize sunlight exposure throughout the day, even
          in changing weather conditions. This leads to a significant
          improvement in solar energy availability and optimizes investments in
          renewable energy infrastructure.
        </p>
        <p className="tracking-widest mb-4 text-justify">
          Furthermore, the use of solar trackers can also reduce the carbon
          footprint of solar energy systems. By enhancing the efficiency of
          solar panels, solar trackers enable the generation of more energy
          using fewer panels, thereby reducing the need for panel materials and
          production processes, which can decrease overall carbon emissions.
          This makes solar trackers an environmentally friendly and sustainable
          choice for meeting energy needs in a cleaner and more efficient
          manner.
        </p>
      <Link href={"mainside"} className="py-2 px-8 bg-sky-950 text-white rounded-lg text-sm">Back</Link>
      </div>
    </>
  );
}

export default Information;
