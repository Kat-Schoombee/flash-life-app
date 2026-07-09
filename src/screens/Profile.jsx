import React from 'react';
import { css } from '../lib/css.js';
import ImageSlot from '../lib/ImageSlot.jsx';

export function Profile({ v }) {
  return (
    <div style={css`padding:6px 18px 120px;`}>
      <div onClick={v.goMenu} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;margin-bottom:16px;`}><svg width="18" height="18"><use href="#ic-back" /></svg>Menu</div>

      <div style={css`display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:22px;`}>
        <div style={css`position:relative;width:104px;height:104px;margin-bottom:14px;`}>
          <div style={css`position:absolute;inset:0;border-radius:50%;background:#0E3A1E;color:#1DFA0F;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:900;`}>{v.profileInitials}</div>
          <ImageSlot id="profile-avatar" style={`position:absolute;inset:0;width:104px;height:104px;`} shape="circle" placeholder="Add photo" />
        </div>
        <div style={css`font-size:24px;font-weight:900;letter-spacing:-0.02em;line-height:1.1;`}>{v.profileName}</div>
        <div style={css`font-size:14px;color:#7C7C7C;font-weight:700;margin-top:3px;`}>{v.profileRoleLine}</div>
        <div style={css`font-size:12px;color:#A4A4A4;font-weight:700;margin-top:8px;`}>Drag a photo onto the circle to update it</div>
      </div>

      <div style={css`display:flex;gap:10px;margin-bottom:18px;`}>
        {v.profileStats.map((st, i) => (
          <div key={i} style={css`flex:1;background:#fff;border-radius:18px;padding:14px 10px;box-shadow:0 1px 3px rgba(0,0,0,.05);text-align:center;`}>
            <div style={css`font-size:22px;font-weight:900;letter-spacing:-0.01em;`}>{st.value}</div>
            <div style={css`font-size:11px;color:#7C7C7C;font-weight:700;margin-top:3px;text-wrap:balance;`}>{st.label}</div>
          </div>
        ))}
      </div>

      <div style={css`background:#fff;border-radius:20px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.05);margin-bottom:14px;`}>
        <div style={css`display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;`}>
          <span style={css`font-size:15px;font-weight:900;`}>About</span>
          {v.bioIdle && (<>
            <span onClick={v.editBio} style={css`font-size:13px;font-weight:800;color:#252525;background:#F0F0F0;border-radius:999px;padding:6px 14px;cursor:pointer;`}>Edit</span>
          </>)}
        </div>
        {v.bioIdle && (<>
          <p style={css`margin:0;font-size:14px;line-height:1.55;color:${v.bioColor};font-weight:600;text-wrap:pretty;`}>{v.bioText}</p>
        </>)}
        {v.editingBio && (<>
          <textarea value={v.bioDraft} onChange={v.setBioDraft} maxLength="180" placeholder="Write a short bio about yourself…" style={css`width:100%;box-sizing:border-box;border:1.5px solid #DDDDDD;border-radius:14px;padding:12px 13px;font-family:'Satoshi',system-ui,sans-serif;font-size:14px;font-weight:600;line-height:1.5;color:#252525;resize:none;height:96px;outline:none;`} />
          <div style={css`display:flex;justify-content:space-between;align-items:center;margin-top:10px;`}>
            <span style={css`font-size:11px;color:#A4A4A4;font-weight:700;`}>{v.bioCount}/180</span>
            <div style={css`display:flex;gap:8px;`}>
              <span onClick={v.cancelBio} style={css`font-size:13px;font-weight:800;color:#646464;background:#F4F4F4;border-radius:999px;padding:8px 16px;cursor:pointer;`}>Cancel</span>
              <span onClick={v.saveBio} style={css`font-size:13px;font-weight:800;color:#fff;background:#0A0A0A;border-radius:999px;padding:8px 18px;cursor:pointer;`}>Save</span>
            </div>
          </div>
        </>)}
      </div>

      <div style={css`background:#fff;border-radius:20px;box-shadow:0 1px 3px rgba(0,0,0,.05);overflow:hidden;`}>
        {v.profileDetails.map((d, i) => (
          <div key={i} style={css`display:flex;justify-content:space-between;align-items:center;padding:15px 18px;border-bottom:${d.border};gap:14px;`}>
            <span style={css`font-size:13px;color:#7C7C7C;font-weight:700;flex:none;`}>{d.label}</span>
            <span style={css`font-size:14px;font-weight:800;color:#252525;text-align:right;`}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
