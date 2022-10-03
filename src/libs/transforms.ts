/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";
import { CamelCasedPropertiesDeep } from "type-fest";

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
