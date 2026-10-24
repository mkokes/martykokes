import { Typography } from "antd";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";

export default function Contact() {
  return (
    <>
      <Typography.Title level={1}>Get in touch</Typography.Title>
      <Typography.Paragraph style={{ fontSize: 16, maxWidth: 720 }}>
        Have a question or want to work together? Send a message, or find me on one of these.
      </Typography.Paragraph>
      <SocialLinks />
      <section className="section" aria-labelledby="send-message">
        <Typography.Title level={2} id="send-message">
          Send a message
        </Typography.Title>
        <ContactForm />
      </section>
    </>
  );
}
