import React from 'react';
import { css } from '../lib/css.js';

export function Learn({ v }) {
  return (
    <div style={css`padding:6px 18px 120px;`}>
      <div style={css`font-size:32px;font-weight:900;letter-spacing:-0.025em;line-height:1;margin:3px 0 4px;`}>Learn</div>
      <p style={css`font-size:14px;color:#646464;font-weight:600;margin:0 0 20px;`}>Short modules on how we work. Finish one to earn Flash Club points.</p>
      <div style={css`display:flex;flex-direction:column;gap:13px;`}>
        {v.courseList.map((c, i) => (
          <div key={i} onClick={c.open} style={css`background:#fff;border:1px solid #EDEDED;border-radius:18px;padding:16px;cursor:pointer;`}>
            <div style={css`display:flex;justify-content:space-between;align-items:center;margin-bottom:9px;`}>
              <span style={css`font-size:10px;font-weight:800;color:#10C504;text-transform:uppercase;letter-spacing:0.06em;`}>{c.tag} · {c.mins}</span>
              <span style={css`font-size:11px;font-weight:800;color:#646464;background:#F0F0F0;border-radius:999px;padding:4px 9px;`}>{c.pts}</span>
            </div>
            <div style={css`font-size:17px;font-weight:900;line-height:1.18;letter-spacing:-0.01em;text-wrap:balance;`}>{c.title}</div>
            <div style={css`display:flex;justify-content:space-between;align-items:center;margin-top:14px;`}>
              <span style={css`font-size:12px;font-weight:800;color:${c.statusCol};`}>{c.statusLabel}</span>
              <span style={css`background:${c.btnBg};color:${c.btnCol};font-size:13px;font-weight:800;padding:9px 20px;border-radius:999px;`}>{c.btnLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
