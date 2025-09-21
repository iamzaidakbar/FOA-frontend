const Divider = ({ text }) => (
  <div className="flex items-center justify-center my-6">
    <div className="flex-grow border-t border-gray-300"></div>
    <span className="mx-4 text-gray-500 font-medium text-sm">{text}</span>
    <div className="flex-grow border-t border-gray-300"></div>
  </div>
);

export default Divider;
