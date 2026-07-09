import React from 'react';
import { css } from '../lib/css.js';

export function Survey({ v }) {
  return (
    <div style={css`padding:6px 18px 130px;`}>
      <div onClick={v.surveyBack} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;margin-bottom:16px;`}><svg width="18" height="18"><use href="#ic-back" /></svg> Back</div>

      <div style={css`display:flex;align-items:center;gap:8px;`}>
        <span style={css`width:9px;height:9px;border-radius:50%;background:#10C504;flex:none;`}></span>
        <span style={css`font-size:13px;font-weight:800;color:#0C8B43;`}>Weekly pulse survey</span>
      </div>
      <div style={css`font-size:20px;font-weight:900;letter-spacing:-0.015em;line-height:1.18;margin-top:7px;text-wrap:pretty;`}>{v.surveyTopic}</div>

      <div style={css`display:flex;align-items:center;justify-content:space-between;margin-top:18px;margin-bottom:9px;`}>
        <span style={css`font-size:12px;font-weight:800;color:#252525;`}>{v.surveyStepLabel}</span>
        <span style={css`font-size:12px;font-weight:700;color:#9AA39E;`}>{v.surveyAnsweredLive}</span>
      </div>
      <div style={css`position:relative;height:7px;background:#EDF1EE;border-radius:999px;overflow:hidden;`}>
        <div style={css`position:absolute;top:0;bottom:0;left:0;background:linear-gradient(90deg,#0C9A3C,#24E80F);border-radius:999px;width:${v.surveyFlowPct};transition:width .4s cubic-bezier(.2,.8,.2,1);`}></div>
      </div>

      <div style={css`background:#fff;border:1px solid #EAEFEC;border-radius:22px;padding:22px 18px;margin-top:20px;box-shadow:0 2px 10px rgba(0,0,0,.04);`}>
        <div style={css`font-size:19px;font-weight:900;letter-spacing:-0.01em;line-height:1.25;text-wrap:pretty;`}>{v.surveyQ}</div>
        <div style={css`font-size:13px;font-weight:600;color:#7C8682;margin-top:6px;line-height:1.4;`}>{v.surveyHelp}</div>

        {v.sqIsChoice && (<>
          <div style={css`display:flex;flex-direction:column;gap:10px;margin-top:18px;`}>
            {v.sChoiceOptions.map((opt, i) => (
              <div key={i} onClick={opt.onClick} style={css`${opt.style}`}>
                <span style={css`${opt.dot}`}></span>
                <span style={css`${opt.labelStyle}`}>{opt.label}</span>
              </div>
            ))}
          </div>
        </>)}

        {v.sqIsMulti && (<>
          <div style={css`display:flex;flex-direction:column;gap:10px;margin-top:18px;`}>
            {v.sMultiOptions.map((opt, i) => (
              <div key={i} onClick={opt.onClick} style={css`${opt.style}`}>
                <span style={css`${opt.box}`}><svg width="13" height="13" style={css`color:#fff;`}><use href="#ic-check" /></svg></span>
                <span style={css`${opt.labelStyle}`}>{opt.label}</span>
              </div>
            ))}
          </div>
        </>)}

        {v.sqIsRating && (<>
          <div style={css`display:flex;gap:9px;margin-top:20px;`}>
            {v.sRating.map((r, i) => (
              <div key={i} onClick={r.onClick} style={css`${r.style}`}>{r.n}</div>
            ))}
          </div>
          <div style={css`display:flex;justify-content:space-between;margin-top:10px;font-size:11px;font-weight:700;color:#9AA39E;`}>
            <span>{v.sRatingLow}</span>
            <span>{v.sRatingHigh}</span>
          </div>
        </>)}

        {v.sqIsText && (<>
          <textarea value={v.sTextValue} onChange={v.setSurveyText} maxLength="300" placeholder={v.sTextPlaceholder} style={css`width:100%;min-height:120px;box-sizing:border-box;border:1.5px solid #DDD;border-radius:14px;padding:14px;font-size:15px;font-weight:600;font-family:inherit;resize:none;outline:none;margin-top:18px;color:#1A1A1A;`} />
        </>)}
      </div>

      <div onClick={v.surveyNext} style={css`display:flex;align-items:center;justify-content:center;gap:7px;background:${v.surveyNextBg};color:${v.surveyNextCol};border-radius:14px;padding:16px;font-size:15px;font-weight:800;margin-top:20px;cursor:pointer;transition:all .15s;`}>{v.surveyNextLabel} <svg width="15" height="15" style={css`color:#1DFA0F;`}><use href="#ic-arr" /></svg></div>
      <div onClick={v.saveSurvey} style={css`text-align:center;font-size:13px;font-weight:800;color:#646464;margin-top:16px;cursor:pointer;`}>Save &amp; finish later</div>
    </div>
  );
}
