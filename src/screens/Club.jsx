import React from 'react';
import { css } from '../lib/css.js';

export function Club({ v }) {
  return (
    <div style={css`padding:6px 18px 120px;`}>
      <div style={css`font-size:12px;font-weight:600;color:#646464;`}>Mon, 3 July</div>
      <div style={css`font-size:32px;font-weight:900;letter-spacing:-0.025em;line-height:1;margin:3px 0 16px;`}>Flash Club</div>

      <div style={css`display:flex;background:#fff;border-radius:999px;padding:4px;margin:0 0 20px;box-shadow:0 1px 3px rgba(0,0,0,.06);`}>
        <div onClick={v.setClubProgress} style={css`flex:1;text-align:center;padding:11px 0;border-radius:999px;font-size:14px;font-weight:800;cursor:pointer;transition:background .18s cubic-bezier(.2,.8,.2,1),color .18s cubic-bezier(.2,.8,.2,1),box-shadow .18s cubic-bezier(.2,.8,.2,1);background:${v.clubProgBg};color:${v.clubProgCol};box-shadow:${v.clubProgSh};`}>Progress</div>
        <div onClick={v.setClubEarn} style={css`flex:1;text-align:center;padding:11px 0;border-radius:999px;font-size:14px;font-weight:800;cursor:pointer;transition:background .18s cubic-bezier(.2,.8,.2,1),color .18s cubic-bezier(.2,.8,.2,1),box-shadow .18s cubic-bezier(.2,.8,.2,1);background:${v.clubEarnBg};color:${v.clubEarnCol};box-shadow:${v.clubEarnSh};`}>Earn Points</div>
      </div>

      {v.clubProgress && (<>
      <div data-club-card="v1">
        <div style={css`position:relative;background:#fff;border-radius:20px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.05);margin-bottom:14px;`}>
          <div onClick={v.openHerdInfo} style={css`position:absolute;top:14px;right:14px;width:30px;height:30px;border-radius:50%;background:#F0F0F0;color:#8A8A8A;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s ease,color .15s ease;`} aria-label="How Flash Club works"><svg width="19" height="19"><use href="#ic-info-fill" /></svg></div>
          <div style={css`font-size:18px;font-weight:900;padding-right:34px;`}>July progress</div>
          <div style={css`font-size:13px;color:#646464;font-weight:600;margin:2px 0 14px;`}>{v.clubBarPoints}/20 points this month</div>
          <div style={css`position:relative;height:18px;background:#EDEDED;border-radius:999px;margin-bottom:6px;`}>
            <div style={css`position:absolute;top:0;bottom:0;left:0;background:linear-gradient(90deg,#0C9A3C 0%,#24E80F 100%);border-radius:999px;transition:width 1.05s cubic-bezier(.22,.61,.36,1);width:min(${v.clubBarPct}, calc(100% - 19px));`}></div>
            <div data-reward-cow="1" style={css`position:absolute;top:50%;transform:translate(-50%,-50%);transition:left 1.05s cubic-bezier(.22,.61,.36,1),background .5s ease;left:clamp(19px, ${v.clubBarPct}, calc(100% - 19px));width:38px;height:38px;box-sizing:border-box;border-radius:50%;background:${v.badgeBg};border:1.5px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:${v.badgeShadow};`}><img src="assets/flash-cow.svg" alt="" style={css`width:24px;height:24px;display:block;transition:opacity .3s ease;opacity:${v.badgeCowOp};`} /></div>
          </div>
          <div style={css`font-size:12px;color:#10C504;font-weight:800;margin-top:12px;`}>{v.clubToGoLabel}</div>
        </div>

        <div style={css`background:#fff;border-radius:20px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.05);margin-bottom:22px;`}>
          <div style={css`font-size:18px;font-weight:900;margin-bottom:14px;`}>Yearly progress</div>
          <div style={css`display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;`}>
            <span style={css`font-size:13px;font-weight:800;`}>Your herd this year</span>
            <span style={css`font-size:11px;font-weight:800;color:#0C8B43;background:rgba(16,197,4,0.12);border-radius:999px;padding:3px 9px;flex:none;`}>{v.yearCowsLabel}</span>
          </div>
          <div style={css`font-size:12px;color:#10C504;font-weight:800;margin-bottom:14px;`}>{v.cowsToGoLabel}</div>
          <div style={css`display:grid;grid-template-columns:repeat(6,1fr);gap:8px;`}>
            {v.monthsGrid.map((mg, i) => (
              <div key={i} onClick={mg.open} style={css`display:flex;flex-direction:column;align-items:center;gap:5px;cursor:${mg.cursor};`}>
                <div data-herd-idx={mg.idx} style={css`position:relative;width:100%;aspect-ratio:1;border-radius:13px;background:${mg.bg};border:${mg.border};box-sizing:border-box;display:flex;align-items:center;justify-content:center;`}>
                  {mg.isCow && (<><img src="assets/flash-cow.svg" alt="" style={css`width:28px;height:28px;opacity:${mg.op};filter:${mg.filter};`} /></>)}
                  {mg.isBreak && (<><div style={css`display:flex;gap:3px;align-items:center;`}><span style={css`width:3px;height:13px;border-radius:2px;background:#C4C4C4;`}></span><span style={css`width:3px;height:13px;border-radius:2px;background:#C4C4C4;`}></span></div></>)}
                </div>
                <span style={css`font-size:10px;font-weight:800;color:${mg.labelCol};`}>{mg.label}</span>
              </div>
            ))}
          </div>

          <div style={css`height:1px;background:#EDEDED;margin:16px 0;`}></div>
          <div onClick={v.goEarnPoints} style={css`cursor:pointer;`}>
            <div style={css`display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;`}>
              <div style={css`font-size:15px;font-weight:900;`}>Categories Earned</div>
              <div style={css`font-size:11px;color:${v.yearlyCatText};font-weight:800;background:${v.yearlyCatBg};border-radius:999px;padding:3px 9px;flex:none;`}>{v.yearlyCatLabel}</div>
            </div>
            <div style={css`display:flex;align-items:center;justify-content:space-between;gap:12px;`}>
              <div style={css`flex:1;min-width:0;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;`}>
                {v.catsEarnedGrid.map((c, i) => (
                  <div key={i} style={css`width:100%;aspect-ratio:4/3;border-radius:16px;background:${c.chipBg};display:flex;align-items:center;justify-content:center;`}>{c.iconEl}</div>
                ))}
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={css`color:#B4B4B4;flex:none;`}><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>
      </div>

      </>)}

      {v.clubEarn && (<>
      <div style={css`font-size:18px;font-weight:900;letter-spacing:-0.01em;`}>Earn points for July</div>
      <div style={css`font-size:13px;color:#646464;font-weight:600;margin:2px 0 20px;`}>{v.earnPointsSub}</div>
      <div style={css`font-size:15px;font-weight:900;margin-bottom:12px;`}>Earn 10 points</div>
      <div style={css`display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;`}>
        {v.cats10.map((c, i) => (
          <div key={i} onClick={c.open} style={css`background:${c.cardBg};border-radius:18px;padding:15px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.06);`}>
            <div style={css`display:flex;justify-content:space-between;align-items:flex-start;`}>
              <div style={css`width:42px;height:42px;border-radius:13px;background:${c.iconTint};display:flex;align-items:center;justify-content:center;`}>{c.iconEl}</div>
              <img src={c.yearlyDone ? 'assets/tick-earned.svg' : 'assets/tick-muted.svg'} alt="" style={css`width:24px;height:24px;flex:none;`} />
            </div>
            <div style={css`font-size:15px;font-weight:800;margin-top:12px;line-height:1.15;text-wrap:balance;`}>{c.name}</div>
            <div style={css`margin-top:4px;`}>
              <span style={css`font-size:12px;font-weight:800;color:${c.statusColor};`}>{c.statusLabel}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={css`font-size:15px;font-weight:900;margin-bottom:12px;`}>Earn 5 points</div>
      <div style={css`display:grid;grid-template-columns:1fr 1fr;gap:12px;`}>
        {v.cats5.map((c, i) => (
          <div key={i} onClick={c.open} style={css`background:${c.cardBg};border-radius:18px;padding:15px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.06);`}>
            <div style={css`display:flex;justify-content:space-between;align-items:flex-start;`}>
              <div style={css`width:42px;height:42px;border-radius:13px;background:${c.iconTint};display:flex;align-items:center;justify-content:center;`}>{c.iconEl}</div>
              <img src={c.yearlyDone ? 'assets/tick-earned.svg' : 'assets/tick-muted.svg'} alt="" style={css`width:24px;height:24px;flex:none;`} />
            </div>
            <div style={css`font-size:15px;font-weight:800;margin-top:12px;line-height:1.15;text-wrap:balance;`}>{c.name}</div>
            <div style={css`margin-top:4px;`}>
              <span style={css`font-size:12px;font-weight:800;color:${c.statusColor};`}>{c.statusLabel}</span>
            </div>
          </div>
        ))}
      </div>
      </>)}
    </div>
  );
}
