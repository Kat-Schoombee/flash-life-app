import React from 'react';
import { css } from '../lib/css.js';
import ImageSlot from '../lib/ImageSlot.jsx';

export function Article({ v }) {
  return (
    <div style={css`padding:6px 0 120px;`}>
      <div style={css`padding:0 18px;`}>
        <div onClick={v.backNews} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;margin-bottom:14px;`}><svg width="18" height="18"><use href="#ic-back" /></svg>News</div>
      </div>
      <ImageSlot id={v.artSlot} style={`width:calc(100% - 36px);height:auto;aspect-ratio:4/3;display:block;margin:0 18px;border:1px solid #E6E6E6;border-radius:18px;`} shape="rounded" radius={18} placeholder="Article image" />
      <div style={css`padding:20px 18px 0;`}>
        <div style={css`font-size:11px;font-weight:800;color:#10C504;text-transform:uppercase;letter-spacing:0.06em;`}>{v.artTag}</div>
        <div style={css`font-size:26px;font-weight:900;line-height:1.12;letter-spacing:-0.02em;margin:7px 0 8px;text-wrap:pretty;`}>{v.artTitle}</div>
        <div style={css`font-size:12px;color:#6E6E6E;font-weight:700;margin-bottom:18px;`}>3 July</div>
        <p style={css`font-size: 16px; line-height: 1.62; color: #414141; font-weight: 500`}>{v.artBody}</p>
      </div>
    </div>
  );
}
