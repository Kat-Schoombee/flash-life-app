import React from 'react';
import { css } from '../lib/css.js';
import ImageSlot from '../lib/ImageSlot.jsx';

export function Home({ v }) {
  return (
    <div style={css`padding:6px 18px 120px;`}>
      <div style={css`display:flex;align-items:flex-start;justify-content:space-between;gap:12px;`}>
        <div>
          <div style={css`font-size:12px;font-weight:600;color:#646464;`}>Mon, 3 July</div>
          <div style={css`font-size:32px;font-weight:900;letter-spacing:-0.025em;line-height:1;margin:3px 0 18px;`}>Hi, Alex!</div>
        </div>
        <div onClick={v.goNotifications} style={css`position:relative;flex:none;width:44px;height:44px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .15s cubic-bezier(.2,.8,.2,1);`}>
          <svg width="22" height="22" style={css`color:#0A0A0A;`}><use href="#ic-bell" /></svg>
          {v.hasUnread && (<>
            <span style={css`position:absolute;top:-2px;right:-2px;min-width:18px;height:18px;padding:0 4px;box-sizing:border-box;border-radius:999px;background:#D80027;color:#fff;border:2px solid #EDEDED;font-size:10px;font-weight:800;line-height:1;display:flex;align-items:center;justify-content:center;`}>{v.unreadCount}</span>
          </>)}
        </div>
      </div>

      <div style={css`font-size: 1rem; font-weight: 800; margin-bottom: 9px`}>Catch up</div>

      {v.surveyAvailable && (<>
      <div onClick={v.openSurveyCard} style={css`background:#0E3A1E;border-radius:20px;padding:17px 18px;box-shadow:0 6px 18px rgba(12,138,67,.22);margin-bottom:13px;cursor:pointer;display:flex;align-items:center;gap:12px;`}>
        <div style={css`flex:1;min-width:0;`}>
          <div style={css`display:flex;align-items:center;gap:8px;min-width:0;`}>
            <span style={css`width:9px;height:9px;border-radius:50%;background:#10C504;flex:none;animation:flPulseDot 1.9s ease-out infinite;`}></span>
            <span style={css`font-size:13px;font-weight:800;color:#B9E6C6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`}>Got 2 mins for a survey?</span>
          </div>
          <div style={css`font-size:18px;font-weight:900;line-height:1.2;letter-spacing:-0.01em;margin-top:9px;text-wrap:pretty;color:#fff;`}>{v.surveyTopic}</div>
        </div>
        <svg width="20" height="20" style={css`color:rgba(255,255,255,.55);flex:none;`}><use href="#ic-chev" /></svg>
      </div>
      </>)}

      {v.surveyInProgress && (<>
      <div onClick={v.openSurveyCard} style={css`background:#fff;border:1.5px solid #FAD79B;border-radius:20px;padding:17px 18px;box-shadow:0 6px 18px rgba(250,162,37,.14);margin-bottom:13px;cursor:pointer;`}>
        <div style={css`display:flex;align-items:center;justify-content:space-between;gap:10px;`}>
          <div style={css`display:flex;align-items:center;gap:7px;background:#FEEFD2;border-radius:999px;padding:5px 11px 5px 9px;`}>
            <svg width="13" height="13" style={css`color:#C77E12;`}><use href="#ic-clock" /></svg>
            <span style={css`font-size:11px;font-weight:800;color:#C77E12;letter-spacing:0.02em;`}>In progress</span>
          </div>
          <span style={css`font-size:11px;font-weight:800;color:#C77E12;`}>{v.surveyProgressLabel}</span>
        </div>
        <div style={css`font-size:18px;font-weight:900;line-height:1.2;letter-spacing:-0.01em;margin-top:11px;text-wrap:pretty;`}>{v.surveyTopic}</div>
        <div style={css`position:relative;height:7px;background:#F3E6CC;border-radius:999px;overflow:hidden;margin-top:11px;`}>
          <div style={css`position:absolute;top:0;bottom:0;left:0;background:linear-gradient(90deg,#FF9900,#FAC766);border-radius:999px;width:${v.surveyProgressPct};transition:width .5s cubic-bezier(.2,.8,.2,1);`}></div>
        </div>
        <div style={css`display:flex;align-items:center;gap:9px;margin-top:13px;`}>
          <div style={css`display:flex;align-items:center;gap:5px;`}>
            {v.streakDots.map((d, i) => (
              <span key={i} style={css`width:9px;height:9px;border-radius:50%;background:${d.bg};border:${d.border};box-sizing:border-box;`}></span>
            ))}
          </div>
          <span style={css`font-size:12px;font-weight:700;color:#646464;`}>{v.surveyStreakText}</span>
        </div>
        <div style={css`display:flex;align-items:center;justify-content:center;gap:7px;background:#0a0a0a;color:#fff;border-radius:14px;padding:14px;font-size:15px;font-weight:800;margin-top:15px;`}>Continue <svg width="15" height="15" style={css`color:#FF9900;`}><use href="#ic-arr" /></svg></div>
      </div>
      </>)}

      {v.surveyDoneState && (<>
      <div style={css`background:#F7F9F7;border:1px solid #E7ECE8;border-radius:20px;padding:17px 18px;margin-bottom:13px;`}>
        <div style={css`display:flex;align-items:center;gap:8px;`}>
          <div style={css`display:flex;align-items:center;gap:6px;background:#E4F7E6;border-radius:999px;padding:5px 11px 5px 8px;`}>
            <svg width="13" height="13" style={css`color:#0C8B43;`}><use href="#ic-check" /></svg>
            <span style={css`font-size:11px;font-weight:800;color:#0C8B43;letter-spacing:0.02em;`}>Done</span>
          </div>
        </div>
        <div style={css`font-size:17px;font-weight:800;line-height:1.2;letter-spacing:-0.01em;margin-top:11px;color:#9AA39E;text-wrap:pretty;`}>{v.surveyTopic}</div>
        <div style={css`display:flex;align-items:center;gap:9px;margin-top:12px;`}>
          <div style={css`display:flex;align-items:center;gap:5px;`}>
            {v.streakDots.map((d, i) => (
              <span key={i} style={css`width:9px;height:9px;border-radius:50%;background:${d.bg};border:${d.border};box-sizing:border-box;`}></span>
            ))}
          </div>
          <span style={css`font-size:12px;font-weight:800;color:#0C8B43;`}>{v.surveyStreakText}</span>
        </div>
        <div style={css`display:flex;align-items:center;justify-content:center;gap:6px;margin-top:14px;padding-top:13px;border-top:1px solid #E7ECE8;color:#0C8B43;font-size:13px;font-weight:800;`}><svg width="14" height="14" style={css`color:#0C8B43;`}><use href="#ic-check" /></svg> Submitted</div>
      </div>
      </>)}

      <div onClick={v.goClub} style={css`background:#fff;border-radius:20px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.05);margin-bottom:13px;cursor:pointer;`}>
        <div style={css`display:flex;justify-content:space-between;align-items:center;`}><span style={css`font-size:19px;font-weight:900;`}>Flash Club</span><svg width="20" height="20" style={css`color:#5F6261`}><use href="#ic-chev" /></svg></div>
        <div style={css`font-size:13px;color:#646464;font-weight:600;margin:2px 0 14px;`}>{v.points}/20 points this month</div>
        <div style={css`position:relative;height:18px;background:#EDEDED;border-radius:999px;`}>
          <div style={css`position:absolute;top:0;bottom:0;left:0;background:linear-gradient(90deg,#0C9A3C 0%,#24E80F 100%);border-radius:999px;transition:width .5s cubic-bezier(.2,.8,.2,1);width:min(${v.pointsPctStr}, calc(100% - 19px));`}></div>
          <div style={css`position:absolute;top:50%;transform:translate(-50%,-50%);transition:left .5s cubic-bezier(.2,.8,.2,1);left:clamp(19px, ${v.pointsPctStr}, calc(100% - 19px));width:38px;height:38px;box-sizing:border-box;border-radius:50%;background:#1DFA0F;border:1.5px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.22);`}><img src="assets/flash-cow.svg" alt="" style={css`width:24px;height:24px;display:block;`} /></div>
        </div>
        <div style={css`font-size:12px;color:#10C504;font-weight:800;margin-top:14px;`}>{v.ptsToGoLabel}</div>
      </div>

      <div onClick={v.goLunch} style={css`background:#fff;border-radius:20px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.05);margin-bottom:13px;cursor:pointer;display:flex;align-items:center;gap:12px;`}>
        <div style={css`flex:1;min-width:0;`}>
        <div style={css`display:flex;justify-content:space-between;align-items:center;`}>
          <div style={css`display:flex;align-items:center;gap:9px;`}><span style={css`font-size: 1.13rem; font-weight: 900`}>Lunch orders</span>{v.lunchHasOrder && (<><div style={css`display:flex;align-items:center;gap:6px;background:#10C504;border-radius:999px;padding:4px 5px 4px 11px;`}><span style={css`font-size:11px;font-weight:800;color:#fff;`}>Ordered</span><span style={css`min-width:18px;height:18px;padding:0 5px;background:#fff;color:#0C8B43;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;box-sizing:border-box;`}>{v.lunchCount}</span></div></>)}{v.lunchNoOrder && (<><span style={css`font-size:11px;font-weight:800;color:#C77E12;background:#FEEFD2;border-radius:999px;padding:4px 10px;`}>Order now</span></>)}</div>
          {v.lunchHasOrder && (<><span style={css`font-size:13px;font-weight:800;background:#F0F0F0;color:#252525;border-radius:999px;padding:8px 16px;`}>Edit</span></>)}
        </div>
        <div style={css`font-size:12px;color:#646464;font-weight:600;margin:10px 0 10px;`}>Closes in</div>
        <div style={css`display:flex;align-items:flex-start;gap:8px;`}>
          <div style={css`display: flex; flex-direction: column; align-items: flex-start; gap: 5px`}>
            <div style={css`display:flex;gap:6px;`}>
              <span style={css`min-width:30px;height:34px;background:#F0F0F0;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:17px;`}>0</span>
              <span style={css`min-width:30px;height:34px;background:#F0F0F0;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:17px;`}>1</span>
            </div>
            <span style={css`font-size:11px;color:#7C7C7C;font-weight:700;`}>day</span>
          </div>
          <span style={css`font-weight:800;font-size:16px;height:34px;display:flex;align-items:center;`}>:</span>
          <div style={css`display: flex; flex-direction: column; align-items: flex-start; gap: 5px`}>
            <div style={css`display:flex;gap:6px;`}>
              <span style={css`min-width:30px;height:34px;background:#F0F0F0;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:17px;`}>0</span>
              <span style={css`min-width:30px;height:34px;background:#F0F0F0;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:17px;`}>8</span>
            </div>
            <span style={css`font-size:11px;color:#7C7C7C;font-weight:700;`}>hours</span>
          </div>
        </div>
        </div>
        {v.lunchNoOrder && (<><svg width="22" height="22" style={css`flex:none;color:#5F6261;`}><use href="#ic-chev" /></svg></>)}
      </div>

      <div style={css`font-size: 1rem; font-weight: 800; margin: 6px 0 9px`}>Birthdays</div>
      <div className="fl-scroll" style={css`display:flex;gap:11px;overflow-x:auto;margin:0 -18px 20px;padding:0 18px;`}>
        {v.birthdays.map((b, i) => (
          <div key={i} onClick={b.open} style={css`flex: none; width: 150px; box-sizing: border-box; background: #fff; border-radius: 18px; padding: 15px; box-shadow: 0 1px 3px rgba(0,0,0,.05); cursor: pointer; display: flex; flex-direction: column; gap: 11px; padding-top: 16px; padding-right: 16px; padding-bottom: 16px; padding-left: 16px`}>
            <div style={css`width:46px;height:46px;border-radius:50%;background:${b.tint};color:${b.fg};border:1.5px solid var(--flash-grey-150);box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:900;`}>{b.initials}</div>
            <div>
              <div style={css`font-size:14px;font-weight:800;color:#252525;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`}>{b.name}</div>
              <div style={css`font-size:12px;font-weight:600;color:#7C7C7C;margin-top:3px;line-height:1.3;height:31px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;`}>{b.role}</div>
              <div style={css`font-size:11px;font-weight:800;color:${b.fg};margin-top:6px;`}>{b.date}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={css`display:flex;justify-content:space-between;align-items:center;margin-bottom:11px;`}><span style={css`font-size: 1rem; font-weight: 800`}>News</span><span onClick={v.goNews} style={css`display:inline-flex;align-items:center;gap:4px;font-size:13px;font-weight:800;color:#646464;cursor:pointer;`}>View all <svg width="13" height="13" style={css`color:#5F6261;`}><use href="#ic-chev" /></svg></span></div>
      {v.newsPreview.map((n, i) => (
        <div key={i} onClick={n.open} style={css`background:#fff;border-radius:18px;box-shadow:0 1px 3px rgba(0,0,0,.05);margin-bottom:12px;cursor:pointer;display:flex;align-items:center;gap:14px;padding:12px;`}>
          <ImageSlot id={n.slotId} style={`width:147px;height:auto;aspect-ratio:4/3;flex:none;border:1px solid #E6E6E6;border-radius:16px;`} shape="rounded" radius={16} placeholder="Image" />
          <div>
            <div style={css`font-size:10px;font-weight:800;color:#10C504;text-transform:uppercase;letter-spacing:0.05em;`}>{n.tag}</div>
            <div style={css`font-size:15px;font-weight:800;line-height:1.2;margin-top:4px;text-wrap:pretty;`}>{n.title}</div>
          </div>
        </div>
      ))}
      <div onClick={v.goNews} style={css`display:flex;align-items:center;justify-content:center;gap:6px;background:#fff;border:1.5px solid #EDEDED;border-radius:999px;padding:14px;cursor:pointer;font-size:14px;font-weight:800;color:#252525;margin-top:2px;`}>View all news <svg width="16" height="16" style={css`color:#252525;`}><use href="#ic-chev" /></svg></div>
    </div>
  );
}
