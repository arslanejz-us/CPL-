# Create Remaining Stub Pages

To complete the website structure, you need to create the following stub pages. You can either:

1. **Copy and modify existing pages** (fastest method)
2. **Use this template** as a starting point

## Template for Product Category Pages

Copy this content and create files in `/product-category/`:

```php
<?php ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[PRODUCT NAME] | Custom Packaging Lane</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="site-wrapper">
        <?php include '../includes/header.php'; ?>
        <main class="main-content">
            <section style="padding: 4rem 1rem; background: linear-gradient(135deg, #137B74, #009688); color: white;">
                <div class="max-width">
                    <h1 style="color: white;">[PRODUCT NAME]</h1>
                    <p style="font-size: 1.125rem; color: rgba(255,255,255,0.9);">[PRODUCT DESCRIPTION]</p>
                </div>
            </section>
            <section style="padding: 3rem 1rem;">
                <div class="max-width">
                    <div style="text-align: center;">
                        <p style="color: #666; line-height: 1.8; max-width: 700px; margin: 0 auto;">
                            [DETAILED DESCRIPTION OF PRODUCT]
                        </p>
                        <a href="../index.php#quote" class="btn btn-primary" style="margin-top: 2rem;">Get a Quote</a>
                    </div>
                </div>
            </section>
        </main>
        <?php include '../includes/footer.php'; ?>
    </div>
    <script src="../js/main.js"></script>
</body>
</html>
```

## Files to Create

### Product Category Pages (in `/product-category/`)

- [ ] `rigid-boxes.php` - Rigid Boxes
- [ ] `folding-cartons.php` - Folding Cartons  
- [ ] `custom-display-boxes.php` - Custom Display Boxes
- [ ] `window-boxes.php` - Window Boxes

### Product Pages (in `/products/`)

- [ ] `soap-boxes.php` - Soap Boxes
- [ ] `candle-boxes.php` - Candle Boxes
- [ ] `cbd-boxes.php` - CBD Boxes
- [ ] `retail-boxes.php` - Retail Boxes
- [ ] `custom-tuck-boxes-standard.php` - Premium Tuck Boxes

### Other Pages

- [ ] `shipping-policy.php` - Shipping Policy (link in footer)
- [ ] `refund-policy.php` - Refund & Return Policy (link in footer)

## Quick Create Script

Run this PowerShell script from `d:\NewCPL-HTML` to create all stub files:

```powershell
# Create directories if they don't exist
mkdir -Force product-category, products

# Create product category stubs
$categories = @(
    @{name='rigid-boxes'; title='Rigid Boxes'; desc='Premium rigid boxes for luxury products'},
    @{name='folding-cartons'; title='Folding Cartons'; desc='Standard folding cartons for retail'},
    @{name='custom-display-boxes'; title='Custom Display Boxes'; desc='Eye-catching display boxes'},
    @{name='window-boxes'; title='Window Boxes'; desc='Boxes with product windows'}
)

$prodTemplate = '<?php ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Custom Packaging Lane</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="site-wrapper">
        <?php include "../includes/header.php"; ?>
        <main class="main-content">
            <section style="padding: 4rem 1rem; background: linear-gradient(135deg, #137B74, #009688); color: white;">
                <div class="max-width">
                    <h1 style="color: white;">{title}</h1>
                    <p style="font-size: 1.125rem; color: rgba(255,255,255,0.9);">{desc}</p>
                </div>
            </section>
            <section style="padding: 3rem 1rem;">
                <div class="max-width" style="text-align: center;">
                    <p style="color: #666; line-height: 1.8; max-width: 700px; margin: 0 auto;">
                        Premium {name} solutions designed for your brand. Custom sizing, materials, and finishes available.
                    </p>
                    <a href="../index.php#quote" class="btn btn-primary" style="margin-top: 2rem;">Get a Quote</a>
                </div>
            </section>
        </main>
        <?php include "../includes/footer.php"; ?>
    </div>
    <script src="../js/main.js"></script>
</body>
</html>'

foreach ($cat in $categories) {
    $content = $prodTemplate -replace '{title}', $cat.title -replace '{desc}', $cat.desc -replace '{name}', $cat.name.Replace('-', ' ')
    Set-Content -Path "product-category\$($cat.name).php" -Value $content
}

# Create product stubs
$products = @(
    @{name='soap-boxes'; title='Soap Boxes'},
    @{name='candle-boxes'; title='Candle Boxes'},
    @{name='cbd-boxes'; title='CBD Boxes'},
    @{name='retail-boxes'; title='Retail Boxes'},
    @{name='custom-tuck-boxes-standard'; title='Premium Tuck Boxes'}
)

foreach ($prod in $products) {
    $content = $prodTemplate -replace '{title}', $prod.title -replace '{desc}', "Premium $($prod.title.ToLower())" -replace '{name}', $prod.name.Replace('-', ' ')
    Set-Content -Path "products\$($prod.name).php" -Value $content
}

# Create policy pages
$policies = @(
    @{name='shipping-policy'; title='Shipping Policy'},
    @{name='refund-policy'; title='Refund & Return Policy'}
)

$policyTemplate = '<?php ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Custom Packaging Lane</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="site-wrapper">
        <?php include "includes/header.php"; ?>
        <main class="main-content">
            <section style="padding: 4rem 1rem; background-color: #f9f9f9;">
                <div class="max-width">
                    <h1 style="color: #137B74; margin-bottom: 1rem;">{title}</h1>
                </div>
            </section>
            <section style="padding: 3rem 1rem;">
                <div class="max-width" style="max-width: 800px; color: #555; line-height: 1.8;">
                    <p>Content for {title} goes here. Update with your actual policies.</p>
                </div>
            </section>
        </main>
        <?php include "includes/footer.php"; ?>
    </div>
    <script src="js/main.js"></script>
</body>
</html>'

foreach ($policy in $policies) {
    $content = $policyTemplate -replace '{title}', $policy.title
    Set-Content -Path "$($policy.name).php" -Value $content
}

Write-Host "All stub pages created successfully!"
```

## Manual Method

If you prefer to create files manually:

1. Copy `products/cosmetic-boxes.php`
2. Rename to your new product name
3. Update the title, description, and links
4. Save in appropriate folder

## Updating Links

After creating the stub pages, update the links in:

- `includes/header.php` - Add links to navigation
- `products.php` - Add to product grid
- `industries.php` - Add to industries grid

Example:
```php
<a href="product-category/rigid-boxes.php">Rigid Boxes</a>
```

---

All stub pages can stay simple for now and be updated later with actual content, images, and detailed descriptions.
