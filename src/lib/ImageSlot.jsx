import React from 'react';
import { parseStyle } from './css.js';
import { IMAGE_SLOTS } from './imageSlots.js';

// Stand-in for the prototype's <image-slot> custom element.
// If the slot id has a real uploaded image (decoded to /public/slots), render it;
// otherwise fall back to a neutral placeholder tile.
export default function ImageSlot({ style, shape = 'rounded', radius = 16, placeholder = '', className = '', id }) {
  const base = typeof style === 'string' ? parseStyle(style) : style || {};
  const br = shape === 'circle' ? '50%' : (base.borderRadius || `${radius}px`);
  const src = id && IMAGE_SLOTS[id];

  const frame = {
    background: '#F2F2F2',
    color: '#B4B4B4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 700,
    textAlign: 'center',
    overflow: 'hidden',
    boxSizing: 'border-box',
    ...base,
    borderRadius: br,
  };

  return (
    <div id={id} className={className} style={frame}>
      {src ? (
        <img src={src} alt={placeholder || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        placeholder
      )}
    </div>
  );
}
