<header class="site-header">
    <div class="header-container">
        <a href="index.php" class="logo">
            <img src="public/Website-logos/Website-Logo.svg" alt="Custom Packaging Lane" class="logo-img">
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
            <div class="nav-item dropdown">
                <a href="industries.php" class="nav-link">Industries <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
                <div class="dropdown-menu">
                    <a href="industries.php">All Industries</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="product-category/custom-tuck-boxes.php" class="nav-link">Custom Tuck Boxes</a>
            </div>
            <div class="nav-item">
                <a href="product-category/custom-mailer-boxes.php" class="nav-link">Custom Mailer Boxes</a>
            </div>
            <div class="nav-item">
                <a href="product-category/rigid-boxes.php" class="nav-link">Rigid Boxes</a>
            </div>
            <div class="nav-item">
                <a href="product-category/folding-cartons.php" class="nav-link">Folding Cartons</a>
            </div>
            <div class="nav-item">
                <a href="product-category/custom-display-boxes.php" class="nav-link">Custom Display Boxes</a>
            </div>
            <div class="nav-item dropdown">
                <a href="index.php#styles" class="nav-link">Shapes & Styles <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
            </div>
            <div class="nav-item dropdown">
                <a href="index.php#builder" class="nav-link">Flexible Packaging <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
            </div>
            <a href="blog.php" class="nav-item">Blog</a>
        </nav>

        <!-- Desktop Actions -->
        <div class="header-actions">
            <div class="search-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" placeholder="Search">
            </div>
            <a href="#quote" class="btn btn-primary btn-sm">Get a Quote</a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" id="mobileMenuToggle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </button>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
        <a href="industries.php">Industries</a>
        <a href="product-category/custom-tuck-boxes.php">Custom Tuck Boxes</a>
        <a href="product-category/custom-mailer-boxes.php">Custom Mailer Boxes</a>
        <a href="product-category/rigid-boxes.php">Rigid Boxes</a>
        <a href="product-category/folding-cartons.php">Folding Cartons</a>
        <a href="product-category/custom-display-boxes.php">Custom Display Boxes</a>
        <a href="index.php#styles">Shapes & Styles</a>
        <a href="index.php#builder">Flexible Packaging</a>
        <a href="blog.php">Blog</a>
        <a href="#quote" class="btn btn-primary">Get a Quote</a>
    </div>
</header>

<script>
document.getElementById('mobileMenuToggle').addEventListener('click', function() {
    document.getElementById('mobileMenu').classList.toggle('active');
});
</script>
