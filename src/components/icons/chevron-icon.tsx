"use client";

interface ChevronIconProps {
  size?: number;
  color?: string;
  direction: string;
}

const chevronPath = "M6 3L11 8L6 13";

const ChevronIcon = ({
  size = 18,
  color = "currentColor",
  direction,
}: ChevronIconProps) => {
  // Determine the rotation angle based on the direction state
  // 0deg for 'right', 90deg for 'bottom'
  const rotationAngle = direction === "right" ? 0 : 90;

  return (
    <div style={{ cursor: "pointer", display: "flex" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: color,
          transitionProperty: "transform", // Transition the transform property
          transitionDuration: "300ms", // Animation speed
          transitionTimingFunction: "ease-in-out", // Smoothness
          transform: `rotate(${rotationAngle}deg)`, // Apply the rotation dynamically
          transformOrigin: "center", // Ensure rotation happens around the center
        }}
      >
        <path
          d={chevronPath}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ChevronIcon;
