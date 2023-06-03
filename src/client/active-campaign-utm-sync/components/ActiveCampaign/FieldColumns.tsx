import React, { useCallback, useEffect, useMemo } from 'react';

export type FieldName =
  | 'utm_source'
  | 'utm_medium'
  | 'utm_campaign'
  | 'utm_term'
  | 'utm_content'
  | 'data_criacao';

type CustomFields = {
  [key in FieldName]: string;
};

interface FieldColumnProps {
  fieldNames: FieldName[];
  fetchedCustomFields: { id: number; title: string }[];
  localCustomFields: CustomFields;
  setLocalCustomFields: React.Dispatch<React.SetStateAction<CustomFields>>;
}

export const FieldColumns = ({
  fieldNames,
  fetchedCustomFields,
  localCustomFields,
  setLocalCustomFields,
}: FieldColumnProps) => {
  const options = useMemo(() => {
    return fetchedCustomFields.reduce((acc, curr) => {
      acc[curr.id] = curr.title;
      return acc;
    }, {} as Record<number, string>);
  }, [fetchedCustomFields]);

  const getSelectedOptionId = useCallback(
    (fieldName: FieldName) => {
      if (fieldName === 'data_criacao') {
        const option = fetchedCustomFields.find((field) =>
          field.title.toLowerCase().startsWith('data')
        );
        return option?.id || '';
      }
      const option = fetchedCustomFields.find(
        (field) => field.title === fieldName
      );
      return option?.id || '';
    },
    [fetchedCustomFields]
  );

  const handleFieldChange = useCallback(
    (fieldName: FieldName, value: string) => {
      setLocalCustomFields((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    },
    [setLocalCustomFields]
  );

  return (
    <div id="columnMapping">
      {fieldNames.map((fieldName: FieldName) => {
        const selectedOptionId = getSelectedOptionId(fieldName);

        return (
          <div className="flex flex-col md:flex-row mb-2" key={fieldName}>
            <label
              htmlFor={`select-${fieldName}`}
              className="block mb-2 font-bold text-gray-600 "
            >
              {fieldName}:
            </label>

            <select
              id={`select-${fieldName}`}
              name={fieldName}
              value={localCustomFields[fieldName] || selectedOptionId}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              className="w-full md:w-2/3 py-1 px-2 border border-gray-400 rounded-md mb-4"
            >
              {Object.entries(options).map(([id, title]) => (
                <option value={id} key={id}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};
