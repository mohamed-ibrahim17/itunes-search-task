import { ReactNode } from "react";

interface SideNavSectionTitleProps {
  children: ReactNode;
}

export default function SideNavSectionTitle({
  children,
}: SideNavSectionTitleProps) {
  return (
    <div className="mt-6 mb-1 px-3 text-xs font-bold tracking-widest text-[#7a7b8c]">
      {children}
    </div>
  );
}
