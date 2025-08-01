# GoldenCream Dairy - Modern React.js Website

A beautiful, modern dairy products website built with React.js, featuring a clean design inspired by GoldenCream Dairy with professional styling and smooth animations.

## 🚀 Features

- **Modern Design**: Clean, minimalistic design with dairy-themed colors (green and yellow)
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Interactive Components**: Hover effects, carousels, and interactive elements
- **Professional UI**: Tailwind CSS for consistent, beautiful styling

## 📋 Sections

1. **Header/Navbar**: Sticky navigation with logo and call-to-action
2. **Hero Section**: Full-screen hero with background image and compelling copy
3. **Products Section**: Grid layout showcasing dairy products
4. **Why Choose Us**: Feature highlights with icons and statistics
5. **Recipes Section**: Interactive carousel of dairy-based recipes
6. **Testimonials**: Customer feedback with star ratings
7. **Footer**: Contact information, social links, and newsletter signup

## 🛠️ Tech Stack

- **React.js 18**: Modern React with functional components and hooks
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **Lucide React**: Beautiful, customizable icons
- **React Router**: For navigation (ready for multi-page expansion)

## 🎨 Design Features

- **Color Scheme**: 
  - Primary: Dairy Green (#7FB069)
  - Secondary: Dairy Yellow (#F4E285)
  - Cream: (#F7F3E3)
  - Brown: (#8B4513)
- **Typography**: Poppins and Roboto fonts
- **Animations**: Fade-in, slide-up, and hover effects
- **Images**: High-quality placeholder images from Unsplash

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd moomagic-dairy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation component
│   ├── Hero.js            # Hero section
│   ├── ProductCard.js     # Individual product card
│   ├── ProductsSection.js # Products grid section
│   ├── WhyChooseUs.js     # Features section
│   ├── RecipesSection.js  # Recipe carousel
│   ├── TestimonialsSection.js # Customer testimonials
│   └── Footer.js          # Footer component
├── data/
│   └── products.js        # Dummy data for products, testimonials, recipes
├── App.js                 # Main app component
├── index.js              # React entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎯 Key Components

### Navbar
- Sticky header with backdrop blur
- Mobile-responsive hamburger menu
- Smooth hover animations
- Call-to-action buttons

### Hero Section
- Full-screen background image
- Animated text and buttons
- Scroll indicator animation
- Responsive typography

### Product Cards
- Hover effects with image scaling
- Star ratings
- Category badges
- Buy now buttons

### Recipe Carousel
- Interactive navigation
- Smooth transitions
- Difficulty and time indicators
- Dot indicators

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  'dairy-green': '#7FB069',
  'dairy-yellow': '#F4E285',
  'dairy-cream': '#F7F3E3',
  'dairy-brown': '#8B4513',
}
```

### Content
Update `src/data/products.js` to modify:
- Product information
- Customer testimonials
- Recipe details

### Images
Replace placeholder images with your own:
- Hero background image
- Product images
- Recipe images
- Customer profile pictures

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Push your code to GitHub
2. Connect your repository to Netlify/Vercel
3. Deploy automatically

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support or questions, please contact:
- Email: hello@goldencream.com
- Phone: +1 (555) 123-4567

---

**Made with ❤️ for fresh dairy lovers** 

**Tagline:** Pure gold in every sip. 