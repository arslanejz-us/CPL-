<?php
// Form handling
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['formType'])) {
    $formType = $_POST['formType'];
    $formData = [
        'type' => $formType,
        'timestamp' => date('Y-m-d H:i:s'),
        'data' => $_POST
    ];

    @mkdir('logs', 0755, true);
    file_put_contents('logs/form_' . date('Y-m-d') . '.log', json_encode($formData) . "\n", FILE_APPEND);

    $to = "inquiry@custompackaginglane.com";
    $subject = "New " . ucfirst($formType) . " Form Submission";
    $message = "A new form has been submitted:\n\n";
    foreach ($_POST as $key => $value) {
        if ($key !== 'formType') {
            $message .= ucfirst(str_replace('_', ' ', $key)) . ": " . (is_array($value) ? implode(', ', $value) : $value) . "\n";
        }
    }
    @mail($to, $subject, $message);

    header('Location: thank-you.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Custom packaging solutions for brands that need premium quality packaging and memorable customer experiences. Get a free custom quote today.">
    <title>Custom Packaging Lane | Built to be Unboxed</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- HEADER/NAVIGATION -->
    <header class="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-100" style="position: sticky; top: 0; background: white; border-bottom: 1px solid #e5e7eb; z-index: 50;">
        <div class="max-width" style="max-width: 1280px; margin: 0 auto; padding: 0 1rem; display: flex; align-items: center; justify-content: space-between; height: 68px;">
            <!-- Logo -->
            <a href="index.php" class="flex items-center">
                <img src="public/Website-logos/Website-Logo.svg" alt="Custom Packaging Lane" style="height: 40px; width: auto;">
            </a>

            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex items-center gap-7" style="display: flex; gap: 1.75rem; align-items: center;">
                <a href="industries.php" style="font-size: 0.875rem; font-weight: 500; color: #374151; text-decoration: none;">Industries</a>
                <a href="product-category/custom-tuck-boxes.php" style="font-size: 0.875rem; font-weight: 500; color: #374151; text-decoration: none;">Custom Tuck Boxes</a>
                <a href="product-category/custom-mailer-boxes.php" style="font-size: 0.875rem; font-weight: 500; color: #374151; text-decoration: none;">Custom Mailer Boxes</a>
                <a href="product-category/rigid-boxes.php" style="font-size: 0.875rem; font-weight: 500; color: #374151; text-decoration: none;">Rigid Boxes</a>
                <a href="product-category/folding-cartons.php" style="font-size: 0.875rem; font-weight: 500; color: #374151; text-decoration: none;">Folding Cartons</a>
                <a href="product-category/custom-display-boxes.php" style="font-size: 0.875rem; font-weight: 500; color: #374151; text-decoration: none;">Custom Display Boxes</a>
                <a href="#styles" style="font-size: 0.875rem; font-weight: 500; color: #374151; text-decoration: none;">Shapes & Styles</a>
                <a href="#builder" style="font-size: 0.875rem; font-weight: 500; color: #374151; text-decoration: none;">Flexible Packaging</a>
                <a href="blog.php" style="font-size: 0.875rem; font-weight: 500; color: #374151; text-decoration: none;">Blog</a>
            </nav>

            <!-- Actions -->
            <div class="hidden md:flex items-center gap-3" style="display: flex; gap: 0.75rem; align-items: center;">
                <a href="#quote" class="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2 px-5 text-sm rounded-lg" style="background-color: #137B74; color: white; padding: 0.625rem 1.25rem; font-size: 0.875rem; font-weight: 600; border-radius: 8px; text-decoration: none;">Get a Quote</a>
            </div>
        </div>
    </header>

    <main>
        <!-- 1. HERO SECTION -->
        <section style="position: relative; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; background-color: #fbfbfa;">
            <div style="position: absolute; inset: 0;">
                <img src="public/hero-section.png" alt="Custom printed packaging boxes" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(255,255,255,0.75), rgba(255,255,255,0.5), rgba(255,255,255,0.75));"></div>
            </div>

            <div style="position: relative; z-index: 10; text-align: center; padding: 3rem 1rem; max-width: 700px;">
                <p style="font-family: 'Montserrat'; font-size: 0.875rem; font-weight: 400; text-transform: uppercase; color: #137B74; margin-bottom: 1.25rem; letter-spacing: 0.05em;">Custom Retail Packaging - US-Based</p>

                <h1 style="font-family: 'Poppins'; font-size: 2.5rem; font-weight: 700; color: #000; line-height: 1.1; margin-bottom: 1.5rem;">
                    Built to be<br>
                    <span style="color: #137B74;" id="flipWords">unboxed</span>
                </h1>

                <p style="font-family: 'Montserrat'; font-size: 0.875rem; font-weight: 600; color: #787572; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6;">We design and manufacture custom printed boxes that turn a delivery into a moment - for retail brands that care how they arrive.</p>

                <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center;">
                    <a href="#quote" style="background-color: #137B74; color: white; padding: 0.75rem 1.5rem; font-size: 1rem; font-weight: 600; border-radius: 10px; text-decoration: none; display: inline-block;">Get a Quote</a>
                    <a href="#styles" style="background-color: transparent; color: #222; border: 2px solid #222; padding: 0.75rem 1.5rem; font-size: 1rem; font-weight: 600; border-radius: 10px; text-decoration: none; display: inline-block;">Explore Categories</a>
                </div>
            </div>
        </section>

        <!-- 2. TRUSTED BRANDS MARQUEE -->
        <section style="background-color: white; padding: 2rem 0; overflow: hidden;">
            <div style="max-width: 1280px; margin: 0 auto; padding: 0 1rem;">
                <p style="text-align: center; font-size: 0.875rem; color: #999; margin-bottom: 1.5rem;">Trusted by leading brands</p>
                <div style="overflow: hidden;">
                    <div style="display: flex; gap: 3rem; animation: scroll-left 30s linear infinite;">
                        <span style="flex-shrink: 0; font-weight: 600; font-size: 1.125rem; color: #333; opacity: 0.7;">⭐ Google</span>
                        <span style="flex-shrink: 0; font-weight: 600; font-size: 1.125rem; color: #333; opacity: 0.7;">💼 HP</span>
                        <span style="flex-shrink: 0; font-weight: 600; font-size: 1.125rem; color: #333; opacity: 0.7;">🛒 Shopify</span>
                        <span style="flex-shrink: 0; font-weight: 600; font-size: 1.125rem; color: #333; opacity: 0.7;">💄 L'ORÉAL</span>
                        <span style="flex-shrink: 0; font-weight: 600; font-size: 1.125rem; color: #333; opacity: 0.7;">☕ PIQUE</span>
                        <span style="flex-shrink: 0; font-weight: 600; font-size: 1.125rem; color: #333; opacity: 0.7;">🌿 GREEN GIRL</span>
                        <span style="flex-shrink: 0; font-weight: 600; font-size: 1.125rem; color: #333; opacity: 0.7;">⭐ Google</span>
                        <span style="flex-shrink: 0; font-weight: 600; font-size: 1.125rem; color: #333; opacity: 0.7;">💼 HP</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 3. FEATURES -->
        <section style="background-color: #F7F7F7; padding: 2rem 1rem;">
            <div style="max-width: 1280px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0; border: 1px solid #e5e7eb;">
                    <!-- Feature 1 -->
                    <div style="display: flex; align-items: flex-start; gap: 1rem; padding: 1.5rem; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;">
                        <svg style="width: 32px; height: 32px; color: #137B74; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        </svg>
                        <div>
                            <h3 style="font-size: 0.875rem; font-weight: 700; text-transform: uppercase; color: #222; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Flexible Order Volume</h3>
                            <p style="font-family: 'Montserrat'; font-size: 0.75rem; color: #999; margin: 0; line-height: 1.5;">From low MOQs to high-volume production runs.</p>
                        </div>
                    </div>

                    <!-- Feature 2 -->
                    <div style="display: flex; align-items: flex-start; gap: 1rem; padding: 1.5rem; border-bottom: 1px solid #e5e7eb;">
                        <svg style="width: 32px; height: 32px; color: #137B74; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                            <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
                        </svg>
                        <div>
                            <h3 style="font-size: 0.875rem; font-weight: 700; text-transform: uppercase; color: #222; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Fastest Turnaround</h3>
                            <p style="font-family: 'Montserrat'; font-size: 0.75rem; color: #999; margin: 0; line-height: 1.5;">7–10 business day lead times with free shipping.</p>
                        </div>
                    </div>

                    <!-- Feature 3 -->
                    <div style="display: flex; align-items: flex-start; gap: 1rem; padding: 1.5rem; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;">
                        <svg style="width: 32px; height: 32px; color: #137B74; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                            <path d="M23 7l-7 5 7 5V7z"></path>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                        </svg>
                        <div>
                            <h3 style="font-size: 0.875rem; font-weight: 700; text-transform: uppercase; color: #222; letter-spacing: 0.05em; margin-bottom: 0.5rem;">24/7 Expert Support</h3>
                            <p style="font-family: 'Montserrat'; font-size: 0.75rem; color: #999; margin: 0; line-height: 1.5;">Dedicated packaging specialists available anytime.</p>
                        </div>
                    </div>

                    <!-- Feature 4 -->
                    <div style="display: flex; align-items: flex-start; gap: 1rem; padding: 1.5rem;">
                        <svg style="width: 32px; height: 32px; color: #137B74; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                            <path d="M12 1v22m11-9H1"></path>
                            <circle cx="12" cy="12" r="11"></circle>
                        </svg>
                        <div>
                            <h3 style="font-size: 0.875rem; font-weight: 700; text-transform: uppercase; color: #222; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Price Match Guarantee</h3>
                            <p style="font-family: 'Montserrat'; font-size: 0.75rem; color: #999; margin: 0; line-height: 1.5;">Competitive pricing without compromising quality.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4. ORDERING PROCESS -->
        <section style="padding: 4rem 1rem; background-color: white;">
            <div style="max-width: 1280px; margin: 0 auto;">
                <h2 style="text-align: center; color: #137B74; margin-bottom: 3rem; font-size: 2rem; font-weight: 700;">Five-Step Ordering Process</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; max-width: 900px; margin: 0 auto;">
                    <div>
                        <div style="font-size: 2.5rem; font-weight: bold; color: #137B74; margin-bottom: 1rem;">01</div>
                        <h3 style="color: #222; font-size: 1rem; margin-bottom: 0.5rem; font-weight: 700;">Place Your Order</h3>
                        <p style="color: #666; font-size: 0.9rem;">Submit box style, size, quantity and finish</p>
                    </div>
                    <div>
                        <div style="font-size: 2.5rem; font-weight: bold; color: #137B74; margin-bottom: 1rem;">02</div>
                        <h3 style="color: #222; font-size: 1rem; margin-bottom: 0.5rem; font-weight: 700;">Share Your Design</h3>
                        <p style="color: #666; font-size: 0.9rem;">Upload artwork or get free design support</p>
                    </div>
                    <div>
                        <div style="font-size: 2.5rem; font-weight: bold; color: #137B74; margin-bottom: 1rem;">03</div>
                        <h3 style="color: #222; font-size: 1rem; margin-bottom: 0.5rem; font-weight: 700;">Approve the Mockup</h3>
                        <p style="color: #666; font-size: 0.9rem;">Review 3D digital mockup for approval</p>
                    </div>
                    <div>
                        <div style="font-size: 2.5rem; font-weight: bold; color: #137B74; margin-bottom: 1rem;">04</div>
                        <h3 style="color: #222; font-size: 1rem; margin-bottom: 0.5rem; font-weight: 700;">Start Production</h3>
                        <p style="color: #666; font-size: 0.9rem;">Print, cut and assemble packaging</p>
                    </div>
                    <div>
                        <div style="font-size: 2.5rem; font-weight: bold; color: #137B74; margin-bottom: 1rem;">05</div>
                        <h3 style="color: #222; font-size: 1rem; margin-bottom: 0.5rem; font-weight: 700;">On-Time Delivery</h3>
                        <p style="color: #666; font-size: 0.9rem;">Finished boxes ship and arrive on time</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 5. DELIVERY VIDEO -->
        <section style="padding: 4rem 1rem; background-color: #F7F7F7;">
            <div style="max-width: 1280px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; max-width: 1000px; margin: 0 auto;">
                    <div>
                        <h2 style="color: #137B74; margin-bottom: 1rem;">Delivery</h2>
                        <p style="color: #666; line-height: 1.8;">The boxes are produced with durable and premium quality material to ensure we make the best tailor-made design!</p>
                    </div>
                    <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                        <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 10px;" src="https://www.youtube.com/embed/JDBfpNw3PQo" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </section>

        <!-- 6. BOX STYLES SHOWCASE -->
        <section style="padding: 4rem 1rem; background-color: white;" id="styles">
            <div style="max-width: 1280px; margin: 0 auto;">
                <h2 style="text-align: center; color: #137B74; margin-bottom: 3rem; font-size: 2rem; font-weight: 700;">Explore Our Custom Box Packaging Styles</h2>
                <div style="overflow-x: auto;">
                    <div style="display: flex; gap: 2rem; padding-bottom: 1rem; width: max-content;">
                        <div style="flex-shrink: 0; width: 280px;">
                            <img src="public/Custom-tuck-boxes.png" alt="Custom Tuck Boxes" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                            <h3 style="color: #222; margin: 0; font-size: 1.125rem;">Custom Tuck Boxes</h3>
                        </div>
                        <div style="flex-shrink: 0; width: 280px;">
                            <img src="public/Custom-mailer-boxes.png" alt="Custom Mailer Boxes" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                            <h3 style="color: #222; margin: 0; font-size: 1.125rem;">Custom Mailer Boxes</h3>
                        </div>
                        <div style="flex-shrink: 0; width: 280px;">
                            <img src="public/Custom-Mylar-Bags.png" alt="Custom Mylar Bags" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                            <h3 style="color: #222; margin: 0; font-size: 1.125rem;">Custom Mylar Bags</h3>
                        </div>
                        <div style="flex-shrink: 0; width: 280px;">
                            <img src="public/Custom-Gable-Boxes.png" alt="Custom Gable Boxes" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                            <h3 style="color: #222; margin: 0; font-size: 1.125rem;">Custom Gable Boxes</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 7. QUOTE FORM -->
        <section style="position: relative; padding: 3rem 1rem;" id="quote">
            <div style="position: absolute; inset: 0; z-index: 0;">
                <img src="public/Qutote-form-background-image.png" alt="Custom packaging products" style="width: 100%; height: 100%; object-fit: cover; object-position: 20% center;">
            </div>

            <div style="position: relative; z-index: 10; max-width: 1280px; margin: 0 auto; display: flex; justify-content: flex-end;">
                <div style="background-color: white; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); padding: 2rem; border-radius: 10px; width: 100%; max-width: 520px;">
                    <h2 style="font-size: 1.5rem; font-weight: 700; color: #137B74; text-align: center; margin-bottom: 1.5rem; font-family: 'Montserrat';">Get a Quote in 15 Minutes</h2>

                    <form method="POST" style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <input type="hidden" name="formType" value="quote">

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                            <input type="text" name="full_name" placeholder="Full Name*" style="width: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.625rem 1rem; font-size: 0.875rem; outline: none;" required>
                            <input type="email" name="email" placeholder="Email*" style="width: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.625rem 1rem; font-size: 0.875rem; outline: none;" required>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                            <input type="tel" name="phone" placeholder="Phone*" style="width: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.625rem 1rem; font-size: 0.875rem; outline: none;" required>
                            <input type="number" name="quantity" placeholder="Total Quantity" style="width: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.625rem 1rem; font-size: 0.875rem; outline: none;">
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                            <select name="material" style="width: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.625rem 1rem; font-size: 0.875rem; outline: none; cursor: pointer;" required>
                                <option value="">Select material</option>
                                <option value="Corrugated Stock">Corrugated Stock</option>
                                <option value="Foil Metallic Cardstock">Foil Metallic Cardstock</option>
                                <option value="Kraft-ecofriendly Brown Cardstock">Kraft-ecofriendly Brown Cardstock</option>
                                <option value="Rigid Press Board Card">Rigid Press Board Card</option>
                                <option value="Textured Neenah Cardstock">Textured Neenah Cardstock</option>
                                <option value="Colored Stock">Colored Stock</option>
                                <option value="Standard White Cardstock">Standard White Cardstock</option>
                                <option value="Holographic Stock">Holographic Stock</option>
                            </select>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem;">
                            <input type="number" name="length" placeholder="Length" style="width: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.625rem 0.5rem; font-size: 0.875rem; outline: none;">
                            <input type="number" name="width" placeholder="Width" style="width: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.625rem 0.5rem; font-size: 0.875rem; outline: none;">
                            <input type="number" name="height" placeholder="Height" style="width: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.625rem 0.5rem; font-size: 0.875rem; outline: none;">
                            <select name="unit" style="width: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.625rem 0.5rem; font-size: 0.875rem; outline: none; cursor: pointer;">
                                <option value="Inches">Inches</option>
                                <option value="CM">CM</option>
                            </select>
                        </div>

                        <textarea name="description" rows="3" placeholder="Provide detailed packaging specifications including dimensions, materials, weight restrictions and design references and we'll get back to you with an instant quote." style="width: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.625rem 1rem; font-size: 0.875rem; outline: none; font-family: inherit; resize: vertical; min-height: 100px;"></textarea>

                        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background-color: #f3f4f6; border-radius: 10px; cursor: pointer; margin-top: 0.5rem;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; color: #137B74; flex-shrink: 0;">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <input type="file" name="design_file" id="design_file" style="display: none;">
                            <label for="design_file" style="cursor: pointer; flex: 1; margin: 0; font-size: 0.95rem;">Upload Your Design</label>
                        </div>

                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                            <input type="checkbox" id="sms_consent" name="sms_consent" value="yes" style="cursor: pointer;">
                            <label for="sms_consent" style="font-size: 0.875rem; color: #666; cursor: pointer; margin: 0;">I consent to receive SMS updates about my order</label>
                        </div>

                        <button type="submit" style="width: 100%; background-color: #137B74; color: white; padding: 0.75rem; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; margin-top: 1rem;">Get a Quote</button>
                    </form>
                </div>
            </div>
        </section>

        <!-- 8. SUSTAINABILITY -->
        <section style="padding: 4rem 1rem; background-color: #137B74; color: white;">
            <div style="max-width: 1280px; margin: 0 auto;">
                <h2 style="text-align: center; color: white; margin-bottom: 1rem; font-size: 2rem; font-weight: 700;">Premium Packaging the Planet Approves of</h2>
                <p style="text-align: center; color: rgba(255,255,255,0.9); margin-bottom: 3rem;">Auditable, certified supply chain practices.</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">♻️</div>
                        <h3 style="color: white; margin-bottom: 0.5rem;">100% Recyclable</h3>
                        <p style="color: rgba(255,255,255,0.9); font-size: 0.9rem;">Every box made from recyclable materials</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🌲</div>
                        <h3 style="color: white; margin-bottom: 0.5rem;">FSC Certified</h3>
                        <p style="color: rgba(255,255,255,0.9); font-size: 0.9rem;">Responsibly sourced paperboard from managed forests</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🌿</div>
                        <h3 style="color: white; margin-bottom: 0.5rem;">Eco Inks</h3>
                        <p style="color: rgba(255,255,255,0.9); font-size: 0.9rem;">Soy and water-based inks instead of harmful solvents</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">☁️</div>
                        <h3 style="color: white; margin-bottom: 0.5rem;">Carbon Offset</h3>
                        <p style="color: rgba(255,255,255,0.9); font-size: 0.9rem;">Carbon-neutral shipping on every order delivered</p>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 2rem;">
                    <a href="#quote" style="color: white; border: 2px solid white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600;">Begin Your Journey</a>
                </div>
            </div>
        </section>

        <!-- 9. DESIGN TOOL -->
        <section style="padding: 4rem 1rem; background-color: white;" id="builder">
            <div style="max-width: 1280px; margin: 0 auto;">
                <h2 style="text-align: center; color: #137B74; margin-bottom: 1rem; font-size: 2rem; font-weight: 700;">Design Your Box in Real Time</h2>
                <p style="text-align: center; color: #666; margin-bottom: 3rem; max-width: 700px; margin-left: auto; margin-right: auto;">Get instant pricing with 3D mockup and 3-day sample shipping available.</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; max-width: 900px; margin: 0 auto; align-items: center;">
                    <div style="background: #F7F7F7; padding: 2rem; border-radius: 10px;">
                        <form style="display: flex; flex-direction: column; gap: 1rem;">
                            <div>
                                <label style="display: block; font-weight: 600; color: #222; margin-bottom: 0.5rem; font-size: 0.9rem;">Box Style</label>
                                <select style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; outline: none; font-size: 0.95rem; cursor: pointer;">
                                    <option>Mailer Box</option>
                                    <option>Tuck Box</option>
                                    <option>Rigid Box</option>
                                    <option>Sleeve Box</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; font-weight: 600; color: #222; margin-bottom: 0.5rem; font-size: 0.9rem;">Material</label>
                                <select style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; outline: none; font-size: 0.95rem; cursor: pointer;">
                                    <option>Kraft</option>
                                    <option>White SBS</option>
                                    <option>Corrugated</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; font-weight: 600; color: #222; margin-bottom: 0.5rem; font-size: 0.9rem;">Size</label>
                                <select style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; outline: none; font-size: 0.95rem; cursor: pointer;">
                                    <option>Small</option>
                                    <option>Medium</option>
                                    <option>Large</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; font-weight: 600; color: #222; margin-bottom: 0.5rem; font-size: 0.9rem;">Finish</label>
                                <select style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; outline: none; font-size: 0.95rem; cursor: pointer;">
                                    <option>Matte</option>
                                    <option>Gloss</option>
                                    <option>Soft Touch</option>
                                </select>
                            </div>
                            <div style="background: #137B74; color: white; padding: 1rem; border-radius: 10px; text-align: center; font-weight: 600;">
                                Est. unit price $1.24
                            </div>
                            <button type="button" style="width: 100%; background-color: #137B74; color: white; padding: 0.75rem; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">Start Designing</button>
                        </form>
                    </div>
                    <div style="text-align: center;">
                        <img src="public/realtime.png" alt="Box Preview" style="width: 100%; max-width: 300px; border-radius: 10px;">
                    </div>
                </div>
            </div>
        </section>

        <!-- 10. FAQ -->
        <section style="padding: 4rem 1rem; background-color: #F7F7F7;">
            <div style="max-width: 1280px; margin: 0 auto;">
                <h2 style="text-align: center; color: #137B74; margin-bottom: 1rem; font-size: 2rem; font-weight: 700;">Frequently Asked Questions</h2>
                <p style="text-align: center; color: #666; margin-bottom: 3rem;">Find all the urgent questions you may have.</p>
                <div style="max-width: 700px; margin: 0 auto;">
                    <details style="margin-bottom: 1rem; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.5rem; cursor: pointer;">
                        <summary style="font-weight: 600; color: #222; cursor: pointer;">What is your standard turnaround time to deliver custom packaging?</summary>
                        <p style="color: #666; margin-top: 1rem; margin-bottom: 0;">7-10 business days from approval of design proof.</p>
                    </details>
                    <details style="margin-bottom: 1rem; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.5rem; cursor: pointer;">
                        <summary style="font-weight: 600; color: #222; cursor: pointer;">How do I contact you to order custom packaging?</summary>
                        <p style="color: #666; margin-top: 1rem; margin-bottom: 0;">Contact us at (853) 327-5627 or inquiry@custompackaginglane.com</p>
                    </details>
                    <details style="margin-bottom: 1rem; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.5rem; cursor: pointer;">
                        <summary style="font-weight: 600; color: #222; cursor: pointer;">What type of printing options do you have for custom boxes?</summary>
                        <p style="color: #666; margin-top: 1rem; margin-bottom: 0;">Full color CMYK, spot color, foil stamping, embossing, and more.</p>
                    </details>
                    <details style="margin-bottom: 1rem; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.5rem; cursor: pointer;">
                        <summary style="font-weight: 600; color: #222; cursor: pointer;">How can I process my custom packaging order?</summary>
                        <p style="color: #666; margin-top: 1rem; margin-bottom: 0;">Submit quote request, approve mockup, proceed to production.</p>
                    </details>
                    <details style="margin-bottom: 1rem; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.5rem; cursor: pointer;">
                        <summary style="font-weight: 600; color: #222; cursor: pointer;">What is the minimum quantity of custom boxes that I can order?</summary>
                        <p style="color: #666; margin-top: 1rem; margin-bottom: 0;">As low as 100 boxes. Pricing based on volume and specs.</p>
                    </details>
                    <details style="margin-bottom: 1rem; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.5rem; cursor: pointer;">
                        <summary style="font-weight: 600; color: #222; cursor: pointer;">What packaging elements can I customize?</summary>
                        <p style="color: #666; margin-top: 1rem; margin-bottom: 0;">Size, material, printing, finishes, special treatments - unlimited customization.</p>
                    </details>
                </div>
            </div>
        </section>

        <!-- 11. SAMPLE KIT -->
        <section style="padding: 4rem 1rem; background-color: white;">
            <div style="max-width: 1280px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; max-width: 900px; margin: 0 auto;">
                    <img src="public/sample-kit-image.png" alt="Sample Kit" style="width: 100%; border-radius: 10px;">
                    <div>
                        <h2 style="color: #137B74; margin-bottom: 1.5rem;">Order a Free Sample Kit</h2>
                        <form method="POST" style="display: flex; flex-direction: column; gap: 1rem;">
                            <input type="hidden" name="formType" value="sample_kit">
                            <input type="text" name="full_name" placeholder="Full Name*" style="padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 1rem; outline: none;" required>
                            <input type="email" name="email" placeholder="Email*" style="padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 1rem; outline: none;" required>
                            <input type="tel" name="phone" placeholder="Phone*" style="padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 1rem; outline: none;" required>
                            <input type="text" name="company" placeholder="Company" style="padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 1rem; outline: none;">
                            <div style="display: flex; gap: 0.5rem; font-size: 0.9rem;">
                                <input type="checkbox" name="consent" required style="cursor: pointer;">
                                <label style="cursor: pointer; margin: 0;">You are agreeing to receive customer care related text messages from Custom Packaging Lane. Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out.</label>
                            </div>
                            <button type="submit" style="width: 100%; background-color: #137B74; color: white; padding: 0.75rem; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">Request Free Sample Kit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- 12. NEWSLETTER -->
        <section style="padding: 3rem 1rem; background-color: #F7F7F7; text-align: center;">
            <div style="max-width: 1280px; margin: 0 auto;">
                <h2 style="color: #222; margin-bottom: 0.5rem;">Subscribe to Our Newsletter</h2>
                <p style="color: #666; margin-bottom: 2rem;">Join our newsletter to get 30% off on your next order.</p>
                <form method="POST" style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px; margin: 0 auto;">
                    <input type="hidden" name="formType" value="newsletter">
                    <input type="email" name="email" placeholder="Enter your email" style="padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 1rem; outline: none;" required>
                    <button type="submit" style="background-color: #137B74; color: white; padding: 0.75rem; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">Subscribe</button>
                </form>
            </div>
        </section>
    </main>

    <!-- FOOTER -->
    <footer style="background-color: #F7F7F7; padding: 3.5rem 0 1.5rem; margin-top: auto;">
        <div style="max-width: 1280px; margin: 0 auto; padding: 0 1rem;">
            <!-- Footer Links -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #e5e7eb;">
                <div>
                    <h4 style="font-size: 0.875rem; font-weight: 700; text-transform: uppercase; color: #222; margin-bottom: 1rem; letter-spacing: 0.05em;">Company</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 0.5rem;"><a href="about-us.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">About Us</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="blog.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Blog</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="#" style="font-size: 0.875rem; color: #222; text-decoration: none;">Portfolio</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="industries.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Industries</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="privacy-policy.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Privacy Policy</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="#" style="font-size: 0.875rem; color: #222; text-decoration: none;">Shipping Policy</a></li>
                        <li><a href="#" style="font-size: 0.875rem; color: #222; text-decoration: none;">Refund & Return Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style="font-size: 0.875rem; font-weight: 700; text-transform: uppercase; color: #222; margin-bottom: 1rem; letter-spacing: 0.05em;">Products</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 0.5rem;"><a href="products/cosmetic-boxes.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Cosmetic Boxes</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="products/soap-boxes.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Soap Boxes</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="products/candle-boxes.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Candle Boxes</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="products/cbd-boxes.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">CBD Boxes</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="products/retail-boxes.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Retail Boxes</a></li>
                        <li><a href="products.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">View All</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style="font-size: 0.875rem; font-weight: 700; text-transform: uppercase; color: #222; margin-bottom: 1rem; letter-spacing: 0.05em;">Shapes & Styles</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 0.5rem;"><a href="product-category/custom-display-boxes.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Custom Display Boxes</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="product-category/custom-mailer-boxes.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Custom Mailer Boxes</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="product-category/custom-tuck-boxes.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Custom Tuck Boxes</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="product-category/rigid-boxes.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Custom Rigid Boxes</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="product-category/window-boxes.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">Window Boxes</a></li>
                        <li><a href="product-category/folding-cartons.php" style="font-size: 0.875rem; color: #222; text-decoration: none;">View All</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style="font-size: 0.875rem; font-weight: 700; text-transform: uppercase; color: #222; margin-bottom: 1rem; letter-spacing: 0.05em;">Contact</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 0.5rem;"><a href="tel:(853)327-5627" style="font-size: 0.875rem; color: #222; text-decoration: none;">(853) 327-5627</a></li>
                        <li style="margin-bottom: 0.5rem;"><a href="mailto:inquiry@custompackaginglane.com" style="font-size: 0.875rem; color: #222; text-decoration: none;">inquiry@custompackaginglane.com</a></li>
                        <li style="margin-bottom: 1rem; font-size: 0.9rem; color: #666;">1800 W Hawthorne Ln, West Chicago, IL 60185, United States Suite #105</li>
                        <li><a href="contact-us.php" style="font-size: 0.875rem; color: #222; text-decoration: none; font-weight: 600;">Contact Us</a></li>
                    </ul>
                </div>
            </div>

            <!-- Trust Badges -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #e5e7eb;">
                <div>
                    <h5 style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #222; margin-bottom: 0.75rem; letter-spacing: 0.05em;">Trusted By</h5>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
                        <img src="public/google-rating.png" alt="Google Reviews" style="height: 40px; width: auto; object-fit: contain;">
                        <img src="public/trustpilot.webp" alt="Trustpilot" style="height: 40px; width: auto; object-fit: contain;">
                        <img src="public/womenowned.webp" alt="Women Owned" style="height: 40px; width: auto; object-fit: contain;">
                    </div>
                </div>
                <div>
                    <h5 style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #222; margin-bottom: 0.75rem; letter-spacing: 0.05em;">Shipping Partners</h5>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
                        <img src="public/USPS.webp" alt="USPS" style="height: 40px; width: auto; object-fit: contain;">
                        <img src="public/DHL.webp" alt="DHL" style="height: 40px; width: auto; object-fit: contain;">
                        <img src="public/FedEx.webp" alt="FedEx" style="height: 40px; width: auto; object-fit: contain;">
                    </div>
                </div>
            </div>

            <!-- Copyright & Social -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
                <div style="display: flex; gap: 1.5rem;">
                    <a href="https://facebook.com" style="display: flex; width: 40px; height: 40px; background-color: #137B74; color: white; align-items: center; justify-content: center; border-radius: 50%; text-decoration: none;">f</a>
                    <a href="https://twitter.com" style="display: flex; width: 40px; height: 40px; background-color: #137B74; color: white; align-items: center; justify-content: center; border-radius: 50%; text-decoration: none;">𝕏</a>
                    <a href="https://instagram.com" style="display: flex; width: 40px; height: 40px; background-color: #137B74; color: white; align-items: center; justify-content: center; border-radius: 50%; text-decoration: none;">📷</a>
                    <a href="https://linkedin.com" style="display: flex; width: 40px; height: 40px; background-color: #137B74; color: white; align-items: center; justify-content: center; border-radius: 50%; text-decoration: none;">in</a>
                    <a href="https://youtube.com" style="display: flex; width: 40px; height: 40px; background-color: #137B74; color: white; align-items: center; justify-content: center; border-radius: 50%; text-decoration: none;">▶</a>
                </div>
                <p style="font-size: 0.875rem; color: #999; margin: 0;">&copy; Custom Packaging Lane 2026</p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
    <style>
        @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        details summary::-webkit-details-marker {
            display: none;
        }
        details summary::before {
            content: "▸ ";
            color: #137B74;
            font-weight: bold;
            margin-right: 0.5rem;
        }
        details[open] summary::before {
            content: "▾ ";
        }
    </style>
</body>
</html>
