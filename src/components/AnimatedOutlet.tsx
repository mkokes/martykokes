import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigationType, useOutlet } from "react-router-dom";
import { pageVariants, type PageTransition } from "../motion";

/** Scroll position of each history entry, keyed by React Router's location key. */
const scrollByKey = new Map<string, number>();

const isProjectPage = (path: string) => /^\/projects\/[^/]+/.test(path);

/**
 * Takes the outgoing page out of the flow at the exact spot it occupies on screen, so the
 * window can scroll to the incoming page's position without the outgoing one jumping. It also
 * keeps both pages in the same scroll frame, which shared-layout morphs measure against.
 */
function pinLivePage(stack: HTMLElement) {
  const pages = stack.querySelectorAll<HTMLElement>(":scope > .page-view");
  const page = [...pages].find((el) => el.style.position !== "fixed");
  // None left when a second Back lands before React has swapped in the next page.
  if (!page) return;
  const r = page.getBoundingClientRect();
  Object.assign(page.style, {
    position: "fixed",
    top: `${r.top}px`,
    left: `${r.left}px`,
    width: `${r.width}px`,
    pointerEvents: "none",
  });
}

/** Whether a click will make React Router navigate to another page of this site. */
function isPageNavigation(e: MouseEvent, currentPath: string) {
  if (e.defaultPrevented || e.button !== 0) return false;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  const a = (e.target as Element).closest("a");
  if (!a || a.target || a.origin !== window.location.origin) return false;
  return a.pathname !== currentPath;
}

/**
 * The routed page, animated in and out. Ordinary page changes slide; changes to or from a
 * project page only crossfade, because the project card itself morphs into the page.
 * It also restores each history entry's scroll position on Back and Forward.
 */
export default function AnimatedOutlet() {
  const location = useLocation();
  const navType = useNavigationType();
  const outlet = useOutlet();
  const stack = useRef<HTMLDivElement>(null);
  // Latest location, for the window listeners below.
  const here = useRef(location);
  // Set when scrolling was already handled just before the navigation.
  const prepared = useRef(false);

  // The path we came from, updated during render when the path changes.
  const [paths, setPaths] = useState({ prev: location.pathname, current: location.pathname });
  if (paths.current !== location.pathname) {
    setPaths({ prev: paths.current, current: location.pathname });
  }
  const kind: PageTransition =
    isProjectPage(paths.prev) || isProjectPage(location.pathname) ? "fade" : "slide";

  // A layout effect, so the listeners are added before React Router's (its BrowserRouter is an
  // ancestor, and child layout effects run first). React Router re-renders synchronously
  // inside its popstate listener, so ours has to run before it to act ahead of the swap.
  useLayoutEffect(() => {
    // Leave the page where it is and move the window to `y`, before React swaps the pages.
    const prepare = (y: number) => {
      scrollByKey.set(here.current.key, window.scrollY);
      pinLivePage(stack.current!);
      // With the old page pinned and the new one not rendered yet, the document may be too
      // short to scroll to `y`; hold the height open until the new page is in place.
      stack.current!.style.minHeight = `${y + window.innerHeight}px`;
      window.scrollTo(0, y);
      prepared.current = true;
    };
    // Link clicks, caught before React Router's own handler navigates.
    const onClick = (e: MouseEvent) => {
      if (isPageNavigation(e, here.current.pathname)) prepare(0);
    };
    // Back/Forward.
    const onPopState = () => {
      // React Router keys the first entry, which has no key in its state, "default".
      const target = (history.state as { key?: string } | null)?.key ?? "default";
      prepare(scrollByKey.get(target) ?? 0);
    };
    // The browser would otherwise restore scroll itself, mid-animation.
    const restoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      history.scrollRestoration = restoration;
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Fallback for navigations nothing prepared (e.g. programmatic ones).
  useLayoutEffect(() => {
    if (!prepared.current) {
      window.scrollTo(0, navType === "POP" ? (scrollByKey.get(location.key) ?? 0) : 0);
    }
    prepared.current = false;
    here.current = location;
    stack.current!.style.minHeight = "";
  }, [location, navType]);

  return (
    <div ref={stack} className="page-stack">
      <AnimatePresence initial={false} custom={kind}>
        <motion.div
          key={location.pathname}
          className="page-view"
          custom={kind}
          variants={pageVariants}
          initial="initial"
          animate="show"
          exit="exit"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
