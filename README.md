# HAC - Harika Auto Center Website

A stunning dark-themed website for HAC (Harika Auto Center) showcasing premium auto parts including cover assemblies, clutch discs, repair kits, and flywheels.

## Features

- **Dark Theme Design**: Modern, sleek dark theme with gradient accents
- **Product Catalog**: Browse cover assemblies, clutch discs, and repair kits
- **Search Functionality**: Search products by name, description, or diameter
- **Category Filtering**: Filter products by category
- **Responsive Design**: Fully responsive for all device sizes
- **Smooth Animations**: Beautiful animations using Framer Motion
- **Excel Data Integration**: Ready for Excel data integration
- **Theme Switcher**: 10 different color theme combinations
- **Logo Popup**: Interactive logo popup with smooth animations

## Product Categories

1. **Cover Assembly**: Available in diameters 430mm, 395mm, 380mm, 360mm, 350mm
2. **Clutch Disc**: Available in diameters 430mm, 395mm, 380mm, 360mm, 350mm
3. **Repair Kits / Fly Wheel**: Complete repair kits and precision flywheels

## Tech Stack

- **Next.js 14**: React framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd hac-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
hac-website/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── products/
│   │   └── page.tsx        # Products page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── LogoPopup.tsx       # Logo popup modal
│   └── ProductImage.tsx    # Product image component
├── contexts/
│   └── ThemeContext.tsx    # Theme management
├── lib/
│   ├── imageMapping.ts     # Image path mapping
│   └── imageProductMapping.ts  # Product-image mapping
├── data/
│   └── products.json       # Product data
├── public/
│   └── images/             # Product images
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Pages

- **Home (`/`)**: Landing page with hero section
- **Home (`/home`)**: Main homepage with product categories
- **Products (`/products`)**: Full product catalog with filtering and search
- **Product Details**: Individual product pages with detailed information

## Theme Options

The website includes 10 different color theme combinations:
1. Navy & White
2. Emerald & Mint
3. Purple & Lavender
4. Red & White
5. Ocean Blue
6. Sunset Orange
7. Mint Teal
8. Deep Indigo
9. Cherry Rose
10. Golden Amber

## Contact

- Email: haria@gmail.com
- Excel data available upon request

## License

© 2025 HAC - Harika Auto Center. All rights reserved.
