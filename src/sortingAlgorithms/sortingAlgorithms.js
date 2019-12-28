export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) {
    return array;
  }
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIndex,
  endIndex,
  auxArray,
  animations,
) {
  if (startIndex === endIndex) return;
  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  mergeSortHelper(auxArray, startIndex, middleIndex, mainArray, animations);
  mergeSortHelper(auxArray, middleIndex + 1, endIndex, mainArray, animations);
  doMerge(mainArray, startIndex, middleIndex, endIndex, auxArray, animations);
}

function doMerge(
  mainArray,
  startIndex, 
  middleIndex, 
  endIndex, 
  auxArray,
  animations,
) {
  let k = startIndex;
  let i = startIndex;
  let j = middleIndex + 1;
  while (i <= middleIndex && j <= endIndex) {
    // values that are being compared, push animations to change color
    animations.push([i, j]);

    // values that are being compared are pushed a second time to revert the color change
    animations.push([i, j]);
    if (auxArray[i] <= auxArray[j]) {
      // overwrite the value at index k in original array with value at index i of auxillary array
      animations.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    }
    else {
      // overwrite the value at index k of original array with value at index j in auxillary array
      animations.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }

  while (i <= middleIndex) {
    // values that are being compared, push animation to change their color
    animations.push([i, i]);

    // push values a second time to revert their color
    animations.push([i, i]);

    // overwrite value at index k of original array with value at index i of auxillary array
    animations.push([k, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }

  while (j <= endIndex) {
    // values that are being compared, push animaion to change their color
    animations.push([j, j]);

    // push values a second time to revert their color 
    animations.push([j, j]);

    // overwrite value at index k in original array with value at index j of auxillary array
    animations.push([k, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
}