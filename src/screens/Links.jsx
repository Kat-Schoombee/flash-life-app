import React from 'react';
import { css } from '../lib/css.js';

export function Links({ v }) {
  return (
    <div style={css`padding:6px 18px 130px;`}>
      <div onClick={v.goMenu} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;margin-bottom:16px;`}><svg width="18" height="18"><use href="#ic-back" /></svg>Menu</div>
      <div style={css`font-size:32px;font-weight:900;letter-spacing:-0.025em;line-height:1;margin:3px 0 4px;`}>Useful links</div>
      <p style={css`font-size:14px;color:#646464;font-weight:600;margin:0 0 18px;`}>Quick links to Flash sites and social channels.</p>
      {v.linkGroups.map((g, i) => (
        <React.Fragment key={i}>
          <div style={css`font-size:13px;font-weight:800;color:#7C7C7C;margin:18px 0 9px;`}>{g.group}</div>
          <div style={css`display:flex;flex-direction:column;gap:10px;`}>
            {g.items.map((l, j) => (
              <a key={j} href={l.url} target="_blank" rel="noopener" style={css`display:flex;align-items:center;gap:13px;background:#fff;border-radius:16px;padding:15px 16px;box-shadow:0 1px 3px rgba(0,0,0,.05);text-decoration:none;color:inherit;`}>
                <div style={css`flex:1;min-width:0;`}><div style={css`font-size:15px;font-weight:800;`}>{l.label}</div><div style={css`font-size:12px;color:#A4A4A4;font-weight:700;margin-top:2px;`}>{l.host}</div></div>
                <svg width="18" height="18" style={css`color:#A4A4A4;flex:none;`}><use href="#ic-ext" /></svg>
              </a>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
