import _ from "lodash";
import { CamelCasedPropertiesDeep, KebabCasedPropertiesDeep } from "type-fest";

export const transformObjectKeysToCamelCase = <T extends object>(
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

export const transformObjectKeysToSnakeCase = <T extends object>(
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
