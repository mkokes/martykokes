import { fireEvent, render, screen } from "@testing-library/react";
import { usePointerEffects } from "../useMotionOk";
import InteractiveCard from "./InteractiveCard";

vi.mock("../useMotionOk", () => ({ usePointerEffects: vi.fn(() => true) }));

function renderCard() {
  render(
    <InteractiveCard>
      <p>Card body</p>
    </InteractiveCard>,
  );
  const card = screen.getByText("Card body").parentElement!;
  // jsdom has no layout; give the card a 200×100 box at the origin.
  card.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 100 }) as DOMRect;
  return card;
}

describe("InteractiveCard", () => {
  it("follows a mouse with the glare position and settles when it leaves", () => {
    const card = renderCard();
    expect(card).toHaveClass("interactive-card");
    fireEvent.pointerMove(card, { pointerType: "mouse", clientX: 150, clientY: 25 });
    expect(card.style.getPropertyValue("--mx")).toBe("75%");
    expect(card.style.getPropertyValue("--my")).toBe("25%");
    fireEvent.pointerLeave(card);
  });

  it("ignores touch and pen pointers", () => {
    const card = renderCard();
    fireEvent.pointerMove(card, { pointerType: "touch", clientX: 150, clientY: 25 });
    expect(card.style.getPropertyValue("--mx")).toBe("");
  });

  it("renders the card as it is without a mouse or with reduced motion", () => {
    vi.mocked(usePointerEffects).mockReturnValue(false);
    render(
      <InteractiveCard>
        <p>Still card</p>
      </InteractiveCard>,
    );
    expect(screen.getByText("Still card").parentElement).toHaveClass("interactive-card-static");
  });
});
