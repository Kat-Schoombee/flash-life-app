import React from 'react';
import { css } from './css.js';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default class WheelDatePicker extends React.Component {
  state = { mIdx: 0, dIdx: 0, yIdx: 0 };
  itemH = 38;
  cols = {};

  setCol = (k) => (el) => { this.cols[k] = el; };

  yearsArr() {
    const mn = this.props.minYear ?? 2020;
    const mx = this.props.maxYear ?? 2030;
    const a = [];
    for (let y = mn; y <= mx; y++) a.push(y);
    return a;
  }
  daysIn(mIdx, year) { return new Date(year, mIdx + 1, 0).getDate(); }

  componentDidMount() { if (this.props.open) this.initFromValue(); }
  componentDidUpdate(prev) { if (this.props.open && !prev.open) this.initFromValue(); }

  initFromValue() {
    const years = this.yearsArr();
    const now = new Date();
    let m = now.getMonth(), d = now.getDate(), y = now.getFullYear();
    const v = this.props.value;
    if (v && typeof v === 'string') {
      const p = v.trim().split(/\s+/);
      const dd = parseInt(p[0], 10);
      const mm = MONTHS.indexOf(p[1]);
      const yy = parseInt(p[2], 10);
      if (!isNaN(dd)) d = dd;
      if (mm >= 0) m = mm;
      if (!isNaN(yy)) y = yy;
    }
    let yIdx = years.indexOf(y);
    if (yIdx < 0) { yIdx = years.indexOf(now.getFullYear()); if (yIdx < 0) yIdx = 0; }
    const dim = this.daysIn(m, years[yIdx]);
    if (d > dim) d = dim;
    this.setState({ mIdx: m, dIdx: d - 1, yIdx }, () => this.syncScroll());
  }

  syncScroll() {
    requestAnimationFrame(() => {
      const map = { month: this.state.mIdx, day: this.state.dIdx, year: this.state.yIdx };
      Object.keys(map).forEach(k => { const el = this.cols[k]; if (el) el.scrollTop = map[k] * this.itemH; });
    });
  }

  onColScroll = (k) => (e) => {
    const idx = Math.round(e.target.scrollTop / this.itemH);
    this.applyIdx(k, idx);
  };

  pick = (k, idx) => {
    const el = this.cols[k];
    if (el) el.scrollTo({ top: idx * this.itemH, behavior: 'smooth' });
    this.applyIdx(k, idx);
  };

  applyIdx(k, idx) {
    this.setState(s => {
      const ns = {};
      if (k === 'month') ns.mIdx = idx;
      if (k === 'day') ns.dIdx = idx;
      if (k === 'year') ns.yIdx = idx;
      const key = k === 'month' ? 'mIdx' : k === 'day' ? 'dIdx' : 'yIdx';
      if (ns[key] === s[key]) return null;
      return ns;
    }, () => this.commit());
  }

  commit() {
    const years = this.yearsArr();
    const m = this.state.mIdx;
    const y = years[this.state.yIdx] || years[0];
    const dim = this.daysIn(m, y);
    let dIdx = this.state.dIdx;
    if (dIdx > dim - 1) { dIdx = dim - 1; this.setState({ dIdx }); }
    const str = (dIdx + 1) + ' ' + MONTHS[m] + ' ' + y;
    if (typeof this.props.onPick === 'function') this.props.onPick(str);
  }

  render() {
    if (!this.props.open) return null;
    const years = this.yearsArr();
    const y = years[this.state.yIdx] || years[0];
    const dim = this.daysIn(this.state.mIdx, y);
    const monthItems = MONTHS.map((label, i) => ({ label, pick: () => this.pick('month', i) }));
    const dayItems = [];
    for (let i = 0; i < dim; i++) dayItems.push({ label: String(i + 1), pick: () => this.pick('day', i) });
    const yearItems = years.map((yr, i) => ({ label: String(yr), pick: () => this.pick('year', i) }));
    const stop = (e) => e.stopPropagation();
    const onCancel = typeof this.props.onCancel === 'function' ? this.props.onCancel : () => {};
    const onClose = typeof this.props.onClose === 'function' ? this.props.onClose : onCancel;
    const maskStyle = 'position:relative;z-index:1;overflow-y:auto;scroll-snap-type:y mandatory;-webkit-mask-image:linear-gradient(180deg,transparent,#000 33%,#000 67%,transparent);mask-image:linear-gradient(180deg,transparent,#000 33%,#000 67%,transparent);';

    return (
      <div onClick={onClose} style={css`position:absolute;inset:0;z-index:90;background:rgba(10,10,10,.4);display:flex;flex-direction:column;justify-content:flex-end;padding:10px;box-sizing:border-box;animation:wdpFade .18s ease;`}>
        <div onClick={stop} style={css`background:#fff;border-radius:16px;padding:6px;box-shadow:0 12px 44px rgba(0,0,0,.22);animation:wdpUp .24s cubic-bezier(0.2,0.8,0.2,1);`}>
          <div style={css`position:relative;height:190px;display:flex;overflow:hidden;border-radius:12px;`}>
            <div style={css`position:absolute;left:8px;right:8px;top:76px;height:38px;background:#EEEEEE;border-radius:9px;pointer-events:none;z-index:0;`}></div>
            <div ref={this.setCol('month')} onScroll={this.onColScroll('month')} className="wdp-col" style={{ ...css(maskStyle), flex: '1.5' }}>
              <div style={{ height: 76, flex: 'none' }}></div>
              {monthItems.map((it, i) => (
                <div key={i} onClick={it.pick} style={css`height:38px;scroll-snap-align:center;display:flex;align-items:center;justify-content:flex-end;padding-right:14px;font-size:18px;font-weight:600;color:#1A1A1A;cursor:pointer;box-sizing:border-box;white-space:nowrap;`}>{it.label}</div>
              ))}
              <div style={{ height: 76, flex: 'none' }}></div>
            </div>
            <div ref={this.setCol('day')} onScroll={this.onColScroll('day')} className="wdp-col" style={{ ...css(maskStyle), flex: '0.85' }}>
              <div style={{ height: 76, flex: 'none' }}></div>
              {dayItems.map((it, i) => (
                <div key={i} onClick={it.pick} style={css`height:38px;scroll-snap-align:center;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:600;color:#1A1A1A;cursor:pointer;box-sizing:border-box;`}>{it.label}</div>
              ))}
              <div style={{ height: 76, flex: 'none' }}></div>
            </div>
            <div ref={this.setCol('year')} onScroll={this.onColScroll('year')} className="wdp-col" style={{ ...css(maskStyle), flex: '1.1' }}>
              <div style={{ height: 76, flex: 'none' }}></div>
              {yearItems.map((it, i) => (
                <div key={i} onClick={it.pick} style={css`height:38px;scroll-snap-align:center;display:flex;align-items:center;justify-content:flex-start;padding-left:14px;font-size:18px;font-weight:600;color:#1A1A1A;cursor:pointer;box-sizing:border-box;`}>{it.label}</div>
              ))}
              <div style={{ height: 76, flex: 'none' }}></div>
            </div>
          </div>
        </div>
        <div onClick={onCancel} style={css`margin-top:8px;background:#fff;border-radius:16px;padding:17px;text-align:center;font-size:17px;font-weight:700;color:#0A0A0A;cursor:pointer;box-shadow:0 12px 44px rgba(0,0,0,.22);animation:wdpUp .26s cubic-bezier(0.2,0.8,0.2,1);`}>Cancel</div>
      </div>
    );
  }
}
