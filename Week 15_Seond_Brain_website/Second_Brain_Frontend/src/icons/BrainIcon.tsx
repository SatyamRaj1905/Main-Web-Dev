interface BrainIconProps {
  size: "sm" | "md" | "lg";
}

const sizeVariants = {
  sm: "size-3",
  md: "size-4",
  lg: "size-8",
};

export const BrainIcon = ({ size }: BrainIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`text-purple-600 z-10 ${sizeVariants[size]}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6M12 13v6"
      />
    </svg>
  );
};
