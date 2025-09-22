import React, { useState } from "react";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";

const options = [
  { id: 1, value: "owner", label: "Owner", icon: <RiAdminLine /> },
  { id: 2, value: "user", label: "User", icon: <LuUser /> },
  { id: 3, value: "deliveryBoy", label: "Delivery Boy", icon: <MdOutlineDeliveryDining /> },
];

const RoleSelector = ({ setRole }) => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium text-sm">Role *</label>
      <div className="flex gap-3">
        {options.map((opt) => {
          const isSelected = selected === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => {
                setSelected(opt.id);
                setRole(opt.value);
              }}
              className={`flex items-center gap-2 rounded cursor-pointer py-3 px-2
                ${isSelected ? "bg-black text-white" : "bg-white border border-gray-300 text-black"}
                transition-all duration-200
              `}
            >
              <div>{opt.icon}</div>
              <div className="text-[10px]">{opt.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;
