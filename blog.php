<?php ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Read our latest articles on packaging trends, design tips, and industry insights.">
    <title>Blog | Custom Packaging Lane</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            padding: 2rem 0;
        }
        .blog-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        .blog-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .blog-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #137B74, #009688);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
        }
        .blog-content {
            padding: 1.5rem;
        }
        .blog-date {
            font-size: 0.875rem;
            color: #137B74;
            margin-bottom: 0.5rem;
        }
        .blog-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #222;
            margin-bottom: 0.75rem;
        }
        .blog-excerpt {
            font-size: 0.95rem;
            color: #666;
            line-height: 1.6;
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
                    <h1 style="color: #137B74; margin-bottom: 1rem;">Blog</h1>
                    <p style="font-size: 1.125rem; color: #666;">Insights, trends, and tips for custom packaging</p>
                </div>
            </section>

            <!-- Blog Posts -->
            <section style="padding: 3rem 1rem;">
                <div class="max-width">
                    <div class="blog-grid">
                        <div class="blog-card">
                            <div class="blog-image">📦 Box Trends 2026</div>
                            <div class="blog-content">
                                <div class="blog-date">January 15, 2026</div>
                                <h3 class="blog-title">The Latest Box Design Trends</h3>
                                <p class="blog-excerpt">Discover the hottest packaging design trends that are capturing customer attention in 2026...</p>
                            </div>
                        </div>

                        <div class="blog-card">
                            <div class="blog-image">🌱 Eco Packaging</div>
                            <div class="blog-content">
                                <div class="blog-date">January 10, 2026</div>
                                <h3 class="blog-title">Going Green: Sustainable Packaging Guide</h3>
                                <p class="blog-excerpt">Learn how to make your packaging more sustainable without compromising on quality...</p>
                            </div>
                        </div>

                        <div class="blog-card">
                            <div class="blog-image">🎨 Design Tips</div>
                            <div class="blog-content">
                                <div class="blog-date">January 5, 2026</div>
                                <h3 class="blog-title">Design Tips for Maximum Impact</h3>
                                <p class="blog-excerpt">5 proven design principles that will make your packaging stand out on shelves...</p>
                            </div>
                        </div>

                        <div class="blog-card">
                            <div class="blog-image">📊 Market Analysis</div>
                            <div class="blog-content">
                                <div class="blog-date">December 28, 2025</div>
                                <h3 class="blog-title">Packaging Industry Report 2026</h3>
                                <p class="blog-excerpt">What the packaging industry looks like in 2026 and predictions for growth...</p>
                            </div>
                        </div>

                        <div class="blog-card">
                            <div class="blog-image">💡 Unboxing Experience</div>
                            <div class="blog-content">
                                <div class="blog-date">December 20, 2025</div>
                                <h3 class="blog-title">Creating Memorable Unboxing Moments</h3>
                                <p class="blog-excerpt">How packaging design influences customer satisfaction and brand loyalty...</p>
                            </div>
                        </div>

                        <div class="blog-card">
                            <div class="blog-image">🚀 Success Story</div>
                            <div class="blog-content">
                                <div class="blog-date">December 15, 2025</div>
                                <h3 class="blog-title">Case Study: 300% Sales Increase</h3>
                                <p class="blog-excerpt">How one brand tripled their sales with premium custom packaging solutions...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Newsletter CTA -->
            <section class="newsletter-section">
                <div class="max-width">
                    <h2>Stay Updated</h2>
                    <p>Subscribe to our newsletter for the latest packaging insights</p>
                    <form method="POST" class="newsletter-form">
                        <input type="hidden" name="formType" value="newsletter">
                        <input type="email" name="email" placeholder="Enter your email" required>
                        <button type="submit" class="btn btn-primary">Subscribe</button>
                    </form>
                </div>
            </section>
        </main>

        <?php include 'includes/footer.php'; ?>
    </div>

    <script src="js/main.js"></script>
</body>
</html>
