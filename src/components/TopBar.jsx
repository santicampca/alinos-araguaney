import React from "react";

export default function TopBar() {
  return (
    <div className="fixed top-0 w-full z-[70] bg-primary text-on-primary">
      <div className="max-w-[1440px] mx-auto px-grid-margin py-2 text-center">
        <p className="font-label-md text-label-md tracking-wide">
          🌿 Aliños frescos preparados diariamente
        </p>
      </div>
    </div>
  );
}
