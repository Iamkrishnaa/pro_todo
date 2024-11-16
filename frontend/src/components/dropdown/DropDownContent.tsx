interface DropdownContentProps {
  children: React.ReactNode;
}

const DropdownContent = ({ children }: DropdownContentProps) => {
  return <div className="dropdown-content">{children}</div>;
};

export default DropdownContent;
