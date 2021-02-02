import { ValidationError } from '.';
import { GuildConfig } from '@/models/GuildData';
import difference from 'lodash.difference';

const validateConfig = (config: GuildConfig) => {
  if (!config) {
    throw new ValidationError('Config not provided.');
  }

  const allowedAttributes = [
    'prefix',
    'djRole',
    'exp'
  ];

  const attributeKeys = Object.keys(config);
  const forbiddenAttributes = difference(attributeKeys, allowedAttributes);

  if (forbiddenAttributes.length) {
    throw new ValidationError(
      [
        'Invalid attributes: ',
        forbiddenAttributes.join(', ')
      ].join('')
    );
  }

  if (config.prefix && (typeof config.prefix !== 'string' || config.prefix.trim().length === 0)) {
    throw new ValidationError('Invalid prefix. A prefix must be at least one character long.');
  }

  if (config.djRole && (typeof config.djRole !== 'string' || config.djRole.trim().length === 0)) {
    throw new ValidationError('Invalid DJ role (length is 0).');
  }

  if (!config.exp) {
    return;
  }

  if (!config.exp.range || config.exp.range.length !== 2) {
    throw new ValidationError('Experience RNG range is invalid. Please provide both the start and the end of the range.');
  }

  const [ from, to ] = config.exp.range;
  if (typeof from !== 'number' || typeof to !== 'number') {
    throw new ValidationError('Invalid experience RNG range values have been provided. Make sure they are numbers.');
  }

  if (from < 1 || to < 1 || to < from) {
    throw new ValidationError('Invalid experience RNG range values. Make sure both values are larger than 0 and the first value is smaller than or equal to the second value.');
  }

  if (!config.exp.levels || Object.values(config.exp.levels).length === 0) {
    throw new ValidationError('The EXP feature can only be enabled if you provide levels.');
  }

  Object.keys(config.exp.levels).forEach(level => {
    const parsedLevel = parseInt(level);
    if (isNaN(parsedLevel)) {
      throw new ValidationError(`"${level}" (for role "${config.exp.levels[level]}") is not a valid number, therefore it cannot be used as experience count.`);
    }
  });
};

export default validateConfig;
