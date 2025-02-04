export const ADD: 'notification/ADD' = 'notification/ADD';

export type NotificationType =
  | 'debug'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export type NotificationMessage = {
  readonly type: NotificationType;
  readonly content: string | React.ReactElement<React.ComponentProps<any>, any>;
  readonly key?: string;
};

/**
 * Add a localized notification to display.
 *
 * Accepts a notification message as defined in `./messages.js`.
 */
export type AddAction = {
  type: typeof ADD;
  message: NotificationMessage;
};

let keyCounter = 0;
export function add(message: NotificationMessage): AddAction {
  // This unique key is a mechanism to force React to re-render a notification
  // when the same one is added twice in a row.
  if (!message.key) {
    message = { ...message, key: String(++keyCounter) };
  }

  return {
    type: ADD,
    message,
  };
}

/**
 * Add a raw notification to display.
 *
 * Accepts a simple string and a type.
 *
 * Note: using this should be avoided, and instead you should pass a localized
 * message defined in `./messages.js`. This can be useful to pass notifications
 * that come from a different system (like django) and are not localizable yet.
 */
export function addRaw(content: string, type: NotificationType): AddAction {
  return add({ content, type });
}

export default {
  add,
  addRaw,
};
