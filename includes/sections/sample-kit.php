<!-- Sample Kit Section -->
<section style="padding: 4rem 1rem; background-color: #F7F7F7;">
    <div class="max-width">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; max-width: 900px; margin: 0 auto;">
            <div>
                <img src="public/sample-kit-image.png" alt="Free Sample Kit" style="width: 100%; border-radius: 10px;">
            </div>
            <div>
                <h2 style="color: #137B74; margin-bottom: 1rem;">Order a Free Sample Kit</h2>
                <p style="color: #666; line-height: 1.8; margin-bottom: 1.5rem;">
                    See and feel the quality of our packaging before placing your full order. Our free sample kit includes examples of different materials, finishes, and printing options.
                </p>
                <form method="POST" style="display: flex; flex-direction: column; gap: 1rem;">
                    <input type="hidden" name="formType" value="sample_kit">
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        style="padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 1rem; outline: none;"
                    >
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: #666;">
                        <input type="checkbox" name="consent" required>
                        I agree to receive updates about my sample kit
                    </label>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Request Free Sample Kit</button>
                </form>
            </div>
        </div>
    </div>
</section>
