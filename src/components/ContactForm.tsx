import { Alert, Button, Form, Input } from "antd";
import { useForm } from "@formspree/react";
import { useRef, useState } from "react";
import { contactFormId } from "../data/profile";

type Values = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// `_subject` is a Formspree special field that sets the notification email's subject.
type Payload = Values & { _subject: string };

export default function ContactForm() {
  const [form] = Form.useForm<Values>();
  const [state, submit] = useForm<Payload>(contactFormId);
  const [trapped, setTrapped] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);

  if (state.succeeded || trapped) {
    return <Alert type="success" showIcon message="Thanks! Your message was sent." />;
  }

  function onFinish(values: Values) {
    // Bots fill the hidden field; pretend it worked and send nothing.
    if (honeypot.current?.value) {
      setTrapped(true);
      return;
    }
    return submit({ ...values, _subject: values.subject });
  }

  const errors = state.errors
    ? [
        ...state.errors.getFormErrors().map((e) => e.message),
        ...state.errors
          .getAllFieldErrors()
          .flatMap(([field, errs]) => errs.map((e) => `${String(field)}: ${e.message}`)),
      ]
    : [];

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter your name" }, { max: 100 }]}
      >
        <Input autoComplete="name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input autoComplete="email" />
      </Form.Item>
      <Form.Item
        name="subject"
        label="Subject"
        rules={[{ required: true, message: "Please enter a subject" }, { max: 150 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="message"
        label="Message"
        rules={[{ required: true, message: "Please enter a message" }, { max: 5000 }]}
      >
        <Input.TextArea rows={6} />
      </Form.Item>
      <input
        ref={honeypot}
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px" }}
      />
      {errors.length > 0 && (
        <Alert type="error" showIcon message={errors.join(" ")} style={{ marginBottom: 16 }} />
      )}
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        shape="round"
        block
        loading={state.submitting}
      >
        Send message
      </Button>
    </Form>
  );
}
