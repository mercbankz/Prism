"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Sparkles,
  Twitter,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Shield,
  FileText,
  AlertTriangle
} from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Security', href: '/security' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Use', href: '/legal/terms' },
    { name: 'Disclaimer', href: '/legal/disclaimer' },
    { name: 'Cookie Policy', href: '/legal/cookies' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'API Docs', href: '/docs' },
    { name: 'Community', href: '/community' },
    { name: 'Status', href: '/status' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/prismapp', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com/prismapp', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/prismapp', icon: Linkedin },
  { name: 'Email', href: 'mailto:hello@prism.app', icon: Mail },
]

export function MarketingFooter() {
  return (
    <footer className="relative bg-gradient-radial-primary/5">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="grid-pattern opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center glow-primary">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
              </div>
              <span className="font-heading text-2xl font-bold text-fg group-hover:text-primary transition-colors">
                Prism
              </span>
            </Link>
            
            <p className="text-muted leading-relaxed mb-6 max-w-sm">
              AI-powered portfolio intelligence platform that transforms how you understand and manage your investments through gamified learning.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-muted hover:text-primary hover:glow-primary transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold text-fg mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-fg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-fg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-fg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <motion.div
          className="glass-panel rounded-xl p-6 mb-8 border border-yellow-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-fg mb-2">Important Disclaimer</h4>
              <p className="text-sm text-muted leading-relaxed">
                Prism provides analytics and educational information only. We do not provide financial advice, 
                and no trading execution is performed through our platform. All investment decisions should be 
                made based on your own research and consultation with qualified financial professionals. 
                Past performance does not guarantee future results.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted">
              <span>© 2024 Prism. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Non-custodial • Read-only • Encrypted</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link 
                href="/legal/privacy" 
                className="text-sm text-muted hover:text-primary transition-colors flex items-center space-x-1"
              >
                <FileText className="w-4 h-4" />
                <span>Privacy</span>
              </Link>
              <Link 
                href="/legal/terms" 
                className="text-sm text-muted hover:text-primary transition-colors flex items-center space-x-1"
              >
                <FileText className="w-4 h-4" />
                <span>Terms</span>
              </Link>
              <Link 
                href="/status" 
                className="text-sm text-muted hover:text-primary transition-colors flex items-center space-x-1"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Status</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
