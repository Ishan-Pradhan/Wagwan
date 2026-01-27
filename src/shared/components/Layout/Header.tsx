import Logo from "@components/widgets/Logo";

function Header() {
  return (
    <div className="flex w-full justify-start items-center py-2 px-6 border-b border-gray-300 h-18 z-50 bg-white dark:bg-gray-800">
      <Logo />
    </div>
  );
}

export default Header;
