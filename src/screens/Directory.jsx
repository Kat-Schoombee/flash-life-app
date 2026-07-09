import React from 'react';
import { css } from '../lib/css.js';

export function Directory({ v }) {
  return (
    <div style={css`padding:6px 18px 130px;`}>
      <div onClick={v.goMenu} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;margin-bottom:16px;`}><svg width="18" height="18"><use href="#ic-back" /></svg>Menu</div>
      <div style={css`font-size:32px;font-weight:900;letter-spacing:-0.025em;line-height:1;margin:3px 0 4px;`}>Business directory</div>
      <p style={css`font-size:14px;color:#646464;font-weight:600;margin:0 0 14px;`}>Search across every department.</p>

      <div style={css`position:relative;margin-bottom:4px;`}>
        <svg width="18" height="18" style={css`position:absolute;left:15px;top:50%;transform:translateY(-50%);color:#A4A4A4;pointer-events:none;`}><use href="#ic-search" /></svg>
        <input value={v.dirSearch} onChange={v.setDirSearch} placeholder="Search people, roles or departments" style={css`width:100%;box-sizing:border-box;border:1.5px solid #DDDDDD;border-radius:14px;padding:13px 42px;font-family:'Satoshi',system-ui,sans-serif;font-size:14px;font-weight:600;color:#252525;background:#fff;outline:none;`} />
        {v.hasDirSearch && (<>
          <div onClick={v.clearDirSearch} style={css`position:absolute;right:11px;top:50%;transform:translateY(-50%);width:26px;height:26px;border-radius:50%;background:#F0F0F0;color:#646464;display:flex;align-items:center;justify-content:center;cursor:pointer;`}><svg width="12" height="12"><use href="#ic-x" /></svg></div>
        </>)}
      </div>

      {v.searching && (<>
        <div style={css`font-size:13px;font-weight:800;color:#7C7C7C;margin:18px 0 11px;`}>{v.searchCountLabel}</div>
        {v.noSearchResults && (<>
          <div style={css`background:#fff;border-radius:20px;box-shadow:0 1px 3px rgba(0,0,0,.05);padding:34px 20px;text-align:center;`}>
            <div style={css`font-size:15px;font-weight:800;color:#252525;`}>No matches found</div>
            <div style={css`font-size:13px;font-weight:600;color:#7C7C7C;margin-top:5px;`}>Try a different name, role or department.</div>
          </div>
        </>)}
        <div style={css`display:grid;grid-template-columns:1fr 1fr;gap:12px;`}>
          {v.searchResults.map((m, i) => (
            <div key={i} onClick={m.open} style={css`background:#fff;border-radius:18px;box-shadow:0 1px 3px rgba(0,0,0,.05);padding:15px;cursor:pointer;display:flex;flex-direction:column;gap:11px;`}>
              <div style={css`width:46px;height:46px;border-radius:50%;background:${m.tint};color:${m.fg};border:1.5px solid var(--flash-grey-150);box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:900;`}>{m.initials}</div>
              <div>
                <div style={css`font-size:14px;font-weight:800;color:#252525;line-height:1.2;`}>{m.name}</div>
                <div style={css`font-size:12px;font-weight:600;color:#7C7C7C;margin-top:3px;line-height:1.3;`}>{m.role}</div>
                <div style={css`font-size:11px;font-weight:800;color:${m.fg};margin-top:6px;`}>{m.deptName}</div>
              </div>
            </div>
          ))}
        </div>
      </>)}

      {v.notSearching && (<>
        {v.directoryDepts.map((dep, i) => (
          <React.Fragment key={i}>
            <div style={css`display:flex;align-items:center;justify-content:space-between;margin:20px 0 11px;`}>
              <span style={css`font-size:13px;font-weight:800;color:#7C7C7C;`}>{dep.name}</span>
              <span style={css`font-size:12px;font-weight:700;color:#A4A4A4;`}>{dep.count}</span>
            </div>
            <div style={css`display:flex;gap:12px;overflow-x:auto;padding:2px 2px 8px;margin:0 -2px;scrollbar-width:none;`}>
              {dep.members.map((m, j) => (
                <div key={j} onClick={m.open} style={css`flex:none;width:150px;box-sizing:border-box;background:#fff;border-radius:18px;box-shadow:0 1px 3px rgba(0,0,0,.05);padding:15px;cursor:pointer;display:flex;flex-direction:column;gap:11px;`}>
                  <div style={css`width: 46px; height: 46px; border-radius: 50%; background: ${m.tint}; color: ${m.fg}; border: 1.5px solid var(--flash-grey-150); box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 900; border-width: 1px`}>{m.initials}</div>
                  <div>
                    <div style={css`font-size:14px;font-weight:800;color:#252525;line-height:1.2;`}>{m.name}</div>
                    <div style={css`font-size:12px;font-weight:600;color:#7C7C7C;margin-top:3px;line-height:1.3;`}>{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </>)}
    </div>
  );
}
