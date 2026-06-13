import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 px-10 py-12">

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-sm leading-6">
            It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout.
          </p>
        </div>

        {/* Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Info</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about-us" className="hover:text-blue-500">About</Link></li>
            <li><Link href="/contact-us" className="hover:text-blue-500">Support</Link></li>
            <li><Link href="/contact-us" className="hover:text-blue-500">Contact</Link></li>
            <li><Link href="/terms-conditions" className="hover:text-blue-500">Privacy</Link></li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
          <p className="text-sm mb-4">
            It is a long established fact that a reader will be distracted by
          </p>

          <div className="flex items-center gap-3">
            <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
              <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" className="h-6" />
            </a>
            <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
              <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" className="h-6" />
            </a>
            <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
              <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" className="h-6" />
            </a>
          </div>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Get Social</h2>
          <p className="text-sm mb-4">
            It is a long established fact that a reader will be distracted by
          </p>

          <div className="flex gap-4 text-xl">

            <a href="https://facebook.com" target="_blank">
              <i className="fa-brands fa-facebook hover:text-blue-500"></i>
            </a>

            <a href="https://instagram.com" target="_blank">
              <i className="fa-brands fa-instagram hover:text-pink-500"></i>
            </a>

            <a href="https://youtube.com" target="_blank">
              <i className="fa-brands fa-youtube hover:text-red-500"></i>
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t text-sm">

        <p>© Copyright Swish 2025</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <Link href="/privacy" className="hover:text-blue-500">
            Privacy policy
          </Link>
          <Link href="/terms" className="hover:text-blue-500">
            Terms & conditions
          </Link>
        </div>

      </div>

    </footer>
  );
}