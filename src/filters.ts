import type { EqualizerBand } from "./player";

export enum Filter {
  Volume = "volume",
  Equalizer = "equalizer",
  Karaoke = "karaoke",
  Timescale = "timescale",
  Tremolo = "tremolo",
  Vibrato = "vibrato",
  Rotation = "rotation",
  Distortion = "Distortion"
}

/**
 * Float value where 1.0 is 100%.
 */
export type VolumeFilter = number;

/**
 *
 */
export type EqualizerFilter = EqualizerBand[];

/**
 * Filter that uses equalization to eliminate part of a band, usually targeting vocals.
 */
export interface KaraokeFilter {
  level: number;
  monoLevel: number;
  filterBand: number;
  filterWidth: number;
}

/**
 * Filter for changing the playback speed, pitch, and playback rate.
 */
export interface TimescaleFilter {
  speed: number;
  pitch: number;
  rate: number;
}

/**
 * Base type for the Tremolo and Vibrato filter, this is NOT a valid lavalink filter.
 */
export interface OscillatingFilter {
  frequency: number;
  depth: number;
}

/**
 * Filter that uses amplification to create a shuddering effect, where the volume quickly oscillates.
 */
export type TremoloFilter = OscillatingFilter

/**
 * Similar to tremolo, whereas vibrato oscillates the pitch.
 */
export type VibratoFilter = OscillatingFilter;

/**
 * Rotates the sound around the stereo channels/user headphones. aka Audio Panning.
 */
export interface RotationFilter {
  /**
   * The frequency of the audio rotating around the listener in Hz.
   */
  rotationHz: number;
}

/**
 *
 */
export interface DistortionFilter {
  sinOffset: number;
  sinScale: number;
  cosOffset: number;
  cosScale: number;
  tanOffset: number;
  tanScale: number;
}
