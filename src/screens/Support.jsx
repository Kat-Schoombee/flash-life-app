import React from 'react';
import { css } from '../lib/css.js';

export function Support({ v }) {
  return (
    <div style={css`padding:6px 18px 130px;`}>
      <div onClick={v.goMenu} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;margin-bottom:16px;`}><svg width="18" height="18"><use href="#ic-back" /></svg>Menu</div>
      <div style={css`font-size:32px;font-weight:900;letter-spacing:-0.025em;line-height:1;margin:3px 0 4px;`}>Support</div>
      <p style={css`font-size:14px;color:#646464;font-weight:600;margin:0 0 22px;`}>Tell us what's going on and the right team will get back to you.</p>

      <div style={css`font-size:13px;font-weight:800;color:#252525;margin-bottom:8px;`}>Support type</div>
      <div style={css`position:relative;margin-bottom:18px;`}>
        <select value={v.supportType} onChange={v.setSupportType} style={css`width:100%;box-sizing:border-box;appearance:none;-webkit-appearance:none;border:1.5px solid #DDDDDD;border-radius:12px;padding:14px 44px 14px 14px;font-family:'Satoshi',system-ui,sans-serif;font-size:15px;font-weight:700;color:#252525;background:#fff;cursor:pointer;outline:none;`}>
          <option value="App support">App support</option>
          <option value="IT support">IT support</option>
          <option value="Report fraud">Report fraud</option>
        </select>
        <svg width="20" height="20" style={css`position:absolute;right:14px;top:50%;transform:translateY(-50%) rotate(90deg);color:#A4A4A4;pointer-events:none;`}><use href="#ic-chev" /></svg>
      </div>

      <div style={css`font-size:13px;font-weight:800;color:#252525;margin-bottom:8px;`}>Message</div>
      <textarea value={v.supportMsg} onChange={v.setSupportMsg} placeholder="Describe the issue in as much detail as you can…" style={css`width:100%;box-sizing:border-box;border:1.5px solid #DDDDDD;border-radius:12px;padding:13px 14px;font-family:'Satoshi',system-ui,sans-serif;font-size:15px;font-weight:600;line-height:1.5;color:#252525;resize:none;height:128px;outline:none;margin-bottom:18px;`} />

      <div style={css`font-size:13px;font-weight:800;color:#252525;margin-bottom:8px;`}>Attachment <span style={css`color:#A4A4A4;font-weight:700;`}>(optional)</span></div>
      {v.noSupportFile && (<>
        <label style={css`display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border:1.5px dashed #C1C1C1;border-radius:14px;padding:26px 18px;text-align:center;cursor:pointer;color:#7C7C7C;`}>
          <svg width="28" height="28" style={css`color:#10C504`}><use href="#ic-cam" /></svg>
          <div style={css`font-size:14px;font-weight:800;color:#252525;`}>Add a photo or document</div>
          <div style={css`font-size:12px;font-weight:600;`}>PNG, JPG or PDF · up to 10&nbsp;MB</div>
          <input type="file" accept="image/*,.pdf,.doc,.docx" onChange={v.pickSupportFile} style={css`display:none;`} />
        </label>
      </>)}
      {v.hasSupportFile && (<>
        <div style={css`display:flex;align-items:center;gap:12px;border:1.5px solid #E6E6E6;border-radius:14px;padding:13px 14px;`}>
          <div style={css`width:38px;height:38px;border-radius:10px;background:#E8F5EC;color:#10C504;display:flex;align-items:center;justify-content:center;flex:none;`}><svg width="20" height="20"><use href="#ic-check" /></svg></div>
          <div style={css`flex:1;min-width:0;font-size:14px;font-weight:700;color:#252525;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;`}>{v.supportFile}</div>
          <div onClick={v.clearSupportFile} style={css`width:30px;height:30px;border-radius:50%;background:#F4F4F4;color:#646464;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none;`}><svg width="14" height="14"><use href="#ic-x" /></svg></div>
        </div>
      </>)}

      <div onClick={v.submitSupport} style={css`margin-top:24px;height:54px;border-radius:999px;background:${v.supportSendBg};color:${v.supportSendCol};display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;cursor:pointer;transition:background .15s ease;`}>Send request</div>
    </div>
  );
}
