import React,{useState} from "react";

export default function Welcome() {
  
  return (
    <>
      <section>
      
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-center text-2xl font-bold text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
            DRB <br className="hidden lg:block" />
            <span className="text-2xl tracking-wide">
              DJANGO-REACT-BOILERPLATE WITH SUPERPOWERS
            </span>
          </h1>
        </div>
      </section>
    </>
  );
}
