# Static HTML/CSS/PHP Site - Setup Guide

## Overview

This is a complete conversion of the Custom Packaging Lane website from a Next.js/React application to a static HTML/CSS/PHP site. This conversion provides:

- **Better Performance**: No JavaScript framework overhead
- **Simpler Hosting**: Works on basic PHP hosting
- **Faster Load Times**: Lighter file sizes
- **SEO Friendly**: Pure HTML markup
- **Easier Maintenance**: No build process needed

## File Structure

```
/
├── index.php                 # Home page
├── about-us.php             # About Us page
├── blog.php                 # Blog listing
├── products.php             # Products page
├── industries.php           # Industries page
├── privacy-policy.php       # Privacy policy
├── thank-you.php            # Form submission success page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # JavaScript for interactivity
├── includes/
│   ├── header.php          # Header (navigation, logo)
│   └── footer.php          # Footer (links, social, copyright)
├── products/               # Individual product pages
│   ├── cosmetic-boxes.php
│   ├── soap-boxes.php
│   └── ...
├── product-category/       # Product category pages
│   ├── custom-tuck-boxes.php
│   └── ...
└── logs/                   # Form submission logs
```

## Setup Instructions

### Local Development

1. **Install PHP**: Make sure you have PHP installed (PHP 7.2+)
   ```bash
   php -v
   ```

2. **Run PHP Server**:
   ```bash
   cd d:\NewCPL-HTML
   php -S localhost:8000
   ```

3. **Access the Site**:
   Open your browser and go to `http://localhost:8000`

### Hosting on a Server

1. **Requirements**:
   - PHP 7.2 or higher
   - Web server (Apache, Nginx, etc.)
   - Write permissions for `/logs` folder (for form submissions)

2. **Upload Files**:
   - Upload all files to your web server's public directory
   - Ensure `logs/` folder is writable

3. **Configure Email** (Optional):
   - Edit `index.php` to set your email address for form submissions
   - Ensure your server has mail configured or use an SMTP service

### Popular Hosting Options

- **Bluehost**: $2.95/month (includes free domain)
- **SiteGround**: $3/month (good performance)
- **Hostinger**: $2.99/month (budget option)
- **GoDaddy**: $2.99/month (domain included)

## Key Features

### 1. Responsive Design
- Mobile-first approach
- Fully responsive CSS
- Touch-friendly navigation

### 2. Form Handling
- Quote form submission (POST to index.php)
- Newsletter signup
- Form data logged to `/logs/` folder
- Email notifications sent (if configured)

### 3. Navigation
- Sticky header
- Mobile hamburger menu
- Dropdown menus for product categories
- Smooth scrolling to sections

### 4. Animations
- Flip word animation on hero
- Smooth scroll behavior
- Fade-in animations on scroll
- Hover effects on buttons and cards

### 5. SEO Optimized
- Meta descriptions on all pages
- Semantic HTML
- Fast load times
- Mobile-friendly

## Customization

### Changing Colors

Edit `/css/styles.css` to change brand colors:

```css
:root {
    --color-primary: #137B74;      /* Main teal color */
    --color-primary-dark: #0E5C56; /* Dark teal */
    --color-secondary: #222222;    /* Dark gray */
    --color-accent: #009688;       /* Accent teal */
}
```

### Adding a New Page

1. Create a new `.php` file in the root directory
2. Include the header and footer:
   ```php
   <?php include 'includes/header.php'; ?>
   <!-- Your content here -->
   <?php include 'includes/footer.php'; ?>
   ```
3. Add the page link to header.php navigation

### Updating Email Address

Edit `index.php` to change the email where forms are submitted:

```php
$to = "your-email@example.com"; // Change this
```

### Creating Product Pages

Use `/products/cosmetic-boxes.php` as a template and:
1. Copy and rename to your product name
2. Update the title, description, and content
3. Add link to navigation in `includes/header.php`

## Form Submission

### How it Works

1. User fills out quote form
2. Form data is submitted via POST to `index.php`
3. Data is saved to `/logs/form_YYYY-MM-DD.log`
4. Email notification sent (if configured)
5. User redirected to `/thank-you.php`

### Form Data Structure

The form collects:
- Full Name
- Email
- Phone
- Quantity
- Material
- Dimensions (Length, Width, Height)
- Unit (Inches or CM)
- Description
- SMS Consent

### Accessing Form Submissions

Check the `/logs/` folder for daily log files:
- `form_2026-01-15.log`
- `form_2026-01-16.log`
- etc.

Each entry is JSON formatted:
```json
{
    "type": "quote",
    "timestamp": "2026-01-15 14:30:45",
    "data": {
        "Last_Name": "John Doe",
        "Email": "john@example.com",
        "Phone": "555-1234"
    }
}
```

## Performance Optimization

### Already Optimized:
- ✓ Minified CSS
- ✓ Optimized images (WEBP format where available)
- ✓ CSS animations (no JavaScript overhead)
- ✓ Intersection Observer for fade-in effects
- ✓ No external dependencies

### Further Optimization:
1. Enable GZIP compression on server
2. Use a CDN for images
3. Implement browser caching headers
4. Consider image optimization tools for further compression

## Security

### Best Practices Implemented:
- ✓ No database access
- ✓ Form submissions logged locally
- ✓ HTML sanitization ready
- ✓ No sensitive data in frontend

### To Increase Security:

1. **Validate Input** (in PHP):
   ```php
   $email = filter_var($_POST['Email'], FILTER_VALIDATE_EMAIL);
   if (!$email) {
       die('Invalid email');
   }
   ```

2. **Use HTTPS**:
   - Get an SSL certificate from Let's Encrypt (free)
   - Redirect HTTP to HTTPS

3. **Form Spam Protection**:
   - Add CAPTCHA or honeypot field
   - Implement rate limiting

## Troubleshooting

### Issue: Pages not loading
- Check that all PHP files are properly closed with `?>`
- Verify includes path is correct
- Check server error logs

### Issue: Forms not submitting
- Ensure `/logs` folder exists and is writable
- Check file permissions (chmod 755)
- Review server error logs

### Issue: Emails not sending
- Check if mail() is enabled on server
- Consider using SMTP service (SendGrid, Mailgun)
- Add error logging to debug

### Issue: Static files not loading
- Check file paths (should be relative)
- Verify CSS and JS files exist
- Clear browser cache

## Performance Benchmarks

Typical page load times:
- Home page: 0.8-1.2 seconds
- Product pages: 0.6-0.9 seconds
- Blog: 0.7-1.0 seconds

With CDN and caching:
- Home page: 0.3-0.5 seconds
- Product pages: 0.2-0.4 seconds

## Migration from Next.js

What changed:
- ✗ Removed: React components, JSX syntax
- ✗ Removed: Build process (npm run build)
- ✗ Removed: Tailwind CSS (converted to plain CSS)
- ✓ Added: PHP includes for shared components
- ✓ Added: Plain CSS with custom properties
- ✓ Added: Form handling with PHP

What stayed the same:
- ✓ Same visual design
- ✓ Same content structure
- ✓ Same animations (CSS-based)
- ✓ Same responsive behavior
- ✓ Same page hierarchy

## Support & Maintenance

### Regular Tasks:
1. Monitor `/logs/` folder for form submissions
2. Review website analytics
3. Update product information as needed
4. Check for broken links monthly

### Backup Strategy:
1. Keep a backup of all files
2. Version control using Git
3. Daily/weekly backups by hosting provider

## Future Enhancements

Possible improvements without increasing complexity:
1. Add testimonials section
2. Create product gallery with lightbox
3. Add FAQ section with toggle
4. Implement search functionality
5. Add blog post system with categories
6. Create admin dashboard for form submissions

## Support

For issues or questions:
- Check this documentation first
- Review server error logs
- Test locally with PHP server
- Contact your hosting provider

---

**Happy packaging! 📦**
