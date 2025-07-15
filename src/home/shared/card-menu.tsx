import React from "react";

type CardMenuProps = {
  x: number;
  y: number;
  onClose: () => void;
};

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  show?: boolean;
};

// CardMenu component
export const CardMenu = ({
  x,
  y,
  onClose,
  items,
}: CardMenuProps & { items?: MenuItem[] }) => {
  const menuItems: MenuItem[] = items || [
    { label: "Add to My Podcasts", onClick: onClose },
    { label: "Go to Podcast", onClick: onClose },
    { label: "Share podcast", onClick: onClose },
    { label: "Hide podcast", onClick: onClose },
  ];

  return (
    <div
      className="absolute z-5 min-w-[180px] rounded-md border border-[#a78bfa]/40 shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
        top: y,
        left: x,
        padding: 0,
      }}
    >
      {/* Arrow aligned right */}
      <div
        style={{
          position: "absolute",
          top: "-12px",
          right: "24px",
          width: 0,
          height: 0,
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderBottom: "12px solid #a78bfa",
          filter: "drop-shadow(0 2px 4px rgba(124,58,237,0.15))",
          zIndex: 10,
        }}
      />
      <ul className="flex flex-col py-2 px-0">
        {menuItems.map((item, idx) => (
          <React.Fragment key={item.label}>
            <li>
              <button
                className={`w-full text-left p-3 cursor-pointer text-white text-sm font-medium hover:bg-[#a78bfa]/30 transition ${
                  idx === 0 ? "rounded-t-2xl" : ""
                } ${idx === menuItems.length - 1 ? "rounded-b-2xl" : ""}`}
                style={{ letterSpacing: "0.01em" }}
                onClick={item.onClick}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
            {idx < menuItems.length - 1 && (
              <li>
                <div className="border-t border-[#a78bfa]/30 mx-5" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
