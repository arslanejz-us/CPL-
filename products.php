<?php ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Browse our complete range of custom packaging products for every industry and need.">
    <title>Products | Custom Packaging Lane</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 2rem;
            padding: 2rem 0;
        }
        .product-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        .product-card:hover {
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            transform: translateY(-5px);
        }
        .product-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #137B74, #009688);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
        }
        .product-info {
            padding: 1.5rem;
        }
        .product-name {
            font-size: 1.125rem;
            font-weight: 700;
            color: #222;
            margin-bottom: 0.5rem;
        }
        .product-desc {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 1rem;
            line-height: 1.5;
        }
        .product-link {
            display: inline-block;
            color: #137B74;
            font-weight: 600;
            text-decoration: none;
        }
        .product-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="site-wrapper">
        <?php include 'includes/header.php'; ?>

        <main class="main-content">
            <!-- Hero -->
            <section style="padding: 4rem 1rem; background-color: #f9f9f9; text-align: center;">
                <div class="max-width">
                    <h1 style="color: #137B74; margin-bottom: 1rem;">Our Products</h1>
                    <p style="font-size: 1.125rem; color: #666;">Premium custom packaging for every brand and industry</p>
                </div>
            </section>

            <!-- Products -->
            <section style="padding: 3rem 1rem;">
                <div class="max-width">
                    <h2 style="text-align: center; margin-bottom: 2rem; color: #137B74;">Custom Box Types</h2>
                    <div class="product-grid">
                        <div class="product-card">
                            <div class="product-image">📦</div>
                            <div class="product-info">
                                <h3 class="product-name">Custom Tuck Boxes</h3>
                                <p class="product-desc">Classic tuck boxes with custom printing and finishing options.</p>
                                <a href="product-category/custom-tuck-boxes.php" class="product-link">View →</a>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">📮</div>
                            <div class="product-info">
                                <h3 class="product-name">Custom Mailer Boxes</h3>
                                <p class="product-desc">Durable mailer boxes designed for safe shipping and branding.</p>
                                <a href="product-category/custom-mailer-boxes.php" class="product-link">View →</a>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">💎</div>
                            <div class="product-info">
                                <h3 class="product-name">Rigid Boxes</h3>
                                <p class="product-desc">Premium rigid boxes for luxury packaging and premium products.</p>
                                <a href="product-category/rigid-boxes.php" class="product-link">View →</a>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">🎁</div>
                            <div class="product-info">
                                <h3 class="product-name">Folding Cartons</h3>
                                <p class="product-desc">Standard folding cartons with various sizes and configurations.</p>
                                <a href="product-category/folding-cartons.php" class="product-link">View →</a>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">🖼️</div>
                            <div class="product-info">
                                <h3 class="product-name">Display Boxes</h3>
                                <p class="product-desc">Eye-catching display boxes for retail environments.</p>
                                <a href="product-category/custom-display-boxes.php" class="product-link">View →</a>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">🪟</div>
                            <div class="product-info">
                                <h3 class="product-name">Window Boxes</h3>
                                <p class="product-desc">Boxes with window cutouts to showcase your products.</p>
                                <a href="product-category/window-boxes.php" class="product-link">View →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Industry Specific -->
            <section style="padding: 3rem 1rem; background-color: #F7F7F7;">
                <div class="max-width">
                    <h2 style="text-align: center; margin-bottom: 2rem; color: #137B74;">By Industry</h2>
                    <div class="product-grid">
                        <div class="product-card">
                            <div class="product-image">💄</div>
                            <div class="product-info">
                                <h3 class="product-name">Cosmetic Boxes</h3>
                                <p class="product-desc">Beautiful packaging for cosmetics and beauty products.</p>
                                <a href="products/cosmetic-boxes.php" class="product-link">View →</a>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">🧼</div>
                            <div class="product-info">
                                <h3 class="product-name">Soap Boxes</h3>
                                <p class="product-desc">Elegant soap packaging for artisan and commercial brands.</p>
                                <a href="products/soap-boxes.php" class="product-link">View →</a>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">🕯️</div>
                            <div class="product-info">
                                <h3 class="product-name">Candle Boxes</h3>
                                <p class="product-desc">Premium packaging for candles and aromatic products.</p>
                                <a href="products/candle-boxes.php" class="product-link">View →</a>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">🌿</div>
                            <div class="product-info">
                                <h3 class="product-name">CBD Boxes</h3>
                                <p class="product-desc">Compliant packaging for CBD and wellness products.</p>
                                <a href="products/cbd-boxes.php" class="product-link">View →</a>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">🛍️</div>
                            <div class="product-info">
                                <h3 class="product-name">Retail Boxes</h3>
                                <p class="product-desc">Point-of-sale packaging for retail environments.</p>
                                <a href="products/retail-boxes.php" class="product-link">View →</a>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">⭐</div>
                            <div class="product-info">
                                <h3 class="product-name">Premium Tuck Boxes</h3>
                                <p class="product-desc">Standard tuck boxes with premium finishes and features.</p>
                                <a href="products/custom-tuck-boxes-standard.php" class="product-link">View →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA -->
            <section style="padding: 3rem 1rem; background-color: #137B74; color: white; text-align: center;">
                <div class="max-width">
                    <h2 style="color: white; margin-bottom: 1rem;">Can't find what you're looking for?</h2>
                    <p style="color: rgba(255,255,255,0.9); margin-bottom: 2rem; font-size: 1.125rem;">
                        We specialize in custom solutions. Get in touch for a bespoke quote.
                    </p>
                    <a href="index.php#quote" class="btn btn-outline" style="color: white; border-color: white;">Get a Quote</a>
                </div>
            </section>
        </main>

        <?php include 'includes/footer.php'; ?>
    </div>

    <script src="js/main.js"></script>
</body>
</html>
