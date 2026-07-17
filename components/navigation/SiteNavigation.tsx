import MobileNavbar from "./MobileNavbar";
import SidebarNav from "./SidebarNav";

export default function SiteNavigation() {
  return (
    <>
      <MobileNavbar />
      <div className="hidden lg:contents">
        <SidebarNav />
      </div>
    </>
  );
}
