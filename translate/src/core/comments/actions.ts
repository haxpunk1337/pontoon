import NProgress from 'nprogress';

import api from '~/core/api';
import * as notification from '~/core/notification';
import * as history from '~/modules/history';
import * as teamcomments from '~/modules/teamcomments';

import type { AppDispatch } from '~/store';

export function addComment(
  entity: number,
  locale: string,
  pluralForm: number,
  translation: number | null | undefined,
  comment: string,
) {
  return async (dispatch: AppDispatch) => {
    NProgress.start();

    await api.comment.add(entity, locale, comment, translation);

    dispatch(notification.actions.add(notification.messages.COMMENT_ADDED));
    if (translation) {
      dispatch(history.actions.get(entity, locale, pluralForm));
    } else {
      dispatch(teamcomments.actions.get(entity, locale));
    }

    NProgress.done();
  };
}

export default {
  addComment,
};
