import type { OpCode } from "./protocol.ts";
import type {
    PlayerUpdate,
    TrackEndEvent,
    TrackExceptionEvent,
    TrackStartEvent,
    TrackStuckEvent,
    WebSocketClosedEvent
} from "./player.ts";
import type {
    ChannelMixFilter,
    DistortionFilter,
    EqualizerFilter,
    Filter,
    KaraokeFilter, LowPassFilter,
    RotationFilter,
    TimescaleFilter,
    TremoloFilter,
    VibratoFilter,
    VolumeFilter,
} from "./filters.ts";
import type { CPUStats, FrameStats, MemoryStats } from "./stats.ts";

/**
 *
 */
export type Message<O extends OpCode, D> = { op: O } & D;

/**
 *
 */
export type PlayerMessage<O extends OpCode, D = unknown> = Message<O, { guildId: string } & D>;

/**
 * All types of messages.
 */
export type LavalinkMessage = IncomingMessage | OutgoingMessage;

/**
 * Incoming messages.
 */
export type IncomingMessage = PlayerEvent | PlayerUpdate | Stats;

/**
 * Outgoing messages.
 */
export type OutgoingMessage = PlayerOutgoingMessage | ConfigureResuming;

/**
 * An outgoing player message.
 */
export type PlayerOutgoingMessage = VoiceUpdate | Play | Stop | Pause | Seek | Volume | Filters | Destroy | Equalizer;

/**
 * Payload for configuring the filters of a player.
 */
export type Filters = PlayerMessage<"filters", FilterData>;

export type FilterData = Partial<{
    [Filter.Volume]: VolumeFilter;
    [Filter.Equalizer]: EqualizerFilter;
    [Filter.Karaoke]: KaraokeFilter;
    [Filter.Timescale]: TimescaleFilter;
    [Filter.Tremolo]: TremoloFilter;
    [Filter.Vibrato]: VibratoFilter;
    [Filter.Rotation]: RotationFilter;
    [Filter.Distortion]: DistortionFilter;
    [Filter.ChannelMix]: ChannelMixFilter;
    [Filter.LowPass]: LowPassFilter;
}>;

/**
 * An event related to an audio player.
 */
export type PlayerEvent =
    | TrackStartEvent
    | TrackEndEvent
    | TrackStuckEvent
    | TrackExceptionEvent
    | WebSocketClosedEvent;

/**
 * Payload for providing an intercepted voice server & state update
 */
export type VoiceUpdate = PlayerMessage<"voiceUpdate", VoiceUpdateData>;

export interface VoiceUpdateData {
    sessionId: string;
    event: VoiceServerEvent
}

export interface VoiceServerEvent {
    token: string;
    endpoint: string;
}

/**
 * Starts playback of the supplied track.
 */
export type Play = PlayerMessage<"play", PlayData>

export interface PlayData {
    track: string;
    startTime?: number;
    endTime?: number;
    volume?: number;
    noReplace?: boolean;
    pause?: boolean;
}

/**
 * Configures the equalizer.
 * @deprecated Removed in lavalink v4, use the filters api.
 */
export type Equalizer = PlayerMessage<"equalizer", EqualizerData>;

export interface EqualizerData {
    bands: EqualizerFilter;
}

/**
 * Configures resuming for this session.
 */
export type ConfigureResuming = Message<"configureResuming", ConfigureResumingData>;

export interface ConfigureResumingData {
    key: string;
    timeout: number;
}

/**
 * Stops playback of the current track.
 */
export type Stop = PlayerMessage<"stop">;

/**
 * Pauses playback of the current track.
 */
export type Pause = PlayerMessage<"pause", PauseData>;

export interface PauseData {
    pause: boolean;
}

/**
 * Seeks to the supplied position.
 */
export type Seek = PlayerMessage<"seek", SeekData>;

export interface SeekData {
    position: number;
}

/**
 * Sets the volume of the player.
 */
export type Volume = PlayerMessage<"volume", VolumeData>;

export interface VolumeData {
    volume: number;
}

/**
 * Stats about the node.
 */
export type Stats = Message<"stats", StatsData>

export interface StatsData {
    /**
     * The amount of players on the node.
     */
    players: number;
    /**
     * The amount of players playing on the node.
     */
    playingPlayers: number;
    /**
     * The duration the node has been up.
     */
    uptime: number;
    /**
     * The nodes memory stats.
     */
    memory: MemoryStats;
    /**
     * The nodes CPU stats.
     */
    cpu: CPUStats;
    /**
     * The nodes frame stats.
     */
    frameStats?: FrameStats;
}

/**
 * Destroys the player.
 */
export type Destroy = PlayerMessage<"destroy">;
