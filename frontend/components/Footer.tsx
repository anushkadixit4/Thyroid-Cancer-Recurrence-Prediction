import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-blue-50 to-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">ThyroidAI</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Empowering healthcare professionals with AI-driven thyroid cancer recurrence prediction technology.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">Research</Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-zinc-500">
                <Mail className="h-4 w-4" />
                <span>contact@thyroidai.com</span>
              </li>
              <li className="flex items-center space-x-2 text-zinc-500">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-zinc-500">
                <MapPin className="h-4 w-4" />
                <span>123 Medical Center Dr, Suite 100</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">Newsletter</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Stay updated with our latest research and developments.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="max-w-[200px] bg-white"
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} ThyroidAI. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-zinc-500">
              <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 