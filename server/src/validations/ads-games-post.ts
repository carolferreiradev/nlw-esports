export function checkIfAdsGamesPostRequestIsValid(bodyValues: any) {
  const valuesEmpty: any[] = [];
  const response = Object.keys(bodyValues).map((key) => {
    if (bodyValues[key] === undefined) {
      valuesEmpty.push(key);
      return false;
    }
  });
  if (response.includes(false)) {
    return {
      isValid: false,
      valuesEmpty,
    };
  }

  return {
    isValid: true,
  };
}
