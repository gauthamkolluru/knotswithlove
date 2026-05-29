import { test, expect } from '@playwright/test'

test('homepage loads main sections', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#home')).toBeVisible()
  await expect(page.locator('#shop')).toBeVisible()
  await expect(page.locator('#cart')).toBeAttached()
  await expect(page.getByRole('navigation')).toBeVisible()
})

test('shop shows formatted prices', async ({ page }) => {
  await page.goto('/#shop')
  await expect(page.locator('.shop-price').first()).toContainText(/\$|₹/)
})
