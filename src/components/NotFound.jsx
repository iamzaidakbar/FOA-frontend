import { Empty } from "antd";
import Button from "./ui/Button";
import { IoChevronBack } from "react-icons/io5";
import { useState } from "react";

const NotFound = () => {
    const [loading, setLoading] = useState(false);
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <Empty />
      <Button
        text="Go Back"
        variant="light"
        icon={<IoChevronBack size={24} />}
        onClick={() => {
            setLoading(true);
            window.history.back();
        }}
        loading={loading}
        className="mt-8"
        size="sm"
      />
    </div>
  );
};

export default NotFound;
