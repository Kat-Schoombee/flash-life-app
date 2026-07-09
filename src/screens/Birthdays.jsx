import React from 'react';
import { css } from '../lib/css.js';

export function Birthdays({ v }) {
  return (
    <div style={css`padding:6px 18px 130px;`}>
      <div onClick={v.goNotifications} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;margin-bottom:18px;`}><svg width="18" height="18"><use href="#ic-back" /></svg> Back</div>
      <div style={css`font-size:32px;font-weight:900;letter-spacing:-0.025em;line-height:1;`}>Birthdays</div>
      <div style={css`font-size:13px;font-weight:600;color:#646464;margin-top:6px;`}>Celebrate your colleagues today.</div>

      <div style={css`font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#9AA39E;margin:24px 0 10px;`}>Today</div>
      <div style={css`display:flex;flex-direction:column;gap:10px;`}>
        {v.birthdaysToday.map((b, i) => (
          <div key={i} onClick={b.open} style={css`display:flex;align-items:center;gap:13px;background:#fff;border-radius:18px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,.05);cursor:pointer;`}>
            <div style={css`flex:none;width:48px;height:48px;border-radius:50%;background:${b.tint};color:${b.fg};border:1.5px solid var(--flash-grey-150);box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;`}>{b.initials}</div>
            <div style={css`flex:1;min-width:0;`}>
              <div style={css`font-size:15px;font-weight:800;color:#252525;line-height:1.2;`}>{b.name}</div>
              <div style={css`font-size:12px;font-weight:600;color:#7C7C7C;margin-top:2px;`}>{b.role}</div>
            </div>
            <div style={css`flex:none;font-size:12px;font-weight:800;color:#0A0A0A;background:#F0F0F0;border-radius:999px;padding:8px 14px;`}>Wish them</div>
          </div>
        ))}
      </div>

      <div style={css`font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#9AA39E;margin:24px 0 10px;`}>This week</div>
      <div style={css`display:flex;flex-direction:column;gap:10px;`}>
        {v.birthdaysSoon.map((b, i) => (
          <div key={i} onClick={b.open} style={css`display:flex;align-items:center;gap:13px;background:#fff;border-radius:18px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,.05);cursor:pointer;`}>
            <div style={css`flex:none;width:48px;height:48px;border-radius:50%;background:${b.tint};color:${b.fg};border:1.5px solid var(--flash-grey-150);box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;`}>{b.initials}</div>
            <div style={css`flex:1;min-width:0;`}>
              <div style={css`font-size:15px;font-weight:800;color:#252525;line-height:1.2;`}>{b.name}</div>
              <div style={css`font-size:12px;font-weight:600;color:#7C7C7C;margin-top:2px;`}>{b.role}</div>
            </div>
            <div style={css`flex:none;font-size:12px;font-weight:800;color:#7C7C7C;`}>{b.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
