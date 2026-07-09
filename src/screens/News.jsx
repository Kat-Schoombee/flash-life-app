import React from 'react';
import { css } from '../lib/css.js';
import ImageSlot from '../lib/ImageSlot.jsx';

export function News({ v }) {
  return (
    <div style={css`padding:6px 18px 120px;`}>
      <div onClick={v.backHome} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;margin-bottom:14px;`}><svg width="18" height="18"><use href="#ic-back" /></svg>Home</div>
      <div style={css`display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;`}>
        <div style={css`font-size:32px;font-weight:900;letter-spacing:-0.025em;line-height:1;`}>News</div>
        <div style={css`display:flex;align-items:center;gap:2px;background:#EDEDED;border-radius:999px;padding:3px;`}>
          <div onClick={v.setNewsCard} title="Card view" style={css`display:flex;align-items:center;justify-content:center;width:34px;height:30px;border-radius:999px;cursor:pointer;background:${v.newsCardBg};color:${v.newsCardCol};transition:all .15s;`}><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M4.72625 11.4897C4.35808 11.4897 4.04517 11.3507 3.7875 11.0726C3.52984 10.7944 3.401 10.4565 3.401 10.0589V6.44641C3.401 6.04903 3.52984 5.71122 3.7875 5.43298C4.04517 5.15474 4.35808 5.01562 4.72625 5.01562H19.274C19.642 5.01562 19.9548 5.15474 20.2125 5.43298C20.4702 5.71122 20.599 6.04903 20.599 6.44641V10.0589C20.599 10.4565 20.4702 10.7944 20.2125 11.0726C19.9548 11.3507 19.642 11.4897 19.274 11.4897H4.72625Z"></path><path fill="currentColor" d="M4.72625 19.0317C4.35808 19.0317 4.04517 18.8927 3.7875 18.6146C3.52984 18.3364 3.401 17.9985 3.401 17.6009V13.9884C3.401 13.591 3.52984 13.2532 3.7875 12.975C4.04517 12.6967 4.35808 12.5576 4.72625 12.5576H19.274C19.642 12.5576 19.9548 12.6967 20.2125 12.975C20.4702 13.2532 20.599 13.591 20.599 13.9884V17.6009C20.599 17.9985 20.4702 18.3364 20.2125 18.6146C19.9548 18.8927 19.642 19.0317 19.274 19.0317H4.72625Z"></path></svg></div>
          <div onClick={v.setNewsList} title="List view" style={css`display:flex;align-items:center;justify-content:center;width:34px;height:30px;border-radius:999px;cursor:pointer;background:${v.newsListBg};color:${v.newsListCol};transition:all .15s;`}><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M4.72625 8.98767C4.35808 8.98767 4.04517 8.85892 3.7875 8.60142C3.52984 8.34375 3.401 8.03083 3.401 7.66267V6.34063C3.401 5.97263 3.52984 5.65979 3.7875 5.40212C4.04517 5.14446 4.35808 5.01562 4.72625 5.01562H19.274C19.642 5.01562 19.9548 5.14446 20.2125 5.40212C20.4702 5.65979 20.599 5.97263 20.599 6.34063V7.66267C20.599 8.03083 20.4702 8.34375 20.2125 8.60142C19.9548 8.85892 19.642 8.98767 19.274 8.98767H4.72625Z"></path><path fill="currentColor" d="M4.72625 14.0048C4.35808 14.0048 4.04517 13.876 3.7875 13.6185C3.52984 13.3608 3.401 13.0479 3.401 12.6798V11.3577C3.401 10.9897 3.52984 10.6769 3.7875 10.4192C4.04517 10.1615 4.35808 10.0327 4.72625 10.0327H19.274C19.642 10.0327 19.9548 10.1615 20.2125 10.4192C20.4702 10.6769 20.599 10.9897 20.599 11.3577V12.6798C20.599 13.0479 20.4702 13.3608 20.2125 13.6185C19.9548 13.876 19.642 14.0048 19.274 14.0048H4.72625Z"></path><path fill="currentColor" d="M4.72625 18.9845C4.35808 18.9845 4.04517 18.8557 3.7875 18.5982C3.52984 18.3406 3.401 18.0277 3.401 17.6595V16.3375C3.401 15.9695 3.52984 15.6566 3.7875 15.399C4.04517 15.1413 4.35808 15.0125 4.72625 15.0125H19.274C19.642 15.0125 19.9548 15.1413 20.2125 15.399C20.4702 15.6566 20.599 15.9695 20.599 16.3375V17.6595C20.599 18.0277 20.4702 18.3406 20.2125 18.5982C19.9548 18.8557 19.642 18.9845 19.274 18.9845H4.72625Z"></path></svg></div>
        </div>
      </div>
      <div style={css`display: flex; grid-template-columns: repeat(4,1fr); gap: 4px; margin: 0 0 18px; flex-wrap: wrap`}>
        {v.newsTabs.map((t, i) => (
          <div key={i} onClick={t.select} style={css`padding: 11px 0; border-radius: 12px; text-align: center; font-size: 13px; font-weight: 800; cursor: pointer; background: ${t.bg}; color: ${t.col}; border: 1.5px solid ${t.border}; padding-top: 8px; padding-bottom: 8px; padding-left: 8px; padding-right: 8px`}>{t.label}</div>
        ))}
      </div>
      {v.isNewsCard && (<>
      {v.newsFiltered.map((n, i) => (
        <div key={i} onClick={n.open} style={css`background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.05);margin-bottom:14px;cursor:pointer;`}>
          <ImageSlot id={n.slotId} style={`width:calc(100% - 24px);height:auto;aspect-ratio:4/3;display:block;margin:12px 12px 0;border:1px solid #E6E6E6;border-radius:16px;`} shape="rounded" radius={16} placeholder="Article image" />
          <div style={css`padding:15px 16px 17px;`}>
            <div style={css`font-size:10px;font-weight:800;color:#10C504;text-transform:uppercase;letter-spacing:0.06em;`}>{n.tag}</div>
            <div style={css`font-size:18px;font-weight:900;line-height:1.18;margin-top:5px;text-wrap:pretty;letter-spacing:-0.01em;`}>{n.title}</div>
          </div>
        </div>
      ))}
      </>)}
      {v.isNewsList && (<>
      {v.newsFiltered.map((n, i) => (
        <div key={i} onClick={n.open} style={css`background: #fff; border-radius: 18px; box-shadow: 0 1px 3px rgba(0,0,0,.05); margin-bottom: 12px; cursor: pointer; display: flex; align-items: center; gap: 14px; padding: 12px`}>
          <ImageSlot id={n.slotId} style={`width: 147px; height: auto; aspect-ratio: 4/3; flex: none; border: 1px solid #E6E6E6; border-radius: 16px; border-width: 1px; border-color: var(--flash-grey-100)`} shape="rounded" radius={16} placeholder="Image" />
          <div style={css`min-width:0;`}>
            <div style={css`font-size:10px;font-weight:800;color:#10C504;text-transform:uppercase;letter-spacing:0.05em;`}>{n.tag}</div>
            <div style={css`font-size:15px;font-weight:800;line-height:1.2;margin-top:4px;text-wrap:pretty;`}>{n.title}</div>
          </div>
        </div>
      ))}
      </>)}
    </div>
  );
}
