<?php
// Thank you page after form submission
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Thank you for submitting your inquiry. We'll be in touch soon.">
    <title>Thank You | Custom Packaging Lane</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="site-wrapper">
        <?php include 'includes/header.php'; ?>

        <main class="main-content" style="display: flex; align-items: center; justify-content: center; min-height: 60vh; text-align: center; padding: 3rem 1rem;">
            <div class="max-width">
                <div style="margin-bottom: 2rem;">
                    <svg style="width: 80px; height: 80px; margin: 0 auto 2rem; color: #137B74;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <h1 style="color: #137B74; margin-bottom: 1rem;">Thank You!</h1>
                <p style="font-size: 1.125rem; color: #666; margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto;">
                    We've received your inquiry and our team will get back to you shortly with a custom quote and solution tailored to your needs.
                </p>

                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="index.php" class="btn btn-primary">Back to Home</a>
                    <a href="products.php" class="btn btn-outline">View Products</a>
                </div>

                <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
                    <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">What Happens Next?</h3>
                    <ul style="list-style: none; text-align: left; display: inline-block;">
                        <li style="padding: 0.75rem 0; color: #555;">✓ Our team reviews your specifications</li>
                        <li style="padding: 0.75rem 0; color: #555;">✓ We calculate the best pricing and timeline</li>
                        <li style="padding: 0.75rem 0; color: #555;">✓ You receive a detailed quote within 24 hours</li>
                    </ul>
                </div>
            </div>
        </main>

        <?php include 'includes/footer.php'; ?>
    </div>

    <script src="js/main.js"></script>
</body>
</html>
