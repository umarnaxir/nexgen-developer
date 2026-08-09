import MobileNavbar from "./MobileNavbar";
import SidebarNav from "./SidebarNav";

type SiteNavigationProps = {
  isAdminLoggedIn?: boolean;
};

export default function SiteNavigation({
  isAdminLoggedIn = false,
}: SiteNavigationProps) {
  return (
    <>
      <MobileNavbar isAdminLoggedIn={isAdminLoggedIn} />
      <div className="hidden lg:contents">
        <SidebarNav isAdminLoggedIn={isAdminLoggedIn} />
      </div>
    </>
  );
}
