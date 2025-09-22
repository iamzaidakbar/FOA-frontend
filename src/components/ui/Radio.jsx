import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";

const options = [
  { id: 1, value:"owner", label: "Owner", icon: <RiAdminLine className="text-[14px]" /> },
  { id: 2, value:"user", label: "User", icon: <LuUser className="text-[14px]" /> },
  { id: 3, value:"deliveryBoy", label: "Delivery Boy", icon: <MdOutlineDeliveryDining className="text-[14px]" /> },
];

const CustomRadio = (props) => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-[.9rem]">Role</label>
      <div className="flex gap-3">
        {options.map((opt) => {
        const isSelected = selected === opt.id;

        return (
          <motion.div
            key={opt.id}
            onClick={() => {
              setSelected(opt.id);
              props.setRole(opt.value);
            }}
            className={`
              flex items-center p-1 rounded
              border ${isSelected ? "border-black bg-black text-white" : "border-gray-300 bg-white text-black"}
              cursor-pointer w-auto mb-3 
            `}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Tiny Radio */}
            <motion.div
              className="w-3 h-3 border-2 border-black rounded-full flex items-center justify-center mb-1"
            >
              {isSelected && (
                <motion.div
                  layoutId="selected"
                  className="w-1.5 h-1.5 bg-white rounded-full"
                />
              )}
            </motion.div>

            {/* Icon */}
            <div className="mb-1 ml-2">{opt.icon}</div>

            {/* Label */}
            <div className="text-[10px] ml-1">{opt.label}</div>
          </motion.div>
        );
      })}
      </div>
    </div>
  );
};

export default CustomRadio;
