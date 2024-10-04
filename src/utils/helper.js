import _ from "lodash";
import moment from "moment-timezone";
import { useEffect, useState } from "react";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

function toDropdownOption(key, value, text) {
  return {
    key,
    value,
    text,
  };
}

const __DEV__ = process.env.NODE_ENV !== "production";

const capitalize = (str) =>
  `${str?.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
const cleanUpObject = (jsonObject) => {
  Object.keys(jsonObject).forEach(function (key) {
    const currentObj = jsonObject[key];

    if (_.isNull(currentObj) || currentObj === "") {
      delete jsonObject[key];
    } else if (_.isObject(currentObj)) {
      if (_.isArray(currentObj)) {
        if (!currentObj.length) {
          delete jsonObject[key];
        } else {
          const cleanupArrayObj = [];
          for (const obj of currentObj) {
            if (!_.isNull(obj) || currentObj !== "") {
              const cleanObj = cleanUpObject(obj);
              if (!_.isEmpty(cleanObj)) {
                cleanupArrayObj.push(cleanObj);
              }
            }
          }
          if (!cleanupArrayObj.length) {
            delete jsonObject[key];
          } else {
            jsonObject[key] = cleanupArrayObj;
          }
        }
      } else if (_.isEmpty(Object.keys(jsonObject[key]))) {
        delete jsonObject[key];
      } else {
        jsonObject[key] = cleanUpObject(currentObj);

        if (_.isEmpty(Object.keys(jsonObject[key]))) {
          delete jsonObject[key];
        }
      }
    }
  });

  return jsonObject;
};
function convertDateStructureString(dateStructure, dateSeparator) {
  return dateStructure
    .replace(/(.)\1*/g, (match, group) => {
      return match.length > 1
        ? group.repeat(match.length) + dateSeparator
        : group.repeat(match.length);
    })
    .slice(0, -1);
}
const startCase = (string) => {
  if (!string) {
    return "";
  }
  return string
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");
};
const omit = (obj, props) => {
  obj = { ...obj };
  props.forEach((prop) => delete obj[prop]);
  return obj;
};
export function wrapText(str, limit) {
  // eslint-disable-next-line no-nested-ternary
  return str
    ? str.length > limit
      ? str.substring(0, limit).concat("...")
      : str
    : str;
}
const removeDoubleQuotes = (string) => {
  return capitalize(string.replace(/"/g, ""));
};

const getDBDateTime = (dateTime) => {
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || {};
  const format = userInfo?.dateFormat || "DD-MM-YYYY";
  const tz = userInfo?.timezone || null;
  const timeFormat = userInfo?.timeFormat === "24" ? "HH:mm" : "hh:mm A";

  const momentDateTime = moment(dateTime, true);
  if (!momentDateTime.isValid()) {
    return "Invalid date!";
  }
  const completeFormat = `${format} ${timeFormat}`;
  if (tz) {
    return momentDateTime.tz(tz).format(completeFormat);
  }
  return momentDateTime.format(completeFormat);
};

const getDateTime = (dateTime) => {
  return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
};
const maxOfGraphBar = (data, keys) => {
  if (!data || !keys) return 10;

  let max = data.reduce((acc, el) => {
    const max = keys.reduce((acc2, val) => el[val] + acc2, 0);
    return max > acc ? max : acc;
  }, 0);

  if (max > 10) {
    const str = Math.ceil(max).toString();

    max = Number(Number(str.slice(0, 1)) + 1 + new Array(str.length).join("0"));
  } else if (max > 5) max = 10;
  else max = 5;

  return max;
};
const getGridYValuesBar = (data, keys) => {
  if (!data) return [0, 2, 4, 6, 8, 10];
  const max = maxOfGraphBar(data, keys);
  const slice = Math.ceil(max / 5);
  return [0, 1, 2, 3, 4, 5].map((grid) => slice * grid);
};
const maxOfGraph = (data) => {
  if (!data || !Array.isArray(data)) return 10;
  let max = data.reduce((acc, el) => {
    const max2 = el.data.reduce(
      (accu, el2) => (+el2.y > accu ? +el2.y : accu),
      0
    );
    return max2 > acc ? max2 : acc;
  }, 0);
  if (max > 10) {
    const str = Math.ceil(max).toString();
    max = Number(Number(str.slice(0, 1)) + 1 + new Array(str.length).join("0"));
  } else if (max > 5) max = 10;
  else max = 5;
  return max;
};
const getGridYValues = (data) => {
  if (!data) return [0, 2, 4, 6, 8, 10];
  const max = maxOfGraph(data);
  const slice = Math.ceil(max / 5);
  return [0, 1, 2, 3, 4, 5].map((grid) => slice * grid);
};
const getAccurateDateString = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleString("en-US", options);
};
function makeOptions(data) {
  return data?.map((data) => ({
    value: data,
    text: capitalize(data),
    key: data,
  }));
}

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

const get = (a, b, c) => {
  const retValue = c !== undefined ? c : null;
  return a.reduce(
    (obj, key) =>
      obj && key && obj[key] !== null && obj[key] !== undefined
        ? obj[key]
        : retValue,
    b
  );
};

// const getFormattedTime = (time) => {
//   if (!time) return "-";

//   const localStorageData = getUser();
//   const timezone =
//     localStorageData.timezone ||
//     localStorageData.accTimezone ||
//     moment.tz.guess();
//   const timeFormat =
//     (localStorageData.timeFormat || "12") === "12" ? "h:mm A" : "HH:mm";

//   const convertedTime = moment.tz(time, timezone).format(timeFormat);

//   return convertedTime;
// };

// const getFormattedDate = (date) => {
//   if (!date) return "-";

//   const localStorageData = getUser();
//   const timezone =
//     localStorageData.timezone ||
//     localStorageData.accTimezone ||
//     moment.tz.guess();
//   const dateFormat = localStorageData.dateFormat || "DD MM YYYY";

//   const convertedDate = moment.tz(date, timezone).format(dateFormat);

//   return convertedDate;
// };

const copyToClipboard = (e, textAreaRef, setCopySuccess) => {
  if (textAreaRef.current) {
    textAreaRef.current.select();

    try {
      document.execCommand("copy");
      setCopySuccess("Copied");
    } catch (err) {
      //
    }
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
  }
};

export {
  __DEV__,
  capitalize,
  cleanUpObject,
  convertDateStructureString,
  formatDate,
  get,
  getAccurateDateString,
  getDBDateTime,
  getDateTime,
  // getFormattedDate,
  // getFormattedTime,
  getGridYValues,
  getGridYValuesBar,
  makeOptions,
  maxOfGraph,
  maxOfGraphBar,
  omit,
  removeDoubleQuotes,
  startCase,
  toDropdownOption,
  useDebounce,
  copyToClipboard,
};
