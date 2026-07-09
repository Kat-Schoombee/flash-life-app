import React from 'react';
import { css } from '../lib/css.js';

export function Person({ v }) {
  return (
    <div style={css`padding:6px 18px 130px;`}>
      <div onClick={v.goDirectory} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;margin-bottom:16px;`}><svg width="18" height="18"><use href="#ic-back" /></svg>Directory</div>
      <div style={css`display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:22px;`}>
        <div style={css`width: 96px; height: 96px; border-radius: 50%; background: ${v.personTint}; color: ${v.personFg}; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 900; margin-bottom: 13px; border-width: 1px; border-style: solid; border-color: var(--flash-grey-300)`}>{v.personInitials}</div>
        <div style={css`font-size:24px;font-weight:900;letter-spacing:-0.02em;line-height:1.1;`}>{v.personName}</div>
        <div style={css`font-size:14px;color:#7C7C7C;font-weight:700;margin-top:3px;`}>{v.personRoleLine}</div>
      </div>
      <div style={css`background:#fff;border-radius:20px;box-shadow:0 1px 3px rgba(0,0,0,.05);overflow:hidden;margin-bottom:16px;`}>
        {v.personDetails.map((d, i) => (
          <div key={i} style={css`display:flex;justify-content:space-between;align-items:center;padding:15px 18px;border-bottom:${d.border};gap:14px;`}>
            <span style={css`font-size:13px;color:#7C7C7C;font-weight:700;flex:none;`}>{d.label}</span>
            <div style={css`display:flex;align-items:center;gap:8px;min-width:0;justify-content:flex-end;`}>
              <span style={css`font-size:14px;font-weight:800;color:#252525;text-align:right;word-break:break-word;`}>{d.value}</span>
              {d.copy && (<>
                <div onClick={d.copy} title="Copy email" style={css`flex:none;width:30px;height:30px;border-radius:999px;background:#F3F3F3;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#646464;`}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15V5a2 2 0 0 1 2-2h10"></path></svg></div>
              </>)}
            </div>
          </div>
        ))}
      </div>
      <a href={v.personTeamsUrl} target="_blank" rel="noopener" style={css`display:flex;align-items:center;justify-content:center;gap:9px;height:54px;border-radius:999px;background:#0A0A0A;color:#fff;text-decoration:none;font-size:15px;font-weight:800;`}>
        <img src="assets/teams-icon.png" alt="" width="22" height="22" style={css`display:block;`} />Chat on Teams
      </a>
    </div>
  );
}
