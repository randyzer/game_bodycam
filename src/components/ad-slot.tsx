import Script from 'next/script';

const adScript = 'https://pl31237762.profitableratecpmnetwork.com/fbac69be15ca4c593ac0152236caf565/invoke.js';
const containerId = 'container-fbac69be15ca4c593ac0152236caf565';

export function AdSlot() {
  if (process.env.SITE_ADS_ENABLED !== 'true') return null;
  return <aside className="container ad-section" aria-label="Advertisement">
    <p className="ad-label">ADVERTISEMENT</p>
    <div id={containerId} className="ad-container" />
    <Script id="bodycam-display-ad" src={adScript} strategy="afterInteractive" async data-cfasync="false" />
  </aside>;
}
