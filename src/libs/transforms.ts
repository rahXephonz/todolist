import _ from "lodash";
import { CamelCasedPropertiesDeep, KebabCasedPropertiesDeep } from "type-fest";

// My motivate creating this lib is for consistency data types
// or naming variables, in frontend all props or types just using camelCase
// and for an API it snakeCase but we transform it.

const transformObjectKeysToCamelCase = <T extends object>(
  obj: T,
): CamelCasedPropertiesDeep<T> => {
  const result: T = _.transform<T, any>(obj, (acc, value, key, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key as string);

    acc[camelKey] = _.isObject(value)
      ? transformObjectKeysToCamelCase(value)
      : value;
  });

  return result as CamelCasedPropertiesDeep<T>;
};
const transformObjectKeysToSnakeCase = <T extends object>(
  obj: T,
): KebabCasedPropertiesDeep<T> => {
  const result: T = _.transform<T, any>(obj, (acc, value, key, target) => {
    const camelKey = _.isArray(target) ? key : _.snakeCase(key as string);

    acc[camelKey] = _.isObject(value)
      ? transformObjectKeysToSnakeCase(value)
      : value;
  });
  return result as KebabCasedPropertiesDeep<T>;
};

export default {
  transformObjectKeysToSnakeCase,
  transformObjectKeysToCamelCase,
};
