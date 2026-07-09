import React from 'react';
import { css } from '../lib/css.js';
import ImageSlot from '../lib/ImageSlot.jsx';

export function Lunch({ v }) {
  return (
    <div style={css`padding:6px 18px 130px;`}>
      <div onClick={v.goHome} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;margin-bottom:14px;`}><svg width="18" height="18"><use href="#ic-back" /></svg>Home</div>
      <div style={css`font-size:12px;font-weight:600;color:#646464;`}>Order for next week</div>
      <div style={css`font-size:32px;font-weight:900;letter-spacing:-0.025em;line-height:1;margin:3px 0 16px;`}>Lunch orders</div>
      <div style={css`background: #0E3A1E; border-radius: 16px; padding: 14px 16px; color: #fff; display: flex; align-items: center; gap: 16px; margin-bottom: 20px`}>
        <div style={css`display: flex; align-items: flex-start; gap: 4px; flex: none`}>
          <div style={css`display:flex;flex-direction:column;align-items:flex-start;gap:4px;`}>
            <div style={css`display:flex;gap:4px;`}>
              <span style={css`min-width:26px;height:30px;background:rgba(255,255,255,.12);border-radius:7px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff;`}>0</span>
              <span style={css`min-width:26px;height:30px;background:rgba(255,255,255,.12);border-radius:7px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff;`}>1</span>
            </div>
            <span style={css`font-size:9px;color:#9FD5AE;font-weight:700;letter-spacing:0.03em;`}>day</span>
          </div>
          <span style={css`font-weight:800;font-size:14px;color:#9FD5AE;height:30px;display:flex;align-items:center;`}>:</span>
          <div style={css`display:flex;flex-direction:column;align-items:flex-start;gap:4px;`}>
            <div style={css`display:flex;gap:4px;`}>
              <span style={css`min-width:26px;height:30px;background:rgba(255,255,255,.12);border-radius:7px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff;`}>0</span>
              <span style={css`min-width:26px;height:30px;background:rgba(255,255,255,.12);border-radius:7px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff;`}>8</span>
            </div>
            <span style={css`font-size:9px;color:#9FD5AE;font-weight:700;letter-spacing:0.03em;`}>hours</span>
          </div>
        </div>
        <div style={css`flex:1;`}><div style={css`font-size:13px;font-weight:800;`}>Orders close every <br />Thursday at 10:00</div><div style={css`font-size:12px;color:#9FD5AE;font-weight:600;margin-top:1px;`}>Update or place orders before the cut-off time</div></div>

      </div>

      <div style={css`position:relative;display: flex; gap: 4px; border-radius: 999px; padding: 4px; margin-bottom: 18px; padding-top: 4px; padding-right: 4px; padding-bottom: 4px; padding-left: 4px; background-color: var(--flash-grey-300)`}>
        <div style={css`position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 6px);background:#fff;border-radius:999px;box-shadow:0 1px 3px rgba(0,0,0,.12);transform:translateX(${v.tabSlideX});transition:transform .3s cubic-bezier(.34,1.2,.64,1);`}></div>
        <div onClick={v.goLunchMenu} style={css`position:relative;z-index:1;flex:1;text-align:center;padding:10px;border-radius:999px;font-size:14px;font-weight:800;cursor:pointer;color:${v.tabMenuCol};transition:color .25s ease;`}>Menu</div>
        <div onClick={v.goLunchOrder} style={css`position:relative;z-index:1;flex:1;text-align:center;padding:10px;border-radius:999px;font-size:14px;font-weight:800;cursor:pointer;color:${v.tabOrderCol};transition:color .25s ease;`}>My orders</div>
      </div>

      {v.isLunchMenu && (<>
      <div style={css`display: grid; grid-template-columns: repeat(4,1fr); gap: 6px; margin: 0 0 18px`}>
        {v.lunchDays.map((d, i) => (
          <div key={i} onClick={d.pick} style={css`position: relative; padding: 11px 0; border-radius: 12px; text-align: center; cursor: pointer; background: ${d.bg}; color: ${d.col}; border: 1.5px solid ${d.border}`}>
            <div style={css`font-size:14px;font-weight:800;`}>{d.label}</div>
            <div style={css`font-size:11px;font-weight:600;opacity:.65;margin-top:1px;`}>{d.date}</div>
            {d.dotShow && (<>
              <div style={css`position:absolute;top:8px;right:9px;width:8px;height:8px;border-radius:50%;background:${d.dotBg};`}></div>
            </>)}
          </div>
        ))}
      </div>

      <div style={css`display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px;`}>
        <span style={css`font-size:16px;font-weight:900;`}>{v.activeDayLong}</span>
        <span style={css`font-size:12px;font-weight:700;color:#7C7C7C;`}>Tap to add or remove</span>
      </div>
      <div style={css`display: flex; flex-direction: column; gap: 8px`}>
        {v.activeMenu.map((m, i) => (
          <div key={i} onClick={m.select} style={css`display: flex; align-items: center; gap: 13px; background: ${m.bg}; border: 1.5px solid ${m.border}; border-radius: 16px; padding: 11px; cursor: pointer; padding-top: 12px; padding-right: 12px; padding-bottom: 12px; padding-left: 12px`}>
            <ImageSlot id={m.slotId} style={`width:72px;height:72px;flex:none;`} shape="rounded" radius={8} placeholder="Photo" />
            <div style={css`flex:1;`}><div style={css`font-size:15px;font-weight:800;`}>{m.name}</div><div style={css`font-size:12px;color:#7C7C7C;font-weight:600;margin-top:2px;text-wrap:pretty;`}>{m.desc}</div><div style={css`display:flex;align-items:center;gap:6px;margin-top:7px;flex-wrap:wrap;`}><div style={css`display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:3px 9px;background:${m.catBg};`}><span style={css`font-size:11px;font-weight:800;color:${m.catCol};`}>{m.caterer}</span></div>{m.veg && (<><div style={css`display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:3px 9px;background:#E6F6E5;`}><span style={css`font-size:11px;font-weight:800;color:#19A70D;`}>Vegetarian</span></div></>)}</div></div>
            <div style={css`width: 20px; height: 20px; border-radius: 50%; flex: none; background: ${m.dot}; border: 2px solid ${m.dotBorder}; display: flex; align-items: center; justify-content: center; color: ${m.dotTick}`}><svg width="13" height="13"><use href="#ic-check" /></svg></div>
          </div>
        ))}
      </div>
      </>)}

      {v.isLunchOrder && (<>
      <div style={css`display:flex;justify-content:space-between;align-items:center;margin:4px 0 12px;`}>
        <span style={css`font-size:15px;font-weight:900;`}>This week</span>
        <span style={css`display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:800;color:#A4A4A4;background:#F4F4F4;border-radius:999px;padding:5px 11px;`}><svg width="12" height="12"><use href="#ic-clock" /></svg>Orders closed</span>
      </div>
      <div style={css`background:#fff;border:1px solid #EDEDED;border-radius:18px;overflow:hidden;margin-bottom:8px;`}>
        {v.thisWeek.map((t, i) => (
          <div key={i} style={css`border-top:1px solid #F4F4F4;display:flex;align-items:center;gap:12px;padding:13px 15px;`}>
            <div style={css`width:42px;flex:none;`}><div style={css`font-size:13px;font-weight:800;`}>{t.label}</div><div style={css`font-size:10px;color:#A4A4A4;font-weight:700;`}>{t.date}</div></div>
            <div style={css`flex:1;`}>
              <div style={css`font-size:14px;font-weight:700;color:${t.mealCol};`}>{t.mealName}</div>
              {t.hasMeal && (<>
                <div style={css`display:flex;align-items:center;gap:6px;margin-top:7px;flex-wrap:wrap;`}>
                  <span style={css`font-size:11px;font-weight:800;color:${t.catCol};background:${t.catBg};border-radius:999px;padding:3px 9px;`}>{t.mealCaterer}</span>
                  {t.veg && (<><span style={css`display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:3px 9px;background:#E6F6E5;`}><span style={css`font-size:11px;font-weight:800;color:#19A70D;`}>Vegetarian</span></span></>)}
                </div>
              </>)}
            </div>
            <div style={css`font-size:11px;font-weight:800;color:${t.statusCol};background:${t.statusBg};border-radius:999px;padding:5px 11px;flex:none;`}>{t.statusLabel}</div>
          </div>
        ))}
      </div>
      <div style={css`font-size:12px;color:#A4A4A4;font-weight:700;line-height:1.45;margin:0 2px 26px;text-wrap:pretty;`}>Orders for this week are locked — here's what you're having each day.</div>

      <div style={css`display:flex;justify-content:space-between;align-items:center;margin:4px 0 12px;`}>
        <span style={css`font-size:15px;font-weight:900;`}>Next week</span>
        <span style={css`font-size:11px;font-weight:700;color:#7C7C7C;`}>Editable until Thu 10:00</span>
      </div>
      <div style={css`background:#fff;border:1px solid #EDEDED;border-radius:18px;overflow:hidden;`}>
        {v.weekRecap.map((r, i) => (
          <div key={i} style={css`border-top:1px solid #F4F4F4;`}>
            <div onClick={r.toggle} style={css`display:flex;align-items:center;gap:12px;padding:13px 15px;cursor:pointer;`}>
              <div style={css`width:42px;flex:none;`}><div style={css`font-size:13px;font-weight:800;`}>{r.label}</div><div style={css`font-size:10px;color:#A4A4A4;font-weight:700;`}>{r.date}</div></div>
              <div style={css`flex:1;font-size:14px;font-weight:700;color:${r.mealCol};`}>{r.mealName}</div>
              <div style={css`font-size:11px;font-weight:800;color:${r.statusCol};background:${r.statusBg};border-radius:999px;padding:5px 11px;`}>{r.statusLabel}</div>
              <svg width="16" height="16" style={css`color:#A4A4A4;flex:none;transform:${r.chevRot};transition:transform .2s ease;`}><use href="#ic-chev" /></svg>
            </div>
            {r.expanded && (<>
              <div style={css`padding:0 15px 15px 69px;`}>
                {r.hasMeal && (<>
                  <div style={css`background:#F8F8F8;border-radius:14px;padding:13px 14px;`}>
                    <div style={css`font-size:14px;font-weight:800;`}>{r.mealName}</div>
                    <div style={css`font-size:12px;color:#7C7C7C;font-weight:600;margin-top:2px;text-wrap:pretty;`}>{r.mealDesc}</div>
                    <div style={css`display:flex;align-items:center;gap:6px;margin-top:6px;flex-wrap:wrap;`}><div style={css`display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:3px 9px;background:${r.catBg};`}><span style={css`font-size:11px;font-weight:800;color:${r.catCol};`}>{r.mealCaterer}</span></div>{r.veg && (<><div style={css`display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:3px 9px;background:#E6F6E5;`}><span style={css`font-size:11px;font-weight:800;color:#19A70D;`}>Vegetarian</span></div></>)}</div>
                    <div style={css`display:flex;gap:8px;margin-top:11px;`}>
                      <div onClick={r.edit} style={css`display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 18px;border-radius:19px;background:#000;color:#fff;font-size:13px;font-weight:800;cursor:pointer;`}>Change selection</div>
                      <div onClick={r.remove} style={css`display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 16px;border-radius:19px;background:#fff;border:1.5px solid #E6E6E6;color:#D80027;font-size:13px;font-weight:800;cursor:pointer;`}>Remove</div>
                    </div>
                  </div>
                </>)}
                {r.noMeal && (<>
                  <div style={css`background:#F8F8F8;border-radius:14px;padding:13px 14px;`}>
                    <div style={css`font-size:13px;color:#7C7C7C;font-weight:600;`}>No meal chosen for {r.long}.</div>
                    <div onClick={r.edit} style={css`margin-top:11px;display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 18px;border-radius:19px;background:#000;color:#fff;font-size:13px;font-weight:800;cursor:pointer;`}>Choose a meal</div>
                  </div>
                </>)}
              </div>
            </>)}
          </div>
        ))}
      </div>

      <div onClick={v.saveLunch} style={css`margin-top:20px;height:54px;border-radius:999px;background:${v.saveBg};color:${v.saveCol};display:flex;align-items:center;justify-content:center;gap:8px;font-size:15px;font-weight:800;cursor:pointer;transition:background .15s ease;`}>{v.saveLabel}</div>
      </>)}
    </div>
  );
}
