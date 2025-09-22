import { getInitials } from "../../utils/getInitials.js";
import React from "react";

const AvatarButton = ({ setOpen, open, user, sizeMap, size, className }) => {
  return (
    <div
      onClick={() => setOpen(!open)}
      className={`${className} flex items-center justify-center rounded-full overflow-hidden bg-black text-white font-bold uppercase cursor-pointer ${
        sizeMap[size] || sizeMap.md
      }`}
    >
      {user?.photoUrl?.length > 0 ? (
        <img
          src={user?.photoUrl}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="h-[15px] uppercase">
          {getInitials(user?.fullName)}
        </span>
      )}
    </div>
  );
};

export default AvatarButton;
