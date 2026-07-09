import React from 'react';
import { css } from '../lib/css.js';
import ImageSlot from '../lib/ImageSlot.jsx';

export function Menu({ v }) {
  return (
    <div style={css`padding:6px 18px 120px;`}>
      <div style={css`font-size:32px;font-weight:900;letter-spacing:-0.025em;line-height:1;margin:3px 0 18px;`}>Menu</div>
      <div onClick={v.goProfile} style={css`background:#fff;border-radius:20px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.05);display:flex;align-items:center;gap:14px;margin-bottom:18px;cursor:pointer;`}>
        <div style={css`width:56px;height:56px;border-radius:50%;flex:none;position:relative;background:#0E3A1E;color:#1DFA0F;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;`}>{v.profileInitials}<ImageSlot className="fl-avatar-mini" id="profile-avatar" style={`position:absolute;inset:0;width:56px;height:56px;pointer-events:none;`} shape="circle" placeholder="" /></div>
        <div style={css`flex:1;`}><div style={css`font-size:18px;font-weight:900;`}>{v.profileName}</div><div style={css`font-size:13px;color:#7C7C7C;font-weight:600;`}>{v.profileRoleLine}</div></div>
        <svg width="18" height="18" style={css`color:#A4A4A4;flex:none;`}><use href="#ic-chev" /></svg>
      </div>
      <div style={css`background:#fff;border-radius:20px;box-shadow:0 1px 3px rgba(0,0,0,.05);overflow:hidden;`}>
        <div onClick={v.goLunch} style={css`padding:16px 18px;font-size:15px;font-weight:700;border-bottom:1px solid #F0F0F0;display:flex;justify-content:space-between;align-items:center;cursor:pointer;`}>Lunch orders<svg width="18" height="18" style={css`color:#A4A4A4`}><use href="#ic-chev" /></svg></div>
        <div onClick={v.goDirectory} style={css`padding:16px 18px;font-size:15px;font-weight:700;border-bottom:1px solid #F0F0F0;display:flex;justify-content:space-between;align-items:center;cursor:pointer;`}>Business directory<svg width="18" height="18" style={css`color:#A4A4A4`}><use href="#ic-chev" /></svg></div>
        <div style={css`padding:16px 18px;font-size:15px;font-weight:700;border-bottom:1px solid #F0F0F0;display:flex;justify-content:space-between;align-items:center;`}>Notifications<svg width="18" height="18" style={css`color:#A4A4A4`}><use href="#ic-chev" /></svg></div>
        <div onClick={v.goSupport} style={css`padding:16px 18px;font-size:15px;font-weight:700;border-bottom:1px solid #F0F0F0;display:flex;justify-content:space-between;align-items:center;cursor:pointer;`}>Support<svg width="18" height="18" style={css`color:#A4A4A4`}><use href="#ic-chev" /></svg></div>
        <div style={css`padding:16px 18px;font-size:15px;font-weight:700;border-bottom:1px solid #F0F0F0;display:flex;justify-content:space-between;align-items:center;cursor:pointer;`}>Travel request<svg width="18" height="18" style={css`color:#A4A4A4`}><use href="#ic-chev" /></svg></div>
        <div style={css`padding:16px 18px;font-size:15px;font-weight:700;border-bottom:1px solid #F0F0F0;display:flex;justify-content:space-between;align-items:center;cursor:pointer;`}>Expense claim<svg width="18" height="18" style={css`color:#A4A4A4`}><use href="#ic-chev" /></svg></div>
        <div onClick={v.goLinks} style={css`padding:16px 18px;font-size:15px;font-weight:700;display:flex;justify-content:space-between;align-items:center;cursor:pointer;`}>Useful links<svg width="18" height="18" style={css`color:#A4A4A4`}><use href="#ic-chev" /></svg></div>
      </div>
      <div style={css`text-align:center;font-size:12px;color:#A4A4A4;font-weight:700;margin-top:24px;`}>Flash Life · v1.0</div>
    </div>
  );
}
