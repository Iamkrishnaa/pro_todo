import React, { useEffect } from "react";
import { IoCheckbox, IoClose, IoWarning } from "react-icons/io5";
import { FaCircleInfo } from "react-icons/fa6";

interface PopupMessageProps {
  type: "error" | "warning" | "info" | "success";
  message: string;
  padding?: string;
  width?: string;
  onClose?: () => void;
  isAutoClose?: boolean;
  autoCloseTime?: number;
}

function PopupMessage(props: PopupMessageProps) {
  const { type, message } = props;
  const [show, setShow] = React.useState(true);

  const getBgColor = () => {
    switch (type) {
      case "error":
        return "bg-[#FF4D4F]/[0.3]";
      case "warning":
        return "bg-[#FAAD14]/[0.3]";
      case "info":
        return "bg-[#1890FF]/[0.3]";
      case "success":
        return "bg-[#52C41A]/[0.3]";
      default:
        return "bg-[#FAAD14]/[0.3]";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "error":
        return "border-[#FF4D4F]/[0.5]";
      case "warning":
        return "border-[#FAAD14]/[0.5]";
      case "info":
        return "border-[#1890FF]/[0.5]";
      case "success":
        return "border-[#52C41A]/[0.5]";
      default:
        return "border-[#FAAD14]/[0.5]";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "error":
        return "#FF4D4F";
      case "warning":
        return "#FAAD14";
      case "info":
        return "#1890FF";
      case "success":
        return "#52C41A";
      default:
        return "#1890FF";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return <IoWarning size={18} color={getIconColor()} />;
      case "warning":
        return <IoWarning size={18} color={getIconColor()} />;
      case "info":
        return <FaCircleInfo size={18} color={getIconColor()} />;
      case "success":
        return <IoCheckbox size={18} color={getIconColor()} />;
      default:
        return <IoWarning size={18} color={getIconColor()} />;
    }
  };

  const onClose = () => {
    if (props.onClose) {
      props.onClose();
    }

    setShow(false);
  };

  useEffect(() => {
    if (props.isAutoClose === true) {
      setTimeout(() => {
        onClose();
      }, props.autoCloseTime || 3000);
    }
  });

  return (
    <div
      className={`flex w-full items-center justify-start gap-3 rounded-lg border-[1px] ${getBorderColor()} ${getBgColor()} ${
        props.padding ? props.padding : "px-4 py-3"
      } ${props.width ? props.width : "w-full"} ${show ? "block" : "hidden"} transition-all duration-1000 ease-in-out`}
    >
      {getIcon()}
      <div className="line-clamp-2 flex-1 text-start">{message}</div>
      {props.onClose && (
        <button onClick={onClose} className="focus:outline-none" type="button">
          <IoClose size={18} color={getIconColor()} />
        </button>
      )}
    </div>
  );
}

export default PopupMessage;
