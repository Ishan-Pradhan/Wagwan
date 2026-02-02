import Logo from "@components/widgets/Logo";

function Header() {
  return (
    <div className="z-50 flex h-18 w-full items-center justify-start border-b border-gray-300 bg-white px-6 py-2 dark:bg-gray-800">
      <Logo />
    </div>
  );
}

export default Header;
