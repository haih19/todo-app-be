import { ERROR_MESSAGES } from './error-messages';

type ErrorTypesEnum = 'required' | 'invalid' | 'tooShort' | 'tooLong' | 'alreadyExists';

type MessageParams = {
  minLength?: number;
  maxLength?: number;
  customMessage?: string;
};

export const errorMessageBuilder = (
  fieldName: string,
  type: ErrorTypesEnum,
  params?: MessageParams
): string => {
  if (params?.customMessage) return params.customMessage;

  let messageTemplate = ERROR_MESSAGES[type] || '';

  messageTemplate = messageTemplate.replace('{field}', fieldName);

  if (!params) return messageTemplate;

  for (const param in params) {
    messageTemplate = messageTemplate.replace(`{${param}}`, params[param]);
  }

  return messageTemplate;
};
