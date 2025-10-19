import os
import re
from playwright.sync_api import Page, expect


def test_services_page(page: Page):
    # Navigate to the services page
    absolute_path = os.path.abspath("services.html")
    page.goto(f"file://{absolute_path}")

    # Verify "View More" button color
    view_more_button = page.locator(".view-more-btn").first
    expect(view_more_button).to_have_css("background-color", "rgb(254, 199, 111)")

    # Click the "View More" button for the first service
    view_more_button.click()

    # Verify the modal contains the service image and a button with the correct text
    modal = page.locator("#service-modal")
    expect(modal).to_be_visible()
    expect(modal.locator("img")).to_be_visible()

    # Get the button text from the card
    button_text = view_more_button.locator("xpath=..").locator("a.btn-primary").inner_text()
    expect(modal.locator("a.btn-primary")).to_have_text(button_text)

    # Close the modal
    modal.locator(".close-service-modal").click()

    # Verify the button text for the specified services
    service_cards = page.locator(".service-card-detailed")

    # Drone Piloting Training
    piloting_card = service_cards.filter(has_text="Drone Piloting Training")
    expect(piloting_card.locator("a.btn-primary")).to_have_text("Register")

    # Drone Engineering Education
    engineering_card = service_cards.filter(has_text="Drone Engineering Education")
    expect(engineering_card.locator("a.btn-primary")).to_have_text("Register")

    # Drone Educational Program
    education_card = service_cards.filter(has_text="Drone Educational Program")
    expect(education_card.locator("a.btn-primary")).to_have_text("Register")
