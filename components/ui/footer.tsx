
export default function Footer() {
  return (
    <footer>
      <div className="w-screen sm:px-6">
        <div className="flex justify-center"></div>

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
          {/* Copyrights note */}
          <div className="text-sm text-gray-600 mr-4 pl-5">&copy; Kamil Matysiak</div>
        </div>
      </div>
    </footer>
  );
}
