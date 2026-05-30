export const OPEN_PORTFOLIO_CHAT = 'portfolio-chat:open'

/** Open the floating career chat from anywhere (e.g. hero CTA). */
export function openPortfolioChat() {
  window.dispatchEvent(new CustomEvent(OPEN_PORTFOLIO_CHAT))
}
