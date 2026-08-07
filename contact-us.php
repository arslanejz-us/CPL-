<?php ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Contact Custom Packaging Lane for packaging inquiries and support">
    <title>Contact Us | Custom Packaging Lane</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="site-wrapper">
        <?php include 'includes/header.php'; ?>

        <main class="main-content">
            <!-- Hero -->
            <section style="padding: 4rem 1rem; background-color: #f9f9f9; text-align: center;">
                <div class="max-width">
                    <h1 style="color: #137B74; margin-bottom: 1rem;">Contact Us</h1>
                    <p style="font-size: 1.125rem; color: #666;">We'd love to hear from you. Get in touch with our team today.</p>
                </div>
            </section>

            <!-- Contact Info & Form -->
            <section style="padding: 3rem 1rem;">
                <div class="max-width">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; max-width: 900px; margin: 0 auto;">
                        <!-- Contact Information -->
                        <div>
                            <h2 style="color: #137B74; margin-bottom: 2rem;">Get in Touch</h2>

                            <div style="margin-bottom: 2rem;">
                                <h3 style="color: #222; font-size: 1.125rem; margin-bottom: 0.5rem;">📧 Email</h3>
                                <p style="color: #666; margin: 0;">
                                    <a href="mailto:me.arslanejaz@gmail.com" style="color: #137B74;">me.arslanejaz@gmail.com</a>
                                </p>
                            </div>

                            <div style="margin-bottom: 2rem;">
                                <h3 style="color: #222; font-size: 1.125rem; margin-bottom: 0.5rem;">📞 Phone</h3>
                                <p style="color: #666; margin: 0;">
                                    <a href="tel:1-800-PACKAGING" style="color: #137B74;">1-800-PACKAGING</a>
                                </p>
                            </div>

                            <div style="margin-bottom: 2rem;">
                                <h3 style="color: #222; font-size: 1.125rem; margin-bottom: 0.5rem;">🕐 Hours</h3>
                                <p style="color: #666; margin: 0; line-height: 1.8;">
                                    Monday - Friday: 9:00 AM - 6:00 PM EST<br>
                                    Saturday: 10:00 AM - 4:00 PM EST<br>
                                    Sunday: Closed
                                </p>
                            </div>

                            <div style="margin-bottom: 2rem;">
                                <h3 style="color: #222; font-size: 1.125rem; margin-bottom: 0.5rem;">📍 Location</h3>
                                <p style="color: #666; margin: 0;">
                                    Custom Packaging Lane<br>
                                    123 Box Street<br>
                                    New York, NY 10001
                                </p>
                            </div>

                            <div style="padding-top: 2rem; border-top: 1px solid #e5e7eb;">
                                <h3 style="color: #222; font-size: 1.125rem; margin-bottom: 1rem;">Follow Us</h3>
                                <div style="display: flex; gap: 1rem;">
                                    <a href="https://facebook.com" style="display: inline-flex; width: 40px; height: 40px; background-color: #137B74; color: white; align-items: center; justify-content: center; border-radius: 50%; text-decoration: none;">f</a>
                                    <a href="https://twitter.com" style="display: inline-flex; width: 40px; height: 40px; background-color: #137B74; color: white; align-items: center; justify-content: center; border-radius: 50%; text-decoration: none;">𝕏</a>
                                    <a href="https://instagram.com" style="display: inline-flex; width: 40px; height: 40px; background-color: #137B74; color: white; align-items: center; justify-content: center; border-radius: 50%; text-decoration: none;">📷</a>
                                </div>
                            </div>
                        </div>

                        <!-- Contact Form -->
                        <div>
                            <h2 style="color: #137B74; margin-bottom: 2rem;">Send us a Message</h2>
                            <form method="POST" style="display: flex; flex-direction: column; gap: 1rem;">
                                <input type="hidden" name="formType" value="contact">

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 1rem; outline: none; transition: border-color 0.2s;"
                                    onfocus="this.style.borderColor='#137B74'"
                                    onblur="this.style.borderColor='#e5e7eb'"
                                >

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 1rem; outline: none; transition: border-color 0.2s;"
                                    onfocus="this.style.borderColor='#137B74'"
                                    onblur="this.style.borderColor='#e5e7eb'"
                                >

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone"
                                    required
                                    style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 1rem; outline: none; transition: border-color 0.2s;"
                                    onfocus="this.style.borderColor='#137B74'"
                                    onblur="this.style.borderColor='#e5e7eb'"
                                >

                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows="5"
                                    required
                                    style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 1rem; font-family: inherit; outline: none; transition: border-color 0.2s; resize: vertical;"
                                    onfocus="this.style.borderColor='#137B74'"
                                    onblur="this.style.borderColor='#e5e7eb'"
                                ></textarea>

                                <button
                                    type="submit"
                                    class="btn btn-primary"
                                    style="width: 100%;"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <?php include 'includes/footer.php'; ?>
    </div>

    <script src="js/main.js"></script>
</body>
</html>
