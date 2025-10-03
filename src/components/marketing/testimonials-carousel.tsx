"use client"

import { motion } from 'framer-motion'
import { Star, Quote, TrendingUp, Trophy, Crown } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    handle: '@sarahcrypto',
    avatar: '/avatars/sarah.jpg',
    role: 'Software Engineer',
    quote: 'Prism transformed how I understand my portfolio. The AI insights are incredibly accurate and the gamification makes learning fun.',
    stats: {
      badges: 47,
      healthScore: '+23',
      booksCompleted: 8,
    },
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    handle: '@marcusfinance',
    avatar: '/avatars/marcus.jpg',
    role: 'Product Manager',
    quote: 'The Financial Chess feature is genius. I\'ve learned more about portfolio strategy in 3 months than I did in 3 years of traditional research.',
    stats: {
      badges: 62,
      healthScore: '+31',
      booksCompleted: 12,
    },
    rating: 5,
  },
  {
    name: 'Emily Watson',
    handle: '@emilyinvests',
    avatar: '/avatars/emily.jpg',
    role: 'Marketing Director',
    quote: 'Finally, a platform that makes financial education engaging. The badge system and library have completely changed my investment approach.',
    stats: {
      badges: 38,
      healthScore: '+19',
      booksCompleted: 6,
    },
    rating: 5,
  },
  {
    name: 'David Kim',
    handle: '@davidcrypto',
    avatar: '/avatars/david.jpg',
    role: 'Entrepreneur',
    quote: 'The non-custodial approach gives me peace of mind. I can analyze my portfolio without worrying about security.',
    stats: {
      badges: 71,
      healthScore: '+28',
      booksCompleted: 15,
    },
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    handle: '@lisatrades',
    avatar: '/avatars/lisa.jpg',
    role: 'Financial Analyst',
    quote: 'The AI assistant provides insights I never would have considered. It\'s like having a personal financial advisor available 24/7.',
    stats: {
      badges: 55,
      healthScore: '+35',
      booksCompleted: 10,
    },
    rating: 5,
  },
]

export function TestimonialsCarousel() {
  return (
    <section className="py-20 bg-gradient-radial-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-fg mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Loved by Investors
            </span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            See how Prism is helping thousands of users build wealth through education
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="glass-panel rounded-2xl p-6 h-full group-hover:glow-primary transition-all duration-300">
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-primary opacity-50" />
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-muted leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* User Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-fg">{testimonial.name}</div>
                    <div className="text-sm text-muted">{testimonial.handle}</div>
                    <div className="text-xs text-primary">{testimonial.role}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="text-lg font-bold text-fg">{testimonial.stats.badges}</span>
                    </div>
                    <div className="text-xs text-muted">Badges</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-lg font-bold text-fg">{testimonial.stats.healthScore}</span>
                    </div>
                    <div className="text-xs text-muted">Health</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Crown className="w-4 h-4 text-amber-500" />
                      <span className="text-lg font-bold text-fg">{testimonial.stats.booksCompleted}</span>
                    </div>
                    <div className="text-xs text-muted">Books</div>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-fg mb-6">
              Join Our Growing Community
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-fg mb-2">4.9/5</div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-muted">Average Rating</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-fg mb-2">8,500+</div>
                <div className="text-sm text-muted">Active Users</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-fg mb-2">190,500+</div>
                <div className="text-sm text-muted">Badges Earned</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
