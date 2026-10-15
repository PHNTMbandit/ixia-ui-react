import chroma from 'chroma-js'

const HSL_SATURATION = 1,
  HSL_LIGHTNESS = 0.5,
  HUE_TRACK_LENGTH = 361,
  SATURATION_TRACK_LENGTH = 101,
  LIGHTNESS_TRACK_LENGTH = 101,
  TRANSPARENCY_TRACK_LENGTH = 101,
  TRACK_DIVISIONS = 100,
  getHueTrack = () =>
    Array.from({ length: HUE_TRACK_LENGTH }, (_value, hue) =>
      chroma.hsl(hue, HSL_SATURATION, HSL_LIGHTNESS).hex(),
    ),
  getTransparencyTrack = (baseColor: string) =>
    Array.from({ length: TRANSPARENCY_TRACK_LENGTH }, (_value, index) =>
      chroma(baseColor)
        .alpha(index / TRACK_DIVISIONS)
        .css(),
    ),
  getSaturationTrack = (baseColor: string) =>
    Array.from({ length: SATURATION_TRACK_LENGTH }, (_value, index) =>
      chroma(baseColor)
        .set('hsl.s', index / TRACK_DIVISIONS)
        .css(),
    ),
  getLightnessTrack = (baseColor: string) =>
    Array.from({ length: LIGHTNESS_TRACK_LENGTH }, (_value, index) =>
      chroma(baseColor)
        .set('hsl.l', index / TRACK_DIVISIONS)
        .css(),
    )

export { getHueTrack, getTransparencyTrack, getSaturationTrack, getLightnessTrack }
