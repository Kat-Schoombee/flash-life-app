import React from 'react';
import { css } from '../lib/css.js';

export function Notifications({ v }) {
  return (
    <div style={css`padding:6px 18px 130px;`}>
      <div style={css`display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px;`}>
        <div onClick={v.goHome} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;`}><svg width="18" height="18"><use href="#ic-back" /></svg> Home</div>
        {v.hasUnread && (<>
          <div onClick={v.markAllRead} style={css`font-size:13px;font-weight:800;color:#10C504;cursor:pointer;`}>Mark all read</div>
        </>)}
      </div>
      <div style={css`font-size:32px;font-weight:900;letter-spacing:-0.025em;line-height:1;`}>Notifications</div>
      <div style={css`font-size:13px;font-weight:600;color:#646464;margin-top:6px;`}>{v.notifSummary}</div>

      <div style={css`font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#9AA39E;margin:26px 0 10px;`}>Today</div>
      <div style={css`display:flex;flex-direction:column;gap:10px;`}>
        {v.notifsToday.map((n, i) => (
          <div key={i} onClick={n.open} style={css`position: relative; display: flex; align-items: flex-start; gap: 13px; background: ${n.bg}; border-radius: 18px; padding: 15px; cursor: pointer; transition: transform .15s cubic-bezier(.2,.8,.2,1)`}>
            <div style={css`flex:none;width:44px;height:44px;border-radius:14px;background:${n.iconBg};color:${n.iconColor};display:flex;align-items:center;justify-content:center;`}><svg width="22" height="22"><use href={n.icon} /></svg></div>
            <div style={css`flex:1;min-width:0;`}>
              <div style={css`display:flex;align-items:center;justify-content:space-between;gap:10px;`}>
                <span style={css`font-size:15px;font-weight:800;color:#0A0A0A;line-height:1.2;min-width:0;`}>{n.title}</span>
                <span style={css`display:flex;align-items:center;gap:6px;flex:none;`}>
                  <span style={css`font-size:11px;font-weight:700;color:#A4A4A4;`}>{n.time}</span>
                  {n.unread && (<><span style={css`flex:none;width:8px;height:8px;border-radius:50%;background:#10C504;`}></span></>)}
                </span>
              </div>
              <div style={css`font-size:13px;font-weight:600;color:#646464;margin-top:4px;line-height:1.35;text-wrap:pretty;`}>{n.body}</div>
              <div style={css`display:inline-flex;align-items:center;gap:4px;margin-top:9px;font-size:12px;font-weight:800;color:${n.iconColor};`}>{n.cta} <svg width="13" height="13"><use href="#ic-arr" /></svg></div>
            </div>
          </div>
        ))}
      </div>

      <div style={css`font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#9AA39E;margin:24px 0 10px;`}>Earlier</div>
      <div style={css`display:flex;flex-direction:column;gap:10px;`}>
        {v.notifsEarlier.map((n, i) => (
          <div key={i} onClick={n.open} style={css`position: relative; display: flex; align-items: flex-start; gap: 13px; background: ${n.bg}; border-radius: 18px; padding: 15px; cursor: pointer; transition: transform .15s cubic-bezier(.2,.8,.2,1)`}>
            <div style={css`flex:none;width:44px;height:44px;border-radius:14px;background:${n.iconBg};color:${n.iconColor};display:flex;align-items:center;justify-content:center;`}><svg width="22" height="22"><use href={n.icon} /></svg></div>
            <div style={css`flex:1;min-width:0;`}>
              <div style={css`display:flex;align-items:center;justify-content:space-between;gap:10px;`}>
                <span style={css`font-size:15px;font-weight:800;color:#0A0A0A;line-height:1.2;min-width:0;`}>{n.title}</span>
                <span style={css`display:flex;align-items:center;gap:6px;flex:none;`}>
                  <span style={css`font-size:11px;font-weight:700;color:#A4A4A4;`}>{n.time}</span>
                  {n.unread && (<><span style={css`flex:none;width:8px;height:8px;border-radius:50%;background:#10C504;`}></span></>)}
                </span>
              </div>
              <div style={css`font-size:13px;font-weight:600;color:#646464;margin-top:4px;line-height:1.35;text-wrap:pretty;`}>{n.body}</div>
              <div style={css`display:inline-flex;align-items:center;gap:4px;margin-top:9px;font-size:12px;font-weight:800;color:${n.iconColor};`}>{n.cta} <svg width="13" height="13"><use href="#ic-arr" /></svg></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
