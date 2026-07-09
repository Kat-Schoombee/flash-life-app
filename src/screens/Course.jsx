import React from 'react';
import { css } from '../lib/css.js';

export function Course({ v }) {
  return (
    <div style={css`padding:6px 18px 130px;`}>
      <div onClick={v.backLearn} style={css`display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:#252525;font-size:13px;font-weight:800;margin-bottom:14px;`}><svg width="18" height="18"><use href="#ic-back" /></svg>Learn</div>
      <div style={css`font-size:11px;font-weight:800;color:#10C504;text-transform:uppercase;letter-spacing:0.06em;`}>{v.courseTag} · {v.courseMins}</div>
      <div style={css`font-size:26px;font-weight:900;line-height:1.12;letter-spacing:-0.02em;margin:7px 0 14px;text-wrap:pretty;`}>{v.courseTitle}</div>
      <p style={css`font-size:15px;line-height:1.62;color:#414141;margin:0 0 24px;`}>{v.courseBody}</p>

      <div style={css`height:1px;background:#EDEDED;margin-bottom:20px;`}></div>
      <div style={css`font-size:17px;font-weight:900;margin-bottom:4px;`}>Quick check</div>
      <p style={css`font-size:13px;color:#646464;font-weight:600;margin:0 0 16px;`}>Answer correctly to earn {v.coursePts}.</p>

      <div style={css`display:flex;flex-direction:column;gap:22px;`}>
        {v.quizQs.map((q, i) => (
          <div key={i}>
            <div style={css`font-size:15px;font-weight:800;line-height:1.3;margin-bottom:11px;text-wrap:pretty;`}>{q.q}</div>
            <div style={css`display: flex; flex-direction: column; gap: 4px`}>
              {q.opts.map((o, j) => (
                <div key={j} onClick={o.pick} style={css`display:flex;align-items:center;gap:12px;background:${o.bg};border:1.5px solid ${o.bd};color:${o.col};border-radius:14px;padding:13px 15px;font-size:14px;font-weight:700;cursor:pointer;`}>
                  <span style={css`flex:1;text-wrap:pretty;`}>{o.label}</span>
                  <div style={css`width:20px;height:20px;border-radius:50%;flex:none;background:${o.markBg};border:2px solid ${o.markBorder};display:flex;align-items:center;justify-content:center;color:${o.markCol};transition:background .15s ease,border-color .15s ease;`}><svg width="13" height="13"><use href={'#' + o.markIcon} /></svg></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {v.quizNotSubmitted && (<>
        <div onClick={v.submitQuiz} style={css`margin-top:24px;height:54px;border-radius:999px;background:${v.quizBtnBg};color:${v.quizBtnCol};display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;cursor:pointer;transition:background .15s ease;`}>Submit answers</div>
      </>)}

      {v.quizPassed && (<>
        <div style={css`margin-top:22px;background:#E6F6E5;border-radius:18px;padding:18px;text-align:center;`}>
          <div style={css`font-size:16px;font-weight:900;color:#10C504;`}>All correct — nice work!</div>
          <div style={css`font-size:13px;color:#414141;font-weight:600;margin-top:4px;`}>Claim your points to add them to Flash Club.</div>
          <div onClick={v.claimCourse} style={css`margin-top:14px;height:50px;border-radius:999px;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;cursor:pointer;`}>Claim {v.coursePts}</div>
        </div>
      </>)}

      {v.quizFailed && (<>
        <div style={css`margin-top:22px;background:#FCE5EA;border-radius:18px;padding:18px;text-align:center;`}>
          <div style={css`font-size:16px;font-weight:900;color:#D80027;`}>Not quite — review and try again</div>
          <div style={css`font-size:13px;color:#414141;font-weight:600;margin-top:4px;`}>The correct answers are highlighted in green above.</div>
          <div onClick={v.retryQuiz} style={css`margin-top:14px;height:50px;border-radius:999px;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;cursor:pointer;`}>Try again</div>
        </div>
      </>)}
    </div>
  );
}
