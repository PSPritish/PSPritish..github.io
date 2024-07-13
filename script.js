const n = 20;
const array = [];
let speed = 200;
function speedcontrol(sp){
  speed = sp;
}
initialize();
function initialize() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  showBars(array);
}
function Play(flag) {

  let copy = [...array];
  switch (flag) {
    case 1:
      const swaps = bubblesort(copy);
      animate(swaps);
      break;
    case 2:
      const swap = selectionsort(copy);
      animate(swap);
      break;

    default:
      break;
  }
}
function animateM(swapM) {
  const animations = swapM;
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("bar");
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? "red" : "springgreen";
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * 100);
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * 100);
    }
  }
}
let audioCtx = null;
function playnote(freq){
  if(audioCtx == null){
    audioCtx = new(
      AudioContext || webkitAudioContext || window.webkitAudioContext
    )();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime+dur);
  osc.connect(audioCtx.destination);
}
function animate(swaps) {
  if (swaps.length == 0) {
    showBars(array);
    return;
  }
  const move = swaps.shift(); //takes out first element and return it
  const [i, j] = move.index;
  const isMoved = move.type;
  playnote(200 + array[i]*100);
  if (isMoved) [array[j], array[i]] = [array[i], array[j]];
  showBars(array, [i, j], isMoved);
  setTimeout(() => animate(swaps), speed);
}
function bubblesort(array) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      moves.push({ index: [i - 1, i], type: false });
      if (array[i - 1] > array[i]) {
        moves.push({ index: [i - 1, i], type: true });
        swapped = true;
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return moves;
}

function showBars(array, indices, isMoved) {
  document.getElementById("container").innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");
    if (indices && indices.includes(i) && !isMoved)
      bar.style.backgroundColor = "red";
    if (indices && indices.includes(i) && isMoved)
      bar.style.backgroundColor = "green";
    document.getElementById("container").append(bar);
  }
}
function mergesort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}
function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function merge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function swap(arr,xp,yp){ 
    [arr[xp],arr[yp]] = [ arr[yp],arr[xp]] 
} 
  
// Function to implement selection 
function selectionsort(arr){ 
    let moves = [];
    // To get length of array 
    let n = arr.length; 
      
    // Variable to store index of smallest value 
    let min; 
    
    // variables to iterate the array 
    let i , j; 
    
    for( i = 0; i < n-1;++i){ 
        min = i;

        for(j = i+1; j < n; j++){ 
            moves.push({index:[i,j],type:false})
            if(arr[j]<arr[min]) min = j; 
        } 
          
        // Swap if both index are different 
        if(min!=i) 
            moves.push({index: [i,min],type : true})
        swap(arr,min,i); 
    } 
    return moves;
} 
