import { Card, Typography } from "antd";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";

export default function Contact() {
  return (
    <>
      <Typography.Title level={1}>Get in touch</Typography.Title>
      <div className="contact-grid">
        <div>
          <Typography.Paragraph className="lead">
            Have a question or want to work together? Send a message, or find me on one of these.
          </Typography.Paragraph>
          <SocialLinks vertical />
        </div>
        <section aria-labelledby="send-message">
          <Card className="soft-card">
            <Typography.Title level={2} id="send-message" style={{ marginTop: 0 }}>
              Send a message
            </Typography.Title>
            <ContactForm />
          </Card>
        </section>
      </div>
    </>
  );
}
