import { ImageResponse } from 'next/og';

export const alt = 'Bodycam Field Guide — practical PC guides';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#081116', color: '#edf4f3', fontFamily: 'Arial, sans-serif', border: '16px solid #13232a' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: '#eca56e', fontSize: 24, fontWeight: 700, letterSpacing: 4 }}>BODYCAM / FIELD GUIDE</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>PLAY WITH A PLAN.</div>
        <div style={{ fontSize: 34, color: '#b1c4c6' }}>Controls · Settings · Zombies · Updates</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingTop: 20, borderTop: '2px solid #2c454d', color: '#89a3a6', fontSize: 20 }}><span>Independent Bodycam guides</span><span>bodycamwiki.top</span></div>
    </div>,
    size,
  );
}
