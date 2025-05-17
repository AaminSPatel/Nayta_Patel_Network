import Link from "next/link";
import { FaWhatsapp, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Nayta Patel Network</h3>
            <p className="text-gray-600 mb-4">
              Digital Voice of Our Rural Power
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/917747074841"
                className="text-gray-600 hover:text-emerald-500"
              >
                <FaWhatsapp size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-500">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-500">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/prices"
                  className="text-gray-600 hover:text-emerald-500"
                >
                  Prices
                </Link>
              </li>
              <li>
                <Link
                  href="/wall"
                  className="text-gray-600 hover:text-emerald-500"
                >
                  Community Wall
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-600 hover:text-emerald-500"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/stories"
                  className="text-gray-600 hover:text-emerald-500"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/learning"
                  className="text-gray-600 hover:text-emerald-500"
                >
                  Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace"
                  className="text-gray-600 hover:text-emerald-500"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/directory"
                  className="text-gray-600 hover:text-emerald-500"
                >
                  Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-emerald-500"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-600">
              <p>
                Email:{" "}
                <a
                  href="mailto:naytapatelnetwork@gmail.com"
                  className="text-emerald-600 underline"
                >
                  naytapatelnetwork@gmail.com
                </a>
              </p>
              <p>
                Phone:
                <a
                  href="https://wa.me/917747074841"
                  className="text-gray-600 hover:text-emerald-500"
                >
                  +91 9876543210
                </a>
              </p>
              <p className="mt-4">
                <Link
                  href="/contact"
                  className="text-emerald-500 hover:underline"
                >
                  Send us a message
                </Link>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Nayta Patel Network. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
