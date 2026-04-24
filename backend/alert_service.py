import os
import smtplib
from email.message import EmailMessage

def send_email_alert(to_emails, subject, body, image_path=None):
    sender = os.getenv("EMAIL_ADDRESS")
    password = os.getenv("EMAIL_APP_PASSWORD")

    if not sender or not password:
        print("❌ Email credentials not found")
        return

    msg = EmailMessage()
    msg["From"] = sender
    msg["To"] = ", ".join(to_emails)
    msg["Subject"] = subject
    msg.set_content(body)

    # Attach evidence image
    if image_path and os.path.exists(image_path):
        with open(image_path, "rb") as f:
            img_data = f.read()
        msg.add_attachment(
            img_data,
            maintype="image",
            subtype="jpeg",
            filename=os.path.basename(image_path)
        )

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender, password)
            server.send_message(msg)
        print("✅ Email alert sent to admins")
    except Exception as e:
        print("❌ Email sending failed:", e)
