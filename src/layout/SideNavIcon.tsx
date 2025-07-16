import { ReactNode } from "react";

interface SideNavIconProps {
  icon: ReactNode;
  label: string;
  href?: string;
}

export default function SideNavIcon({
  icon,
  label,
  href = "#",
}: SideNavIconProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[color:var(--color-secondary)] transition-colors text-[color:var(--color-foreground)] font-medium"
    >
      {icon}
      {label}
    </a>
  );
}
