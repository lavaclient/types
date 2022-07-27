import type { EqualizerBand } from "./player.ts";

export enum Filter {
    Volume     = "volume",
    Equalizer  = "equalizer",
    Karaoke    = "karaoke",
    Timescale  = "timescale",
    Tremolo    = "tremolo",
    Vibrato    = "vibrato",
    Rotation   = "rotation",
    Distortion = "distortion",
    ChannelMix = "channelMix",
    LowPass    = "lowPass"
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
export type DistortionFilter = Record<`${SOHCAHTOA}${"Scale" | "Offset"}` | "offset" | "scale", number>;

type SOHCAHTOA = "tan" | "cos" | "sin";

/**
 * Mixes both channels (left & right), with a configurable factor on how much each channel affects the other.
 * With the defaults, both channels are kept independent of each other.
 * Setting all factors to 0.5 means both channels get the same audio.
 */
export type ChannelMixFilter = Record<`${Channel}To${Channel}`, number>;

type Channel = "left" | "right";

/**
 * Higher frequencies get suppressed while lower frequencies pass through this filter, thus the name low pass.
 * Any smoothing values equal to, or less than 1.0 will disable the filter.
 */
export interface LowPassFilter {
    smoothing: number;
}
