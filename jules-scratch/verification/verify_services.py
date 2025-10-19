import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Set a larger viewport to ensure elements are visible
        page.set_viewport_size({"width": 1920, "height": 1080})

        # Construct the absolute file path
        file_path = "file://" + os.path.abspath("services.html")
        page.goto(file_path)

        # Prevent the chatbot from popping up automatically by setting the session storage flag
        page.evaluate("sessionStorage.setItem('chatbotPopupShown', 'true')")

        # Wait for any entry animations to complete
        page.wait_for_timeout(500)

        # Select the button
        button_to_click = page.locator(".view-more-btn").first

        # Click the first "View More" button, forcing the click to bypass actionability checks
        button_to_click.click(force=True)

        # Wait for the modal to be visible
        page.wait_for_selector("#service-modal", state="visible")

        # Take a screenshot of the modal
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run()
