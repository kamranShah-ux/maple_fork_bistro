import { useAuth } from "@/_core/hooks/useAuth";
import ReservationForm from "@/components/ReservationForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, Clock, MapPin, Phone, Mail, Facebook, Instagram, Star, Utensils, Users, Leaf } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Maple Fork Bistro - Home Page
 * Design: Warm Inviting Comfort Design
 * Color Palette: Soft cream (#FBF8F3), Warm brown (#6B4423), Sage green (#7BA88F), Gold (#D4A574), Coral (#E8A89B)
 * Typography: Merriweather serif for headings, Inter sans-serif for body
 * Layout: Flowing organic sections with rounded corners and curved dividers
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = [
    {
      category: "Signature Dishes",
      items: [
        { name: "Grilled Herb Chicken", description: "Herb-marinated chicken breast with seasonal vegetables and warm sauce", price: "$18.95" },
        { name: "Classic Beef Burger", description: "Handcrafted beef patty with fresh toppings on artisan bread", price: "$16.95" },
        { name: "Creamy Mushroom Pasta", description: "Fresh pasta with locally-sourced mushrooms in creamy sauce", price: "$17.95" },
      ]
    },
    {
      category: "Fresh Salads",
      items: [
        { name: "Garden Fresh Salad Bowl", description: "Mixed greens with seasonal vegetables and house vinaigrette", price: "$12.95" },
        { name: "Warm Beet & Goat Cheese", description: "Roasted beets with creamy goat cheese and candied walnuts", price: "$14.95" },
        { name: "Grilled Chicken Caesar", description: "Classic Caesar with grilled chicken and fresh parmesan", price: "$15.95" },
      ]
    },
    {
      category: "Desserts",
      items: [
        { name: "Homemade Lemon Tart", description: "Zesty lemon custard in buttery pastry shell", price: "$8.95" },
        { name: "Chocolate Flourless Cake", description: "Rich, decadent chocolate cake with berry compote", price: "$9.95" },
        { name: "Seasonal Fruit Crumble", description: "Fresh seasonal fruits with warm crumble topping", price: "$8.95" },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Utensils className="w-8 h-8 text-[#D4A574]" />
            <h1 className="text-2xl font-bold text-[#6B4423]">Maple Fork Bistro</h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#menu" className="text-[#6B4423] hover:text-[#D4A574] transition-colors">Menu</a>
            <a href="#about" className="text-[#6B4423] hover:text-[#D4A574] transition-colors">About</a>
            <a href="#hours" className="text-[#6B4423] hover:text-[#D4A574] transition-colors">Hours</a>
            <a href="#contact" className="text-[#6B4423] hover:text-[#D4A574] transition-colors">Contact</a>
          </div>
          <Button className="btn-primary" onClick={() => setIsReservationOpen(true)}>Reserve Table</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-0 overflow-hidden">
        <div className="relative h-[600px] md:h-[700px] flex items-center">
          <img 
            src="/images/hero-main.jpg" 
            alt="Cozy bistro dining" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#6B4423]/70 via-[#6B4423]/50 to-transparent"></div>
          
          <motion.div 
            className="relative container z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-2xl">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Fresh Comfort Food
              </motion.h1>
              <motion.p 
                className="text-2xl text-[#D4A574] mb-8 font-serif"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Made Local
              </motion.p>
              <motion.p 
                className="text-lg text-white/90 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Experience warm hospitality and handcrafted recipes designed to bring people together. Every dish prepared with seasonal ingredients and attention to quality.
              </motion.p>
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button className="btn-primary text-lg px-8 py-6">Order Now</Button>
                <Button className="btn-outline text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-[#6B4423]">Learn More</Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-[#6B4423]" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="card-warm p-8 text-center">
              <Leaf className="w-12 h-12 text-[#7BA88F] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#6B4423] mb-3">Fresh Ingredients</h3>
              <p className="text-gray-600">Locally-sourced seasonal ingredients for maximum flavor and quality</p>
            </motion.div>

            <motion.div variants={itemVariants} className="card-warm p-8 text-center">
              <Users className="w-12 h-12 text-[#D4A574] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#6B4423] mb-3">Warm Hospitality</h3>
              <p className="text-gray-600">Genuine service and welcoming atmosphere for every guest</p>
            </motion.div>

            <motion.div variants={itemVariants} className="card-warm p-8 text-center">
              <Utensils className="w-12 h-12 text-[#E8A89B] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#6B4423] mb-3">Handcrafted Recipes</h3>
              <p className="text-gray-600">Prepared in-house with attention to taste and presentation</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 md:py-24 bg-[#FBF8F3]">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#6B4423] mb-4">Our Menu</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our carefully curated selection of comfort food dishes made with love and the finest local ingredients</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {menuItems.map((category, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="card-warm p-8"
              >
                <h3 className="text-2xl font-bold text-[#6B4423] mb-6">{category.category}</h3>
                <div className="space-y-6">
                  {category.items.map((item, itemIdx) => (
                    <motion.div 
                      key={itemIdx}
                      className="pb-6 border-b border-[#E8E3DB] last:border-b-0 last:pb-0"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-[#6B4423]">{item.name}</h4>
                        <span className="text-[#D4A574] font-bold">{item.price}</span>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Button className="btn-secondary text-lg px-8 py-6">View Full Menu</Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Dish Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img 
                src="/images/signature-dish.jpg" 
                alt="Signature herb-grilled chicken" 
                className="w-full h-[500px] object-cover"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-[#D4A574] fill-[#D4A574]" />
                <span className="text-[#D4A574] font-semibold">Signature Dish</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#6B4423] mb-6">Grilled Herb Chicken</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our most beloved dish, featuring herb-marinated chicken breast grilled to perfection. Served with seasonal vegetables and a rich, warming sauce made from locally-sourced ingredients. Every element is carefully prepared to create a harmonious blend of flavors.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-[#7BA88F]" />
                  <span className="text-gray-700">Fresh herbs from local farms</span>
                </li>
                <li className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-[#7BA88F]" />
                  <span className="text-gray-700">Seasonal vegetables at peak freshness</span>
                </li>
                <li className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-[#7BA88F]" />
                  <span className="text-gray-700">Handcrafted sauce made in-house</span>
                </li>
              </ul>
              <Button className="btn-primary text-lg px-8 py-6">Order This Dish</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#6B4423] mb-4">What Our Guests Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover why our customers love dining at Maple Fork Bistro</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={itemVariants}
              className="card-warm p-8 relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4A574] fill-[#D4A574]" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The Grilled Herb Chicken was absolutely divine! The flavors were so well-balanced and the service was impeccable. We felt like family here."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#D4A574] flex items-center justify-center text-white font-bold">JM</div>
                <div>
                  <p className="font-semibold text-[#6B4423]">Jennifer Martinez</p>
                  <p className="text-sm text-gray-600">Regular Customer</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="card-warm p-8 relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4A574] fill-[#D4A574]" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "I brought my family here for our anniversary and it was perfect. The ambiance is so warm and welcoming, and every dish was prepared with such care."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#7BA88F] flex items-center justify-center text-white font-bold">RC</div>
                <div>
                  <p className="font-semibold text-[#6B4423]">Robert Chen</p>
                  <p className="text-sm text-gray-600">Family Dining</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="card-warm p-8 relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4A574] fill-[#D4A574]" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "As a food enthusiast, I am impressed by the quality of ingredients and the creativity in every dish. This is comfort food elevated to an art form!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E8A89B] flex items-center justify-center text-white font-bold">SL</div>
                <div>
                  <p className="font-semibold text-[#6B4423]">Sarah Liu</p>
                  <p className="text-sm text-gray-600">Food Blogger</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-600 mb-6">Join hundreds of satisfied customers who have experienced the Maple Fork Bistro difference</p>
            <Button className="btn-secondary text-lg px-8 py-6" onClick={() => setIsReservationOpen(true)}>Make a Reservation</Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-[#FBF8F3]">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#6B4423] mb-6">About Maple Fork Bistro</h2>
              <p className="text-lg text-gray-600 mb-6">
                Maple Fork Bistro is a locally inspired restaurant dedicated to bringing people together through exceptional food and warm hospitality. We believe that great meals start with great ingredients, which is why we partner with local farmers and producers to source the freshest seasonal ingredients.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Every dish that leaves our kitchen is prepared with care and attention to detail. Our team of skilled chefs combines traditional techniques with creative flair to deliver comfort food that nourishes both body and soul.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're celebrating a special occasion or simply seeking a warm, welcoming place to enjoy a meal, Maple Fork Bistro is your destination for fresh, handcrafted comfort food made local.
              </p>
            </motion.div>

            <motion.div 
              className="rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img 
                src="/images/team-welcome.jpg" 
                alt="Maple Fork Bistro team" 
                className="w-full h-[500px] object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dining Experience Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#6B4423] mb-4">The Dining Experience</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Immerse yourself in warmth, comfort, and exceptional cuisine</p>
          </motion.div>

          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-xl h-[500px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img 
              src="/images/dining-ambiance.jpg" 
              alt="Intimate dining ambiance" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#6B4423]/60 to-transparent flex items-end">
              <div className="p-8 md:p-12 text-white">
                <h3 className="text-3xl font-bold mb-3">Intimate & Welcoming</h3>
                <p className="text-lg">Experience the warmth of our bistro, where every detail is designed to make you feel at home</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hours & Location Section */}
      <section id="hours" className="py-16 md:py-24 bg-[#FBF8F3]">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="card-warm p-8">
              <Clock className="w-8 h-8 text-[#D4A574] mb-4" />
              <h3 className="text-2xl font-bold text-[#6B4423] mb-6">Hours of Operation</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Monday – Thursday</span>
                  <span className="font-semibold">11:00 AM – 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday – Saturday</span>
                  <span className="font-semibold">11:00 AM – 10:30 PM</span>
                </div>
                <div className="flex justify-between text-[#E8A89B]">
                  <span>Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card-warm p-8">
              <MapPin className="w-8 h-8 text-[#7BA88F] mb-4" />
              <h3 className="text-2xl font-bold text-[#6B4423] mb-6">Location</h3>
              <p className="text-gray-700 mb-4">
                <strong>Unit 12, Willow Plaza</strong><br />
                Greenwood Avenue<br />
                Riverton City, RC 45210
              </p>
              <Button className="btn-secondary w-full">Get Directions</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#6B4423] mb-8">Get in Touch</h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.a 
                href="tel:+15557421839"
                variants={itemVariants}
                className="card-warm p-8 flex items-center justify-center gap-4 hover:bg-[#D4A574] transition-colors group"
              >
                <Phone className="w-8 h-8 text-[#D4A574] group-hover:text-white" />
                <div className="text-left">
                  <p className="text-sm text-gray-600 group-hover:text-white/80">Call Us</p>
                  <p className="text-xl font-bold text-[#6B4423] group-hover:text-white">+1 (555) 742-1839</p>
                </div>
              </motion.a>

              <motion.a 
                href="mailto:info@mapleforkbistro.com"
                variants={itemVariants}
                className="card-warm p-8 flex items-center justify-center gap-4 hover:bg-[#7BA88F] transition-colors group"
              >
                <Mail className="w-8 h-8 text-[#7BA88F] group-hover:text-white" />
                <div className="text-left">
                  <p className="text-sm text-gray-600 group-hover:text-white/80">Email Us</p>
                  <p className="text-xl font-bold text-[#6B4423] group-hover:text-white">info@mapleforkbistro.com</p>
                </div>
              </motion.a>
            </motion.div>

            <motion.div 
              className="flex justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <a href="https://facebook.com/mapleforkbistro" target="_blank" rel="noopener noreferrer" className="p-4 bg-[#FBF8F3] rounded-full hover:bg-[#D4A574] transition-colors group">
                <Facebook className="w-6 h-6 text-[#6B4423] group-hover:text-white" />
              </a>
              <a href="https://instagram.com/mapleforkbistro" target="_blank" rel="noopener noreferrer" className="p-4 bg-[#FBF8F3] rounded-full hover:bg-[#D4A574] transition-colors group">
                <Instagram className="w-6 h-6 text-[#6B4423] group-hover:text-white" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#6B4423] text-white py-12">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold mb-4">Maple Fork Bistro</h4>
              <p className="text-white/80">Fresh Comfort Food, Made Local</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#menu" className="hover:text-[#D4A574] transition-colors">Menu</a></li>
                <li><a href="#about" className="hover:text-[#D4A574] transition-colors">About</a></li>
                <li><a href="#hours" className="hover:text-[#D4A574] transition-colors">Hours</a></li>
                <li><a href="#contact" className="hover:text-[#D4A574] transition-colors">Contact</a></li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-[#D4A574] transition-colors">Dine-in</a></li>
                <li><a href="#" className="hover:text-[#D4A574] transition-colors">Takeaway</a></li>
                <li><a href="#" className="hover:text-[#D4A574] transition-colors">Catering</a></li>
                <li><a href="#" className="hover:text-[#D4A574] transition-colors">Reservations</a></li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com/mapleforkbistro" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A574] transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/mapleforkbistro" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A574] transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2025 Maple Fork Bistro. All rights reserved. | Fresh Comfort Food, Made Local</p>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      <ReservationForm isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />
    </div>
  );
}
