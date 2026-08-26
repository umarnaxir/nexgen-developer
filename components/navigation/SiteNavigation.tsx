import SiteNavbar from "./SiteNavbar";

type SiteNavigationProps = {
  isAdminLoggedIn?: boolean;
};

export default function SiteNavigation({
  isAdminLoggedIn = false,
}: SiteNavigationProps) {
  return <SiteNavbar isAdminLoggedIn={isAdminLoggedIn} />;
}
