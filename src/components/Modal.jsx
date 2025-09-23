import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { y: "-50%", opacity: 0, scale: 0.9 },
  visible: {
    y: "0",
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { y: "-50%", opacity: 0, scale: 0.9 },
};

const CustomModal = ({ isOpen, setIsOpen, children, footer, type }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className={`bg-white rounded-xl w-[90%] ${
              type === "login" ? "max-w-[40vw]" : "max-w-[60vw]"
            } max-h-[95vh] overflow-y-auto relative pt-8`}
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#ccc transparent",
            }}
            onClick={(e) => e.stopPropagation()} // prevent close on modal click
          >
            {/* Content */}
            <div>{children}</div>

            {/* Footer (optional) */}
            {footer && (
              <div className="mt-4 flex justify-end space-x-2">{footer}</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
