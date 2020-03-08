export interface IErrorObject {
  status: number;
  message: string;
}

export interface IPlayerErrorObject extends IErrorObject {
  reason: PlayerErrorReasons;
}

/**
 * (API returns error code 403 for these PlayerErrors, except NoActiveDevice)
 */
export enum PlayerErrorReasons {
  NoPrevTrack = "NO_PREV_TRACK",
  NoNextTrack = "NO_NEXT_TRACK",
  NoSpecificTrack = "NO_SPECIFIC_TRACK",
  AlreadyPaused = "ALREADY_PAUSED",
  NotPaused = "NOT_PAUSED",
  NotPlayingLocally = "NOT_PLAYING_LOCALLY",
  NotPlayingTrack = "NOT_PLAYING_TRACK",
  NotPlayingContext = "NOT_PLAYING_CONTEXT",
  EndlessContext = "ENDLESS_CONTEXT",
  ContextDisallow = "CONTEXT_DISALLOW",
  AlreadyPlaying = "ALREADY_PLAYING",
  RateLimited = "RATE_LIMITED",
  RemoteControlDisallow = "REMOTE_CONTROL_DISALLOW",
  DeviceNotControllable = "DEVICE_NOT_CONTROLLABLE",
  VolumeControlDisallow = "VOLUME_CONTROL_DISALLOW",
  NoActiveDevice = "NO_ACTIVE_DEVICE",
  PremiumRequired = "PREMIUM_REQUIRED",
  Unknown = "UNKNOWN",
}
