import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

const endpoint = "https://formspree.io/f/xdeekojw";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status });
}

async function fillAndSubmit(email = "me@example.com") {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Name"), "Pat");
  await user.type(screen.getByLabelText("Email"), email);
  await user.type(screen.getByLabelText("Subject"), "Hello");
  await user.type(screen.getByLabelText("Message"), "Nice site");
  await user.click(screen.getByRole("button", { name: "Send message" }));
}

describe("ContactForm", () => {
  afterEach(() => vi.restoreAllMocks());

  it("posts the fields as JSON to Formspree and shows success", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(json({ next: "/thanks" }));
    render(<ContactForm />);
    await fillAndSubmit();
    expect(await screen.findByText(/your message was sent/i)).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(endpoint);
    expect(init?.headers).toMatchObject({ Accept: "application/json" });
    expect(JSON.parse(init?.body as string)).toMatchObject({
      name: "Pat",
      email: "me@example.com",
      subject: "Hello",
      _subject: "Hello",
      message: "Nice site",
    });
  });

  it("validates before sending", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    render(<ContactForm />);
    await fillAndSubmit("not-an-email");
    expect(await screen.findByText("Please enter a valid email")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows form-level errors from Formspree", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(json({ error: "Form not found" }, 404));
    render(<ContactForm />);
    await fillAndSubmit();
    expect(await screen.findByRole("alert")).toHaveTextContent("Form not found");
  });

  it("shows field-level errors from Formspree", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      json(
        { errors: [{ field: "email", code: "TYPE_EMAIL", message: "should be an email" }] },
        422,
      ),
    );
    render(<ContactForm />);
    await fillAndSubmit();
    expect(await screen.findByRole("alert")).toHaveTextContent("email: should be an email");
  });

  it("shows an error when the network fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    render(<ContactForm />);
    await fillAndSubmit();
    expect(await screen.findByRole("alert")).toHaveTextContent("offline");
  });

  it("sends nothing when the honeypot is filled", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const { container } = render(<ContactForm />);
    container.querySelector<HTMLInputElement>('input[name="_gotcha"]')!.value = "spam";
    await fillAndSubmit();
    expect(await screen.findByText(/your message was sent/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
