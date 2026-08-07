<!-- Quote Form Section -->
<section class="quote-section" id="quote">
    <div class="quote-background">
        <img src="public/Qutote-form-background-image.png" alt="Custom packaging products" class="quote-image">
    </div>

    <div class="max-width quote-container">
        <div class="quote-form-card">
            <h2>Get a Quote in 15 Minutes</h2>

            <form method="POST" class="quote-form" id="quoteForm" enctype="multipart/form-data">
                <input type="hidden" name="formType" value="quote">

                <div class="form-row">
                    <input type="text" name="Last_Name" placeholder="Full Name*" required>
                    <input type="email" name="Email" placeholder="Email*" required>
                </div>

                <div class="form-row">
                    <input type="tel" name="Phone" placeholder="Phone*" required>
                    <input type="number" name="Total_Quantity" placeholder="Total Quantity">
                </div>

                <div class="form-row">
                    <select name="Material" required>
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

                <div class="form-row form-dimensions">
                    <input type="number" name="Length" placeholder="Length">
                    <input type="number" name="Width" placeholder="Width">
                    <input type="number" name="Height" placeholder="Height">
                    <select name="Unit">
                        <option value="Inches">Inches</option>
                        <option value="CM">CM</option>
                    </select>
                </div>

                <div class="form-row">
                    <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background-color: #f3f4f6; border-radius: 10px; cursor: pointer;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; color: #137B74;">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <input type="file" name="design_file" id="design_file" style="display: none;">
                        <label for="design_file" style="cursor: pointer; flex: 1; margin: 0;">Upload Your Design (Optional)</label>
                    </div>
                </div>

                <textarea name="Description" rows="3" placeholder="Provide detailed packaging specifications including dimensions, materials, weight restrictions and design references and we'll get back to you with an instant quote."></textarea>

                <div class="form-checkbox">
                    <input type="checkbox" id="sms_consent" name="sms_consent" value="yes">
                    <label for="sms_consent">I consent to receive SMS updates about my order</label>
                </div>

                <button type="submit" class="btn btn-primary btn-block">Get My Quote</button>
                <p class="form-message" id="formMessage"></p>
            </form>
        </div>
    </div>
</section>
