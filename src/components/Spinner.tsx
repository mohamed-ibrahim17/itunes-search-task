import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#a78bfa]"></div>
    </div>
  );
}
