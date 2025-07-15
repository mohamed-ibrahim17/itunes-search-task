import ReactDOM from "react-dom";
import { CardMenu } from "./CardMenu";
import { MenuPortalProps } from "@/types/components";
import type { MenuItem } from "./CardMenu";

// MenuPortal component for rendering CardMenu in a portal
export const MenuPortal = ({
  menuState,
  onClose,
  sectionRef,
  items,
}: MenuPortalProps & {
  menuState: {
    episodeId?: number | null;
    podcastId?: number | null;
    x: number;
    y: number;
  };
  items?: MenuItem[];
}) => {
  // If items are provided (layout menu), always render. Otherwise, require an id (context menu)
  if (!sectionRef.current) return null;
  if (!items && menuState.episodeId == null && menuState.podcastId == null)
    return null;

  return ReactDOM.createPortal(
    <CardMenu
      x={menuState.x}
      y={menuState.y}
      onClose={onClose}
      items={items}
    />,
    sectionRef.current
  );
};
