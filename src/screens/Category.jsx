import React from 'react';
import { css } from '../lib/css.js';
import ImageSlot from '../lib/ImageSlot.jsx';
import WheelDatePicker from '../lib/WheelDatePicker.jsx';

export function Category({ v }) {
  return (
    <div style={css`position:absolute;top:34px;left:0;right:0;bottom:0;z-index:60;background:#fff;display:flex;flex-direction:column;animation:flFade .2s ease;`}>
      <div style={css`flex:none;padding:14px 16px 0;`}>
        <div onClick={v.closeCategory} style={css`width:40px;height:40px;display:flex;align-items:center;justify-content:flex-start;cursor:pointer;color:#000;`}><svg width="24" height="24"><use href="#ic-back" /></svg></div>
      </div>

      <div className="fl-scroll" style={css`flex:1;overflow-y:auto;padding:10px 20px 24px;`}>
        <div style={css`display:flex;align-items:flex-start;justify-content:space-between;gap:12px;`}>
          <div style={css`width:46px;height:46px;border-radius:14px;background:${v.catTint};display:flex;align-items:center;justify-content:center;flex:none;`}>{v.catIconEl}</div>
          <div style={css`display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px;`}>
            <div style={css`font-size:13px;font-weight:800;color:${v.catPtsPillCol};background:${v.catPtsPillBg};border-radius:999px;padding:7px 14px;white-space:nowrap;`}>+{v.catPtsShort}</div>
            <div style={css`font-size:13px;font-weight:800;color:${v.catCatPillCol};background:${v.catCatPillBg};border-radius:999px;padding:7px 14px;white-space:nowrap;`}>{v.catCatPillLabel}</div>
          </div>
        </div>

        <div style={css`font-size:26px;font-weight:900;letter-spacing:-0.01em;margin-top:14px;`}>{v.catName}</div>
        <div style={css`font-size:14px;font-weight:700;color:${v.catStatusColor};margin-top:4px;`}>{v.catStatusLabel}</div>
        <div style={css`display:flex;gap:16px;align-items:center;background:#E2F3FF;border-radius:20px;padding:18px 20px;margin-top:14px;`}>
          <img src="assets/ic-info.svg" width="24" height="24" alt="" style={css`flex:none;width:24px;height:24px;`} />
          <span style={css`font-size:14px;line-height:1.45;color:#646464;font-weight:600;text-wrap:pretty;`}>{v.catBlurb}</span>
        </div>

        {v.valuesRecvActive && (<>
          <div style={css`display:flex;flex-direction:column;gap:13px;margin-top:24px;`}>
            {v.vrNominations.map((nm, i) => (
              <div key={i} style={css`background:#fff;border:1.5px solid #EDEDED;border-radius:20px;overflow:hidden;`}>
                <div onClick={nm.toggle} style={css`display:flex;align-items:center;gap:14px;padding:14px 15px;cursor:pointer;`}>
                  <div style={css`width:64px;height:64px;border-radius:16px;background:${nm.valTint};display:flex;align-items:center;justify-content:center;flex:none;`}>
                    <img src={nm.valIcon} alt="" style={css`width:38px;height:38px;object-fit:contain;`} />
                  </div>
                  <div style={css`flex:1;min-width:0;`}>
                    <div style={css`font-size:17px;font-weight:900;letter-spacing:-0.01em;color:#0A0A0A;line-height:1.15;`}>{nm.valLabel}</div>
                    <div style={css`display:flex;align-items:center;gap:8px;margin-top:7px;`}>
                      <span style={css`font-size:14px;font-weight:800;color:#252525;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`}>{nm.nominator}</span>
                    </div>
                    <div style={css`font-size:12px;font-weight:600;color:#414141;margin-top:4px;`}>{nm.dateLabel}</div>
                  </div>
                  <svg width="18" height="18" style={css`color:#A4A4A4;flex:none;transform:${nm.chevRot};transition:transform .26s cubic-bezier(.2,.8,.2,1);`}><use href="#ic-chev" /></svg>
                </div>
                <div style={css`max-height:${nm.maxH};overflow:hidden;transition:max-height .32s cubic-bezier(.2,.8,.2,1);`}>
                  <div style={css`padding:2px 16px 18px;border-top:1px solid #E0E0E0;margin-top:2px;`}>
                    <div style={css`margin-top:16px;`}>
                      <div style={css`font-size:11px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;color:#10C504;margin-bottom:6px;`}>Behaviour</div>
                      <div style={css`font-size:14px;line-height:1.55;color:#414141;font-weight:600;text-wrap:pretty;`}>{nm.behaviour}</div>
                    </div>
                    <div style={css`margin-top:16px;`}>
                      <div style={css`font-size:11px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;color:#10C504;margin-bottom:6px;`}>Situation</div>
                      <div style={css`font-size:14px;line-height:1.55;color:#414141;font-weight:600;text-wrap:pretty;`}>{nm.situation}</div>
                    </div>
                    <div style={css`margin-top:16px;`}>
                      <div style={css`font-size:11px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;color:#10C504;margin-bottom:6px;`}>Impact</div>
                      <div style={css`font-size:14px;line-height:1.55;color:#414141;font-weight:600;text-wrap:pretty;`}>{nm.impact}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>)}

        {v.catShowEvidence && (<>
          <div style={css`margin-top:28px;`}>
            <div style={css`font-size:15px;font-weight:900;margin-bottom:12px;`}>Submit your evidence</div>

            {v.evIsPhoto && (<>
              {v.noPhoto && (<>
                <div onClick={v.addPhoto} style={css`border:2px dashed #C1C1C1;border-radius:18px;padding:38px 18px;text-align:center;cursor:pointer;color:#7C7C7C;`}>
                  <svg width="34" height="34" style={css`color:#9A9A9A`}><use href="#ic-cam" /></svg>
                  <div style={css`font-size:15px;font-weight:800;color:#252525;margin-top:10px;`}>Add a photo</div>
                  <div style={css`font-size:12px;font-weight:600;margin-top:3px;`}>Tap to take a photo or upload from your gallery</div>
                </div>
              </>)}
              {v.photoAdded && (<>
                <div style={css`border-radius:18px;overflow:hidden;border:1px solid #C8E7D0;`}>
                  <div style={css`height:160px;background:linear-gradient(135deg,#10C504,#0E3A1E);position:relative;`}>
                    <div style={css`position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,.92);border-radius:999px;padding:6px 12px;display:flex;align-items:center;gap:6px;font-size:12px;font-weight:800;color:#10C504;`}><svg width="16" height="16"><use href="#ic-check" /></svg>Photo attached</div>
                  </div>
                  <div style={css`padding:12px 14px;font-size:12px;font-weight:600;color:#646464;`}>evidence_july.jpg · 2.4&nbsp;MB</div>
                </div>
              </>)}
            </>)}

            {v.evIsNote && (<>
              <textarea onChange={v.setNote} placeholder="Tell us what happened in a sentence or two…" style={css`width:100%;min-height:130px;box-sizing:border-box;border:1.5px solid #DDD;border-radius:16px;padding:14px;font-family:'Satoshi',sans-serif;font-size:14px;line-height:1.5;resize:none;outline:none;`} />
              <div style={css`font-size:12px;color:#7C7C7C;font-weight:600;margin-top:8px;`}>A short reflection is enough — this stays between you and your manager.</div>
            </>)}

            {v.evIsChecklist && (<>
              <div style={css`display:flex;flex-direction:column;gap:10px;`}>
                {v.checklistItems.map((ck, i) => (
                  <div key={i} onClick={ck.toggle} style={css`display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #EDEDED;border-radius:14px;padding:14px 15px;cursor:pointer;`}>
                    <div style={css`width:20px;height:20px;border-radius:6px;flex:none;background:${ck.box};border:2px solid ${ck.boxBorder};display:flex;align-items:center;justify-content:center;color:${ck.tick};`}><svg width="13" height="13"><use href="#ic-check" /></svg></div>
                    <span style={css`font-size:14px;font-weight:700;`}>{ck.label}</span>
                  </div>
                ))}
              </div>
            </>)}
          </div>
        </>)}

        {v.marketActive && (<>
          <div style={css`margin-top:28px;`}>
            <div style={css`font-size:15px;font-weight:900;margin-bottom:10px;text-wrap:pretty;`}>What was the reason for your visit?</div>
            <textarea value={v.mvReason} onChange={v.setMvReason} maxLength="500" placeholder="Write reason here" style={css`width:100%;min-height:130px;box-sizing:border-box;border:1.5px solid #CBCBD0;border-radius:14px;padding:14px;font-family:'Satoshi',sans-serif;font-size:14px;line-height:1.5;resize:none;outline:none;color:#0A0A0A;background:#F8F8F8;`} />
            <div style={css`font-size:12px;font-weight:700;color:#9A9A9A;margin-top:6px;`}>{v.mvReasonCount}</div>

            <div style={css`font-size:15px;font-weight:900;margin:22px 0 8px;`}>Which area did you visit?</div>
            <input value={v.mvArea} onChange={v.setMvArea} placeholder="Area name" style={css`width:100%;box-sizing:border-box;background:#F8F8F8;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;font-family:'Satoshi',sans-serif;font-size:15px;font-weight:600;color:#0A0A0A;outline:none;`} />

            <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>What was the store name?</div>
            <input value={v.mvStoreName} onChange={v.setMvStoreName} placeholder="Store name" style={css`width:100%;box-sizing:border-box;background:#F8F8F8;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;font-family:'Satoshi',sans-serif;font-size:15px;font-weight:600;color:#0A0A0A;outline:none;`} />

            <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>When did you go?</div>
            <div onClick={v.openMvDate} style={css`display:flex;align-items:center;gap:11px;background:#F8F8F8;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;cursor:pointer;`}>
              <span style={css`flex:1;font-size:15px;font-weight:600;color:${v.mvDateLabelCol};`}>{v.mvDateLabel}</span>
              <svg width="20" height="20" style={css`color:#9A9A9A;`}><use href="#ic-cal" /></svg>
            </div>

            <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>Upload photo as evidence</div>
            <div onClick={v.addMvPhoto} style={css`display:flex;align-items:center;gap:11px;background:#F8F8F8;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;cursor:pointer;`}>
              <span style={css`flex:1;font-size:15px;font-weight:600;color:${v.mvPhotoLabelCol};`}>{v.mvPhotoLabel}</span>
              <svg width="20" height="20" style={css`color:#9A9A9A;`}><use href="#ic-cam" /></svg>
            </div>

            <div style={css`font-size:18px;font-weight:900;margin:28px 0 5px;`}>Key Insights</div>
            <div style={css`font-size:13px;font-weight:600;color:#7C7C7C;line-height:1.45;margin-bottom:18px;text-wrap:pretty;`}>During your visit, speak to a trader or store representative and record key insights below.</div>

            <div style={css`font-size:15px;font-weight:900;margin-bottom:10px;text-wrap:pretty;`}>What are the key insights from your visit?</div>
            <textarea value={v.mvInsights} onChange={v.setMvInsights} maxLength="500" placeholder="Write key insights here" style={css`width:100%;min-height:130px;box-sizing:border-box;border:1.5px solid #CBCBD0;border-radius:14px;padding:14px;font-family:'Satoshi',sans-serif;font-size:14px;line-height:1.5;resize:none;outline:none;color:#0A0A0A;background:#F8F8F8;`} />
            <div style={css`font-size:12px;font-weight:700;color:#9A9A9A;margin-top:6px;`}>{v.mvInsightsCount}</div>
          </div>
        </>)}

        {v.vacancyActive && (<>
          <div style={css`margin-top:28px;`}>
            <div style={css`font-size:15px;font-weight:900;margin:0 0 8px;`}>What vacancy did you share?</div>
            <input value={v.vacWhat} onChange={v.setVacWhat} placeholder="e.g. Senior UI/UX designer" style={css`width:100%;box-sizing:border-box;background:#F8F8F8;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;font-family:'Satoshi',sans-serif;font-size:15px;font-weight:600;color:#0A0A0A;outline:none;`} />

            <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>When did you share it?</div>
            <div onClick={v.openVacDate} style={css`display:flex;align-items:center;gap:11px;background:#F8F8F8;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;cursor:pointer;`}>
              <span style={css`flex:1;font-size:15px;font-weight:600;color:${v.vacDateLabelCol};`}>{v.vacDateLabel}</span>
              <svg width="20" height="20" style={css`color:#9A9A9A;`}><use href="#ic-cal" /></svg>
            </div>

            <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>How did you share it?</div>
            <div onClick={v.toggleVacPlatform} style={css`display:flex;align-items:center;gap:11px;background:#F8F8F8;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;cursor:pointer;`}>
              <span style={css`flex:1;font-size:15px;font-weight:600;color:${v.vacPlatformLabelCol};`}>{v.vacPlatformLabel}</span>
              <svg width="18" height="18" style={css`color:#9A9A9A;transform:${v.vacPlatformChevRot};transition:transform .18s ease;`}><use href="#ic-chev" /></svg>
            </div>
            {v.vacPlatformOpen && (<>
              <div style={css`border:1px solid #EDEDED;border-radius:12px;margin-top:8px;overflow:hidden;`}>
                {v.vacPlatforms.map((p, i) => (
                  <div key={i} onClick={p.pick} style={css`padding:14px 16px;font-size:14px;font-weight:700;border-bottom:1px solid #F4F4F4;cursor:pointer;`}>{p.label}</div>
                ))}
              </div>
            </>)}

            <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>Upload proof</div>
            <div onClick={v.addVacPhoto} style={css`display:flex;align-items:center;gap:11px;background:#F8F8F8;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;cursor:pointer;`}>
              <span style={css`flex:1;font-size:15px;font-weight:600;color:${v.vacPhotoLabelCol};`}>{v.vacPhotoLabel}</span>
              <svg width="20" height="20" style={css`color:#9A9A9A;`}><use href="#ic-cam" /></svg>
            </div>
          </div>
        </>)}

        {v.wellnessActive && (<>
          <div style={css`margin-top:28px;`}>
            <div style={css`font-size:15px;font-weight:900;margin:0 0 8px;`}>Wellness activity type</div>
            <div onClick={v.toggleWellType} style={css`display:flex;align-items:center;gap:11px;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;cursor:pointer;background:#F8F8F8;`}>
              <span style={css`flex:1;font-size:15px;font-weight:600;color:${v.wellTypeLabelCol};`}>{v.wellTypeLabel}</span>
              <svg width="18" height="18" style={css`color:#9A9A9A;transform:${v.wellTypeChevRot};transition:transform .18s ease;`}><use href="#ic-chev" /></svg>
            </div>
            {v.wellTypeOpen && (<>
              <div style={css`border:1px solid #EDEDED;border-radius:12px;margin-top:8px;overflow:hidden;`}>
                {v.wellTypes.map((t, i) => (
                  <div key={i} onClick={t.pick} style={css`padding:14px 16px;font-size:14px;font-weight:700;border-bottom:1px solid #F4F4F4;cursor:pointer;`}>{t.label}</div>
                ))}
              </div>
            </>)}

            {v.wellTypeChosen && (<>
              <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>Activity Description</div>
              <input value={v.wellDesc} onChange={v.setWellDesc} placeholder={v.wellDescPlaceholder} style={css`width:100%;box-sizing:border-box;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;font-family:'Satoshi',sans-serif;font-size:15px;font-weight:600;color:#0A0A0A;outline:none;background:#F8F8F8;`} />

              <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>What impact did it have on your wellbeing?</div>
              <textarea value={v.wellImpact} onChange={v.setWellImpact} maxLength="500" placeholder="e.g. Improved my physical health and cleared my mind." style={css`width:100%;min-height:120px;box-sizing:border-box;border:1.5px solid #CBCBD0;border-radius:12px;padding:14px 16px;font-family:'Satoshi',sans-serif;font-size:15px;line-height:1.5;font-weight:600;resize:none;outline:none;color:#0A0A0A;background:#F8F8F8;`} />
              <div style={css`font-size:12px;font-weight:700;color:#9A9A9A;margin-top:6px;`}>{v.wellImpactCount}</div>

              <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>When did you go?</div>
              <div onClick={v.openWellDate} style={css`display:flex;align-items:center;gap:11px;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;cursor:pointer;background:#F8F8F8;`}>
                <span style={css`flex:1;font-size:15px;font-weight:600;color:${v.wellDateLabelCol};`}>{v.wellDateLabel}</span>
                <svg width="20" height="20" style={css`color:#9A9A9A;`}><use href="#ic-cal" /></svg>
              </div>

              <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>Upload photo as evidence</div>
              <div onClick={v.addWellPhoto} style={css`display:flex;align-items:center;gap:11px;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;cursor:pointer;background:#F8F8F8;`}>
                <span style={css`flex:1;font-size:15px;font-weight:600;color:${v.wellPhotoLabelCol};`}>{v.wellPhotoLabel}</span>
                <svg width="20" height="20" style={css`color:#9A9A9A;`}><use href="#ic-cam" /></svg>
              </div>
            </>)}
          </div>
        </>)}

        {v.csiActive && (<>
          <div style={css`margin-top:28px;`}>
            <div style={css`font-size:15px;font-weight:900;margin:0 0 8px;text-wrap:pretty;`}>What type of CSI activity did you complete?</div>
            <div onClick={v.toggleCsiActivity} style={css`display:flex;align-items:center;gap:11px;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;cursor:pointer;background:#F8F8F8;`}>
              <span style={css`flex:1;font-size:15px;font-weight:600;color:${v.csiActivityLabelCol};`}>{v.csiActivityLabel}</span>
              <svg width="18" height="18" style={css`color:#9A9A9A;transform:${v.csiActivityChevRot};transition:transform .18s ease;`}><use href="#ic-chev" /></svg>
            </div>
            {v.csiActivityOpen && (<>
              <div style={css`border:1px solid #EDEDED;border-radius:12px;margin-top:8px;overflow:hidden;`}>
                {v.csiActivities.map((a, i) => (
                  <div key={i} onClick={a.pick} style={css`padding:14px 16px;font-size:14px;font-weight:700;border-bottom:1px solid #F4F4F4;cursor:pointer;`}>{a.label}</div>
                ))}
              </div>
            </>)}

            {v.csiActivityChosen && (<>
              <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>Describe your contribution</div>
              <textarea value={v.csiDesc} onChange={v.setCsiDesc} placeholder="Tell us about what you did and where it added value to someone." style={css`width:100%;min-height:130px;box-sizing:border-box;border:1.5px solid #CBCBD0;border-radius:12px;padding:14px 16px;font-family:'Satoshi',sans-serif;font-size:15px;line-height:1.5;font-weight:600;resize:none;outline:none;color:#0A0A0A;background:#F8F8F8;`} />

              <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>When did you do this?</div>
              <div onClick={v.openCsiDate} style={css`display:flex;align-items:center;gap:11px;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;cursor:pointer;background:#F8F8F8;`}>
                <span style={css`flex:1;font-size:15px;font-weight:600;color:${v.csiDateLabelCol};`}>{v.csiDateLabel}</span>
                <svg width="20" height="20" style={css`color:#9A9A9A;`}><use href="#ic-cal" /></svg>
              </div>

              <div style={css`font-size:15px;font-weight:900;margin:18px 0 8px;`}>Upload proof</div>
              <div onClick={v.addCsiPhoto} style={css`display:flex;align-items:center;gap:11px;border:1.5px solid #CBCBD0;border-radius:12px;padding:15px 16px;cursor:pointer;background:#F8F8F8;`}>
                <span style={css`flex:1;font-size:15px;font-weight:600;color:${v.csiPhotoLabelCol};`}>{v.csiPhotoLabel}</span>
                <svg width="20" height="20" style={css`color:#9A9A9A;`}><use href="#ic-cam" /></svg>
              </div>
            </>)}
          </div>
        </>)}

        {v.catIsVG && (<>
          <div style={css`position:relative;display:flex;background:#F2F2F2;border-radius:999px;padding:5px;margin-top:24px;`}>
            <div style={css`position:absolute;top:5px;bottom:5px;left:5px;width:calc(50% - 5px);background:#0A0A0A;border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,0.18);transform:${v.vgToggleX};transition:transform .28s cubic-bezier(.2,.8,.2,1);`}></div>
            <div onClick={v.vgTabNominate} style={css`position:relative;z-index:1;flex:1;text-align:center;padding:12px 0;font-size:15px;font-weight:800;cursor:pointer;color:${v.vgNomTabCol};transition:color .2s ease;`}>Nominate someone</div>
            <div onClick={v.vgTabHistory} style={css`position:relative;z-index:1;flex:1;text-align:center;padding:12px 0;font-size:15px;font-weight:800;cursor:pointer;color:${v.vgHistTabCol};transition:color .2s ease;`}>View History</div>
          </div>
        </>)}

        {v.vgHistoryActive && (<>
          <div style={css`display:flex;flex-direction:column;gap:13px;margin-top:22px;animation:flFade .2s ease;`}>
            {v.vgGiven.map((g, i) => (
              <div key={i} style={css`background:#fff;border:1.5px solid #EDEDED;border-radius:20px;overflow:hidden;`}>
                <div onClick={g.toggle} style={css`display:flex;align-items:center;gap:14px;padding:14px 15px;cursor:pointer;`}>
                  <div style={css`width:64px;height:64px;border-radius:16px;background:${g.valTint};display:flex;align-items:center;justify-content:center;flex:none;`}>
                    <img src={g.valIcon} alt="" style={css`width:38px;height:38px;object-fit:contain;`} />
                  </div>
                  <div style={css`flex:1;min-width:0;`}>
                    <div style={css`font-size:17px;font-weight:900;letter-spacing:-0.01em;color:#0A0A0A;line-height:1.15;`}>{g.valLabel}</div>
                    <div style={css`display:flex;align-items:center;gap:8px;margin-top:7px;`}>
                      <span style={css`font-size:14px;font-weight:800;color:#252525;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`}>{g.nominee}</span>
                    </div>
                    <div style={css`font-size:12px;font-weight:600;color:#414141;margin-top:4px;`}>{g.dateLabel}</div>
                  </div>
                  <svg width="18" height="18" style={css`color:#A4A4A4;flex:none;transform:${g.chevRot};transition:transform .26s cubic-bezier(.2,.8,.2,1);`}><use href="#ic-chev" /></svg>
                </div>
                <div style={css`max-height:${g.maxH};overflow:hidden;transition:max-height .32s cubic-bezier(.2,.8,.2,1);`}>
                  <div style={css`padding:2px 16px 18px;border-top:1px solid #E0E0E0;margin-top:2px;`}>
                    <div style={css`margin-top:16px;`}>
                      <div style={css`font-size:11px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;color:#10C504;margin-bottom:6px;`}>Behaviour</div>
                      <div style={css`font-size:14px;line-height:1.55;color:#414141;font-weight:600;text-wrap:pretty;`}>{g.behaviour}</div>
                    </div>
                    <div style={css`margin-top:16px;`}>
                      <div style={css`font-size:11px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;color:#10C504;margin-bottom:6px;`}>Situation</div>
                      <div style={css`font-size:14px;line-height:1.55;color:#414141;font-weight:600;text-wrap:pretty;`}>{g.situation}</div>
                    </div>
                    <div style={css`margin-top:16px;`}>
                      <div style={css`font-size:11px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;color:#10C504;margin-bottom:6px;`}>Impact</div>
                      <div style={css`font-size:14px;line-height:1.55;color:#414141;font-weight:600;text-wrap:pretty;`}>{g.impact}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>)}

        {v.vgActive && (<>
          <div style={css`margin-top:26px;`}>
            <div style={css`font-size:17px;font-weight:900;margin-bottom:11px;`}>Who are you nominating?</div>
            <div onClick={v.openEmpDrop} style={css`display:flex;align-items:center;gap:11px;border:1.5px solid #CBCBD0;border-radius:14px;padding:15px 16px;cursor:pointer;background:#F8F8F8;`}>
              {v.vgEmpChosen && (<><div style={css`width:30px;height:30px;border-radius:50%;background:rgba(16,197,4,0.16);color:#10C504;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex:none;`}>{v.vgEmpInitials}</div></>)}
              <span style={css`flex:1;font-size:15px;font-weight:700;color:${v.vgEmpLabelCol};`}>{v.vgEmpLabel}</span>
              <svg width="18" height="18" style={css`color:#9A9A9A;transform:rotate(90deg);`}><use href="#ic-chev" /></svg>
            </div>
          </div>

          {v.vgEmpChosen && (<>
            <div style={css`margin-top:26px;`}>
              <div style={css`font-size:17px;font-weight:900;margin-bottom:12px;`}>Which value did they live by?</div>
              <div style={css`display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;`}>
                {v.vgValueCards.map((vc, i) => (
                  <div key={i} onClick={vc.pick} style={css`background:${vc.cardBg};border:1.5px solid ${vc.cardBorder};border-radius:16px;padding:14px 8px 12px;display:flex;flex-direction:column;align-items:center;gap:10px;cursor:pointer;text-align:center;`}>
                    <div style={css`width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;`}><img src={vc.icon} alt="" style={css`width:32px;height:32px;object-fit:contain;`} /></div>
                    <span style={css`font-size:12px;font-weight:800;line-height:1.2;color:${vc.labelCol};text-wrap:balance;`}>{vc.label}</span>
                  </div>
                ))}
              </div>

              <div style={css`font-size:17px;font-weight:900;margin:26px 0 12px;`}>Which behaviour did they live by?</div>
              <div onClick={v.toggleBehDrop} style={css`display:flex;align-items:center;gap:11px;border:1.5px solid #CBCBD0;border-radius:14px;padding:15px 16px;cursor:pointer;background:#F8F8F8;`}>
                <span style={css`flex:1;font-size:15px;font-weight:700;color:${v.vgBehLabelCol};`}>{v.vgBehLabel}</span>
                <svg width="18" height="18" style={css`color:#9A9A9A;transform:${v.behChevRot};transition:transform .18s ease;`}><use href="#ic-chev" /></svg>
              </div>
              {v.behDropOpen && (<>
                <div style={css`border:1px solid #EDEDED;border-radius:14px;margin-top:8px;overflow:hidden;`}>
                  {v.vgBehaviours.map((b, i) => (
                    <div key={i} onClick={b.pick} style={css`padding:14px 16px;font-size:14px;font-weight:700;border-bottom:1px solid #F4F4F4;cursor:pointer;`}>{b.label}</div>
                  ))}
                </div>
              </>)}

              <div style={css`font-size:15px;font-weight:800;line-height:1.4;margin:26px 0 0;text-wrap:pretty;`}>Describe the situation and how they demonstrated this value. What specific behaviours or actions did you observe?</div>
              <div style={css`font-size:12px;font-weight:700;color:#9A9A9A;margin:8px 0 6px;`}>{v.nomSitCount}</div>
              <textarea value={v.nomSituation} onChange={v.setNomSituation} maxLength="500" placeholder="What did they say, do, or how did they act?" style={css`width:100%;min-height:120px;box-sizing:border-box;border:1.5px solid #CBCBD0;border-radius:14px;padding:14px;font-family:'Satoshi',sans-serif;font-size:14px;line-height:1.5;resize:none;outline:none;color:#0A0A0A;background:#F8F8F8;`} />

              <div style={css`font-size:15px;font-weight:800;line-height:1.4;margin:24px 0 0;text-wrap:pretty;`}>What impact did their actions have on you, or the people around you? Describe the positive outcomes or changes that resulted from their behaviour.</div>
              <div style={css`font-size:12px;font-weight:700;color:#9A9A9A;margin:8px 0 6px;`}>{v.nomImpCount}</div>
              <textarea value={v.nomImpact} onChange={v.setNomImpact} maxLength="500" placeholder="Describe the outcome for the people involved." style={css`width:100%;min-height:110px;box-sizing:border-box;border:1.5px solid #CBCBD0;border-radius:14px;padding:14px;font-family:'Satoshi',sans-serif;font-size:14px;line-height:1.5;resize:none;outline:none;color:#0A0A0A;background:#F8F8F8;`} />

              <div style={css`font-size:15px;font-weight:800;margin:24px 0 8px;`}>Supporting photo (Optional)</div>
              {v.nomNoPhoto && (<>
                <div onClick={v.addNomPhoto} style={css`display:flex;align-items:center;gap:12px;background:#F8F8F8;border:1.5px solid #CBCBD0;border-radius:14px;padding:16px;cursor:pointer;`}>
                  <span style={css`flex:1;font-size:15px;font-weight:700;color:#646464;`}>Upload a photo for proof</span>
                  <svg width="22" height="22" style={css`color:#9A9A9A;`}><use href="#ic-cam" /></svg>
                </div>
              </>)}
              {v.nomPhoto && (<>
                <div style={css`display:flex;align-items:center;gap:12px;background:rgba(16,197,4,0.1);border:1px solid #C8E7D0;border-radius:14px;padding:16px;`}>
                  <span style={css`width:30px;height:30px;border-radius:50%;background:#10C504;color:#fff;display:flex;align-items:center;justify-content:center;flex:none;`}><svg width="18" height="18"><use href="#ic-check" /></svg></span>
                  <span style={css`flex:1;font-size:14px;font-weight:700;color:#0A0A0A;`}>photo_proof.jpg attached</span>
                </div>
              </>)}
            </div>
          </>)}
        </>)}

        {v.catDone && (<>
          <div style={css`margin-top:24px;background:rgba(16,197,4,0.1);border:1px solid #C8E7D0;border-radius:18px;padding:20px;display:flex;align-items:center;gap:14px;`}>
            <div style={css`width:44px;height:44px;border-radius:50%;background:#10C504;display:flex;align-items:center;justify-content:center;color:#fff;flex:none;`}><svg width="24" height="24"><use href="#ic-check" /></svg></div>
            <div>
              <div style={css`font-size:16px;font-weight:900;`}>Completed this month</div>
              <div style={css`font-size:13px;font-weight:600;color:#646464;margin-top:2px;`}>You earned {v.catPtsShort} towards your July goal.</div>
            </div>
          </div>
        </>)}
      </div>

      {v.catHasAction && (<>
        <div style={css`flex:none;padding:12px 18px 22px;background:#fff;`}>
          <div onClick={v.actionClick} style={css`height:60px;border-radius:999px;background:${v.actionBg};color:${v.actionCol};display:flex;align-items:center;justify-content:center;gap:10px;font-size:17px;font-weight:800;cursor:pointer;transition:background .15s ease;`}>
            {v.actionIsCloseLabel && (<><svg width="22" height="22" style={css`color:#1DFA0F`}><use href="#ic-xclose" /></svg></>)}
            {v.actionLabel}
            {v.actionShowArrow && (<><svg width="20" height="20" style={css`color:${v.actionArrowColor};`}><use href="#ic-arr" /></svg></>)}
          </div>
        </div>
      </>)}

      {v.empDropOpen && (<>
        <div onClick={v.closeEmpDrop} style={css`position:absolute;inset:0;z-index:70;background:rgba(10,10,10,.45);display:flex;align-items:flex-end;animation:flFade .18s ease;`}>
          <div onClick={v.stop} style={css`width:100%;height:80%;background:#fff;border-radius:26px 26px 0 0;box-shadow:0 -10px 40px rgba(0,0,0,.22);display:flex;flex-direction:column;overflow:hidden;animation:flFade .2s ease;`}>
            <div style={css`flex:none;padding:10px 0 4px;`}><div style={css`width:38px;height:4px;border-radius:999px;background:#E0E0E0;margin:0 auto;`}></div></div>
            <div style={css`flex:none;display:flex;align-items:center;justify-content:space-between;padding:6px 20px 12px;`}>
              <span style={css`font-size:18px;font-weight:900;`}>Select employee</span>
              <div onClick={v.closeEmpDrop} style={css`width:32px;height:32px;border-radius:50%;background:#F4F4F4;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#252525;`}><svg width="17" height="17"><use href="#ic-xclose" /></svg></div>
            </div>
            <div style={css`flex:none;padding:0 20px 12px;`}>
              <div style={css`display:flex;align-items:center;gap:10px;background:#F4F4F4;border-radius:13px;padding:12px 14px;`}>
                <svg width="19" height="19" style={css`color:#9A9A9A;flex:none;`}><use href="#ic-search" /></svg>
                <input value={v.empSearch} onChange={v.setEmpSearch} placeholder="Search by name" style={css`flex:1;border:none;background:transparent;outline:none;font-family:'Satoshi',sans-serif;font-size:15px;font-weight:600;color:#0A0A0A;`} />
              </div>
            </div>
            <div className="fl-scroll" style={css`flex:1;overflow-y:auto;padding:0 20px 24px;`}>
              {v.vgEmployees.map((e, i) => (
                <div key={i} onClick={e.pick} style={css`display:flex;align-items:center;gap:13px;padding:13px 2px;border-bottom:1px solid #F4F4F4;cursor:pointer;`}>
                  <div style={css`width:38px;height:38px;border-radius:50%;background:rgba(16,197,4,0.14);color:#10C504;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex:none;`}>{e.initials}</div>
                  <span style={css`font-size:15px;font-weight:700;color:#0A0A0A;`}>{e.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>)}

      <WheelDatePicker open={v.mvDateOpen} value={v.mvDateValue} minYear={v.mvMinYear} maxYear={v.mvMaxYear} onPick={v.onMvDatePick} onClose={v.closeMvDate} onCancel={v.cancelMvDate} />
      <WheelDatePicker open={v.vacDateOpen} value={v.vacDateValue} minYear={v.vacMinYear} maxYear={v.vacMaxYear} onPick={v.onVacDatePick} onClose={v.closeVacDate} onCancel={v.cancelVacDate} />
      <WheelDatePicker open={v.wellDateOpen} value={v.wellDateValue} minYear={v.wellMinYear} maxYear={v.wellMaxYear} onPick={v.onWellDatePick} onClose={v.closeWellDate} onCancel={v.cancelWellDate} />
      <WheelDatePicker open={v.csiDateOpen} value={v.csiDateValue} minYear={v.csiMinYear} maxYear={v.csiMaxYear} onPick={v.onCsiDatePick} onClose={v.closeCsiDate} onCancel={v.cancelCsiDate} />
    </div>
  );
}
