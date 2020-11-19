export const PHASE_PLAY = 'PHASE_PLAY';
export const PHASE_DRAW = 'PHASE_DRAW';
export const PHASE_SWAP = 'PHASE_SWAP';
export const PHASE_SLAP = 'PHASE_SLAP';
export const PHASE_PEEK = 'PHASE_PEEK';
export const PHASE_PEEKING = 'PHASE_PEEKING';
export const PHASE_TAPPED = 'PHASE_TAPPED';

export const GAME_STATUS_PRE_DEAL = 'GAME_STATUS_PRE_DEAL';
export const GAME_STATUS_DEALT = 'GAME_STATUS_DEALT';
export const GAME_STATUS_LAUNCHED = 'GAME_STATUS_LAUNCHED';
export const GAME_STATUS_TAPPED = 'GAME_STATUS_TAPPED';
export const GAME_STATUS_POST_GAME = 'GAME_STATUS_POST_GAME';

export const DRAW_PILE = 'DRAW_PILE';
export const DISCARD_PILE = 'DISCARD_PILE';

export const PEEK_HAND = 'PEEK_HAND';
export const PEEK_POINTS = 'PEEK_POINTS';

export const CARD_ACTION_SWAP = 'CARD_ACTION_SWAP';
export const CARD_ACTION_SLAP = 'CARD_ACTION_SLAP';
export const CARD_ACTION_TAPPED = 'CARD_ACTION_TAPPED';
export const CARD_ACTION_HAND = 'CARD_ACTION_HAND';
export const CARD_ACTION_SELECT = 'CARD_ACTION_SELECT';
export const CARD_ACTION_PEEK_SELECT = 'CARD_ACTION_PEEK_SELECT';
export const CARD_ACTION_PEEKING = 'CARD_ACTION_PEEKING';

export const CARD_PIXEL_WIDTH = 63;
export const CARD_PIXEL_HEIGHT = 90;
export const CARD_SIZE_HAND_MULTIPLIER = 1.2;
export const SINGLE_CARD_SHADOW_OPACITY = 0.2;

export const MAX_CARD_POINTS = 349;
// export const MAX_CARD_POINTS = 100
export const MAX_TURNS_POINTS = 100000;
export const MAX_TIME_POINTS = 100000;

export const CARD_POINTS_MULTIPLIER = 5000;
export const TURNS_POINTS_MULTIPLIER = 1000;
export const TIME_POINTS_MULTIPLIER = 1000;

export const DEVICE_MAX_WIDTH = 450;

export * from './screens';
export * from './style';
