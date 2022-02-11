const timeout = 15000;

beforeAll(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
});

describe('Home Page', () => {
  test(
    'should print correct page title',
    async () => {
      const title = await page.title();
      expect(title).toBe('Digital Dukaan');
    },
    timeout
  );
});

describe('Checkout Flow', () => {
  test(
    'should print correct merchant title',
    async () => {
      // home page
      const productCard = await page.$('.product-list-container > .category-list > .card-container:nth-child(1)');
      await productCard.click();

      // detail page
      const buyButton = await page.$('.shop-btn');
      await buyButton.click();

      // open razorpay frame
      await page.waitForSelector('.razorpay-container', { visible: true });
      const elementFrame = await page.$('.razorpay-container iframe');
      const frame = await elementFrame.contentFrame();
      const merchantNode = await frame.waitForSelector('#merchant-name');
      const text = await frame.evaluate((el) => el.textContent, merchantNode);

      expect(text).toBe('Digital Dukaan');
    },
    timeout
  );
});
