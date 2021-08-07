/**
 * The different event types that can be received by the client.
 *
 * @see https://github.com/sedmelluq/lavaplayer/blob/master/main/src/main/java/com/sedmelluq/discord/lavaplayer/track/AudioTrackEndReason.java
 */
import type { PlayerMessage } from "./message";
import type { FriendlyException } from "./common";
import type { EncodedTrack } from "./tracks";

export type PlayerEventType =
  "TrackStartEvent"
  | "TrackEndEvent"
  | "TrackExceptionEvent"
  | "TrackStuckEvent"
  | "WebSocketClosedEvent";

/**
 * The different end reasons.
 */
export enum TrackEndReason {
  /**
   * This means the track itself emitted a terminator. This is usually caused by the track reaching the end,
   * however it will also be used when it ends due to an exception.
   */
  Finished = "FINISHED",

  /**
   * This means that the track failed to start, throwing an exception before providing any audio.
   */
  LoadFailed = "LOAD_FAILED",

  /**
   * The track was stopped due to the player being stopped by the "stop" operation.
   */
  Stopped = "STOPPED",

  /**
   * The track stopped playing because a new track started playing. Note that with this reason, the old track will still
   * play until either it's buffer runs out or audio from the new track is available.
   */
  Replaced = "REPLACED",

  /**
   * The track was stopped because the cleanup threshold for the audio player has reached. This triggers when the amount
   * of time passed since the last frame fetch has reached the threshold specified in the player manager.
   * This may also indicate either a leaked audio player which has discarded, but not stopped.
   */
  Cleanup = "CLEANUP",
}

/**
 *
 */
export const mayStartNext: Record<TrackEndReason, Boolean> = {
  [TrackEndReason.Finished]: true,
  [TrackEndReason.LoadFailed]: true,
  [TrackEndReason.Stopped]: false,
  [TrackEndReason.Replaced]: false,
  [TrackEndReason.Cleanup]: false,
};

type Event<T extends PlayerEventType, D> = PlayerMessage<"event", { type: T } & D>;

/**
 * An equalizer band, contains the band index and it's gain.
 */
export interface EqualizerBand {
  gain: number;
  band: number;
}

/**
 * Event that is fired when a track starts playing.
 */
export type TrackStartEvent = Event<"TrackStartEvent", TrackStartEventData>;

export interface TrackStartEventData {
  /**
   * The track that had started.
   */
  track: EncodedTrack;
}

/**
 *
 */
export type TrackEndEvent = Event<"TrackEndEvent", TrackEndEventData>;

export interface TrackEndEventData {
  /**
   * Audio track that ended.
   */
  track: string;

  /**
   * The reason why the track stopped playing.
   */
  reason: TrackEndReason;
}

/**
 * Event that is fired when a track was started, but no audio frames from it have arrived in a long time,
 * specified by the threshold set.
 */
export type TrackStuckEvent = Event<"TrackStuckEvent", TrackStuckEventData>;

export interface TrackStuckEventData {
  /**
   * Audio track where the exception occurred.
   */
  track: string;

  /**
   * The wait threshold that was exceeded for this event to trigger.
   */
  thresholdMs: number
}

/**
 * Event that is fired when an exception occurs in an audio track that causes it to halt or not start.
 */
export type TrackExceptionEvent = Event<"TrackExceptionEvent", TrackExceptionEventData>

export interface TrackExceptionEventData {
  /**
   * Audio track where the exception occurred.
   */
  track: string;

  /**
   * The exception message.
   */
  error: string;

  /**
   * The exception that occurred.
   */
  exception: FriendlyException;
}

/**
 * Event that is fired when an audio websocket (to Discord) is closed.
 */
export type WebSocketClosedEvent = Event<"WebSocketClosedEvent", WebSocketClosedEventData>

export interface WebSocketClosedEventData {
  /**
   * The close code given
   *
   * @see https://discordapp.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes
   */
  code: number;

  /**
   * The reason for closing the websocket.
   */
  reason: string;

  /**
   * Whether the websocket connection was closed by a remote source.
   */
  byRemote: boolean;
}

export type PlayerUpdate = PlayerMessage<"playerUpdate", PlayerUpdateData>

export interface PlayerUpdateData {
  /**
   * The state of the player.
   */
  state: PlayerUpdateState;
}

export interface PlayerUpdateState {
  /**
   * Unix timestamp (in milliseconds).
   */
  time: number;

  /**
   * Current track position (in milliseconds). Omitted when not playing anything/
   */
  position?: number;

  /**
   * Whether the player is connected to a voice channel.
   */
  connected: boolean;
}
