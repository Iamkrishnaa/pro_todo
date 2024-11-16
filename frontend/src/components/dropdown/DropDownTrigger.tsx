interface DropdownTriggerProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const DropdownTrigger = ({ onClick, children }: DropdownTriggerProps) => {
  return (
    <button onClick={onClick} className="dropdown-trigger">
      {children}
    </button>
  );
};

export default DropdownTrigger;
