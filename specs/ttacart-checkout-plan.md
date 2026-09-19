# TTACart Login-to-Checkout Test Plan

## Application Overview

TTACart (https://app.thetestingacademy.com/playwright/ttacart/) is a demo shop. Flow verified on the live site: Login (/ttacart/, title "TTACart - Login") -> Products (/inventory, "TTACart - Products") -> Cart (/cart, "TTACart - Your Cart") -> Checkout: Your Information (/checkout-step-one) -> Checkout: Overview (/checkout-step-two) -> Checkout: Complete (/checkout-complete, "TTACart - Checkout: Complete!"). Accepted users: standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, visual_user; shared password tta_secret (from src/.env, trim leading spaces). Stable locators exist: data-test="username", "password", "login-button", "checkout", "firstName", "lastName", "postalCode", "continue", "finish", "shopping-cart-link", and "add-to-cart-*" buttons. The confirmation page shows "Thank you for your order!" (not "Thanks, your order is finished"). Items marked (unverified) were not exercised on the live site.

## Test Scenarios

### 1. Login

**Seed:** `src/seed.spec.ts`

#### 1.1. Valid login lands on products page

**File:** `tests/login/valid-login.spec.ts`

**Steps:**
  1. Fill Username 'standard_user' and Password 'tta_secret', click Login
    - expect: URL ends with /inventory
    - expect: Title is 'TTACart - Products'
    - expect: Six products are listed

#### 1.2. Wrong password shows error

**File:** `tests/login/invalid-password.spec.ts`

**Steps:**
  1. Fill Username 'standard_user' and Password 'wrong_pass', click Login
    - expect: User stays on the login page
    - expect: Alert reads 'Epic sadface: Username and password do not match any user in this service'

#### 1.3. Unknown username shows error

**File:** `tests/login/invalid-username.spec.ts`

**Steps:**
  1. Fill Username 'nouser' and Password 'tta_secret', click Login
    - expect: User stays on the login page
    - expect: Alert is shown, most likely the same 'do not match any user' message (unverified)

#### 1.4. Blank credentials do not log in

**File:** `tests/login/blank-credentials.spec.ts`

**Steps:**
  1. Click Login with both fields empty
    - expect: User stays on the login page
    - expect: No alert appears; focus moves to the Username field (verified)
  2. Fill only Username, click Login
    - expect: User stays on the login page (message unverified)
  3. Fill only Password, click Login
    - expect: User stays on the login page (message unverified)

#### 1.5. Locked-out user cannot log in

**File:** `tests/login/locked-out-user.spec.ts`

**Steps:**
  1. Fill Username 'locked_out_user' and Password 'tta_secret', click Login
    - expect: User stays on the login page
    - expect: A locked-out error alert is shown (exact text unverified)

### 2. Checkout

**Seed:** `src/seed.spec.ts`

#### 2.1. Happy path: complete an order end to end

**File:** `tests/e2e/happy-path.spec.ts`

**Steps:**
  1. Log in as standard_user / tta_secret
    - expect: Products page is shown
  2. Click 'Add to cart' on the first product (Test.allTheThings() T-Shirt (Red), $15.99)
    - expect: Button changes to 'Remove'
    - expect: Cart badge shows 1
  3. Click the shopping cart link
    - expect: URL ends with /cart
    - expect: Cart lists the T-Shirt with QTY 1 and price $15.99
  4. Click 'Checkout'
    - expect: Title is 'TTACart - Checkout: Your Information'
    - expect: Fields First Name, Last Name, Zip/Postal Code are shown
  5. Fill First Name 'John', Last Name 'Doe', Zip/Postal Code '12345', click 'Continue'
    - expect: Title is 'TTACart - Checkout: Overview'
    - expect: Shows item, 'Payment Information: TTACard #31337', 'Shipping Information: Free TTA Express Delivery!'
    - expect: Item total $15.99, Tax $1.28, Total $17.27
  6. Click 'Finish'
    - expect: Title is 'TTACart - Checkout: Complete!'
    - expect: Heading 'Thank you for your order!' is shown
    - expect: Text 'Your order has been dispatched, and will arrive just as fast as the TTA Express pony can get there!' is shown
    - expect: 'Back Home' link returns to the products page

#### 2.2. Checkout form: all fields blank

**File:** `tests/e2e/blank-form.spec.ts`

**Steps:**
  1. Add the first item, go to checkout, click 'Continue' with all fields empty
    - expect: User stays on /checkout-step-one
    - expect: Alert reads 'Error: First Name is required'

#### 2.3. Checkout form: last name missing

**File:** `tests/e2e/missing-last-name.spec.ts`

**Steps:**
  1. Fill only First Name 'John', click 'Continue'
    - expect: User stays on /checkout-step-one
    - expect: Alert reads 'Error: Last Name is required'

#### 2.4. Checkout form: postal code missing

**File:** `tests/e2e/missing-postal-code.spec.ts`

**Steps:**
  1. Fill First Name 'John' and Last Name 'Doe', leave Zip/Postal Code empty, click 'Continue'
    - expect: User stays on /checkout-step-one
    - expect: Alert reads 'Error: Postal Code is required'

#### 2.5. Checkout form: unusual input

**File:** `tests/e2e/unusual-input.spec.ts`

**Steps:**
  1. Enter special characters, digits in names, letters in postal code, then click 'Continue'
    - expect: Record actual behavior: accepted or rejected (unverified)

#### 2.6. Cancel checkout returns to cart

**File:** `tests/e2e/cancel.spec.ts`

**Steps:**
  1. On the checkout information page, click 'Cancel'
    - expect: User returns to /cart with the item still listed

#### 2.7. Checkout with empty cart

**File:** `tests/e2e/empty-cart.spec.ts`

**Steps:**
  1. Log in, open the cart without adding items, click 'Checkout'
    - expect: Record actual behavior: blocked or proceeds (unverified)

#### 2.8. Remove item from cart

**File:** `tests/e2e/remove-item.spec.ts`

**Steps:**
  1. Add the first item, then click 'Remove' on the products page
    - expect: Button returns to 'Add to cart'
    - expect: Cart badge disappears

#### 2.9. Order confirmation shows thank-you message

**File:** `tests/e2e/thank-you-message.spec.ts`

**Steps:**
  1. Add an item, complete the checkout information and continue to the overview
    - expect: Overview page is shown
  2. Click 'Finish'
    - expect: URL ends with /checkout-complete and title is 'TTACart - Checkout: Complete!'
    - expect: Heading 'Thank you for your order!' is shown
    - expect: Dispatch message is shown
    - expect: 'Back Home' link is shown

### 3. End to end

**Seed:** `src/seed.spec.ts`

#### 3.1. Order with multiple items shows correct totals

**File:** `tests/e2e/multiple-items-order.spec.ts`

**Steps:**
  1. Add the first three products, check out with valid details
    - expect: Badge shows 3; Item total $41.97, Tax $3.36, Total $45.33
  2. Click 'Finish'
    - expect: Thank-you page is shown

#### 3.2. Other valid users complete an order (performance_glitch_user, visual_user, error_user)

**File:** `tests/e2e/other-valid-users-order.spec.ts`

**Steps:**
  1. Log in as the user, add the first item, check out with valid details, finish
    - expect: Thank-you page is shown

#### 3.3. Valid checkout data variations complete the order

**File:** `tests/e2e/valid-data-variations-order.spec.ts`

**Steps:**
  1. Submit names with a hyphen and apostrophe, a spaced last name and postal code, and 50-character values
    - expect: Overview opens and the order finishes with the thank-you page

#### 3.4. Order completes after fixing an invalid checkout form

**File:** `tests/e2e/recover-from-invalid-checkout.spec.ts`

**Steps:**
  1. Submit blank, then first name only, then the remaining fields
    - expect: 'Error: First Name is required', then 'Error: Last Name is required', then the overview opens; the order finishes

#### 3.5. Order completes after a failed login is corrected

**File:** `tests/e2e/recover-from-invalid-login.spec.ts`

**Steps:**
  1. Log in with a wrong password, then the correct one, then place an order
    - expect: Error alert first; then the order finishes with the thank-you page

#### 3.6. Protected pages redirect to login without a session

**File:** `tests/e2e/protected-pages.spec.ts`

**Steps:**
  1. Open inventory, cart, checkout-step-one, checkout-step-two and checkout-complete directly
    - expect: Each redirects to the login page

#### 3.7. Problem user cannot complete checkout (known site defect)

**File:** `tests/e2e/problem-user-checkout.spec.ts`

**Steps:**
  1. Log in as problem_user, add an item, fill valid details, continue
    - expect: User stays on checkout-step-one with 'Error: First Name is required'
