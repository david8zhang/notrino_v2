function shuffle(randList) {
    for (z = 4; z >= 0; z--) {
        var temp = randList[z - 1];
        var switchPos = Math.floor(Math.random() * z);
        randList[z - 1] = randList[switchPos];
        randList[switchPos] = temp;
    }
    return randList;
};

function fourRand(range, exception) {
    var randList = [exception];
    while (randList.length < 4) {
        var potential = Math.floor(Math.random() * range);
        if (randList.indexOf(potential) === -1) {
            randList.push(potential);
        }
    }
    randList = shuffle(randList);
    return randList;
};

function generateQuestions(wordList, defList) {
    var pool = {};
    for (i = 0; i < wordList.length; i++) {
        var answerList = fourRand(wordList.length, i);
        var myChoices = [];
        for (j = 0; j < 4; j++) {
            myChoices.push(defList[answerList[j]]);
        }
        pool[wordList[i]] = myChoices;
    }
    console.log(pool);
    return pool;
};

function parseText(fileContents) {
    var colonArray = [];
    var stringArray = fileContents.split("\n");
    var defHash = new Object();
    defHash.wordList = [];
    defHash.defList = [];
    for (i = 0; i < stringArray.length; i++) {
        if (stringArray[i].search(":") >= 0) {
            colonArray.push(i);
        }
    }
    for (i = colonArray[0]; i < stringArray.length; i++) {
        var splitter = stringArray[i].split(":");
        var mainWord = splitter[0];
        var def = splitter[1];
        var j = i + 1;
        while (colonArray.indexOf(j) === -1 && j < stringArray.length) {
            def += " " + stringArray[j];
            i++;
            j++;
        }
        defHash.wordList.push(mainWord);
        defHash.defList.push(def);
    }
    generateQuestions(defHash.wordList, defHash.defList);
};
